import React, { Component } from "react";
import { connect } from "react-redux";
import { handleGetPage } from "../actions/getPage";
import { isNotTypeOfUndefined } from "../utils/helpers";

class Page extends Component {
	state = {
		slug: isNotTypeOfUndefined(this.props.history.location.state)
			? this.props.history.location.state.slug
			: this.props.match.params.slug
	};
	componentDidMount() {
		this.getPage();
	}
	componentDidUpdate(prevProps) {
		if (this.props.match.url !== prevProps.match.url) {
			let slug = isNotTypeOfUndefined(this.props.history.location.state)
				? this.props.history.location.state.slug
				: this.props.match.params.slug;
			this.setState(
				{
					slug: slug
				},
				this.getPage
			);
		}
	}

	getPage() {
		const { getPageData } = this.props;
		const { slug } = this.state;
		getPageData(slug);
		window.scrollTo(0, 0);
	}

	createPage() {
		const { page } = this.props;
		return (
			<article className="mt-2">
				<h1>{page.title.rendered}</h1>
				<p
					dangerouslySetInnerHTML={{
						__html: page.content.rendered
					}}
				/>
			</article>
		);
	}

	render() {
		const { isLoading, page } = this.props;
		const { slug} = this.state;
		return (
			<div>
				{isLoading ? (
					<div className="loading" />
				) : page !== null &&
				isNotTypeOfUndefined(page.title) ? (
					this.createPage()
				) : (
					<p className="lead">No pages to Display :(</p>
				)}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPageData: slug => {
			dispatch(handleGetPage(slug));
		}
	};
}

function mapStateToProps({ page, loadingBar }) {
	return {
		isLoading: loadingBar.default,
		page: isNotTypeOfUndefined(page.data)
			? isNotTypeOfUndefined(page.data[0])
				? page.data[0]
				: page.data
			: null
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);
