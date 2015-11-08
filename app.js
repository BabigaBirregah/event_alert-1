var express = require('express');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(express.static(__dirname + '/public'))

.get('/login', function(req, res) {
    res.render('login.ejs');
})

.post('/register/', urlencodedParser, function(req, res) {
    	//req.body.username
    
})

.get('/organizer', function(req, res) {
    res.render('organizer/layout.ejs');
})

.use(function(req, res, next){
    res.redirect('/login');
})

.listen(8080);

