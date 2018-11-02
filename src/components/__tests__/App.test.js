import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "../App.js";
// mock store with thunk
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {
	menu: {},
	sidebar: {}
};
const store = mockStore(initialState);

describe("App", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<App store={store} />);
		const component = wrapper.dive();
		expect(toJson(component)).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});
