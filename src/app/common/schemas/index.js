/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

import { Schema, arrayOf } from "normalizr";

const userSchema = new Schema("users", {
	idAttribute: "_id"
});

export default {
	USERS: {
		result: arrayOf(userSchema)
	}
};
