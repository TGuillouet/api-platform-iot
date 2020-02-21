/**
 * @class The representation of a frame
 */
class Frame {
	/**
	 * Create an instance of a Frame
	 * 
	 * @constructor
	 * @param {any} frame A frame sent by a xbee
	 */
	constructor(frame) {
		if (process.env.NODE_ENV !== 'production') {
			console.log(
				'Reveiving a new frame with',
				`MAC: ${frame.remote16}`,
				`DIGITAL: ${JSON.stringify(frame.digitalSamples)}`,
				`ANALOG: ${JSON.stringify(frame.analogSamples)}`
			);
		}

		this.mac_address = frame.remote16;
		this.digital_values = frame.digitalSamples;
		this.analog_values = frame.analogSamples;
	}
}

module.exports = Frame;
