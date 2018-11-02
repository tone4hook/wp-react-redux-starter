import { GET_PAGE } from "../../actions/actionTypes";
import page from "../page";

describe("GET_PAGE", () => {
	test("is correct", () => {
		const exampleAction = {
			type: GET_PAGE,
			page: {
				id: 2,
				date: "2018/10/4"
			}
		};
		const exampleState = {
				id: 2,
				date: "2018/10/4"
		};

		expect(page(undefined, exampleAction)).toEqual(exampleState);
	});
});