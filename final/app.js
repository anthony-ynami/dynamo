
var express = require('express');
var handlebars = require('express-handlebars');
const path = require('path');
var unirest = require('unirest');
//var MongoClient = require('mongodb').MongoClient;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = require("request")

var app = express();
var bodyParser = require('body-parser');

var music = require('musicmatch')({usertoken:"",format:"",appid:""});
// Instantiate a Genius instance:
// var Genius = require("node-genius");
// var geniusClient = new Genius(process.env.GENIUS_ACCESS_TOKEN);


app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

// Search Genius.
// geniusClient.search("Kendrick Lamar", function (error, results) {
// });



function processData(data) {
 // taking care of data
		}


app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/static', express.static('public'));

app.get('/', function(req, res) {
  res.render('ask');
});

app.get('/GET', function(req, res){
  res.render('results');
})

var xhttp = new XMLHttpRequest();


app.listen(process.env.PORT || 3000);

