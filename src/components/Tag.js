import React, { Component } from "react";
import { connect } from "react-redux";
import Loop from "./Loop";
import Pagination from "./Pagination";
import { handleGetPosts } from "../actions/getPosts";
import { handleGetIdBySlug } from "../actions/getIdBySlug";
import {
	isNotTypeOfUndefined,
	getContentStringFromSlug
} from "../utils/helpers";

class Tag extends Component {
	// args for api calls
	// title is for page (view) title
	state = {
		args: {
			search: null,
			cat: null,
			tag: isNotTypeOfUndefined(this.props.history.location.state)
				? this.props.history.location.state.id
				: null,
			page: isNotTypeOfUndefined(this.props.match.params.num)
				? this.props.match.params.num
				: null
		},
		title: isNotTypeOfUndefined(this.props.history.location.state)
			? this.props.history.location.state.title
			: getContentStringFromSlug(this.props.match.params.slug)
	};
	componentDidMount() {
		// if tag id is null (page refresh)
		// call api using the slug to get the id
		// then call using id for posts data
		if (this.state.args.tag !== null) {
			this.getPosts();
		} else {
			this.getContentId();
		}
	}

	componentDidUpdate(prevProps) {
		// check if the url has changed
		// to see if a new tag or page was clicked
		// set state
		if (this.props.match.url !== prevProps.match.url) {
			let id = isNotTypeOfUndefined(this.props.history.location.state)
				? this.props.history.location.state.id
				: null;
			let title = isNotTypeOfUndefined(this.props.history.location.state)
				? this.props.history.location.state.title
				: getContentStringFromSlug(this.props.match.params.slug);
			this.setState(
				{
					args: {
						search: null,
						cat: null,
						tag: id,
						page: isNotTypeOfUndefined(this.props.match.params.num)
							? this.props.match.params.num
							: null
					},
					title: title
				},
				this.getPosts
			);
		} else if (this.props.tagId !== prevProps.tagId) {
			let id = this.props.tagId;
			let title = isNotTypeOfUndefined(this.props.history.location.state)
				? this.props.history.location.state.title
				: getContentStringFromSlug(this.props.match.params.slug);
			this.setState(
				{
					args: {
						search: null,
						cat: null,
						tag: id,
						page: isNotTypeOfUndefined(this.props.match.params.num)
							? this.props.match.params.num
							: null
					},
					title: title
				},
				this.getPosts
			);
		}
	}

	getPosts() {
		const { getPostsData } = this.props;
		const { args } = this.state;
		getPostsData(args);
		window.scrollTo(0, 0);
	}

	getContentId() {
		const { getPostsBySlug } = this.props;
		getPostsBySlug("tag", this.props.match.params.slug);
	}

	render() {
		const { isLoading, pages, posts, tagId } = this.props;
		const { slug } = this.props.match.params;
		const { tag } = this.state.args;
		const { title } = this.state;
		return (
			<div>
				<h1>{`Tag: ${title}`}</h1>
				{isLoading ? (
					<div className="loading" />
				) : posts && posts.length > 0 ? (
					<Loop posts={posts} />
				) : (
					<p className="lead">No Posts to Display :(</p>
				)}
				{pages > 1 ? (
					<Pagination
						id={tag}
						slug={slug}
						title={title}
						type="tag"
						pages={pages}
					/>
				) : null}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPostsData: args => {
			dispatch(handleGetPosts(args));
		},
		getPostsBySlug: (type, slug) => {
			dispatch(handleGetIdBySlug(type, slug));
		}
	};
}

function mapStateToProps({ posts, loadingBar, contentId }) {
	return {
		isLoading: loadingBar.default,
		posts: isNotTypeOfUndefined(posts.data) ? posts.data : null,
		total: isNotTypeOfUndefined(posts.headers) ? posts.headers.total : null,
		pages: isNotTypeOfUndefined(posts.headers)
			? posts.headers.total_pages
			: null,
		tagId: isNotTypeOfUndefined(contentId.id) ? contentId.id : null
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tag);
