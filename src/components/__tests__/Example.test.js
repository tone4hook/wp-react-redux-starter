import React from "react";
import { shallow } from "enzyme";
import Example from "../Example.js";

describe("Example", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<Example />);
		expect(wrapper).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});