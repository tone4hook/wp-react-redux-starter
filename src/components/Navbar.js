import React from "react";
import NavigationLink from "./NavigationLink";
import { isNotTypeOfUndefined } from "../utils/helpers";

const Navbar = props => {
	// If a menu is not created and assigned
	// as Main Menu in the Theme Options
	// no nav will appear.
	const menu = isNotTypeOfUndefined(props.menu.data) ? props.menu.data : [];
	return (
		<ul className="nav bg-light justify-content-center">
			{menu.map(item => (
				<li key={item.id} className="nav-item">
					<NavigationLink item={item} />
				</li>
			))}
		</ul>
	);
};

export default Navbar;
