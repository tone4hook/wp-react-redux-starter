import request from "../__mocks__/request";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { GET_ID_BY_SLUG } from "../actionTypes";
import { urlBase } from "../__mocks__/data";

// mock store with thunk
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {};
const store = mockStore(initialState);

function getIdBySlug(contentId) {
	return {
		type: GET_ID_BY_SLUG,
		contentId
	};
}

function handleGetIdBySlug(slug) {
	const http = new request();
	return dispatch => {
		return http.makeRequest("GET", `${urlBase}${slug}`).then(
			response => {
				dispatch(getIdBySlug(response));
			},
			error => {
				dispatch(getIdBySlug({ error }));
			}
		);
	};
}

describe("getIdBySlug", () => {
	beforeEach(() => {
		// Runs before each test in the suite
		store.clearActions();
	});

	test("getIdBySlug dispatch on handleGetIdBySlug", done => {
		const expectedActions = [
			{
				contentId: {
					id: 123,
					slug: "some-slug"
				},
				type: GET_ID_BY_SLUG
			}
		];
		const callback = () => {
			const actions = store.getActions();
			expect(actions).toEqual(expectedActions);
			done();
		};
		store.dispatch(handleGetIdBySlug("slug")).then(success => {
			callback();
		});
	});
});
