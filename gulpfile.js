process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
process.env.DEBUG = 'gulp:server'

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSeq = require('run-sequence');

var AppContainer = require('easy-di').create('main', {
  locals: {},
  pkg: require('./package'),
  gulp: gulp,
  plugins: plugins,
  runSeq: runSeq
});

AppContainer.loadList(require('./config'));
AppContainer.loadDir(path.resolve(__dirname, 'tasks'));

//fs.readdirSync('./tasks').forEach(function(task) {
//  if (task.indexOf('.task.js') != -1) {
//    require(path.join(__dirname, 'tasks', task))(gulp, plugins, runSeq);
//  }
//});

gulp.task('default', ['server']);
