import React from "react";
import { shallow } from "enzyme";
import Error404 from "../Error404.js";

describe("Error404", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<Error404 />);
		expect(wrapper).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});