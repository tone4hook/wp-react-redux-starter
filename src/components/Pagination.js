import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Pagination extends Component {
	state = {
		id: this.props.id,
		slug: this.props.slug,
		title: this.props.title,
		type: this.props.type
	};
	createPageItems() {
		const { id, slug, title, type } = this.state;
		const { pages } = this.props;
		let pageItems = [],
			path = "/";
		for (let i = 0; i < pages; i++) {
			let page = i + 1;
			switch (type) {
				case "latest":
					path = i > 0 ? `/${type}/${page}` : "/";
					break;
				case "search":
					path = i > 0 ? `/${type}=${slug}/${page}` : `/${type}=${slug}`;
					break;
				default:
					path = i > 0 ? `/${type}/${slug}/${page}` : `/${type}/${slug}`;
			}
			pageItems.push(
				<li key={page} className="page-item">
					<NavLink
						exact
						className="page-link"
						activeClassName="active"
						to={{
							pathname: path,
							state: {
								id: id,
								slug: slug,
								title: title,
								type: type,
								page: page
							}
						}}
					>
						{page}
					</NavLink>
				</li>
			);
		}
		return pageItems;
	}
	render() {
		return (
			<nav aria-label="Page navigation example">
				<ul className="pagination">{this.createPageItems()}</ul>
			</nav>
		);
	}
}

export default Pagination;
