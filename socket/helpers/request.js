const fetch = require('node-fetch');

const API_URL = 'https://localhost:8443';

/**
 * Perform a request to the API
 * @param {String} method The request method (can be GET, POST, PUT, PATCH or DELETE)
 * @param {Object} body The request body (used in POST, PUT and PATCH)
 * @param {Object} headers The request headers
 */
const request = (path, method, body, headers = { 'Content-Type': 'application/json' }) => {
	if (path[0] !== '/') {
		path = '/' + path;
	}

	if (body) {
		body = JSON.stringify(body);
	}

	return fetch(API_URL + path, {
		method,
		headers,
		body
	})
		.then((res) => res.json())
		.then((json) => {
			if (method === 'GET') return { rows: json['hydra:member'], size: json['hydra:totalItems'] };
			else return json;
		});
};

module.exports = request;
