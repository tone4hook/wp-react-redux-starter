import request from "../__mocks__/request";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { GET_SIDEBAR } from "../actionTypes";
import { urlBase } from "../__mocks__/data";

// mock store with thunk
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {};
const store = mockStore(initialState);

function getSidebar(sidebar) {
	return {
		type: GET_SIDEBAR,
		sidebar
	};
}

function handleGetSidebar() {
	const http = new request();
	return dispatch => {
		return http.makeRequest("GET", `${urlBase}sidebar`).then(
			response => {
				dispatch(getSidebar(response));
			},
			error => {
				dispatch(getSidebar({error}));
			}
		);
	};
}

describe("getSidebar", () => {
	beforeEach(() => {
		// Runs before each test in the suite
		store.clearActions();
	});

	test("getSidebar dispatch on handleGetsidebar", done => {
		const expectedActions = [
			{
				sidebar: {
					data: {
						blog_description: "A Wordpress Blog",
						blog_name: "Blog Name",
						category: [],
						recent_posts: [],
						tag: []
					},
					headers: {
						total: null,
						total_pages: null
					}
				},
				type: GET_SIDEBAR
			}
		];
		const callback = () => {
			const actions = store.getActions();
			expect(actions).toEqual(expectedActions);
			done();
		};
		store.dispatch(handleGetSidebar()).then(success => {
			callback();
		});
	});
});
