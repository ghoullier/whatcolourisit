'use strict';

var gulp    = require('gulp');
var ghPages = require('gulp-gh-pages');
var htmlmin = require('gulp-htmlmin');

var pkg     = require('./package');

// Deploy task
gulp.task('deploy', function deploy() {
  return gulp.src('./src/index.html')
    // Minimify html
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    // Publish on GitHub Pages
    .pipe(ghPages({
      remoteUrl : pkg.repository.url,
      branch : 'gh-pages',
      cacheDir : __dirname + '/../.publish/'
    }))
  ;
});
