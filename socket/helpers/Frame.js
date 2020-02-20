class Frame {
	constructor(frame) {
		console.log(
			'Reveiving a new frame with',
			`MAC: ${frame.remote16}`,
			`DIGITAL: ${JSON.stringify(frame.digitalSamples)}`,
			`ANALOG: ${JSON.stringify(frame.analogSamples)}`
		);
		this.mac_address = frame.remote16;
		this.digital_values = frame.digitalSamples;
		this.analog_values = frame.analogSamples;
	}
}

module.exports = Frame;
