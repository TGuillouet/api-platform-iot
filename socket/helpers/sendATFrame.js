function sendATFrame(destination, command) {
	const frame_obj = {
		// AT Request to be sent
		type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
		destination16: destination,
		command: command.cmd,
		commandParameter: command.value
	};

	xbeeAPI.builder.write(frame_obj);
}

module.exports = sendATFrame;
