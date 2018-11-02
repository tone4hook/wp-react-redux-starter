import React, { Component, Fragment } from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import Header from "./Header";
import Navbar from "./Navbar";
import Home from "./Home";
import Category from "./Category";
import Tag from "./Tag";
import Single from "./Single";
import Search from "./Search";
import Page from "./Page";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Error404 from "./Error404";
import Example from "./Example";
// actions
import { handleGetMenu } from "../actions/getMenu";
import { handleGetSidebar } from "../actions/getSidebar";

class App extends Component {
	// get the initial data
	componentDidMount() {
		const { getMenuData, getSidebarData } = this.props;
		getMenuData(); // get data for menu - custom rest endpoint
		getSidebarData(); // get data for sidebar - custom rest endpoint
	}
	render() {
		const { hasMenu, hasSidebar, menu, sidebar } = this.props;
		// if loading do not render main components
		return (
			<HashRouter>
				<Fragment>
					<LoadingBar />
					<Fragment>
						{hasSidebar === true ? (
							<div className="loading" />
						) : (
							<Header content={sidebar.data} />
						)}
						{hasMenu === true ? null : <Navbar menu={menu} />}
						<div className="container">
							<div className="row">
								<Switch>
									<Route
										exact
										path="/"
										render={({ match, history }) => (
											<div className="col-12 col-md-8">
												<Home
													history={history}
													match={match}
												/>
											</div>
										)}
									/>
									<Route
										exact
										path="/latest/:num"
										render={({ match, history }) => (
											<div className="col-12 col-md-8">
												<Home
													history={history}
													match={match}
												/>
											</div>
										)}
									/>
									<Route
										path="/category/:slug/:num?"
										render={({ match, history }) => (
											<div className="col-12 col-md-8">
												<Category
													history={history}
													match={match}
												/>
											</div>
										)}
									/>
									<Route
										path="/tag/:slug/:num?"
										render={({ match, history }) => (
											<div className="col-12 col-md-8">
												<Tag
													history={history}
													match={match}
												/>
											</div>
										)}
									/>
									<Route
										path="/post/:slug"
										render={({ match, history }) => (
											<div className="col-12 col-md-8">
												<Single
													history={history}
													match={match}
												/>
											</div>
										)}
									/>
									<Route
										path="/search=:term/:num?"
										render={({ match, history }) => (
											<div className="col-12 col-md-8">
												<Search
													history={history}
													match={match}
												/>
											</div>
										)}
									/>
									<Route
										path="/page/:slug"
										render={({ match, history }) => (
											<div className="col-12 col-md-8">
												<Page
													history={history}
													match={match}
												/>
											</div>
										)}
									/>
									<Route
										path="/custom/:slug"
										render={({ match, history }) => (
											<div className="col-12 col-md-8">
												<Example
													match={match}
													type="custom"
												/>
											</div>
										)}
									/>
									<Route path="/404" component={Error404} />
									<Redirect from="*" to="/404" />
								</Switch>
								{hasSidebar === true ? null : (
									<div className="col-12 col-md-4">
										<Sidebar content={sidebar.data} />
									</div>
								)}
							</div>
						</div>
						{hasSidebar === true ? null : (
							<Footer content={sidebar.data} />
						)}
					</Fragment>
				</Fragment>
			</HashRouter>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getMenuData: () => {
			dispatch(handleGetMenu());
		},
		getSidebarData: () => {
			dispatch(handleGetSidebar());
		}
	};
}

function mapStateToProps({ menu, sidebar }) {
	return {
		menu,
		sidebar,
		hasMenu:
			Object.keys(menu).length === 0 && menu.constructor === Object
				? true
				: false,
		hasSidebar:
			Object.keys(sidebar).length === 0 && menu.constructor === Object
				? true
				: false
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
