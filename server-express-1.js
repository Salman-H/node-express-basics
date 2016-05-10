
// include the express node module
var express = require('express'),
     http = require('http');	// needed for hostname and port

// these can be changed any time to reconfigure the server
var hostname = 'localhost';
var port = 3000;

var app = express();

// the app.use() function creates an Express middleware to be
// 'used' by Express
app.use(
			function (request, response, next) {
				console.log(request.headers);
				response.writeHead(200, { 'Content-Type': 'text/html' });
				response.end('<html><body><h1>Hello World</h1></body></html>');
			}
		);

// create Express server
var server = http.createServer(app);

// start the server
server.listen(port, hostname, 
							function(){
								console.log("Server running at http://" + hostname + ":" + port + "/");
							}
			);