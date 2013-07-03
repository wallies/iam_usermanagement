var express = require('express')
    //, http = require('http')
    , passport = require('passport')
    , path = require('path')
    , spdy = require('spdy')
    , fs = require('fs')
    , User = require('./server/models/User.js');

var options = { 
	plain: true,
  	ssl: true,
	key: fs.readFileSync(__dirname + '/keys/twitlog-key.pem'),
  	cert: fs.readFileSync(__dirname + '/keys/twitlog-cert.pem'),
  	ca: fs.readFileSync(__dirname + '/keys/twitlog-csr.pem'),
  // 	ciphers: '!aNULL:!ADH:!eNull:!LOW:!EXP:RC4+RSA:MEDIUM:HIGH',
 	// maxStreams: 15
};

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

var server = spdy.createServer(options, app);
server.listen(8443);

console.log("Server listening on port %d", server.address().port);

// http.createServer(app).listen(app.get('port'), function(){
//     console.log("Server listening on port " + app.get('port'));
// });