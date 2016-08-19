var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
const eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src('./src/**/*.js')
		.pipe(eslint({configFile: '.eslintrc.json'}))
		.pipe(eslint.format());
});

gulp.task('es6', function () {
  browserify({ debug: true })
		.transform(babelify)
		.require('./src/app.js', { entry: true })
		.bundle()
		.on('error', gutil.log)
		.pipe(source('./app.js'))
		.pipe(gulp.dest('./app'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.js'], ['lint', 'es6']);
});

gulp.task('default', ['lint', 'es6', 'watch']);
