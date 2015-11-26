var del = require('del');
exports.inject = 'gulp';
exports.load = function(gulp) {
  gulp.task('clean', function() {
    return del(['build']);
  });
}
