/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import api from "./api";
import entities from "./entities";

const rootReducer = combineReducers({
	api,
	entities,
	routing
});

export default rootReducer;
