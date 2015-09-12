/*
 * load asset helper methods into locals set
 */
var helpers = require('./mincer').helpers;
var viewExt = require('./config').viewExt;

function loadLocals(dest, src) {
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dest[prop] = src[prop];
    }
  }
}

function urlify(url) {
  return process.env.NODE_ENV === 'production' ? prodUrlify(url) : devUrlify(url);
}

function prodUrlify(url) {
  return url[url.length - 1] === '/' ? url + 'index.html' : url + '.html';
}

function devUrlify(url) {
  return url[url.length - 1] === '/' ? url : url + viewExt;
}

/*
 * any further locals can be configured here
 *
 * ex.
 * exports.locals.title = 'SPA SEED'
 */

exports.locals = {};
exports.locals.title = 'Gulp SPA Seed';
exports.load = loadLocals;

loadLocals(exports.locals, helpers);

exports.locals.url = urlify;
