const request = require('./../helpers/request');

/**
 * Get all tables
 * @return {Promise<[Table]>} The list of all chairs for a table
 */
async function getTables() {
	return await request('/r_tables', 'GET');
}

module.exports = {
	getTables
};
