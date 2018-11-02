import React from "react";
import { shallow } from "enzyme";
import Navbar from "../Navbar.js";

describe("Navbar", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<Navbar menu={{}} />);
		expect(wrapper).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});