import { GET_PAGE } from "./actionTypes";
import request from "../utils/request";
import { urlBase } from "../utils/helpers";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function getPage(page) {
	return {
		type: GET_PAGE,
		page
	};
}
// pages needs to be created
// and Display location Main Navigation pages checked
// else response data is empty array
export function handleGetPage(slug) {
	const http = new request();
	return dispatch => {
		dispatch(showLoading());
		return http
			.makeRequest(
				"GET",
				`${urlBase}pages?slug=${slug}`
			)
			.then(
				response => {
					dispatch(getPage(response));
					dispatch(hideLoading());
				},
				error => {
					dispatch(getPage({error}));
					dispatch(hideLoading());
				}
			);
	};
}