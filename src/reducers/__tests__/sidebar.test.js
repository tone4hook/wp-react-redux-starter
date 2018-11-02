import { GET_SIDEBAR } from "../../actions/actionTypes";
import sidebar from "../sidebar";

describe("GET_SIDEBAR", () => {
	test("is correct", () => {
		const exampleAction = {
			type: GET_SIDEBAR,
			sidebar: {
				id: 2,
				date: "2018/10/4"
			}
		};
		const exampleState = {
				id: 2,
				date: "2018/10/4"
		};

		expect(sidebar(undefined, exampleAction)).toEqual(exampleState);
	});
});