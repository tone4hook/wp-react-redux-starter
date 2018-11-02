import { GET_POST } from "../actions/actionTypes";

export default function post(state = {}, action) {
	switch (action.type) {
		case GET_POST:
			return {
				...state,
				...action.post
			};
		default:
			return state;
	}
}