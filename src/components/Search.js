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

class Search extends Component {
	// search string replace spaces with hyphens
	// for the slug and commas for the api param
	state = {
		args: {
			search: isNotTypeOfUndefined(this.props.history.location.state)
				? this.props.history.location.state.id
						.replace(/\-+/g, ",")
						.toLowerCase()
				: this.props.match.params.term
						.replace(/\-+/g, ",")
						.toLowerCase(),
			cat: null,
			tag: null,
			page: isNotTypeOfUndefined(this.props.match.params.num)
				? this.props.match.params.num
				: null
		},
		title: isNotTypeOfUndefined(this.props.history.location.state)
			? this.props.history.location.state.title
			: getContentStringFromSlug(this.props.match.params.term)
	};
	componentDidMount() {
		this.getPosts();
	}

	componentDidUpdate(prevProps) {
		// check if the url has changed
		// to see if a new search or page was clicked
		// set state
		if (this.props.match.url !== prevProps.match.url) {
			let id = isNotTypeOfUndefined(this.props.history.location.state)
				? this.props.history.location.state.id
						.replace(/\-+/g, ",")
						.toLowerCase()
				: this.props.match.params.term
						.replace(/\-+/g, ",")
						.toLowerCase();
			let title = isNotTypeOfUndefined(this.props.history.location.state)
				? this.props.history.location.state.title
				: getContentStringFromSlug(this.props.match.params.term);
			this.setState(
				{
					args: {
						search: id,
						cat: null,
						tag: null,
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

	render() {
		const { isLoading, pages, posts } = this.props;
		const { term } = this.props.match.params;
		const { search } = this.state.args;
		const { title } = this.state;
		return (
			<div>
				<h1>{`Search: ${title}`}</h1>
				{isLoading ? (
					<div className="loading" />
				) : posts && posts.length > 0 ? (
					<Loop posts={posts} />
				) : (
					<p className="lead">No Posts to Display :(</p>
				)}
				{pages > 1 ? (
					<Pagination
						id={term}
						slug={term}
						title={title}
						type="search"
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
		}
	};
}

function mapStateToProps({ posts, loadingBar }) {
	return {
		isLoading: loadingBar.default,
		posts: isNotTypeOfUndefined(posts.data) ? posts.data : null,
		total: isNotTypeOfUndefined(posts.headers) ? posts.headers.total : null,
		pages: isNotTypeOfUndefined(posts.headers)
			? posts.headers.total_pages
			: null
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Search);
