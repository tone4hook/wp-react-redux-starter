import React from "react";
import { isNotTypeOfUndefined } from "../utils/helpers";

const Header = props => {
	const name = isNotTypeOfUndefined(props.content)
	? isNotTypeOfUndefined(props.content.blog_name)
		? props.content.blog_name
		: ""
	: "";
	const description = isNotTypeOfUndefined(props.content)
		? isNotTypeOfUndefined(props.content.description)
			? props.content.description
			: ""
		: "";
	return (
		<header className="p-2 text-center">
			<h1 className="display-2">{name}</h1>
			<p className="lead">{description}</p>
		</header>
	);
};

export default Header;
