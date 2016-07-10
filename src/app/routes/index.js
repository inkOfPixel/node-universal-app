/**
 * Copyright (c) 2016, inkOfPixel, Srl.
 * All rights reserved.
 */

export default {
	component: require("./containers/App").default,
	childRoutes: [
		require("./routes/Home").default
	]
};
