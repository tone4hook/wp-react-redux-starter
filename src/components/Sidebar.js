import React, { Fragment } from "react";
import NavigationLink from "./NavigationLink";
import SearchForm from "./SearchForm";
import { isNotTypeOfUndefined } from "../utils/helpers";

const Sidebar = props => {
	const category = isNotTypeOfUndefined(props.content.category)
		? props.content.category
		: [];
	const recentPosts = isNotTypeOfUndefined(props.content.recent_posts)
		? props.content.recent_posts
		: [];
	const tag = isNotTypeOfUndefined(props.content.tag)
		? props.content.tag
		: [];
	return (
		<Fragment>
			<SearchForm />
			<div className="card my-4">
				<h4 className="card-header">Categories</h4>
				<div className="card-body">
					<ul className="nav flex-column">
						{category.map(item => (
							<li key={item.id} className="nav-item">
								<NavigationLink item={item} />
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="card my-4">
				<h4 className="card-header">Recent Posts</h4>
				<div className="card-body">
					<ul className="nav flex-column">
						{recentPosts.map(item => (
							<li key={item.id} className="nav-item">
								<NavigationLink item={item} />
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="card my-4">
				<h4 className="card-header">Tags</h4>
				<div className="card-body">
					<ul className="nav flex-column">
						{tag.map(item => (
							<li key={item.id} className="nav-item">
								<NavigationLink item={item} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</Fragment>
	);
};

export default Sidebar;
