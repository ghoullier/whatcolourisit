import path from "node:path";
import { fileURLToPath } from "node:url";

import gulp from "gulp";
import ghPages from "gulp-gh-pages";
import html from "gulp-htmlmin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import pkg from "./package.json" assert { type: "json" };

const buildAssets = () =>
  gulp.src(["./src/*.png"]).pipe(gulp.dest("./.build/"));

const buildHtml = () =>
  gulp
    .src(["./src/*.html"])
    .pipe(html({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest("./.build/"));

const buildCss = () =>
  gulp
    .src(["./src/*.css"])
    .pipe(html({ collapseWhitespace: true }))
    .pipe(gulp.dest("./.build/"));

const deploy = () =>
  gulp
    .src(["./.build/*.png", "./.build/index.html", "./.build/style.css"])
    // Publish on GitHub Pages
    .pipe(
      ghPages({
        remoteUrl: pkg.repository.url,
        branch: "gh-pages",
        cacheDir: `${__dirname}/.publish/`,
      })
    );

gulp.task("build:assets", buildAssets);
gulp.task("build:css", buildCss);
gulp.task("build:html", buildHtml);
gulp.task("build", gulp.parallel("build:assets", "build:css", "build:html"));
gulp.task("deploy", deploy);
gulp.task("default", gulp.series("build", "deploy"), (done) => done());
