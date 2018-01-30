'use strict';

const Note = require('../model/note.js');
const debug = require('debug')('http:route-note');
const storage = require('../lib/storage.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler.js');

module.exports = function(router) {
  router.post('/', bodyParser, (req, res) => {
    debug('Creating Post');
    let newNote;

    new Note(req.body.title, req.body.content)
      .then(note => newNote = note)
      .then(note => JSON.stringify(note))
      .then(json => storage.create('note', newNote._id, json))
      .then(() => res.status(201).json(newNote))
      .catch(err => errorHandler(err, res));
  });
  router.get('/:_id', (req, res) => {
    debug('Fetching Note');
    storage.fetchOne('note', req.params.id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  router.get('/', (req, res) => {
    debug('Fetching All Notes');
    storage.fetchAll('note')
      .then(paths => {
        return paths.map(p => p.split('.')[0]);
      })
      .then(ids => {
        res.status(200).json(ids);
      })
      .catch(err => errorHandler(err, res));
  });
  router.put('/:_id', bodyParser, (req, res) => {
    debug('Updating Note');
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => ({
        _id: req.params._id,
        title: req.body.title || note.title,
        content: req.body.content || note.content,
      }))
      .then(note => JSON.stringify(note))
      .then(json => storage.update('note', req.params._id, json))
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  });
  router.delete('/:_id', (req, res) => {
    debug('Deleting Note');
    storage.delete('note', req.params.id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  });
};