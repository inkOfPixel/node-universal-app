const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const common = require("../common");

const BUILD_DIRECTORY = common.BUILD_DEV_DIRECTORY;
const PROJECT_ROOT = path.join(__dirname, "../../");

module.exports = {
	target: "node",
	entry: "./src/server/index.js",
	output: {
		path: path.join(PROJECT_ROOT, BUILD_DIRECTORY, "server"),
		filename: "server.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ["babel"]
			}, {
				test: /\.json$/,
				loaders: ["json"]
			},
			{
				test: /\.scss$/,
				loader: "css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]!sass"
			}
		]
	},
	resolve: {
		root: [
			path.join(PROJECT_ROOT, "src/app/common")
		],
		extensions: ["", ".js", ".jsx", ".scss"]
	},
	node: {
		__dirname: true,
		__filename: true
	},
	externals: [nodeExternals()],
	plugins: [
		new webpack.DefinePlugin({
			__IS_PRODUCTION__: false,
			__IS_DEVELOPMENT__: true,
			"process.env.NODE_ENV": JSON.stringify("development"),
			__APP_ORIGIN__: JSON.stringify(common.APP_DEV_ORIGIN),
			__APP_PUBLIC_PATH__: JSON.stringify(common.APP_DEV_PUBLIC_PATH)
		}),
		new webpack.BannerPlugin(
			"require('source-map-support').install();",
			{
				raw: true,
				entryOnly: false
			}
		)
	],
	devtool: "#eval-source-map",
	debug: true
};
