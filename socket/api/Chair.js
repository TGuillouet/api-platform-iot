const request = require('./../helpers/request');

/**
 * Get all chairs
 * @return {Promise<[Chair]>} The list of all chairs for a table
 */
async function getChairs() {
	return await request('/chairs', 'GET');
}

/**
 * Get a chair based on his id
 * @param {number} chair_id The id of a chair
 * @return {Promise<Chair>} The requested chair
 */
async function getChair(chair_id) {
	return await request(`/chairs/${chair_id}`, 'GET');
}

/**
 * Replace a chair in the database
 * @param {Chair} chair A chair entity
 * @return {Promise<Chair>} The updated chair
 */
async function putChair(chair) {
	return await request(`/chairs/${chair_id}`, 'PUT', {});
}

/**
 * Update a part of a chair in the database
 * @param {number} chair_id The id of a chair
 * @param {object} updates The modifications to apply on the chair in the database
 * @return {Promise}
 */
async function updateChair(chair_id, updates) {
	return await request(`/chairs/${chair_id}`, 'PATCH', updates);
}

module.exports = {
	getChair,
	getChairs,
	putChair,
	updateChair
};
