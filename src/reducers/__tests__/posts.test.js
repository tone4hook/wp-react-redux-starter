import { GET_POSTS } from "../../actions/actionTypes";
import posts from "../posts";

describe("GET_POSTS", () => {
	test("is correct", () => {
		const exampleAction = {
			type: GET_POSTS,
			posts: {
				id: 2,
				date: "2018/10/4"
			}
		};
		const exampleState = {
				id: 2,
				date: "2018/10/4"
		};

		expect(posts(undefined, exampleAction)).toEqual(exampleState);
	});
});