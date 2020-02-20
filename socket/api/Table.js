const request = require('./../helpers/request');
const Table = require('./../entities');

/**
 * Get all tables
 * @return {Promise<[Table]>} The list of all chairs for a table
 */
async function getTables() {
	return await request('/r_tables', 'GET').then((value) => ({
		...value,
		rows: value.rows.map((v) => new Table(v.id, v.rtable, v.macAddress))
	}));
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
