/**
 * Copyright (c) 2016, inkOfPixel, Srl.
 * All rights reserved.
 */

import "./App.scss";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

class App extends Component {

	componentDidMount() {
		this.props.onDidMount();
	}

	render() {
		const { children } = this.props;
		return (
			<div
				className="App"
			>
				{ children }
			</div>
		);
	}

}

App.propTypes = {
	children: PropTypes.any,
	onDidMount: PropTypes.func
};

function mapStateToProps() {
	return {

	};
}

function mapDispatchToProps() {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
