const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require("../common");

const BUILD_DIRECTORY = common.BUILD_PROD_DIRECTORY;
const PROJECT_ROOT = path.join(__dirname, "../../");

module.exports = {
	entry: {
		app: ["./src/app/client.jsx"]
	},
	output: {
		path: path.join(PROJECT_ROOT, BUILD_DIRECTORY, common.APP_PROD_PUBLIC_PATH),
		publicPath: `${common.APP_PROD_ORIGIN}/`,
		filename: `[name].js`,
		chunkFilename: `[id].[name].js`
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
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader")
			}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			__IS_PRODUCTION__: true,
			__IS_DEVELOPMENT__: false,
			"process.env.NODE_ENV": JSON.stringify("production"),
			__APP_ORIGIN__: JSON.stringify(common.APP_PROD_ORIGIN),
			__APP_PUBLIC_PATH__: JSON.stringify(common.APP_PROD_PUBLIC_PATH)
		}),
		new ExtractTextPlugin(`[name].css`, {
			allChunks: true
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false
		})
	],
	resolve: {
		root: [
			path.join(PROJECT_ROOT, "src/app/common")
		],
		extensions: ["", ".js", ".jsx", ".scss"]
	}
};
