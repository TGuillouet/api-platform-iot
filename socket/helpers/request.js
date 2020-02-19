const API_URL = '';

/**
 * Perform a request to the API
 * @param {String} method The request method (can be GET, POST, PUT, PATCH or DELETE)
 * @param {Object} body The request body (used in POST, PUT and PATCH)
 * @param {Object} headers The request headers
 */
const request = (path, method, body = {}, headers = { 'Content-Type': 'application/json' }) => {
	return fetch(API_URL + path, {
		method,
		headers,
		body
	}).then((res) => res.json());
};

module.exports = request;
