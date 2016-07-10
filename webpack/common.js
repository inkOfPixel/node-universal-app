const path = require("path");
const os = require("os");

const APP_DEV_HOST = os.hostname() || "0.0.0.0";
const APP_DEV_PORT = "8000";

module.exports = {
	PROJECT_ROOT: path.join(__dirname, "../"),
	BUILD_DEV_DIRECTORY: "build/dev",
	BUILD_PROD_DIRECTORY: "build/prod",
	APP_DEV_HOST,
	APP_DEV_PORT,
	APP_DEV_ORIGIN: `http://${APP_DEV_HOST}:${APP_DEV_PORT}`,
	APP_PROD_ORIGIN: "",
	APP_DEV_PUBLIC_PATH: "app",
	APP_PROD_PUBLIC_PATH: "app"
};
