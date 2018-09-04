'use strict';

const gulp    = require('gulp');
const ghPages = require('gulp-gh-pages');
const html    = require('gulp-htmlmin');
const css     = require('gulp-clean-css');

const pkg     = require('./package');

const buildAssets = () => gulp.src([
    './src/*.appcache',
    './src/*.png'
  ])
  .pipe(gulp.dest('./.build/'))
  ;

const buildHtml = () => gulp
    .src([
      './src/*.html'
    ])
    .pipe(html({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest('./.build/'))
  ;
const buildCss = () => gulp
    .src([
      './src/*.css'
    ])
    .pipe(html({ collapseWhitespace: true }))
    .pipe(gulp.dest('./.build/'))
  ;

const deploy = () => gulp
    .src([
      './.build/*.png',
      './.build/index.html',
      './.build/manifest.appcache',
      './.build/style.css'
    ])
    // Publish on GitHub Pages
    .pipe(ghPages({
      remoteUrl : pkg.repository.url,
      branch : 'gh-pages',
      cacheDir : __dirname + '/.publish/'
    }))
  ;

gulp.task('build:assets', buildAssets);
gulp.task('build:css', buildCss);
gulp.task('build:html', buildHtml);
gulp.task('build', gulp.parallel('build:assets', 'build:css', 'build:html'));
gulp.task('deploy', deploy);
gulp.task('default', gulp.series('build', 'deploy'), (done) => done());