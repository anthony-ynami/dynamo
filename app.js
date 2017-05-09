
var express = require('express');
var handlebars = require('express-handlebars')

var app = express();

function processData(data) {
 // taking care of data
		}

function handler() {
  if(this.status == 200 &&
   	 this.responseXML != null &&
    this.responseXML.getElementById('test').textContent) {
    // success!
    processData(this.responseXML.getElementById('test').textContent);
} else {
    // something went wrong
  }
}

var client = new XMLHttpRequest();
client.onload = handler;
apikey="c8b3b1c0f05958773f39d19134e7a7d8";
client.open("GET", "https://api.musixmatch.com/ws/1.1/");
client.send();


app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/static', express.static('public'))

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/users/:username', function(req, res) {
  res.render('user', {name: req.params.username});
});