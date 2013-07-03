<<<<<<< HEAD
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
=======
var express = require('express')
    , http = require('http')
    , passport = require('passport')
    , path = require('path')
    , User = require('./server/models/User.js');

var app = express();

app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'))
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.cookieSession(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
    }));
app.use(passport.initialize());
app.use(passport.session());
app.engine('html', require('ejs').__express);

passport.use(User.localStrategy);
// passport.use(User.openAMStrategy()); // Comment out this line if you don't want to enable login via Twitter
// passport.use(User.twitterStrategy()); // Comment out this line if you don't want to enable login via Twitter
// passport.use(User.facebookStrategy()); // Comment out this line if you don't want to enable login via Facebook
// passport.use(User.googleStrategy()); // Comment out this line if you don't want to enable login via Google
// passport.use(User.linkedInStrategy()); // Comment out this line if you don't want to enable login via LinkedIn

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

require('./server/routes.js')(app);

app.set('port', process.env.PORT || 9090);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Server listening on port " + app.get('port'));
});
>>>>>>> f5e026eca35a166590b043ad689488feaf85de66
