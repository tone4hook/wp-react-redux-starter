import { GET_PAGE } from "../actions/actionTypes";

export default function page(state = {}, action) {
	switch (action.type) {
		case GET_PAGE:
			return {
				...state,
				...action.page
			};
		default:
			return state;
	}
}