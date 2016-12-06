'use strict';
var redis = require('../lib/redis');
var broadcast = require('../lib/broadcast');

/**
* Save badges to database
  @param {Array} badges
  @param {Function} callback
*/

exports.save = function(badges,callback){
    console.log("In recfunction"+badges.length);
    if(!badges.length){
        console.log("ending recursion");
        return callback(null,null);
    }
    var badge = badges.pop();
    console.log("badge"+JSON.stringify(badge));
    redis.lpush('badges',JSON.stringify(badge),function(err){
        if (err) return callback(err,null);
        exports.save(badges,callback);
    });
};



/*
Trim down the list
*/
exports.trim=function(){
    redis.ltrim('badges',0,9);
};

/*
Send out badges to the broadcaster
@param Array {badges}
@param {Function} callback
**/

exports.send = function(badges,callback){
    badges.forEach(broadcast.send); //basically sending badges iteratively reducing normal verbose of function(value)
    callback(null,null); // this line is imp because callback needs to be known that send fn is over and is returning.or else it stucks in a infinite loop because next middleware doesn't get called. 
};


/*  Get 10 badges from redis
    @param  {Function} callback

*/

exports.get=function(callback){
    redis.lrange('badges',0,-1,function(err,data){
        //if (err) return res.json(503,{error:true});//This is done in the controller as well , so we can directly pass the callback to redis.
        //redis.lrange('badges',0,-1,callback);
        if(err) return callback(err,null);
        callback(null,data.map(JSON.parse)); // returning the date to callee ->controller.
    });
};