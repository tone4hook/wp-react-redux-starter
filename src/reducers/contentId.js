import { GET_ID_BY_SLUG } from "../actions/actionTypes";

export default function id(state = {}, action) {
	switch (action.type) {
		case GET_ID_BY_SLUG:
			return {
				...state,
				...action.contentId
			};
		default:
			return state;
	}
}
