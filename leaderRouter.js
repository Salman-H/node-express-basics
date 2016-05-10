/*
	Node module leaderRouter.js

	Implements the Express router for the /leadership REST API end point

	@author: Salman Hashmi
*/


// ----------------------------------------
// *** inlclude modules and middlewares ***
// ----------------------------------------

var express  = require('express');

var bodyParser = require('body-parser');  
										 
var app = express();



// --------------------------------
// *** create a router object ***
// --------------------------------

var leaderRouter = express.Router();

/* if the request contains json data, it'll be parsed by the body parser 
   and then made available in the request.body object there. */
leaderRouter.use(bodyParser.json());



// -----------------------------------------------------------
// *** Configure the leaderRouter with REST API end points ***
// -----------------------------------------------------------


/* 
	chain express operations with the specified leaderRouterr route or end point 
*/
leaderRouter.route('/')

.all( 
		function(request, response, next) {
			response.writeHead(200, { 'Content-Type': 'text/plain'});
			next();
		}
	)

.get(
		function(request, response, next) {
			response.end('Will send all the leaders to you!');
		}
	)

.post(
		function(request, response, next) {
			response.end('Will add the leader: ' + request.body.name + ' with details: ' + request.body.description);
		} 
	)

.delete(
		function(request, response, next) {
			response.end('Deleting all leaders!');
		}
	);
// semi-colon here means that our chaining is complete for the specified route or end point


/* 
	chain express operations with another leaderRouter end point for a specfic leader 
	with a designated leaderId
*/
leaderRouter.route('/:leaderId')

.all( 
		function(request, response, next) {
			response.writeHead(200, { 'Content-Type': 'text/plain'});
			next();
		}
	)

.get(
		function(request, response, next) {
			response.end('Will send details of the leader: ' + request.params.leaderId + ' to you!');
		}
	)

.put(
		function(request, response, next) {
			response.write('Updating the leader: ' + request.params.leaderId + '\n');
			response.end('Will update the leader: ' + request.body.name + ' with details: ' + request.body.description);
		}
	)

.delete(
			function(request, response, next) {
				response.end('Deleting leader: ' + request.params.leaderId);
			}
		);
// semi-colon here means that our chaining is complete for the specified route or end point



// ---------------------------
// *** Export leaderRouter ***
// ---------------------------

module.exports = leaderRouter;