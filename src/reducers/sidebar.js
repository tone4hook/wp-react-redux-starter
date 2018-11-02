import { GET_SIDEBAR } from "../actions/actionTypes";

export default function sidebar(state = {}, action) {
	switch (action.type) {
		case GET_SIDEBAR:
			return {
				...state,
				...action.sidebar
			};
		default:
			return state;
	}
}