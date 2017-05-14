
var express = require('express');
var handlebars = require('express-handlebars')
const path = require('path');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var api = require('genius-api');

var genius = new api(process.env.y9GmBN2HHY57Q1Dh8P6Afazp9QjA6ane0GCawa9xnX-y_Y1sOryCkNQPPYpxtaaV);
 
//get annotation 
genius.annotation(6737668).then(function(response) {
  console.log(response.annotation);
});
 
//get referents by song_id, with options 
genius.referents({song_id: 378195}, {per_page: 2}).then(function(response) {
  console.log('referents', response.referents);
});
 
//get referents by web_page_id, with options 
genius.referents({web_page_id: 10347}, {per_page: 5}).then(function(response) {
  console.log('referents', response.referents);
});
 
//get song 
genius.song(378195).then(function(response) {
  console.log('song', response.song);  
});
 
//get artist 
genius.artist(16775).then(function(response) {
  console.log('artist', response.artist);
});
 
//get web page, with options 
genius.webPage({raw_annotatable_url: 'https://docs.genius.com'}).then(function(response) {
  console.log('web page', response.web_page);
});
 
//search 
genius.search('Run the Jewels').then(function(response) {
  console.log('hits', response.hits);
});
 
//error handling á la promise 
genius.song(378195).then(function(response) {
  console.log('song', response.song);
}).catch(function(error) {
  console.error(error);
});

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

app.listen(process.env.PORT || 3000);