import request from "../__mocks__/request";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { GET_MENU } from "../actionTypes";
import { urlBase } from "../__mocks__/data";

// mock store with thunk
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {};
const store = mockStore(initialState);

function getMenu(menu) {
	return {
		type: GET_MENU,
		menu
	};
}

function handleGetMenu() {
	const http = new request();
	return dispatch => {
		return http.makeRequest("GET", `${urlBase}menu`).then(
			response => {
				dispatch(getMenu(response));
			},
			error => {
				dispatch(getMenu({error}));
			}
		);
	};
}

describe("getMenu", () => {
	beforeEach(() => {
		// Runs before each test in the suite
		store.clearActions();
	});

	test("getMenu dispatch on handleGetMenu", done => {
		const expectedActions = [
			{
				menu: {
					data: [
						{
							id: 123,
							type: "category",
							title: "Example 1",
							slug: "example-1"
						},
						{
							id: 456,
							type: "tag",
							title: "Example 2",
							slug: "example-2"
						}
					],
					headers: {
						total: null,
						total_pages: null
					}
				},
				type: GET_MENU
			}
		];
		const callback = () => {
			const actions = store.getActions();
			expect(actions).toEqual(expectedActions);
			done();
		};
		store.dispatch(handleGetMenu()).then(success => {
			callback();
		});
	});
});
