import { combineReducers } from "redux";
import menu from "./menu";
import sidebar from "./sidebar";
import posts from "./posts";
import post from "./post";
import page from "./page";
import contentId from "./contentId";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
	menu,
	sidebar,
	posts,
	post,
	page,
	contentId,
	loadingBar: loadingBarReducer
});
