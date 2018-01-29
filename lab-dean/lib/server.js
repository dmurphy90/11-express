'use strict';

// Application dependencies
const express = require('express');
const errorHandler = require('./error-handler');

//Application setup
const app = express();
const router = express.Router();
app.use('api/v1', router);

//Route setup
require('../route/route-note.js')(router);
app.use('/*', (req, res) => errorHandler(new Error('Path error. Route not found.'), res));

// Server controls
const server = module.exports = {};
server.isOn = false;

server.start = function(port, callback) {
  if(server.isOn) return callback(new Error('Server running. Cannot start server again.'));
  server.isOn = true;
  return app.listen(port, callback);
};

server.stop = function(callback) {
  if(!server.isOn) return callback(new Error('Server not running. You\'re dumb. Don\'t do that.'));
  server.isOn = false;
  return app.close(callback);
};