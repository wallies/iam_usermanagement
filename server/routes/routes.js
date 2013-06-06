var index = require('./../handlers/indexHandler');

var indexRoute = {
	method: 'GET',
	path: '/{path?}',
	config: index.indexHandler
};

var staticContentHandler = {
	method: 'GET',
	path: '/{path*}',
	config: index.staticContentHandler
};




module.exports = [indexRoute, staticContentHandler];
