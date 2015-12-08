//Entrypoint of our server
var server = require('./server/serverInstance');

//Check and set environment/config of the app
process.env.ROOT = __dirname.substring(0, __dirname.lastIndexOf('/'));
process.env.PORT = process.env.PORT || 8080;
console.log(JSON.stringify(process.env, null, 2));

//init the server
server.initServerInstance();
