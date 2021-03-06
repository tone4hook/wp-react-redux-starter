import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { createMemoryHistory } from "history";
import Page from "../Page.js";
// mock store with thunk
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {
	page: {},
	loadingBar: {}
};
const store = mockStore(initialState);
const history = createMemoryHistory("/page/slug");
global.scrollTo = jest.fn();
describe("Page", () => {
	it("renders correctly", () => {
		const wrapper = shallow(
			<Page
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
