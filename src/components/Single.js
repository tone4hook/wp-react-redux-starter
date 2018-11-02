import React, { Component } from "react";
import { connect } from "react-redux";
import { handleGetPost, handleGetPostBySlug } from "../actions/getPost";
import {
	isNotTypeOfUndefined,
	hasFeaturedImage,
	setDateString
} from "../utils/helpers";

class Single extends Component {
	state = {
		id: isNotTypeOfUndefined(this.props.history.location.state)
			? this.props.history.location.state.id
			: null
	};
	componentDidMount() {
		// if post id is null (page refresh)
		// call api using the slug to get the id
		// then call using id for posts data
		if (this.state.id !== null) {
			this.getPost();
		} else {
			this.getPostBySlug();
		}
	}
	componentDidUpdate(prevProps) {
		// check if the url has changed
		// to see if a new post was clicked
		// set state
		if (this.props.match.url !== prevProps.match.url) {
			let id = isNotTypeOfUndefined(this.props.history.location.state)
				? this.props.history.location.state.id
				: null;
			this.setState(
				{
					id: id
				},
				this.getPost
			);
		}
	}

	getPost() {
		const { getPostData } = this.props;
		const { id } = this.state;
		getPostData(id);
		window.scrollTo(0, 0);
	}

	getPostBySlug() {
		const { getPostDataBySlug } = this.props;
		const { slug } = this.props.match.params;
		getPostDataBySlug(slug);
		window.scrollTo(0, 0);
	}

	createPost() {
		const { post } = this.props;
		const imgSrc = hasFeaturedImage(post);
		return (
			<article className="mt-2">
				<h1>{post.title.rendered}</h1>
				<p className="lead">
					{`by ${post._embedded["author"][0].name}`}
				</p>
				<hr />
				<p className="text-muted">
					Posted on {setDateString(post.date_gmt)}
				</p>
				<hr />
				{imgSrc ? (
					<div>
						<img
							className="card-img-top"
							src={imgSrc}
							alt={post.title.rendered}
						/>
						<hr />
					</div>
				) : null}
				<p
					dangerouslySetInnerHTML={{
						__html: post.content.rendered
					}}
				/>
			</article>
		);
	}

	render() {
		const { isLoading, post } = this.props;
		const { id } = this.state;
		return (
			<div>
				{isLoading ? (
					<div className="loading" />
				) : post !== null &&
				isNotTypeOfUndefined(post.title) ? (
					this.createPost()
				) : (
					<p className="lead">No Posts to Display :(</p>
				)}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPostData: id => {
			dispatch(handleGetPost(id));
		},
		getPostDataBySlug: slug => {
			dispatch(handleGetPostBySlug(slug));
		}
	};
}

function mapStateToProps({ post, loadingBar }) {
	return {
		isLoading: loadingBar.default,
		post: isNotTypeOfUndefined(post.data)
			? isNotTypeOfUndefined(post.data[0])
				? post.data[0]
				: post.data
			: null
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Single);
