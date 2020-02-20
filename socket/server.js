process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const io = require('socket.io')();
const SerialPort = require('serialport');
const xbee_api = require('xbee-api');

const sendATFrame = require('./helpers/sendATFrame');
const Frame = require('./helpers/Frame');
const TableState = require('./enums/TableState');

// Models
const TableModel = require('./api/Table');
const ChairModel = require('./api/Chair');

// Constants
const C = xbee_api.constants;
const SERIAL_PORT_NAME = '/dev/tty.SLAB_USBtoUART';
const BAUD_RATE = 9600;

var xbeeAPI = new xbee_api.XBeeAPI({
	api_mode: 2
});

let serialport = new SerialPort(
	SERIAL_PORT_NAME,
	{
		baudRate: BAUD_RATE
	},
	function(err) {
		if (err) {
			return console.log('Error: ', err.message);
		}
	}
);

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

let getStatus;
let previousTables = [];
let currentTables = [];
serialport.on('open', function() {
	getStatus = setInterval(async () => {
		const res = await TableModel.getTables();
		previousTables = currentTables;
		currentTables = res.rows;

		previousTables.forEach((pTable) => {
			let current = currentTables.find((cTable) => cTable.id === pTable.id);
			if (current.state !== pTable.state) {
				if (current.state === TableState.PROCESSING) {
					sendATFrame(current.macAddress, { cmd: 'D1', value: [ 0x05 ] });
				} else if (current.state === TableState.PROCESSED) {
					sendATFrame(current.macAddress, { cmd: 'D1', value: [ 0x04 ] });
				} else if (current.state === TableState.PAID) {
					TableState.updateTable(current.id, { state: TableState.NOT_TAKEN });
				}
			}
		});
	}, 5000);
});

serialport.on('close', function() {
	clearInterval(getStatus);
});

// All frames parsed by the XBee will be emitted here

xbeeAPI.parser.on('data', function(frame) {
	//on new device is joined, register it

	//on packet received, dispatch event
	//let dataReceived = String.fromCharCode.apply(null, frame.data);
	if (C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET === frame.type) {
		console.log('C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET');
		let dataReceived = String.fromCharCode.apply(null, frame.data);
		console.log('>> ZIGBEE_RECEIVE_PACKET >', dataReceived);

		browserClient &&
			browserClient.emit('pad-event', {
				device: frame.remote64,
				data: dataReceived
			});
	}

	if (C.FRAME_TYPE.NODE_IDENTIFICATION === frame.type) {
		// let dataReceived = String.fromCharCode.apply(null, frame.nodeIdentifier);
		// console.log(">> ZIGBEE_RECEIVE_PACKET >", frame);
	} else if (C.FRAME_TYPE.ZIGBEE_IO_DATA_SAMPLE_RX === frame.type) {
		processIOFrame(frame);
	} else if (C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE === frame.type) {
		// console.log('RemoteResponse', frame);
		processRemoteResponse(frame);
	} else {
		console.debug('Frame: ', frame);
		let dataReceived = String.fromCharCode.apply(null, frame.commandData);
		console.log('Data received: ', dataReceived);
	}
});
let browserClient;
io.on('connection', (client) => {
	console.log(client.client.id);
	browserClient = client;

	client.on('subscribeToPad', (interval) => {
		console.log('client is subscribing to timer with interval ', interval);
		// setInterval(() => {
		//   client.emit('pad-event', {
		//     device: "test device",
		//     data: Math.round(Math.random()) * 2 - 1
		//   })
		//   ;
		// }, Math.random() * 1000);
	});

	client.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

async function processIOFrame(frame) {
	const currentFrame = new Frame(frame);
	// FIXME: Analog value
	if (currentFrame.digital_values.DIO0 === 1) {
		try {
			// Get all tables
			const chairResponse = await ChairModel.getChairs();

			const chair = chairResponse.rows.find((cChair) => cChair.mac_address === currentFrame.mac_address);

			// If a chair is found and if the table is not taken
			if (chair && chair.table.state === TableState.NOT_TAKEN) {
				// Update the table with it's new state
				await TableModel.updateTable(chair.table.id, { state: TableState.TAKEN });
			}
		} catch (error) {
			console.error(error);
		}
	}
}

function processRemoteResponse(frame) {
	const currentFrame = new Frame(frame);
	console.log(currentFrame);
}
