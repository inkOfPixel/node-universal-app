const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require("../common");

const BUILD_DIRECTORY = common.BUILD_DEV_DIRECTORY;
const PROJECT_ROOT = path.join(__dirname, "../../");

module.exports = {
	entry: {
		app: ["./src/app/client.jsx"]
	},
	output: {
		path: path.join(PROJECT_ROOT, BUILD_DIRECTORY, common.APP_DEV_PUBLIC_PATH),
		publicPath: `${common.APP_DEV_ORIGIN}/`,
		filename: `${common.APP_DEV_PUBLIC_PATH}/[name].js`,
		chunkFilename: `${common.APP_DEV_PUBLIC_PATH}/[id].[name].js`
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ["babel"]
			}, {
				test: /\.json$/,
				exclude: /node_modules/,
				loaders: ["json"]
			}, {
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader")
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__IS_PRODUCTION__: false,
			__IS_DEVELOPMENT__: true,
			"process.env.NODE_ENV": JSON.stringify("development"),
			__APP_ORIGIN__: JSON.stringify(common.APP_DEV_ORIGIN),
			__APP_PUBLIC_PATH__: JSON.stringify(common.APP_DEV_PUBLIC_PATH)
		}),
		new ExtractTextPlugin(`${common.APP_DEV_PUBLIC_PATH}/[name].css`, {
			allChunks: true
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		root: [
			path.join(PROJECT_ROOT, "src/app/common")
		],
		extensions: ["", ".js", ".jsx", ".scss"]
	}
};
