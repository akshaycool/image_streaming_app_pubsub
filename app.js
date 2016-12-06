'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var badges = require('./controllers/badges');

//Middleware invoked when any requests comes in . Every request goes through middleware before route methods


app.use(bodyParser.json());

//app.post('/', function(req,res){
//    res.send('hellow world');
//});

//save is a middleware works like a controller . used interchangeably.


app.post('/',badges.save,badges.send);

app.get('/badges',badges.get);

app.listen(8080,console.log);

