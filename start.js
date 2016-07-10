/* eslint no-console: ["error", { allow: ["log", "error"] }] */
const cluster = require("cluster");

let shouldStop = false;

const stopSignals = [
	"SIGHUP", "SIGINT", "SIGQUIT", "SIGILL", "SIGTRAP", "SIGABRT",
	"SIGBUS", "SIGFPE", "SIGUSR1", "SIGSEGV", "SIGUSR2", "SIGTERM"
];

function handleIncomingSignals() {
	stopSignals.forEach(function handleSignal(signal) {
		process.on(signal, function onSignal() {
			console.log(`Got ${signal}, stopping workers...`);
			shouldStop = true;
			cluster.disconnect(function handleExit() {
				console.log("All workers stopped, exiting.");
				process.exit(0);
			});
		});
	});
}

cluster.on("disconnect", function onDisconnect(worker) {
	if (!shouldStop) {
		cluster.fork();
	} else {
		process.exit(1);
	}
});

if (cluster.isMaster) {
	const numWorkers = require("os").cpus().length;

	console.log(`Master cluster setting up ${numWorkers} workers...`);

	for (let i = 0; i < numWorkers; i++) {
		cluster.fork();
	}

	cluster.on("online", function onWorkerOnline(worker) {
		console.log(`Worker ${worker.process.pid} is online`);
	});

	cluster.on("exit", function onWorkerExit(worker, code, signal) {
		console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
		if (!shouldStop) {
			console.log("Starting a new worker");
			cluster.fork();
		}
	});

	handleIncomingSignals();
} else {
	try {
		require("./build/prod/server/server.js");
	} catch (error) {
		console.log("DEBUG!");
		console.log(error);
	}
}
