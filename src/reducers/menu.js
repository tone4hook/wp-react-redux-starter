import { GET_MENU } from "../actions/actionTypes";

export default function menu(state = {}, action) {
	switch (action.type) {
		case GET_MENU:
			return {
				...state,
				...action.menu
			};
		default:
			return state;
	}
}