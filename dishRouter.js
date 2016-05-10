/*
	Node module dishRouter.js

	Implements the Express router for the /dishes REST API end point.

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

var dishRouter = express.Router();

/* if the request contains json data, it'll be parsed by the body parser 
   and then made available in the request.body object there. */
dishRouter.use(bodyParser.json());



// ----------------------------------------------------------
// *** Configure the dishRouter with REST API end points ***
// ----------------------------------------------------------


/* 
	chain express operations with the specified dishRouter route or end point 
*/
dishRouter.route('/')

.all( 
		function(request, response, next) {
			response.writeHead(200, { 'Content-Type': 'text/plain'});
			next();
		}
	)

.get(
		function(request, response, next) {
			response.end('Will send all the dishes to you!');
		}
	)

.post(
		function(request, response, next) {	
			response.end('Will add the dish: ' + request.body.name + ' with details: ' + request.body.description);
		} 
	)

.delete(
		function(request, response, next) {
			response.end('Deleting all dishes!');
		}
	);
// semi-colon here means that our chaining is complete for the specified route or end point


/* 
	chain express operations with another dishRouter end point for a specfic dish 
	with a designated dishId
*/
dishRouter.route('/:dishId')

.all( 
		function(request, response, next) {
			response.writeHead(200, { 'Content-Type': 'text/plain'});
			next();
		}
	)

.get(
		function(request, response, next) {
			response.end('Will send details of the dish: ' + request.params.dishId + ' to you!');
		}
	)

.put(
		function(request, response, next) {
			response.write('Updating the dish: ' + request.params.dishId + '\n');
			response.end('Will update the dish: ' + request.body.name + ' with details: ' + request.body.description);
		}
	)

.delete(
			function(request, response, next) {
				response.end('Deleting dish: ' + request.params.dishId);
			}
		);
// semi-colon here means that our chaining is complete for the specified route or end point



// ---------------------------
// *** Export dishRouter ***
// ---------------------------

module.exports = dishRouter;