import React from "react";
import { shallow } from "enzyme";
import NavigationLink from "../NavigationLink";

describe("NavigationLink", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<NavigationLink item={{}} />);
		expect(wrapper).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});
