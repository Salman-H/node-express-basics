/*
	server-express.js

	@author: Salman Hashmi
*/



// ----------------------------------------
// *** inlclude modules and middlewares ***
// ----------------------------------------


// include the node module express
var express  = require('express');

// include the morgan middlewares        	
var morgan = require('morgan');			

// include the custom express router node modules
var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');



// -------------------------------------
// *** specify hostname and port ***
// -------------------------------------
	
var hostname = 'localhost';			
var port = 3000;						



// -------------------------------------
// *** use modules and middlewares ***
// -------------------------------------

var app = express();
	
app.use(morgan('dev'));					



// ----------------------------------
// *** Handle incoming requests ***
// ----------------------------------


// mount an imported router to the corresponding REST API end point
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);

// use the native 'static' middleware to always serve static files from the 'public' directory	 
app.use(express.static(__dirname + '/public'));	 
												 


// ----------------------
// *** Start sever  ***
// ----------------------

app.listen(port, hostname, 
                            function() {
                                //console.log("Server running at http://${hostname}:${port}/");
                                console.log("Server running at http://" + hostname + ":" + port + "/");
                                     }
);