const request = require('./../helpers/request');
const ChairsModel = require('./Chair');

/**
 * Get all tables
 * @return {Promise<[Table]>} The list of all chairs for a table
 */
async function getTables() {
	return await request('/r_tables', 'GET');
}

/**
 * Update a table
 * @return {Promise<[Table]>} The list of all chairs for a table
 */
async function updateTable(id, updates) {
	return await request(`/r_tables/${id}`, 'PATCH', updates, { 'Content-Type': 'application/merge-patch+json' });
}

module.exports = {
	getTables,
	updateTable
};
