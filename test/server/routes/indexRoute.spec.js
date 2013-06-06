'use strict';

var routes = require('./../../../server/routes/routes');

describe('- Index route', function() {
	/*
	 *  Testing that the route has the correct path
	 */
	it('should have the root path', function(done){
		expect(routes[0].path).not.toBe('undefined');
		expect(routes[0].path).toBe('/{path*}');
		done();
	});
	/*
	 *  Testing that the route has the correct method
	 */
	it('should have a GET method', function(done) {
		expect(routes[0].method).not.toBe('undefined');
		expect(routes[0].method).toBe('GET');
		done();
	});
	/*
	 *  Testing that the route handler will result in serving a static
	 *  file as a response
	 */
	it('should have a handler that servers a static page', function(done) {
		expect(typeof routes[0].config).toBe('object');
		expect(routes[0].config.handler.directory).toBeDefined();
		done();
	});
	/*
	 *  Testing that the handler serves the index.html page from the
	 *  app folder
	 */
	it('should serve the index page from the app folder', function(done) {
		expect(routes[0].config.handler.directory.path).toBe('./app');
		expect(routes[0].config.handler.directory.index).toBe(true);
		done();
	});
});