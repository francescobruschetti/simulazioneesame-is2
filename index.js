var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');
var request = require('request');
var app = express();

/* Configure express app to use bodyParser()
 * to parse body as URL encoded data
 * (this is how browser POST form data)
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// disponibilità delle varie aule
app.all('/aule_libere', function(request, response){
    response.sendfile('aule_libere.html');
});

app.all('/orari', function(req, response, next){ 
	
	var receivedParameter = req.query.corso;
});

//handle get req on /sum
app.get('/sum', function (req, res) {    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    //process
    var x = parseFloat(req.query.x); // req. --> ottengo il parametro passato dal client
    var y = parseFloat(req.query.y);
    var sum = x + y;
    
    //write response
    res.write('?x: ' + x + '\n');
    res.write('?y: ' + y + '\n');
    res.write('sum: ' + sum + '\n');
    //send response
    res.end();
});


// set our port
var port = process.env.PORT || 8080;

//listen in a specific port
app.listen(port);