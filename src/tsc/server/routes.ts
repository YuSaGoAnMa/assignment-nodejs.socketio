var express = require('express');

var routes = express.Router();

routes.get('/hello', function(req: any, res: any) {
  res.send("Cool");
});

module.exports = routes;
