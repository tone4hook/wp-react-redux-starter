import request from "../__mocks__/request";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { GET_PAGE } from "../actionTypes";
import { urlBase } from "../__mocks__/data";

// mock store with thunk
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {};
const store = mockStore(initialState);

function getPage(page) {
	return {
		type: GET_PAGE,
		page
	};
}

function handleGetPage(id) {
	const http = new request();
	return dispatch => {
		return http.makeRequest("GET", `${urlBase}${id}`).then(
			response => {
				dispatch(getPage(response));
			},
			error => {
				dispatch(getPage({error}));
			}
		);
	};
}

describe("getPage", () => {
	beforeEach(() => {
		// Runs before each test in the suite
		store.clearActions();
	});

	test("getPage dispatch on handleGetPage", done => {
		const expectedActions = [
			{
				page: {
					data: {
						"id": 526,
						"date": "2018-08-16T07:38:26",
						"type": "page",
						"featured_media": 0
					},
					headers: {
						total: null,
						total_pages: null
					}
				},
				type: GET_PAGE
			}
		];
		const callback = () => {
			const actions = store.getActions();
			expect(actions).toEqual(expectedActions);
			done();
		};
		store.dispatch(handleGetPage("page")).then(success => {
			callback();
		});
	});
});
