import { GET_MENU } from "../../actions/actionTypes";
import menu from "../menu";

describe("GET_MENU", () => {
	test("is correct", () => {
		const exampleAction = {
			type: GET_MENU,
			menu: {
				id: 2,
				date: "2018/10/4"
			}
		};
		const exampleState = {
				id: 2,
				date: "2018/10/4"
		};

		expect(menu(undefined, exampleAction)).toEqual(exampleState);
	});
});
