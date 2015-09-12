module.exports = function(gulp, plugins, runSeq) {
  gulp.task('build', function(cb) {
    process.env.NODE_ENV = 'production';
    runSeq('clean', 'assets', 'views');
  });
};
