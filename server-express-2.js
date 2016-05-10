/*
	server-express-2.js

	We will replicate the behaviour of the more advanced HTTP Server
	in server-2.js but this time using the Express framework for Node
	and also making use of Express middleware like morgan

	@author: Salman Hashmi, Jugesh Muppala
*/

// include the node module express
var express  = require('express');

// include the express middleware called morgan.
// morgan allows us to log information on the server-side.
// morgan will automatically handle any HTTP request messages
// and log the correct response messages for static files
// in our server. By using morgan, we don't have to handle
// any request message or log the appropriate HTTP response
// messages like we did in server-2.js. We don't have to e.g.g
// check whether the request method used is supported for the
// requested file or that the file even exists in our server.  
// morgan takes care of it all. Gotta love morgan!
var morgan = require('morgan');

// these can be changed any time to reconfigure the server
var hostname = 'localhost';
var port = 3000;


var app = express();

// declare morgan as one of the middleware to be 'used' by Express
// where parameter 'dev' is one of the pre-formatted log outputs 
// that morgan supports
app.use(morgan('dev'));

// Express provides support for a middleware called serve-static
// i.e. this middleware is built into Express.
// Here, we are declaring that the public folder containing all the 
// server files will serve those files as static files.
// Anything in the public folder can be requested by the client-side.
// --dirname says that independent of where we start this server, this
// puplic folder is with respect to where this particular file (the one
// requested) resides
// i.e. interpretation of the total path would be the node express folder,
// wherever it resides on our server/computer + the 'public' folder (which
// is declaring that the public folder is inside the node-express folder. 
// Following express alternative is analogous to using the path node module
// in path.resolve('./public'+fileUrl) in server-2.js to construct the total 
// absolute path, starting from root, to the requested file.
// This gives us the flexibility to run this server/app from anywhere we
// want with the assurance that our server static files will always be
//sourced/served from the location we designate i.e. from the 'public' folder
// inside the node-express folder because we installed and saved Express 
// inside the node-express folder.
app.use(express.static(__dirname + '/public'));

/* 
	Start the server using the app.listen() function

	This is a shortcut whereby Express automatically registers with 
	the http cleared server i.e. we do not have to explicitly create
	an http server ourselves by using http.createServer() like in 
	server-2.js

 */
app.listen(port, hostname, 
                                function() {
                                    //console.log("Server running at http://${hostname}:${port}/");
                                    console.log("Server running at http://" + hostname + ":" + port + "/");
                                         }
);