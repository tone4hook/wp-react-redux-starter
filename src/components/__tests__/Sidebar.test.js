import React from "react";
import { shallow } from "enzyme";
import Sidebar from "../Sidebar.js";

describe("Sidebar", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<Sidebar content={{}} />);
		expect(wrapper).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});
