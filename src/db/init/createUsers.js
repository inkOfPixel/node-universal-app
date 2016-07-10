/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

import User from "../models/User";
import config from "../../config";

export default function createUsers() {
	return Promise.all(config.authentication.users.map(createUser));
}

function createUser(userData) {
	return new Promise((resolve, reject) => {
		User.findOne({ username: userData.USER }).exec()
		.then(user => {
			if (user === null) {
				console.log("init", userData.USER);
				const newUser = new User({
					username: userData.USER,
					key: userData.KEY,
					salt: userData.SALT,
					privilegeLevel: userData.PRIVILEGE_LEVEL
				});
				return newUser.save().then(resolve).catch(reject);
			}
			return resolve();
		});
	});
}
