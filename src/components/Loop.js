import React, { Component } from "react";
import { Link } from "react-router-dom";
import { hasFeaturedImage, setDateString } from "../utils/helpers";

class Loop extends Component {
	// map and create post items
	createPostItems() {
		const { posts } = this.props;
		let postItems = [];
		posts.map(post => {
			let imgSrc = hasFeaturedImage(post);
			postItems.push(
				<article key={post.id} className="card mb-4">
					{imgSrc ? (
						<img
							className="card-img-top"
							src={imgSrc}
							alt={post.title.rendered}
						/>
					) : null}
					<div className="card-body">
						<Link
							to={{
								pathname: `/post/${post.slug}`,
								state: {
									id: post.id,
									slug: post.slug,
									type: "post",
									page: 1
								}
							}}
						>
							<h2 className="card-title">
								{post.title.rendered}
							</h2>
						</Link>
						<div
							className="card-text"
							dangerouslySetInnerHTML={{
								__html: post.excerpt.rendered
							}}
						/>
						<Link
							className="btn btn-dark"
							role="button"
							to={{
								pathname: `/post/${post.slug}`,
								state: {
									id: post.id,
									slug: post.slug,
									type: "post",
									page: 1
								}
							}}
						>
							Read more
						</Link>
					</div>
					<div className="card-footer text-muted">
						Posted on {setDateString(post.date_gmt)}
					</div>
				</article>
			);
		});
		return postItems;
	}
	render() {
		return this.createPostItems();
	}
}

export default Loop;
