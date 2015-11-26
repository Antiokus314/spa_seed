var path = require('path');
/*
 * asset pipeline
 */

var AssetTask = {
  inject: ['gulp','MincerManager'],
  load: function(gulp, Mincer) {
    gulp.task('assets', function() {
      return Mincer.precompile();
    });
  }
};

module.exports = AssetTask;
