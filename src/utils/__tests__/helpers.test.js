import {
	hasFeaturedImage,
	isNotTypeOfUndefined,
	cleanJson,
	setDateString,
	getContentStringFromSlug
} from "../helpers";
import { dummyData } from "../../actions/__mocks__/data";

describe("helper utilities", () => {
	test("hasFeaturedImage: post object with featured image returns url string", () => {
		expect(hasFeaturedImage(dummyData.posts.data[0])).toEqual(
			"http://example.com/wp-content/uploads/2018/08/example-768x383.jpg"
		);
	});
	test("hasFeaturedImage: post object without featured image returns false", () => {
		expect(hasFeaturedImage(dummyData.posts.data[1])).toEqual(false);
	});
	test("isNotTypeOfUndefined: returns true if not undefined", () => {
		expect(isNotTypeOfUndefined(dummyData.posts.data[1])).toEqual(true);
	});
	test("isNotTypeOfUndefined: returns false if undefined", () => {
		expect(isNotTypeOfUndefined(dummyData.posts.data[2])).toEqual(false);
	});
	test("setDateString: returns formatted date string", () => {
		expect(setDateString("2018-04-29T20:23:22")).toEqual(
			"Sun, 29 Apr 2018 11:23:22 GMT"
		);
	});
	test("getContentStringFromSlug: returns string with spaces instead of hyphens and capitalized", () => {
		expect(getContentStringFromSlug("test-the-string")).toEqual(
			"Test The String"
		);
	});
});
