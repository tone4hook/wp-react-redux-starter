import { GET_POST } from "./actionTypes";
import request from "../utils/request";
import { urlBase } from "../utils/helpers";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function getPost(post) {
	return {
		type: GET_POST,
		post
	};
}
// posts needs to be created
// and Display location Main Navigation posts checked
// else response data is empty array
export function handleGetPost(id) {
	const http = new request();
	return dispatch => {
		dispatch(showLoading());
		return http
			.makeRequest(
				"GET",
				`${urlBase}posts/${id}?_embed`
			)
			.then(
				response => {
					dispatch(getPost(response));
					dispatch(hideLoading());
				},
				error => {
					dispatch(getPost({error}));
					dispatch(hideLoading());
				}
			);
	};
}

export function handleGetPostBySlug(slug) {
	const http = new request();
	return dispatch => {
		dispatch(showLoading());
		return http
			.makeRequest(
				"GET",
				`${urlBase}posts?slug=${slug}&_embed`
			)
			.then(
				response => {
					dispatch(getPost(response));
					dispatch(hideLoading());
				},
				error => {
					dispatch(getPost({error}));
					dispatch(hideLoading());
				}
			);
	};
}