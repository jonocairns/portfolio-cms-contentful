require('source-map-support').install();
require('ts-node').register();

exports.createPages = require('./src/lib/createPages').createPages;
