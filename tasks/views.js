/*
 * Views compilation jade -> html
 */

var path = require('path');
var ViewsTask = {
  inject: ['gulp', 'plugins', 'BuildConfig', 'locals'],
  load: function(gulp, plugins, config, locals) {
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

  }
};

module.exports = ViewsTask;
