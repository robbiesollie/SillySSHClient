var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);

const { exec } = require('child_process');

app.post('/ssh', (req, res) => {
	exec('dir', (error, stdout, stderr) => {
		if (error) {
			res.send(error.message);
			return;
		}
		if (stderr) {
			res.send(stderr);
			return;
		}
		res.send(stdout);
	})
})

module.exports = app;
