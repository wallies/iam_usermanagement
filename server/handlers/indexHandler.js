'use strict';

var staticContentHandler = {
	handler: {
		directory: { path: './app', listing: false, index: false }
	}
};

var indexHandler = {
	handler: {
		file: './app/index.html'
	}
};

exports.indexHandler = indexHandler;
exports.staticContentHandler = staticContentHandler;