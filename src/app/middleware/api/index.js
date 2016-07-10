/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

import { normalize } from "normalizr";
import fetch from "isomorphic-fetch";

export const CALL_API = Symbol("Call API");

export default function api(APIRoot = "") {
	return store => next => action => {
		const callActionPayload = action[CALL_API];
		if (typeof callActionPayload === "undefined") {
			return next(action);
		}
		const {
			endpoint,
			schema,
			requestType,
			successType,
			failureType
		} = callActionPayload;
		const endpointUrl = getAbsoluteEndpointUrl(APIRoot, endpoint, store);
		// checkSchema(callActionPayload);
		checkActionTypes(callActionPayload);

		next(actionWith({ type: requestType }));

		return callAPI(endpointUrl, schema)
			.then(json => next(actionWith({
				json,
				type: successType
			})))
			.catch(error => next(actionWith({
				type: failureType,
				error: error.message || "Something bad happened"
			})));
	};
}

function getAbsoluteEndpointUrl(root, endpoint, store) {
	let endpointUrl = endpoint;
	if (typeof endpoint === "function") {
		endpointUrl = endpoint(store.getState());
	}
	if (typeof endpointUrl !== "string") {
		throw new Error("endpoint must be a string or a function returning a string.");
	}
	return isAbsoluteUrl(endpointUrl)
		? endpointUrl
		: pathJoin(root, endpointUrl);
}

function isAbsoluteUrl(url) {
	return /^https?:\/\/.*/.test(url);
}

function checkSchema(payload) {
	const { schema } = payload;
	if (schema === undefined) {
		throw new Error("Specify a schema.");
	}
}

function checkActionTypes(payload) {
	const { requestType, successType, failureType } = payload;
	if (typeof requestType !== "string") {
		throw new Error("Expected requestType to be a string");
	}
	if (typeof successType !== "string") {
		throw new Error("Expected successType to be a string");
	}
	if (typeof failureType !== "string") {
		throw new Error("Expected failureType to be a string");
	}
}

function actionWith(action, data) {
	const finalAction = {
		...action,
		...data
	};
	delete finalAction[CALL_API];
	return finalAction;
}

function callAPI(url, schema) {
	return fetch(url)
	.then(checkStatus)
	.then(parseJSON)
	.then(json => (normalizeIfNeeded(json, schema)))
	.catch(error => Promise.reject(error));
}

function pathJoin(...urls) {
	return urls.reduce((path, pathComponent) => {
		let pathToBeAppended = pathComponent;
		if (pathComponent.startsWith("/")) {
			pathToBeAppended = pathToBeAppended.slice(1);
		}
		if (pathComponent.endsWith("/")) {
			pathToBeAppended = pathToBeAppended.slice(0, pathComponent.length - 1);
		}
		return `${path}/${pathToBeAppended}`;
	});
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	return Promise.reject(error);
}

function parseJSON(response) {
	return response.json();
}

function normalizeIfNeeded(json, schema) {
	if (schema !== undefined) {
		return normalize(json, schema);
	}
	return json;
}
