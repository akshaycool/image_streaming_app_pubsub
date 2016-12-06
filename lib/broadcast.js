'use strict';

/*
imp note of axon , we don't need to write a explicit endpoint for subscribing ,because axon takes care of listening against port bound by the socket.
*/

var axon = require('axon');
var socket = axon.socket('pub');

socket.bind(8081);


/*
Send a badge to the publish socket
*/
exports.send = function(badge){
    socket.send(badge);
}; 
//This above can be written as 
//exports.send = socket.send();

