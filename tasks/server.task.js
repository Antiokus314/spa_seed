var server = require('./server');

module.exports = function(gulp, plugins) {
  gulp.task('server', function() {
    return server.run();
  });
};

