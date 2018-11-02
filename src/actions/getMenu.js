import { GET_MENU } from "./actionTypes";
import request from "../utils/request";
import { urlBase } from "../utils/helpers";

export function getMenu(menu = null) {
	return {
		type: GET_MENU,
		menu
	};
}
// Menu needs to be created
// and Display location Main Navigation Menu checked
// else response data is empty array
export function handleGetMenu() {
	const http = new request();
	return dispatch => {
		return http
			.makeRequest(
				"GET",
				`${urlBase}menu`
			)
			.then(
				response => {
					dispatch(getMenu(response));
				},
				error => {
					dispatch(getMenu({error}));
				}
			);
	};
}