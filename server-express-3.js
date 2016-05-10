/*
	v3 of server-express-2.js,
	server-express-3.js, is reconfigured to handle REST API based requests 
	being sent to the server-side from the client.

	Explore some advanced feature of Express.
	In particular, explore Express from the perspective 
	of trying to create a rest based server. 

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


// use the body-parser middleware       // inform the express app that if body of the
// --------------------------------		// incoming request message contains data in the
app.use(bodyParser.json());	 			// form of json, then parse that data and then
										// convert it into JavaScript objects that can
										// be accessed through the request object in our functions


// ----------------------------------
// *** Handle incoming requests ***
// ----------------------------------

/*
	Handle requests for uri '/dishes'
	function will be executed as long as the uri '/dishes' is there.
	next() function enables us to continue the parsing with the remaining middleware
*/
app.all('/dishes', 
					function(request, response, next) {
						response.writeHead(200, { 'Content-Type': 'text/plain'});
						next();
					}
		);

// Handle the four operations that can be done: GET, PUT, POST, DELETE
// we will not be calling next() in the following requests

// Handle a GET request on dishes, (i.e. retreiving all existing dishs)
app.get('/dishes',
					function(request, response, next) {
						response.end('Will send all the dishes to you!');
					}
		);

// Handle a POST request on dishes, (i.e. adding a new dish to dishes)
app.post('/dishes',
					function(request, response, next) {		// bodyParser will parse the
														// incoming request body and it to the
												// JS object called request.body which will contain
											// the rest of the json formatted data converted into 
										// JS object properties name and description
						response.end('Will add the dish: ' + request.body.name + ' with details: ' + request.body.description);
					} 
		);

// Handle a DELETE request on dishes, (i.e. delete all existing dishes)
app.delete('/dishes',
					function(request, response, next) {
						response.end('Deleting all dishes!');
					}
		);


// Handle request for a specific dish

// Handle a GET request on a specific dish, (i.e. retreiving an existing dish)
app.get('/dishes/:dishId',
					function(request, response, next) {
						response.end('Will send details of the dish: ' + request.params.dishId + ' to you!');
					}
		);

// Handle a PUT request on a specific dish, (i.e. adding an existing dish)
app.put('/dishes/:dishId',
					function(request, response, next) {
						response.write('Updating the dish: ' + request.params.dishId + '\n');
						response.end('Will update the dish: ' + request.body.name + ' with details: ' + request.body.description);
					}
		);

// Handle a DELETE request on a specific dish, (i.e. retreiving an existing dish)
app.delete('/dishes/:dishId',
					function(request, response, next) {
						response.end('Deleting dish: ' + request.params.dishId);
					}
		);


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