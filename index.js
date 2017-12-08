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
app.all('/', function(req, res){
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
	
	res.write('<h3><a href="/client">CLIENT......</a></h3>');
	res.write('<h3><a href="/list">LISTA......</a></h3>');

    //send response
    res.end();
});

app.all('/client', function(req, res){
    res.sendfile('client.html');
});


/** function che permette all'utente di caricare la propria consegna */
app.post('/upload', function (req, res) {    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    
    //process
    var studentID = (req.body.studentID); // req. --> ottengo il parametro passato dal client
    var object = (req.body.file);
    
	examsDictionary.push({
		studentID:  studentID,
		assignmentID: assignmentIDgenerator,
		assignmentContent: object
	});
	assignmentIDgenerator += 1;
	
	var last = examsDictionary.length - 1;
	//write response
	res.write('<p>?studentID: ' + examsDictionary[last].studentID + '</p>');
	res.write('<p>?assignmentID: ' + examsDictionary[last].assignmentID + '</p>');
	res.write('<p>?obj: ' + examsDictionary[last].assignmentContent + '</p>');
	
	res.write('<h3><a href="/client">CLIENT......</a></h3>');
	res.write('<h3><a href="/list">LISTA......</a></h3>');

	//send response
    res.end();
});

app.all('/list', function(req, res){ 
	res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
	
	for (var i = 0; i < examsDictionary.length; i++) {
		//write response
		res.write('<a href="/assignment?studentID='+examsDictionary[i].studentID+'&assignmentID='+examsDictionary[i].assignmentID+'"><p>?studentID: ' + examsDictionary[i].studentID);
		res.write('assignmentID: ' + examsDictionary[i].assignmentID + '</p></a>');
	}
	
	res.write('<h3><a href="/client">CLIENT......</a></h3>');
	res.write('<h3><a href="/list">LISTA......</a></h3>');
	
	//send response
    res.end();
});

//handle GET req on /sum
app.get('/assignment', function (req, res) {    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    
    //process
    var studentID = req.query.studentID; // req. --> ottengo il parametro passato dal client
    var assignmentID = req.query.assignmentID;
    var trovato = false;
	
    // cerco lo studente e i suoi dati
	for(var i = 0; i < examsDictionary.length; i++) {
		if(examsDictionary[i].studentID == studentID && examsDictionary[i].assignmentID == assignmentID)
		{
			res.write('<h1>SEI: '+examsDictionary[i].studentID+'. Il tuo assignment ha id: '+examsDictionary[i].assignmentID+'</h1>');
			res.write('<p>?studentID: ' + examsDictionary[i].studentID+ '</p>');
			res.write('<p>?assignmentID: ' + examsDictionary[i].assignmentID + '</p>');
			res.write('<p>?content: ' + examsDictionary[i].assignmentContent + '</p>');
			trovato = true;
		}
	}
	
	if(!trovato) {
		res.write('<h1>Nessun dato trovato.</h1>');
	}
	
    //send response
    res.end();
}); 


// set our port
var port = process.env.PORT || 8080;

//listen in a specific port
app.listen(port);