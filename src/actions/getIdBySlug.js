import { GET_ID_BY_SLUG } from "./actionTypes";
import request from "../utils/request";
import { urlBase } from "../utils/helpers";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function getIdBySlug(contentId) {
	return {
		type: GET_ID_BY_SLUG,
		contentId
	};
}
// ids needs to be created
// and Display location Main Navigation ids checked
// else response data is empty array
export function handleGetIdBySlug(type, slug) {
	const http = new request();
	let typeParam = "";
	switch (type) {
		case "category":
			typeParam = "categories";
			break;
		case "tag":
			typeParam = "tags";
			break;
		case "post":
			typeParam = "posts";
			break;
		case "page":
			typeParam = "pages";
			break;
	}
	return dispatch => {
		dispatch(showLoading());
		dispatch(getIdBySlug({}));
		return http
			.makeRequest("GET", `${urlBase}${typeParam}?slug=${slug}`)
			.then(
				response => {
					dispatch(getIdBySlug(response.data[0]));
					dispatch(hideLoading());
				},
				error => {
					dispatch(getIdBySlug({ error }));
					dispatch(hideLoading());
				}
			);
	};
}
