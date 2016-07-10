/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

import asyncRequestAction from "./helpers/asyncRequestAction";
import Schemas from "schemas";
import {
	REQUEST_USERS,
	USERS_RECEIVED,
	USERS_REQUEST_FAILED
} from "constants/ActionTypes";

export function fetchEuropeanCountriesIfNeeded() {
	return asyncRequestAction({
		stateFieldName: "users",
		schema: Schemas.USERS,
		endpoint: "api/users",
		actionTypes: {
			request: REQUEST_USERS,
			success: USERS_RECEIVED,
			failure: USERS_REQUEST_FAILED
		}
	});
}
