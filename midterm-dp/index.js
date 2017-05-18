
var express = require('express');
var handlebars = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var path = require('path');
var basicAuth = require('basic-auth');
var server = require('http').Server(app);
var app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.engine('handlebars'), handlebars({
  defaultLayout: 'main'
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'handlebars');

var db;

MongoClient.connect('mongodb://nyanthonyy:webmeup864@ds139781.mlab.com:39781/first', function(err, database){
  if (err) return console.log(err);

  db = database;
  app.listen(process.env.PORT || 3000);
});


app.get('/explore', function(req, res){
  res.render('explore');
});

app.get('/albums', function(req, res) {
  // res.render('albums');
  db.collection("albums").find({}).toArray(function(err, results){
    res.render('albums', {results: results});
  });
});

app.get('/albums/:name', function(req, res) {
  db.collection("albums").findOne({name: req.params.name}, function(err, result) {
    if (err) console.log(err);
    res.render('albums', {album: result});
  });
});

app.post('/albums/:name', function(req, res) {
  db.collection("albums").updateOne({name: req.params.name}, {$set: {title: req.body.title,}}, function(err, result) {
    res.redirect('/albums/' + req.params.name);
  });
});

app.get('/albums/:name/edit', function(req, res) {
  db.collection("albums").findOne({name: req.params.name}, function(err, result) {
    if (err) console.log(err);
    res.render('edit_album', {album: result});
  });
});
