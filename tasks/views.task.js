/*
 * Views compilation jade -> html
 */

var locals = require('./locals').locals;
var config = require('./config');
var path = require('path');

module.exports = function(gulp, plugins) {
  gulp.task('views', function(cb) {
    return compileIndex() && compileRest();
  });

  function compileIndex() {
    return gulp.src(path.join(config.viewsPath, 'index' + config.viewExt))
      .pipe(plugins.changed(config.buildPath))
      .pipe(plugins.jade({ locals: locals }))
      .pipe(gulp.dest(config.buildPath));
  }

  function compileRest() {
    var dest = path.join(config.buildPath, 'views');
    return gulp.src(path.join(config.viewsPath, 'views', '*' + config.viewExt))
      .pipe(plugins.changed(dest))
      .pipe(plugins.jade({ locals: locals }))
      .pipe(gulp.dest(dest));
  }

};
