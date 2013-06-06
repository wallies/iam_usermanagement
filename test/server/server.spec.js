'use strict';

// Require superagent to help us perform mock requests
var request = require('superagent'),
		routes = require('./../../server/routes/routes'),
		Hapi = require('hapi');

// TODO : should change based on the environment
var baseUrl = 'http://localhost:8080';

describe('Server setup', function() {
	var server;
	beforeEach( function () {
		server = Hapi.createServer('localhost', 1111);
	});
	it('port should be 8080', function(done) {
		expect(server.settings.port).not.toEqual(8080);
		expect(server.settings.port).toEqual(1111);
		done();
	});
	it('host should be localhost', function(done) {
		expect(server.settings.host).toEqual('localhost');
		done();
	});
	it('uri should be http://localhost:1111', function(done) {
		expect(server.settings.uri).toEqual('http://localhost:1111');
		done();
	});
});


describe('Server', function() {
	var agent = request.agent();

	describe('- Number of routes', function() {
		/*
		 *  Test that the routes array is not empty
		 */
		it('should not be 0', function() {
			expect(routes.length).toNotBe(0);
		});
		/*
		 *  Test the length of the routes array
		 */
		it('should be 3', function() {
			expect(routes.length).toBe(3);
		});
	});

	describe('- Index page response', function() {

		/*
		*  Perform a GET to the baseUrl and confirm that the
		*  response code is 200 (success)
		*/
		it('should return 200', function(done) {
			agent.get(baseUrl)
				.end(function(err, res) {
					expect(res.statusCode).toBe(200);
					done();
				});
		});
		/*
		 *  Perform a GET to the baseUrl and confirm that the
		 *  response returns index.html - index.html is the
		 *  only page that includes the body tag that bootstraps
		 *  the angular application
		 */
		it('should render index.html page', function(done) {
			agent.get(baseUrl)
				.end(function(err, res) {
					expect(res.text).toContain('<body ng-app="AuthApp">');
					done();
				});
		});
	});
});