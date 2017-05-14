
var express = require('express');
var handlebars = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var path = require('path');
var basicAuth = require('basic-auth');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var app = express();
// var passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;


app.use(bodyParser.urlencoded({extended: true}));

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'handlebars');

var db;

MongoClient.connect('mongodb://nyanthonyy:webmeup864@ds139781.mlab.com:39781/first', function(err, database){
  if (err) return console.log(err);

  db = database;
  app.listen(process.env.PORT || 3000);
});

io.on('connection', function (client) {
  client.on('message', function (data) {
    console.log('message recieved', data);
    client.broadcast.emit('message', data);
  });
});



app.get('/login', function(req, res){
  res.render('login');
})

app.get('/brothers', function(req, res) {
  // res.render('brothers');
  db.collection("brothers").find({}).toArray(function(err, results){
    res.render('brothers', {results: results});
  });
});

app.get('/brothers/:name', function(req, res) {
  db.collection("brothers").findOne({name: req.params.name}, function(err, result) {
    if (err) console.log(err);
    res.render('brother', {brother: result});
  });
});

app.post('/brothers/:name', function(req, res) {
  db.collection("brothers").updateOne({name: req.params.name}, {$set: {class: req.body.class, zeta: req.body.zeta}}, function(err, result) {
    res.redirect('/brothers/' + req.params.name);
  });
});

app.get('/brothers/:name/edit', function(req, res) {
  db.collection("brothers").findOne({name: req.params.name}, function(err, result) {
    if (err) console.log(err);
    res.render('edit_brother', {brother: result});
  });
});

app.get('/brothers/:name/delete', function(req, res) {
  db.collection("brothers").remove({name: req.params.name}, function(err, result) {
    res.redirect('/');
  });
});

app.get('/create', function(req, res) {
  res.render('create_brother');
});

app.post('/create', function(req, res) {
  var brother = {
    name: req.body.name.trim(),
    zeta: req.body.zeta.trim(),
    status: req.body.status.trim(),
    phonenumber: req.body.phonenumber.trim(),
    email: req.body.email.trim(),
    username: req.body.username.trim(),
    pass: req.body.pass.trim(),
  };

  if (brother.name != '' && brother.zeta != '') {
    db.collection('brothers').insert(brother, function(err, result){
      res.redirect('/brothers');
    });
  } else {
    res.render('create_brother', {message: 'Please enter a name and a zeta', brother: req.body});
  }
});

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'bobbykeane' && user.pass === 'lxathuz') {

    db.collection('adminlxa').find({username: user.name, password: user.pass}).toArray(function(err, results){
       if (results.length > 0){
          return next();
       } else {
         return unauthorized(res);
       };
    });
  };
};

app.get('/login', auth, function (req, res) {
  res.send(200, 'Authenticated');
});

app.post('/login', auth,
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/index');
});