/**
 * Copyright (c) 2016, inkOfPixel, Srl.
 * All rights reserved.
 */

import path from "path";

const privilegeLevels = {
	NONE: 0,
	LOW: 1,
	HIGH: 10
};

const MINUTE = 60;
const HOUR = 60 * MINUTE;


export default {
	server: {
		PORT: process.env.OPENSHIFT_NODEJS_PORT || 8080,
		IP: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0"
	},
	api: {
		ORIGIN: getAPIOrigin(),
		PATH: ""
	},
	db: {
		MONGODB_CONNECTION_URL: getDatabaseConnectionUrl()
	},
	storage: {
		TMP_UPLOAD_DIRECTORY: getTemporaryUploadDirectory()
	},
	resources: {
		IMAGE_MOUNT_PATH: "/resources/images"
	},
	authentication: {
		users: [
			{
				USER: "admin",
				KEY: `0303cda1fc41c2bfdff026d61a6629299a272531e8ad4419909955907bbc025a69487b7768299045589bc9cd5618d3fc77d149b1cc8060aeac34aaf0d8b102c818f7bb23393d1e08d13ae12dfef79528f49d0713749133940332c05b341f87b53ff8fb0647d9a104ec3894db84140137ec99f036aff96bf74d0f2301b5c30a109ae4a13f49a273a76a51f9383600d0d3a1b76bdf858b13f1200f6aafcdbe704ceabb7c6565141b1ea5b58e27a52331a84e641d5691f32a2d7d96cb64cc72223da4b742e7aaa1d5a4eb00223f9a14d2cbb085248a8379f5c933a998a8ce7e5ca11841d49d0df2c9b80d2e411bdb1141095d44260b8780f62ae013c636f62547d5`,
				SALT: `447c6afb1f9b456c4205fba34228682466d20053fc653e3b9d2340552814a53e40679359c28ded4f383605c10c145b15532a831d8217e1280389f554248473bac7ab85bc9ad0f0d217ea0d9ba17a57ceec285b150d7f774aa0e0381d34e78827dd7363108e06d2cfa7884741560d4587cb8639aed5b344b4afab9fb2b1caf2ce`,
				PRIVILEGE_LEVEL: privilegeLevels.LOW
			}
		],
		privilegeLevels,
		secrets: {
			USER_AUTHENTICATION_SECRET: "f?fd.3s.PaW-"
		},
		times: {
			AUTHENTICATION_TOKEN_EXPIRE_TIME_IN_SECONDS: 10 * HOUR
		}
	}
};

function getAPIOrigin() {
	let origin = process.env.OPENSHIFT_APP_DNS || __APP_ORIGIN__;
	if (/^https?:\/\//.test(origin) === false) {
		origin = `http://${origin}`;
	}
	return origin;
}

function getDatabaseConnectionUrl() {
	return getProductionConnectionUrl() || getLocalConnectionUrl();
}

function getProductionConnectionUrl() {
	if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
		return (
			process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
			process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
			process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
			process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
			process.env.OPENSHIFT_APP_NAME
		);
	}

	return null;
}

function getLocalConnectionUrl() {
	return "mongodb://localhost/node_universal_app";
}

function getTemporaryUploadDirectory() {
	return process.env.OPENSHIFT_TMP_DIR || path.join(__dirname, "../../tmp-storage");
}
