import { GET_SIDEBAR } from "./actionTypes";
import request from "../utils/request";
import { urlBase } from "../utils/helpers";

export function getSidebar(sidebar) {
	return {
		type: GET_SIDEBAR,
		sidebar
	};
}
// Menu needs to be created
// and Display location Main Navigation Menu checked
// else response data is empty array
export function handleGetSidebar() {
	const http = new request();
	return dispatch => {
		return http
			.makeRequest(
				"GET",
				`${urlBase}sidebar`
			)
			.then(
				response => {
					dispatch(getSidebar(response));
				},
				error => {
					dispatch(getSidebar({error}));
				}
			);
	};
}