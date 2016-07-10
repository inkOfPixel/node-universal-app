import React, { PropTypes } from "react";
import { Router } from "react-router";
import { Provider } from "react-redux";

const Root = ({ store, ...renderProps }) => (
	<Provider store={store}>
		<Router {...renderProps} />
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;
