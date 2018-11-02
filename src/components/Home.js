import React, { Component } from "react";
import { connect } from "react-redux";
import Loop from "./Loop";
import Pagination from "./Pagination";
import { handleGetPosts } from "../actions/getPosts";
import { isNotTypeOfUndefined } from "../utils/helpers";

class Home extends Component {
	// args for api calls
	// title is for page (view) title
	state = {
		args: {
			search: null,
			cat: null,
			tag: null,
			page: isNotTypeOfUndefined(this.props.match.params.num)
				? this.props.match.params.num
				: null
		},
		title: isNotTypeOfUndefined(this.props.history.location.state)
			? this.props.history.location.state.title
			: null
	};
	componentDidMount() {
		this.getPosts();
	}

	componentDidUpdate(prevProps) {
		// check if the url has changed
		// to see if a pagination was clicked
		// set state
		if (this.props.match.url !== prevProps.match.url) {
			const title = isNotTypeOfUndefined(
				this.props.history.location.state
			)
				? this.props.history.location.state.title
				: null;
			this.setState(
				{
					args: {
						search: null,
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
		const { title } = this.state;
		return (
			<div>
				<h1 className="my-4">Home</h1>
				{isLoading ? (
					<div className="loading" />
				) : posts && posts.length > 0 ? (
					<Loop posts={posts} />
				) : (
					<p className="lead">No Posts to Display :(</p>
				)}
				{pages > 1 ? (
					<Pagination
						id={null}
						slug={null}
						title={title}
						type="latest"
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
)(Home);
