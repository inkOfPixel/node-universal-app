module.exports = {
	development: {
		server: require("./development/webpack.config.server.js"),
		client: require("./development/webpack.config.client.js")
	},
	production: {
		server: require("./production/webpack.config.server.js"),
		client: require("./production/webpack.config.client.js")
	}
};
