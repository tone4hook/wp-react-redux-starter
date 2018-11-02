import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { createMemoryHistory } from "history";
import Category from "../Category.js";
// mock store with thunk
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {
	posts: {},
	loadingBar: {},
	contentId: {}
};
const store = mockStore(initialState);
const history = createMemoryHistory("/category/slug");
global.scrollTo = jest.fn();
describe("Category", () => {
	it("renders correctly", () => {
		const wrapper = shallow(
			<Category
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
