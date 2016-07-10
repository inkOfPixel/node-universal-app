/**
 * Copyright (c) 2016, inkOfPixel, Srl.
 * All rights reserved.
 */
 /* eslint no-console: ["error", { allow: ["log", "error"] }] */

import config from "../config";
import http from "http";
import {
	setupDatabaseConnection
} from "./helpers/index";
import { initDB } from "../db/init";
import app from "./app";

const debug = require("debug")("esi:server");
let server;

try {
	setupDatabaseConnection(config.db.MONGODB_CONNECTION_URL, error => {
		throwIfError(error);
		initDB(dbError => {
			throwIfError(dbError);
			console.log("Starting server..");
			server = http.createServer(app);
			server.listen(config.server.PORT, config.server.IP, () => {
				console.log(`Listening on ${config.server.IP}, port ${config.server.PORT}`);
			});
			server.on("error", throwIfError);
			server.on("listening", onListening);
		});
	});
} catch (error) {
	console.error(error);
	process.exit(1);
}

function onListening() {
	const address = server.address();
	const bind = typeof address === "string" ? `pipe ${address}` : `port ${address.port}`;
	debug(`Listening on ${bind}`);
}

function throwIfError(error) {
	if (error) {
		throw error;
	}
}
