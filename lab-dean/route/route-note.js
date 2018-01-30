'use strict';

const Note = require('../model/note.js');
const debug = require('debug')('http:route-note');
const storage = require('../lib/storage.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler.js');

module.exports = function(router) {
  router.post('/note', bodyParser, (req, res) => {
    debug('Creating Post');
    new Note(req.body.title, req.body.content)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));
  });
  router.get('/note/:_id', (req, res) => {
    debug('Fetching Note');
    storage.fetchOne('note', req.params.id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  router.get('/note', (req, res) => {
    debug('Fetching All Notes');
    storage.fetchAll('note')
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  router.put('/note/:_id', bodyParser, (req, res) => {
    debug('Updating Note');
    new Note(req.body.title, req.body.content)
      .then(item => {
        item._id = req.body._id;
        return item;
      })
      .then(updated => storage.update('Note', req.params._id, updated))
      .then(() => res.status(204).send())
      .catch(err => errorHandler(err, res));
  });
  router.delete('/note/:_id', (req, res) => {
    debug('Deleting Note');
    storage.delete('note', req.params.id)
      .then(() => res.status(204).send())
      .catch(err => errorHandler(err, res));
  });
};