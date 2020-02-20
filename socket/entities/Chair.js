const Entity = require('./Entity');
const Table = require('./Table');

/**
 * @class The entity who is representing a table in the database
 * @exports
 */
class Chair extends Entity {
	/**
     * Create an instamce of a chair
     * 
     * @constructor
     * @param {number} id The id of the chair in the database
     * @param {Table} table The linked table
     * @param {string} mac_address The mac address of the chair
     */
	constructor(id, table, mac_address) {
		super(id);
		this.table = new Table(table.id, table.name, table.state, table.macAddress);
		this.mac_address = mac_address;
	}
}

module.exports = Chair;
