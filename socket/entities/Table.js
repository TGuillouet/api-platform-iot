const Entity = require('./Entity');

/**
 * @class The entity who is representing a table in the database
 * @exports
 */
class Table extends Entity {
	/**
     * Create an instance of table
     * 
     * @constructor
     * @param {number} id The id of the table in the database
     * @param {String} name The name of the table who will be displayed in the react native app
     * @param {String} state The currrent state of the table (if she is taken or not for example)
     * @param {String} mac_address The max address of the table's xbee
     */
	constructor(id, name, state, mac_address) {
		super(id);
		this.name = name;
		this.state = state;
		this.mac_address = mac_address;
	}
}

module.exports = Table;
