import React from "react";
import { shallow } from "enzyme";
import Footer from "../Footer.js";

const content = {
	blog_name: "testing"
};
describe("Footer", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<Footer content={content} />);
		expect(wrapper).toMatchSnapshot();
		// On the first run of this test, Jest will generate a snapshot file automatically.
	});
});
