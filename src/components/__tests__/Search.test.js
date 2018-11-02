import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { createMemoryHistory } from "history";
import Search from "../Search.js";
// mock store with thunk
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {
	posts: {},
	loadingBar: {}
};
const store = mockStore(initialState);
const history = createMemoryHistory("/search=term");
global.scrollTo = jest.fn();
describe("Search", () => {
	it("renders correctly", () => {
		const wrapper = shallow(
			<Search
				store={store}
				history={history}
				match={{ params: { term: "" }, isExact: true, path: "", url: "" }}
			/>
		);
		const component = wrapper.dive();
		expect(toJson(component)).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});