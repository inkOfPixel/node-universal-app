import React from "react";
import Helmet from "react-helmet";
import { renderToString } from "react-dom/server";
import { createMemoryHistory, match } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Root from "./containers/Root";
import configureStore from "./store/configureStore";
import routes from "./routes";
import config from "../config";

const APP_PATH = `${__APP_ORIGIN__}/${__APP_PUBLIC_PATH__}`;

export function serverRender(request, response) {
	const initialState = {
		api: {
			entrypoint: `${config.api.ORIGIN}/${config.api.PATH}`
		}
	};
	const memoryHistory = createMemoryHistory(request.url);
	const store = configureStore(memoryHistory, initialState);
	const history = syncHistoryWithStore(memoryHistory, store);
	match({ history, routes }, (error, redirectLocation, renderProps) => {
		if (renderProps !== undefined) {
			const { components } = renderProps;
			fetchData(components, store.dispatch)
				.then(() => {
					const appHtml = renderToString(<Root {...renderProps} store={ store } />);
					response.send(renderPage(appHtml, store.getState()));
				});
		} else if (redirectLocation) {
			response.redirect(redirectLocation);
		} else {
			response.send("Error");
		}
	});
}

function fetchData(components, dispatch) {
	const fetchTasks = components.reduce((tasks, component) => {
		if (shouldCallFetchData(component)) {
			return [
				...tasks,
				...dispatchFetchActions(dispatch, component)
			];
		}
		return tasks;
	}, []);
	return Promise.all(fetchTasks);
}

function shouldCallFetchData(component) {
	return typeof component.fetchData === "function";
}

function dispatchFetchActions(dispatch, component) {
	const fetchActions = component.fetchData();
	return fetchActions.map(action => dispatch(action));
}

function renderPage(appHtml, state) {
	const head = Helmet.rewind();
	return `
	<!DOCTYPE html>
	<html>
		<head>
			${head.title.toString()}
			<link rel="stylesheet" href="${APP_PATH}/app.css" />
			<script src="${APP_PATH}/app.js"></script>
			${head.script.toString()}
		</head>
	<body>
		<div id="app">${appHtml}</div>
		<script>
			window.__INITIAL_STATE__ = ${JSON.stringify(state)}
		</script>
	</body>
	</html>
	`;
}

// function googleAnalitycsCode() {
// 	return (
// 		`
// 		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
// 		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
// 			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
// 		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
//
// 		ga('create', 'UA-74945449-1', 'auto');
// 		ga('send', 'pageview');
// 		`
// 	);
// }
