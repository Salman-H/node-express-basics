/*
	Node module promoRouter.js

	Implements the Express router for the /promotions REST API end point

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

var promoRouter = express.Router();

/* if the request contains json data, it'll be parsed by the body parser 
   and then made available in the request.body object there. */
promoRouter.use(bodyParser.json());



// -----------------------------------------------------------
// *** Configure the promoRouter with REST API end points ***
// -----------------------------------------------------------


/* 
	chain express operations with the specified promoRouter route or end point 
*/
promoRouter.route('/')

.all( 
		function(request, response, next) {
			response.writeHead(200, { 'Content-Type': 'text/plain'});
			next();
		}
	)

.get(
		function(request, response, next) {
			response.end('Will send all the promotions to you!');
		}
	)

.post(
		function(request, response, next) {
			response.end('Will add the promotion: ' + request.body.name + ' with details: ' + request.body.description);
		} 
	)

.delete(
		function(request, response, next) {
			response.end('Deleting all promotions!');
		}
	);
// semi-colon here means that our chaining is complete for the specified route or end point


/* 
	chain express operations with another promoRouter end point for a specfic promotion 
	with a designated promoId
*/
promoRouter.route('/:promoId')

.all( 
		function(request, response, next) {
			response.writeHead(200, { 'Content-Type': 'text/plain'});
			next();
		}
	)

.get(
		function(request, response, next) {
			response.end('Will send details of the promotion: ' + request.params.promoId + ' to you!');
		}
	)

.put(
		function(request, response, next) {
			response.write('Updating the promotion: ' + request.params.promoId + '\n');
			response.end('Will update the promotion: ' + request.body.name + ' with details: ' + request.body.description);
		}
	)

.delete(
			function(request, response, next) {
				response.end('Deleting promotion: ' + request.params.promoId);
			}
		);
// semi-colon here means that our chaining is complete for the specified route or end point



// ---------------------------
// *** Export promoRouter ***
// ---------------------------

module.exports = promoRouter;