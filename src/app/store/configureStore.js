import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/";
import api from "../middleware/api";

export default function configureStore(history, initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(
				routerMiddleware(history),
				thunkMiddleware,
				api(initialState.api.entrypoint)
			),
			addDevTools()
		)
	);

	if (module.hot) {
		module.hot.accept("../reducers", () => {
			const nextRootReducer = require("../reducers").default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}

function addDevTools() {
	return shouldAddDevTools() ? window.devToolsExtension() : f => f;
}

function shouldAddDevTools() {
	return process.env.NODE_ENV !== "production" && isDevToolsExtensionInstalled();
}

function isDevToolsExtensionInstalled() {
	return typeof window === "object" && typeof window.devToolsExtension !== "undefined";
}
