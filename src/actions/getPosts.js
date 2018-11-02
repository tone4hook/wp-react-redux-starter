import { GET_POSTS } from "./actionTypes";
import request from "../utils/request";
import { urlBase } from "../utils/helpers";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function getPosts(posts) {
	return {
		type: GET_POSTS,
		posts
	};
}
// posts needs to be created
// and Display location Main Navigation posts checked
// else response data is empty array
export function handleGetPosts(
	args = {
		search: null,
		cat: null,
		tag: null,
		page: null
	}
) {
	const http = new request();
	const { search, cat, tag, page } = args;
	const searchArg = search === null ? "" : `search=${search}&`;
	const catArg = cat === null ? "" : `categories=${cat}&`;
	const tagArg = tag === null ? "" : `tags=${tag}&`;
	const pageArg = page === null ? "" : `page=${page}&`;
	return dispatch => {
		dispatch(showLoading());
		dispatch(getPosts({ data: [], headers: { total: 0, total_pages: 0 } }));
		return http
			.makeRequest(
				"GET",
				`${urlBase}posts?${searchArg}${catArg}${tagArg}${pageArg}_embed`
			)
			.then(
				response => {
					dispatch(getPosts(response));
					dispatch(hideLoading());
				},
				error => {
					dispatch(getPosts({ error }));
					dispatch(hideLoading());
				}
			);
	};
}
