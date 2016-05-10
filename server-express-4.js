/*
	v4 of server-express-2.js,
	server-express-4.js, is reconfigured to handle REST API based requests 
	being sent to the server-side from the client, just like in server-express-3.js,
	but this time using the Express Router.

	In v3, we had to explicitely specify the uri with our express requests, but
	what if we make a mistake with the uri? 

	Express supports express.router and we will use that to re-implement 
	server-express-3 to make our server/app more robust and managable. 

	@author: Salman Hashmi, Jugesh Muppala
*/



// ----------------------------------------
// *** inlclude modules and middlewares ***
// ----------------------------------------


// include the node module express
// ------------------------------- 
var express  = require('express');

// include the morgan middlewares       // morgan will automatically handle any http
// -----------------------------	 	// request message and log the correct response
var morgan = require('morgan');			// messages for static files in our server

// include the middleware body-parser	  // When the data gets to the server side, you 
// ----------------------------------     // may want it to be parsed and then converted
var bodyParser = require('body-parser');  // into a format that is more easier to use in
										  // the JavaScript code on the server side
	
var hostname = 'localhost';				// these can be changed any time to reconfigure 
var port = 3000;						// the server


// -------------------------------------
// *** use modules and middlewares ***
// -------------------------------------

var app = express();


// use the morgan middlewares           // where parameter 'dev' is one of the 
// ---------------------------			// pre-formatted log outputs that morgan
app.use(morgan('dev'));					//  supports



// ----------------------------------
// *** Handle incoming requests ***
// ----------------------------------

// ------------------------------------------------------
// *** Re-implementation from v3 using express.router ***
// ------------------------------------------------------

// get a router object supported by express
// dishRouter itself is like a mini Express app
// and will support all other features like get, put, post, and so on.
var dishRouter = express.Router();

/* like before, if So which means that if the request contains json data, 
it'll be parsed by the body parser and then made available in the 
request.body object there. 
*/
dishRouter.use(bodyParser.json());

// chaining all operations with the dishRouter:

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
		function(request, response, next) {		// bodyParser will parse the
										// incoming request body and convert it to the
									// JS object called request.body which will contain
								// the rest of the json formatted data converted into 
							// JS object properties name and description
			response.end('Will add the dish: ' + request.body.name + ' with details: ' + request.body.description);
		} 
	)

.delete(
		function(request, response, next) {
			response.end('Deleting all dishes!');
		}
	);

// semi-colon at the end of .delete() means that our chaining is complete for the
// specified dishRouter


// define another dishRouter for a specfic dish with a dishId
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

// semi-colon at the end of .delete() means that our chaining is complete for the 
// specified dishRouter

// Attach the router with the express app.
// only if the uri contains /dishes , then apply
// the dishRouter to that uri
app.use('/dishes', dishRouter);



// use the native static middleware        		 // enables this server/app to run from
// --------------------------------				 // anywhere with the assurance that our
app.use(express.static(__dirname + '/public'));	 // static files will always be served
												 // from the designated locatoin:'public' 


/* 
	Start the server using the app.listen() function
	-------------------------------------------------
	This is a shortcut whereby Express automatically registers with the http 
	cleared server i.e. we do not have to explicitly create an http server ourselves
	by using http.createServer() like in server-2.js

 */
app.listen(port, hostname, 
                            function() {
                                //console.log("Server running at http://${hostname}:${port}/");
                                console.log("Server running at http://" + hostname + ":" + port + "/");
                                     }
);