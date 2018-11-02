import logger from "./logger";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

const middleware =
	process.env.NODE_ENV !== "production"
		? applyMiddleware(thunk, logger)
		: applyMiddleware(thunk);

export default middleware;
