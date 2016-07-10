/**
 * Copyright (c) 2016, inkOfPixel, Srl.
 * All rights reserved.
 *
 * @description
 *
 * @created 05/04/16.
 */

import mongoose from "mongoose";

export function setupDatabaseConnection(connectionUrl, callback) {
	mongoose.connect(connectionUrl, function onConnect(error) {
		if (error) {
			console.log("DB connection ERROR", error);
			callback(error);
		} else {
			console.log("DB connection success");
			callback(null);
		}
	});
}
