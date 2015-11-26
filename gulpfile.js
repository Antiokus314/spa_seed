process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
process.env.DEBUG = 'gulp:server'

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');

var AppContainer = require('easy-di').create('main', {
  locals: {},
  pkg: require('./package'),
  gulp: gulp,
  plugins: require('gulp-load-plugins')(),
  runSeq: require('run-sequence')
});

AppContainer.loadList(require('./config'));
AppContainer.loadDir(path.resolve(__dirname, 'tasks'));

gulp.task('default', ['server']);
