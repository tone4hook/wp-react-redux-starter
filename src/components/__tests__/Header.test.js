import React from "react";
import { shallow } from "enzyme";
import Header from "../Header.js";

const content = {
	blog_name: "testing",
	blog_description: "the header"
}
describe("Header", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<Header content={content} />);
		expect(wrapper).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});
