/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

/* eslint new-cap: "off" */

import { Router } from "express";
import { jsonError } from "./helpers";

const api = Router();

api.get("/version", (request, response) => response.json({
	version: "1.0"
}));

api.use("*", (error, request, response, next) => {
	if (error) {
		response.json(jsonError(error.message));
	} else {
		next();
	}
});

api.use("*", (request, response) => {
	response.json(jsonError("API not found."));
});

export default api;
