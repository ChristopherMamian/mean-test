var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db_name');

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.route('/login')

	.get(function(req, res) {
		res.send('this is the login form');
	})

	.post(function(req, res) {
		console.log('processing');
		res.send('processing the login form');
	});

var adminRouter = express.Router();

adminRouter.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

adminRouter.param('name', function(req, res, next, name) {
	console.log('doing name validations on ' + name);

	req.name = name;

	next();
});

adminRouter.get('/hello/:name', function(req, res) {
	res.send('hello ' + req.name + '!');
});

adminRouter.get('/', function(req, res) {
	res.send('I am the dashboard');
});

adminRouter.get('/users', function(req, res) {
	res.send('I show all the users');
});

adminRouter.get('/posts', function(req, res) {
	res.send('I show all the posts');
});

adminRouter.get('/users/:name', function(req, res) {
	res.send('hello ' + req.params.name + '!');
});


app.use('/admin', adminRouter);

app.listen(1337);
console.log('Big Brother is listening!');