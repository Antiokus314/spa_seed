exports.inject = ['gulp', 'Server'];
exports.load = function(gulp, server) {
  gulp.task('server', function() {
    return server.run();
  });
};
