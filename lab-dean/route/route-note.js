'use strict';

const Note = require('../model/note.js');
const storage = require('../lib/storage.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler.js');

module.exports = function(router) {
  router.post('/note', bodyParser, (req, res) => {
    new Note(req.body.title, req.body.content)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));
  });
  router.get('/note/:_id', (req, res) => {
    storage.fetchOne('note', req.params.id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  router.get('/note', (req, res) => {
    storage.fetchAll('note')
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  router.put('/note/:_id', bodyParser, (req, res) => {
    storage.update('note', req.params.body, req.params.id)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));
  });
  router.delete('/note/:_id', (req, res) => {
    storage.delete('note', req.params.id);
  });
};