'use strict';

var gulp    = require('gulp');
var ghPages = require('gulp-gh-pages');
var usemin  = require('gulp-usemin');
var uglify  = require('gulp-uglify');
var html    = require('gulp-minify-html');
var css     = require('gulp-minify-css');
var rev     = require('gulp-rev');

var pkg     = require('./package');

gulp.task('build', [], function() {
  gulp
    .src([
      './src/*.html',
      './src/*.css',
      './src/*.js'
    ])
    .pipe(usemin({
      css: [css()],
      html: [html()],
      js: [uglify()]
    }))
    .pipe(gulp.dest('./.build/'))
  ;
    gulp.src([
      './src/*.appcache',
      './src/*.png'
    ])
    .pipe(gulp.dest('./.build/'))
  ;
});

gulp.task('deploy', [], function() {
  gulp
    .src([
      './.build/*.png',
      './.build/index.html',
      './.build/manifest.appcache',
      './.build/script.js',
      './.build/style.css'
    ])
    // Publish on GitHub Pages
    .pipe(ghPages({
      remoteUrl : pkg.repository.url,
      branch : 'gh-pages',
      cacheDir : __dirname + '/.publish/'
    }))
  ;
});
