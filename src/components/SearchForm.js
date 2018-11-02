import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SearchForm extends Component {
	state = {
		term: React.createRef()
	}
	handleSubmit = e => {
		e.preventDefault();
		const { history } = this.props;
		const term = this.state.term.current.value.replace(/\s+/g, '-').toLowerCase();
		// change the route to load Search component
		// using a term(s) string changed into slug string
		// by replacing spaces with hyphens
		history.push({
			pathname:
				`/search=${term}`,
			state: {
				id: term,
				slug: term,
				title: this.state.term.current.value,
				type: "search",
				page: 1
			}
		});
		this.state.term.current.value = "";
	};
	render() {
		return (
			<div className="card my-4">
				<h5 className="card-header">Search</h5>
				<div className="card-body">
					<form onSubmit={this.handleSubmit}>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Search for..."
								ref={this.state.term}
							/>
							<span className="input-group-btn">
								<button className="btn btn-secondary" type="submit">
									Go!
								</button>
							</span>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(SearchForm);
