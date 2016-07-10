/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

import React from "react";
import { render } from "react-dom";
import { browserHistory, match } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import $ from "jquery";
import Root from "./containers/Root";
import configureStore from "./store/configureStore";
import routes from "./routes";

$(document).ready(() => {
	const initialState = window.__INITIAL_STATE__;
	const store = configureStore(browserHistory, initialState);
	const history = syncHistoryWithStore(browserHistory, store);
	const rootElement = document.getElementById("app");

	match({ history, routes }, (error, redirectLocation, renderProps) => {
		render(<Root store={ store } {...renderProps} />, rootElement);
	});
});
