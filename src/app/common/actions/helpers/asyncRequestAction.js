/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

import { CALL_API } from "../../../middleware/api";

export default function asyncRequestAction(options) {
	const { stateFieldName } = options;

	return (dispatch, getState) => {
		if (shouldFetch(getState(), stateFieldName)) {
			return dispatch(fetch(options));
		}
		return Promise.resolve();
	};
}

function shouldFetch(state, stateFieldName) {
	return state[stateFieldName].shouldFetch && !state[stateFieldName].isFetching;
}

function fetch(options) {
	const {
		actionTypes,
		schema,
		endpoint
	} = options;
	return {
		[CALL_API]: {
			endpoint,
			schema,
			requestType: actionTypes.request,
			successType: actionTypes.success,
			failureType: actionTypes.failure
		}
	};
}
