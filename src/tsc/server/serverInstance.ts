//order is important! first we create an express instance. Then we add this express instance to an httpserver and after that we give socket.io this http-server so he can add himself.
var express = require('express');
var expressServer = express();
var server = require('http').createServer(expressServer);
var socket = require('socket.io').listen(server);

//some other things we need
var bodyParser = require('body-parser');
var fs = require('fs');
var weather = socket.of('/weather');

//some variable we need
var cities = ["Aachen", "Berlin", "SHARKTOWN"];
var temperatures: string[] = [];
var intervallCounter: number = 0;

//main functionality. Adds every important functionality to our server
var initServerInstance = () => {

  //read all temperatures for all cities
  for(var x=0; x < cities.length; x++){
    temperatures[x] = fs.readFileSync(process.env.ROOT+'/dist/cities/'+cities[x], 'utf8').slice(0,-1).split(' ');
  }



  //--------------------this is our socket.io implementation--------------------//

  //
  weather.on('connection', (socket:any) => {
    console.log('Client connected');
    socket.send('Connection established!');
  });

  //emit temperatures for all cities in fixed intervalls
  setInterval( ()=> {
    for(var x=0;  x < cities.length; x++){
      weather.emit(cities[x], temperatures[x][intervallCounter]);
    }
    if(intervallCounter<1000) intervallCounter++;
    else intervallCounter=0;
  }, 500);



  //--------------------this is our expressjs implementation--------------------//

  //fancy stuff
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

  //Catch 404
  expressServer.use((req: any, res: any, next: any) => {
    res.sendStatus(404);
  })

  //make the server listen
  server.listen(process.env.PORT);
  console.log('ServerInstance listening on ' + process.env.PORT + '!')
}

//export everything as a modules
module.exports = {
  initServerInstance
};
