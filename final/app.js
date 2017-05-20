
var express = require('express');
var handlebars = require('express-handlebars');
const path = require('path');
var app = express();
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
var port = process.env.PORT || 8008;
var router = express.Router();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
  res.render('ask');
});

app.get('/GET', function(req, res){
  res.render('ask');
})
 app.listen(port);

