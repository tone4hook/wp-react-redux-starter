import React from "react";
import { shallow } from "enzyme";
import Loop from "../Loop";

describe("Loop", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<Loop posts={[]} />);
		expect(wrapper).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});