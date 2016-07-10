const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const common = require("../common");

const BUILD_DIRECTORY = common.BUILD_PROD_DIRECTORY;
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
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			__IS_PRODUCTION__: true,
			__IS_DEVELOPMENT__: false,
			"process.env.NODE_ENV": JSON.stringify("production"),
			__APP_ORIGIN__: JSON.stringify(common.APP_PROD_ORIGIN),
			__APP_PUBLIC_PATH__: JSON.stringify(common.APP_PROD_PUBLIC_PATH)
		})
	]
};
