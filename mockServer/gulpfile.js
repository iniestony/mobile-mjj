var gulp = require("gulp");
var path = require("path");

var del = require("del");

// load all gulp plugins
var $ = require("gulp-load-plugins")();
var minifyCSS = require('gulp-minify-css');
var stripDebug = require('gulp-strip-debug');

var mainBowerFiles = require('main-bower-files');

// --- CONSTANT ------
var INCLUDE_BASE_PATH = "../apps";
var RELEASE_BASE_PATH = path.resolve(INCLUDE_BASE_PATH, "release");

var styleFilter = $.filter("**/*.{css,less}");



gulp.task("sjd-release-publish", [
  "release-clean",
  "release-fonts-publish",
  "release-vendor-js-publish",
  "release-vendor-css-publish",
  "release-js-publish",
  "release-css-publish"
]);

// clean up release folder
gulp.task("release-clean", function(){
  return del.sync(path.resolve(INCLUDE_BASE_PATH, "release"), {force: true});
});

gulp.task("release-fonts-publish", function() {
  return gulp.src([
    path.resolve(INCLUDE_BASE_PATH, "**/*.eot"),
    path.resolve(INCLUDE_BASE_PATH, "**/*.svg"),
    path.resolve(INCLUDE_BASE_PATH, "**/*.ttf"),
    path.resolve(INCLUDE_BASE_PATH, "**/*.woff"),
    path.resolve(INCLUDE_BASE_PATH, "**/*.woff2"),
  ]).pipe($.rename({dirname: ''}))
    .pipe(gulp.dest(path.resolve(RELEASE_BASE_PATH, "fonts/")));
});

// merge all lib js into vendor.js
gulp.task("release-vendor-js-publish", function(){
  return gulp.src([
      path.resolve(INCLUDE_BASE_PATH, "lib/angular/angular.min.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/angular-bootstrap/ui-bootstrap-tpls.min.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/angular-ui-router/release/angular-ui-router.min.js"),
      // path.resolve(INCLUDE_BASE_PATH, "lib/jquery/dist/jquery.min.js"),
      // path.resolve(INCLUDE_BASE_PATH, "lib/less/dist/less.js"),
      // path.resolve(INCLUDE_BASE_PATH, "lib/bootstrap/dist/js/bootstrap.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/angular-ui-select/dist/select.min.js"),
      // path.resolve(INCLUDE_BASE_PATH, "lib/webcamjs/webcam.js"),
      // path.resolve(INCLUDE_BASE_PATH, "lib/ng-camera/dist/ng-camera.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/logon/jquery.md5.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/logon/RSAUtils.js")
    ], { base: INCLUDE_BASE_PATH })
    .pipe($.concat("vendor.js"))
    .pipe($.uglify({"mangle": false}))
    .pipe(gulp.dest(path.resolve(RELEASE_BASE_PATH, "js/")));
});

// merge all less/css file into vendor.css
gulp.task("release-vendor-css-publish", function(){
  return gulp.src([
      // path.resolve(INCLUDE_BASE_PATH, "lib/bootstrap/dist/css/bootstrap.min.css"),
      // path.resolve(INCLUDE_BASE_PATH, "lib/bootstrap/dist/css/bootstrap-theme.min.css"),
      // path.resolve(INCLUDE_BASE_PATH, "lib/bootstrap/less/bootstrap.less"),
      // path.resolve(INCLUDE_BASE_PATH, "lib/angular-ui-select/dist/select.css")
    ], { base: INCLUDE_BASE_PATH })
    // .pipe($.less())
    .pipe($.concat("vendor.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.resolve(RELEASE_BASE_PATH, "css")));
});

// merge all own js into sjd.js
gulp.task("release-js-publish", function() {
  return gulp.src([
      path.resolve(INCLUDE_BASE_PATH, "js/app.js"),
      path.resolve(INCLUDE_BASE_PATH, "pages/**/*.js"),
      path.resolve(INCLUDE_BASE_PATH, "services/**/*.js"),
      path.resolve(INCLUDE_BASE_PATH, "widgets/**/*.js"),
      path.resolve(INCLUDE_BASE_PATH, "filters/**/*.js")
    ], { base: INCLUDE_BASE_PATH })
    .pipe($.concat("sjd.js"))
    .pipe($.uglify({"mangle": false}))
    .pipe(gulp.dest(path.resolve(RELEASE_BASE_PATH, "js")));
});

// merge all own css/less into sjd.css
gulp.task("release-css-publish", function() {
  return gulp.src([
      path.resolve(INCLUDE_BASE_PATH, "css/*.css"),
      path.resolve(INCLUDE_BASE_PATH, "less/*.less"),
      path.resolve(INCLUDE_BASE_PATH, "pages/**/*.less"),
      path.resolve(INCLUDE_BASE_PATH, "services/**/*.less"),
      path.resolve(INCLUDE_BASE_PATH, "widgets/**/*.less"),
      path.resolve(INCLUDE_BASE_PATH, "filters/**/*.less"),
      path.resolve(INCLUDE_BASE_PATH, "pages/**/*.css"),
      path.resolve(INCLUDE_BASE_PATH, "services/**/*.css"),
      path.resolve(INCLUDE_BASE_PATH, "widgets/**/*.css"),
      path.resolve(INCLUDE_BASE_PATH, "filters/**/*.css")
    ], { base: INCLUDE_BASE_PATH })
    .pipe($.less())
    .pipe($.concat("sjd.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.resolve(RELEASE_BASE_PATH, "css")));
});
