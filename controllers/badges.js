'use strict';
var _ = require('underscore');
var model = require('../models/badges');


var fs = require('fs');
var util = require('util');
var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
  // Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;

/**
Send badges to model
*/
exports.save = function(req,res,next){
    //next is the function to indicate the control to the next controller
    var badges = _.clone(req.body);
    console.log('In save'+badges)
    model.save(badges,function(err){
        //returning the error
        console.log("resp getting returned from model");
        if (err) return res.json(503,{error:true});
        next();
        model.trim();
    });
};

/*
Send badges to the pub/sub socket in model
*/
exports.send = function(req,res,next){
    var badges = _.clone(req.body);
    model.send(badges,function(err){
        res.status(200).json({err:null});
        //res.json(200,{err:null});
        if (err) return res.status(503).json({err:true});
    });
};

/*
*** Get 10 badges from model
/*/

exports.get = function(req,res){
    model.get(function(err,data){
        if (err) return res.json(503,{error:true});
        res.json(200,data);
    });
};