import React from "react";
import { shallow } from "enzyme";
import Pagination from "../Pagination";

describe("Pagination", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<Pagination />);
		expect(wrapper).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});