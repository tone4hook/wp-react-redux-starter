import { urlBase, dummyData } from "./data";

export default function request() {

	function makeRequest(method, url, data = "") {
		const route = url.substr(urlBase.length);
		return new Promise((resolve, reject) => {
			process.nextTick(
				() =>
					dummyData[route]
						? resolve(dummyData[route])
						: reject({
								error: "Route " + route + " not found."
						  })
			);
		});
	}

	this.makeRequest = makeRequest;
}
