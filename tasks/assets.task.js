var mincer = require('./mincer');
var path = require('path');
var config = require('./config');
/*
 * asset pipeline
 */
module.exports = function(gulp, plugins) {
  gulp.task('assets', function() {
    return mincer.precompile();
  });
};
