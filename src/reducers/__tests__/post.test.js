import { GET_POST } from "../../actions/actionTypes";
import post from "../post";

describe("GET_POST", () => {
	test("is correct", () => {
		const exampleAction = {
			type: GET_POST,
			post: {
				id: 2,
				date: "2018/10/4"
			}
		};
		const exampleState = {
				id: 2,
				date: "2018/10/4"
		};

		expect(post(undefined, exampleAction)).toEqual(exampleState);
	});
});