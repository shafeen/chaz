const gulp = require('gulp');
const argv = require('yargs').argv;
const browserify = require('browserify');
const plugins = require('gulp-load-plugins')({lazy: true});

gulp.task('test', () => {
    console.log('hello i am a test gulp task');
});