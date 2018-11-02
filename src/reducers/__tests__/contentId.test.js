import { GET_ID_BY_SLUG } from "../../actions/actionTypes";
import contentId from "../contentId";

describe("GET_ID_BY_SLUG", () => {
	test("is correct", () => {
		const exampleAction = {
			type: GET_ID_BY_SLUG,
			contentId: {
				id: 123,
				SLUG: "some-slug"
			}
		};
		const exampleState = {
				id: 123,
				SLUG: "some-slug"
		};

		expect(contentId(undefined, exampleAction)).toEqual(exampleState);
	});
});