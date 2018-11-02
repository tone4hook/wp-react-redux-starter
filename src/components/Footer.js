import React from "react";
import { isNotTypeOfUndefined } from "../utils/helpers";

const Footer = props => {
	const date = new Date();
	const year = date.getFullYear();
	const name = isNotTypeOfUndefined(props.content)
		? isNotTypeOfUndefined(props.content.blog_name)
			? props.content.blog_name
			: ""
		: "";
	return (
		<footer className="p-2 text-center">
			<p>&copy;{` ${year} ${name}`}</p>
		</footer>
	);
};

export default Footer;
