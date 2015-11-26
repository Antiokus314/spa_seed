var BuildTask = {
  inject: ['gulp', 'runSeq'],
  load: function(gulp, runSeq) {
    gulp.task('build', function(cb) {
      process.env.NODE_ENV = 'production';
      runSeq('clean', 'assets', 'views');
    });
  }
};

module.exports = BuildTask;
