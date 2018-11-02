import React from "react";
import { shallow } from "enzyme";
import SearchForm from "../SearchForm.js";

describe("SearchForm", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<SearchForm />);
		expect(wrapper).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});