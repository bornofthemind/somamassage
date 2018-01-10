var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('somamassage', ['users']);

var app = express();

// var logger = function(req, res, next){
// 	console.log('logging');
// 	next();
// }

// app.use(logger);

// view engine

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use(expressValidator(middlewareOptions));

//set static path

app.use(express.static(path.join(__dirname,'public')))


app.get('/', function(req, res){
	db.users.find(function(err,docs){
		console.log(docs);
		res.render('index' , {
			title: 'customers app',
			users: docs
	})
	
	});

})

app.post('/users/add', function(req, res){


	//req.checkBody('name', 'name is required').notEmpty();
	var newUser = {
		name: req.body.name,
		email: req.body.email,
		age: req.body.age
	}

	db.users.insert(newUser, function(err, result){
		if(err){
			console.log(err);
		}
		res.redirect('/');

	})
})

app.listen(3000, function(){
	console.log('serever started...')
})