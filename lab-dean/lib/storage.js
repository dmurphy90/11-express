'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};

storage.create = (schema, item) => {
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

storage.fetchOne = (schema, itemId) => {
  fs.readFileProm(`${__dirname}/..data/${schema}/${itemId}.json`);
};

storage.fetchAll = (schema) => {
  fs.readFileProm(`${__dirname}/..data/${schema}/`)
    .then(list => list.map(file => file.split('.')[0]));
};

storage.update = (schema, itemId, item) => {
  if (item._id !== itemId) return Promise.reject(new Error('Validation Error: Cannot find Item ID'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json)
    .then(() => item);
};

storage.delete = (schema, itemId) => {
  return fs.unlinkProm(`${__dirname}/../data/${schema}${itemId}.json`);
};