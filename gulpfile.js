/* eslint no-console: ["error", { allow: ["log", "error"] }] */
/* eslint strict: "off" */
"use strict";

const path = require("path");
const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const nodemon = require("nodemon");
const spawn = require("child_process").spawn;

const webpackConfigs = require("./webpack/webpack.config.js");
const common = require("./webpack/common.js");

const AGGREGATE_CLIENT_TIMEOUT = 1000;
const AGGREGATE_SERVER_TIMEOUT = 50;

const ANSI = {
	RED: "\x1b[31m",
	GREEN: "\x1b[32m",
	YELLOW: "\x1b[33m",
	BLUE: "\x1b[34m",
	PURPLE: "\x1b[35m",
	TEAL: "\x1b[36m",
	GREY: "\x1b[37m",
	RESET: "\x1b[0m"
};

const STOP_SIGNALS = {
	SIGTSTP: "SIGTSTP",
	SIGTERM: "SIGTERM",
	SIGINT: "SIGINT"
};

gulp.task("default", ["run-dev"]);

gulp.task(
	"run-dev",
	["watch-server", "watch-client"],
	() => {
		nodemon({
			execMap: {
				js: "node"
			},
			script: path.join(__dirname, "build/dev/server/server.js"),
			ignore: ["*"],
			watch: ["foo/"],
			ext: "noop"
		}).on("restart", () => {
			console.log("[Nodemon] Restarted!");
		});
	}
);

gulp.task("watch-server", ["watch-client"], function watchServer() {
	const compiler = webpack(webpackConfigs.development.server);
	compiler.watch({
		aggregateTimeout: AGGREGATE_SERVER_TIMEOUT
	}, onBuild("[webpack | watch-server]", () => {
		nodemon.restart();
	}));
});

gulp.task("watch-client", function watchClient() {
	// Start a webpack-dev-server
	const config = webpackConfigs.development.client;
	config.entry.app.unshift(
		`webpack-dev-server/client?${common.APP_DEV_ORIGIN}`,
		"webpack/hot/dev-server"
	);
	const compiler = webpack(config);
	const devServer = new WebpackDevServer(compiler, {
		publicPath: config.output.publicPath,
		hot: true,
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: AGGREGATE_CLIENT_TIMEOUT
		},
		noInfo: true,
		lazy: false,
		stats: { colors: true },
		headers: { "Access-Control-Allow-Origin": "*" },
		proxy: {
			"*": `http://${common.APP_DEV_HOST}:8080`
		}

	});
	devServer.listen(common.APP_DEV_PORT, common.APP_DEV_HOST, (error) => {
		if (error) {
			throw new gutil.PluginError("[webpack-dev-server]", error);
		}
		// Server listening
		gutil.log("[webpack-dev-server]", common.APP_DEV_ORIGIN);
		// keep the server alive or continue?
		// callback();
	});

	onProcessStop(function closeServer() {
		console.log(ANSI.YELLOW, "Closing WebpackDevServer..", ANSI.RESET);
		devServer.close();
	});
});

gulp.task("build", ["build-server", "build-client"]);

gulp.task("build-client", function buildClient(callback) {
	const compiler = webpack(webpackConfigs.production.client);
	compiler.run(onBuild("[webpack | build-client]", callback));
});

gulp.task("build-server", function buildClient(callback) {
	const compiler = webpack(webpackConfigs.production.server);
	compiler.run(onBuild("[webpack | build-server]", callback));
});

gulp.task("run-prod", function runProduction(callback) {
	let node;

	restartServer();
	onProcessStop(killServerIfIsRunning);

	function restartServer() {
		killServerIfIsRunning();
		spawnServer();
		node.on("exit", onServerExit);
	}

	function killServerIfIsRunning() {
		if (node) {
			console.log(
				ANSI.YELLOW,
				"killing server..",
				ANSI.RESET
			);
			node.kill();
		}
	}

	function spawnServer() {
		node = spawn(
			"node",
			["--use_strict", "build/prod/server/server"],
			{ stdio: "inherit" }
		);
	}

	function onServerExit(code, signal) {
		if (signal) {
			console.log(ANSI.YELLOW, "server received", signal, ANSI.RESET);
		}
		console.log(ANSI.YELLOW, "server exited with", code, ANSI.RESET);
		// exit code 143 indicates SIGTERM.
		if (code !== 143) {
			console.log(ANSI.RED, "***Looks like the server crashed.", ANSI.RESET);
		}
		callback();
	}
});

function onProcessStop(cleanUpCallback) {
	function listenToSignal(signal) {
		process.on(signal, function onSignal() {
			cleanUpCallback(signal);
			process.exit(0);
		});
	}
	Object.keys(STOP_SIGNALS).forEach(listenToSignal);
}

function onBuild(moduleName, done) {
	const name = typeof moduleName === "string" ? moduleName : "[webpack]";
	return (error, stats) => {
		if (error) {
			throw new gutil.PluginError(name, error);
		}
		gutil.log(name, stats.toString({
			colors: true,
			hash: false,
			version: false,
			reasons: false,
			chunks: false
		}));

		if (done) {
			done();
		}
	};
}
