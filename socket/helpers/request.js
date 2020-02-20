const fetch = require('node-fetch');

const API_URL = 'https://localhost:8443';

/**
 * Perform a request to the API
 * @param {String} method The request method (can be GET, POST, PUT, PATCH or DELETE)
 * @param {Object} body The request body (used in POST, PUT and PATCH)
 * @param {Object} headers The request headers
 */
const request = (path, method, body = null, headers = { 'Content-Type': 'application/json' }) => {
	if (path[0] !== '/') {
		path = '/' + path;
	}
	return fetch(API_URL + path, {
		method,
		headers,
		body
	}).then((res) => res.json());
};

module.exports = request;
