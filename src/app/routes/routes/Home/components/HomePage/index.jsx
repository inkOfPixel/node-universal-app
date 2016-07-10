/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

import React, { Component, PropTypes } from "react";
import DefaultLayout from "components/layouts/DefaultLayout";

class HomePage extends Component {

	static fetchData() {
		return [
			// Dispatch async actions (redux thunk)
		];
	}

	render() {
		const { children } = this.props;
		return (
			<DefaultLayout
				className="HomePage"
			>
				Hello world!
				{ children }
			</DefaultLayout>
		);
	}

}

HomePage.propTypes = {
	children: PropTypes.node
};

export default HomePage;
