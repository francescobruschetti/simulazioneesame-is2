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
/****************** FINE CONFIGURAZIONE SERVER **********************/

var assignmentIDgenerator = 0;
var examsDictionary = [ ]; // struttura { studentID:"", assignmentID:"", assignmentContent: obj }];




// disponibilità delle varie aule
app.all('/', function(request, response){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    
	console.log("Server working properly.");
	
    //write response
    res.write('<h1>IS2 esercizio preparazione esame</h1>');
    res.write('<p>url: ' + req.url + '</p>');
    res.write('<p>method: ' + req.method.toLowerCase() + '</p>');
    res.write('<h3>Operazioni supportate:</h3>');
	res.write('<p>GET -> studentID=x?assignmentID=y per ottenere il proprio compito \n');
	res.write('<p>POST -> studentID=x + examContent=object per caricare il proprio compito \n');
	res.write('<p>PUT -> studentID=x + assignmentID=y per aggiornare il proprio compito \n');
	res.write('<p>DELETE -> studentID=x + assignmentID=y per eliminare il proprio compito \n');

    //send response
    res.end();
});

/** function che permette all'utente di caricare la propria consegna */
app.post('/upload', function (req, res) {    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    //process
    var studentID = (req.query.studentID); // req. --> ottengo il parametro passato dal client
    var object = parseJson(req.query.object);
    
	examsDictionary.push({
		studentID:  studentID,
		assignmentID: assignmentIDgenerator,
		assignmentContent: object
	});
	assignmentIDgenerator += 1;
	
	
    //write response
    res.write('?studentID: ' + examsDictionary + '\n');
    res.write('?assignmentID: ' + assignmentID + '\n');
    res.write('obj: ' + obj + '\n');
	
    //send response
    res.end();
});











app.all('/orari', function(req, response, next){ 
	
	var receivedParameter = req.query.corso;
});

//handle GET req on /sum
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