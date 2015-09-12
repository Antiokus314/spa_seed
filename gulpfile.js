process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
process.env.DEBUG = 'gulp:server'

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSeq = require('run-sequence');

fs.readdirSync('./tasks').forEach(function(task) {
  if (task.indexOf('.task.js') != -1) {
    require(path.join(__dirname, 'tasks', task))(gulp, plugins, runSeq);
  }
});

gulp.task('default', ['server']);
