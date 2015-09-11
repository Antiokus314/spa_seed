var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();
var Mincer = require('mincer');
var env = new Mincer.Environment();

env.appendPath('src/assets/images');
env.appendPath('src/assets/javascripts');
env.appendPath('src/assets/stylesheets');

gulp.task('default', ['build'], function() {
});

gulp.task('build', ['assets', 'views']);

gulp.task('clean', function() {
  return del(['build']);
});

/*
 * asset pipeline
 */
gulp.task('assets', function() {
  var dest = 'build/assets';
  return gulp.src('src/assets/**/application.*')
    .pipe(plugins.changed(dest))
    .pipe(plugins.mincer(env))
    .pipe(gulp.dest(dest));
});


gulp.task('precompile', function() {
  var dest = 'build/assets';
});


/*
 * Views compilation jade -> html
 */
gulp.task('views', ['index.jade', 'views.jade']);

gulp.task('index.jade', function() {
  var dest = 'build'
  return gulp.src('src/index.jade')
    .pipe(plugins.changed(dest))
    .pipe(plugins.jade())
    .pipe(gulp.dest(dest));
});

gulp.task('views.jade', function() {
  var dest = 'build/views';
  return gulp.src('src/views/**/*.jade')
    .pipe(plugins.changed(dest))
    .pipe(plugins.jade())
    .pipe(gulp.dest(dest));
});
