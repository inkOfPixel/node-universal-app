/**
 * Copyright (c) 2016, inkOfPixel, Srl.
 * All rights reserved.
 */

import express from "express";
import path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import api from "../api";
import * as root from "../app/server";
// import authenticate, { requireAuthentication } from "./middleware/authenticate";

const PROJECT_ROOT = path.join(__dirname, "../../");
const ASSETS_DIRECTORY = path.join(PROJECT_ROOT, "assets");
const APP_DEVELOPMENT_DIRECTORY = path.join(PROJECT_ROOT, "build/dev/app");
const APP_PRODUCTION_DIRECTORY = path.join(PROJECT_ROOT, "build/prod/app");
const APP_DIRECTORY = __IS_DEVELOPMENT__ ? APP_DEVELOPMENT_DIRECTORY : APP_PRODUCTION_DIRECTORY;

const app = express();

app.use(logger("dev"));
app.use(favicon(path.join(ASSETS_DIRECTORY, "images/favicon.png")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(authenticate);
app.use("/api", api);
app.use("/assets", express.static(ASSETS_DIRECTORY));
app.use("/app", express.static(APP_DIRECTORY));

// app.get(/^\/dashboard(\/.*)?$/, requireAuthentication);
app.get("*", root.serverRender);

export default app;
