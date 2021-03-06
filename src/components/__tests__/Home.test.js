import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { createMemoryHistory } from "history";
import Home from "../Home.js";
// mock store with thunk
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {
	posts: {},
	loadingBar: {}
};
const store = mockStore(initialState);
const history = createMemoryHistory("/");
global.scrollTo = jest.fn();
describe("Home", () => {
	it("renders correctly", () => {
		const wrapper = shallow(
			<Home
				store={store}
				history={history}
				match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
			/>
		);
		const component = wrapper.dive();
		expect(toJson(component)).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});
