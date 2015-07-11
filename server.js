var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

var adminRouter = express.Router();

adminRouter.get('/', function(req, res) {
	res.send('I am the dashboard');
});

adminRouter.get('/users', function(req, res) {
	res.send('I show all the users');
});

adminRouter.get('/posts', function(req, res) {
	res.send('I show all the posts');
});

adminRouter.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.use('/admin', adminRouter);

app.listen(1337);
console.log('Big Brother is listening!');