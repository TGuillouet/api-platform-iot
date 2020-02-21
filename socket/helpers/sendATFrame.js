const xbee_api = require('xbee-api');
const C = xbee_api.constants;

/**
 * 
 * @param {string} destination The destination mac address
 * @param {any} command An at command
 * @param {XBeeAPI} api The xbee api who will send the frame
 */
function sendATFrame(destination, command, api) {
	const frame_obj = {
		// AT Request to be sent
		type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
		destination16: destination,
		command: command.cmd,
		commandParameter: command.value
	};

	api.builder.write(frame_obj);
}

module.exports = sendATFrame;
