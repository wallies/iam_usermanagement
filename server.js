'use strict';

var Hapi = require('hapi');
var routes = require('./server/routes/routes.js');

//Create a nodejs cluster on Hapi port
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker) {
		cluster.fork();
	  var exitCode = worker.process.exitCode;
	  console.log('worker ' + worker.process.pid + ' died ('+exitCode+'). restarting...');
  });

} else {
	// Workers can share any TCP connection
	// In this case its a HTTP server

	// Create a server with a host and port
	var server = Hapi.createServer('0.0.0.0', 8080);

	server.addRoutes(routes);

	process.on('SIGTERM', function() {
		console.log('Received kill signal (SIGTERM), shutting down gracefully.');
		server.stop(function () {
			console.log('Closed out remaining connections.');
		});
	});

	console.log('Hapi server running in port 8080...');
	server.start();
}
