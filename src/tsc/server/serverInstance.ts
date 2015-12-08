//order is important! first we create an express instance. Then we add this express instance to an httpserver and after that we give socket.io this http-server so he can add himself.
var express = require('express');
var expressServer = express();
var server = require('http').createServer(expressServer);
var socket = require('socket.io').listen(server);
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes');

var initServerInstance = () => {
//read random temperatures
var fs = require('fs');
//WTF... process.env.ROOT is undefined here!?
var temperatures:string[]=[];
var cities= ["Aachen", "Berlin", "SHARKTOWN"];

for(var x=0; x < cities.length; x++){
  temperatures[x] = fs.readFileSync(__dirname+'/../cities/'+cities[x], 'utf8').slice(0,-1).split(' ');
}

//this is our socket.io implementation
var weather = socket.of('/weather');
weather.on('connection', (socket:any) => {
  console.log('Client connected');
  socket.send('Connection established!');
});


var i: number=0;
setInterval( ()=> {
  for(var x=0;  x < cities.length; x++){
    weather.emit(cities[x], temperatures[x][i]);
  }
  if(i<1000) i++;
  else i=0;
}, 1000);

//this is our expressjs implementation
expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: false }));

//log every request
expressServer.use((req: any, res: any, next: any) => {
  console.log(req.method+" "+req.protocol+"://"+req.hostname+req.path);
  next();
})
//serve our webapp, dependecies and maybe some additional express-routes
expressServer.use(express.static(process.env.ROOT + '/dist'));
expressServer.use('/angular2', express.static(process.env.ROOT + '/node_modules/angular2/bundles'));
expressServer.use('/systemjs', express.static(process.env.ROOT + '/node_modules/systemjs/dist'));
expressServer.use('/socket.io', express.static(process.env.ROOT + '/node_modules/socket.io-client/'));
expressServer.use('/', routes);

//Catch 404
expressServer.use((req: any, res: any, next: any) => {
  res.sendStatus(404);
})

//make the server listen

  server.listen(process.env.PORT);
  console.log('ServerInstance listening on ' + process.env.PORT + '!')
}

//export modules
module.exports = {
  initServerInstance
};
