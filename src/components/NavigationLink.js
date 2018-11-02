import React from "react";
import { NavLink } from "react-router-dom";
import { isNotTypeOfUndefined } from "../utils/helpers";

const NavigationLink = props => {
	const slug = isNotTypeOfUndefined(props.item.slug)
		? props.item.slug
		: "/404";
	const id = isNotTypeOfUndefined(props.item.id) ? props.item.id : null;
	const title = isNotTypeOfUndefined(props.item.title)
		? props.item.title
		: "";
	const type = isNotTypeOfUndefined(props.item.type) ? props.item.type : "";
	return (
		<NavLink
			exact
			className="nav-link"
			activeClassName="active"
			to={{
				pathname:
					slug === "home"
						? "/"
						: `/${type}/${slug}`,
				state: {
					id: id,
					slug: slug,
					title: title,
					type: type,
					page: 1
				}
			}}
		>
			{title}
		</NavLink>
	);
};

export default NavigationLink;
