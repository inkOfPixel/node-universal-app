/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

const PBKDF2_ITERATIONS = 10000;
const HASH_LENGTH = 256;
const SALT_SIZE = 128;

const UserSchema = new Schema({
	username: { type: String, default: null },
	key: { type: String, default: null },
	salt: { type: String, default: null },
	privilegeLevel: { type: Number, default: null }
});

UserSchema.methods = {
	isPasswordEqual: function checkPassword(password) {
		return new Promise((resolve, reject) => {
			if (this.salt === null) {
				resolve(this.key === password);
			} else {
				encrypt(password, this.salt)
				.then(key => resolve(this.key === key))
				.catch(error => reject(error));
			}
		});
	},

	changePassword: function replaceOldPasswordWith(newPassword) {
		return getSalt()
		.then(salt => new Promise((resolve, reject) => {
			encrypt(newPassword, salt)
			.then(key => resolve({ key, salt }))
			.catch(error => reject(error));
		}))
		.then(({ key, salt }) => {
			this.key = key;
			this.salt = salt;
			return this.save();
		});
	}
};

function getSalt() {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(SALT_SIZE, (error, saltBuffer) => {
			if (error) {
				reject(error);
			} else {
				const salt = saltBuffer.toString("hex");
				resolve(salt);
			}
		});
	});
}

function encrypt(text, salt) {
	return new Promise((resolve, reject) => {
		crypto.pbkdf2(
			text,
			salt,
			PBKDF2_ITERATIONS,
			HASH_LENGTH,
			(error, derivedKey) => {
				if (error) {
					reject(error);
				} else {
					resolve(derivedKey.toString("hex"));
				}
			}
		);
	});
}

export default mongoose.model("User", UserSchema);
