module.exports = function(gulp, plugins, runSeq) {
  var pkg = require('../package.json');
  gulp.task('package', function(cb) {
    return gulp.src("build/**/*")
      .pipe(plugins.tar([pkg.name, '-', pkg.version, '.tar'].join('')))
      .pipe(plugins.gzip())
      .pipe(gulp.dest('packages'));
  });
};
