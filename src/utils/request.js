import { cleanJson } from "./helpers";

// Support: http://caniuse.com/promises
export default function request() {
	/**
	 * Helper for http calls
	 * @param method
	 * @param url
	 * @param data
	 * @returns {Promise}
	 */
	function makeRequest(method, url, data = "") {
		// Return a new promise.
		return new Promise(function(resolve, reject) {
			const req = new XMLHttpRequest();
			req.open(method, url);

			req.onload = function() {
				if (req.status == 200) {
					// add header info for pagination
					const headers = {
						total: req.getResponseHeader("X-WP-Total")
							? req.getResponseHeader("X-WP-Total")
							: null,
						total_pages: req.getResponseHeader(
							"X-WP-TotalPages"
						)
							? req.getResponseHeader("X-WP-TotalPages")
							: null
					};
					// create response object
					const response = {
						headers,
						data: JSON.parse(req.response)
					};
					resolve(response);
				} else {
					reject(Error(req.statusText));
				}
			};
			req.onerror = function() {
				reject(Error("Something went wrong ... "));
			};
			req.send(data);
		});
	}
	this.makeRequest = makeRequest;
}
