'use strict';

var gulp    = require('gulp');
var ghPages = require('gulp-gh-pages');

var pkg     = require('./package');

// Deploy task
gulp.task('deploy', function deploy() {
  return gulp.src('./src/**/*.*')
    .pipe(ghPages({
      remoteUrl : pkg.repository.url,
      branch : 'gh-pages',
      cacheDir : __dirname + '/../.publish/'
    }))
  ;
});
