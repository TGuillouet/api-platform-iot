const io = require('socket.io')();
var SerialPort = require('serialport');
var xbee_api = require('xbee-api');
const Frame = require('./helpers/Frame');
const Table = require('./entities/Table');
const TableState = require('./enums/TableState');
var C = xbee_api.constants;

// Constants
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

serialport.on('open', function() {
	// var frame_obj = {
	// 	// AT Request to be sent
	// 	type: C.FRAME_TYPE.AT_COMMAND,
	// 	command: 'NI',
	// 	commandParameter: []
	// };

	// xbeeAPI.builder.write(frame_obj);

	// frame_obj = {
	// 	// AT Request to be sent
	// 	type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
	// 	destination64: 'FFFFFFFFFFFFFFFF',
	// 	command: 'NI',
	// 	commandParameter: []
	// };
	// xbeeAPI.builder.write(frame_obj);
	sendATFrame({ cmd: 'D1', value: [ 0x05 ] });
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
		console.log(frame);
		processIOFrame(frame);
	} else if (C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE === frame.type) {
		console.log(frame);
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

function processIOFrame(frame) {
	const currentFrame = new Frame(frame);
	// FIXME: Analog value
	if (currentFrame.digital_values.DIO0 === 1) {
		// Get all tables
		const tables = [
			{
				id: '0013a20041582fb1',
				state: TableState.NOT_TAKEN,
				chairs: [ { id: '0013a20041582fb1' } ]
			}
		];
		// Get the table who have the chair who is sending the frame
		let table = tables.find(
			(cTable) => cTable.chairs.findIndex((chair) => chair.id === currentFrame.mac_address) !== -1
		);
		// Update the table with it's new state
		console.log('Table:', table);
		table.state = TableState.TAKEN;
		console.log('Table updated:', table);
		// Then send the onTableUpdatedFrame
		sendATFrame({ cmd: 'D1', value: [ 0x05 ] });
	}
}

function sendATFrame(command) {
	const frame_obj = {
		// AT Request to be sent
		type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
		destination64: '0013A20041582FB1',
		command: command.cmd,
		commandParameter: command.value
	};

	console.log(frame_obj);

	xbeeAPI.builder.write(frame_obj);
}

function processRemoteResponse(frame) {}

// serial_xbee.on('data', function(data) {
// 	console.log(data.type);
// 	console.log('xbee data received:', data.type);
// 	// client.emit('timer', "pouet");
// });

// shepherd.on('ready', function () {
//   console.log('Server is ready.');
//
//   // allow devices to join the network within 60 secs
//   shepherd.permitJoin(60, function (err) {
//     if (err)
//       console.log(err);
//   });
// });

// shepherd.start(function (err) {                // start the server
//   if (err)
//     console.log(err);
// });
