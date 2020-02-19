class Frame {
	mac_address = '0000000000000000';
	digital_values = {};
	analog_values = {};

	constructor(frame) {
		console.log(
			'Reveiving a new frame with',
			`MAC: ${frame.remote64}`,
			`DIGITAL: ${JSON.stringify(frame.digitalSamples)}`,
			`ANALOG: ${JSON.stringify(frame.analogSamples)}`
		);
		this.mac_address = frame.remote64;
		this.digital_values = frame.digitalSamples;
		this.analog_values = frame.analogSamples;
	}
}

module.exports = Frame;
