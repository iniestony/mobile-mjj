var gulp = require("gulp");
var path = require("path");

var del = require("del");

// load all gulp plugins
var $ = require("gulp-load-plugins")();
var minifyCSS = require('gulp-minify-css');

var mainBowerFiles = require('main-bower-files');

// --- CONSTANT ------
var INCLUDE_BASE_PATH = "../apps";
var RELEASE_BASE_PATH = path.resolve(INCLUDE_BASE_PATH, "release");

var styleFilter = $.filter("**/*.{css,less}");



gulp.task("mj-release-publish", [
  "release-clean",
  "release-vendor-js-publish",
  "release-vendor-css-publish",
  "release-js-publish",
  "release-css-publish"
]);

// clean up release folder
gulp.task("release-clean", function(){
  return del.sync(path.resolve(INCLUDE_BASE_PATH, "release"), {force: true});
});

// merge all lib js into vendor.js
gulp.task("release-vendor-js-publish", function(){
  return gulp.src([
      path.resolve(INCLUDE_BASE_PATH, "lib/angular/angular.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/angular-bootstrap/ui-bootstrap-tpls.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/angular-ui-router/release/angular-ui-router.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/jquery/dist/jquery.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/less/dist/less.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/bootstrap/dist/js/bootstrap.js"),
      path.resolve(INCLUDE_BASE_PATH, "lib/angular-ui-select/dist/select.js")
    ], { base: INCLUDE_BASE_PATH })
    .pipe($.concat("vendor.js"))
    .pipe($.uglify({"mangle": false}))
    .pipe(gulp.dest(path.resolve(RELEASE_BASE_PATH, "js/")));
});

// merge all less/css file into vendor.css
gulp.task("release-vendor-css-publish", function(){
  return gulp.src([
      path.resolve(INCLUDE_BASE_PATH, "lib/bootstrap/less/bootstrap.less"),
      path.resolve(INCLUDE_BASE_PATH, "lib/angular-ui-select/dist/select.css")
    ], { base: INCLUDE_BASE_PATH })
    .pipe($.less())
    .pipe($.concat("vendor.css"))
    .pipe(gulp.dest(path.resolve(RELEASE_BASE_PATH, "css")));
});

// merge all own js into mjj.js
gulp.task("release-js-publish", function() {
  return gulp.src([
      path.resolve(INCLUDE_BASE_PATH, "js/app.js"),
      path.resolve(INCLUDE_BASE_PATH, "pages/**/*.js"),
      path.resolve(INCLUDE_BASE_PATH, "services/**/*.js"),
      path.resolve(INCLUDE_BASE_PATH, "widgets/**/*.js"),
      path.resolve(INCLUDE_BASE_PATH, "filters/**/*.js")
    ], { base: INCLUDE_BASE_PATH })
    .pipe($.concat("mjj.js"))
    .pipe($.uglify({"mangle": false}))
    .pipe(gulp.dest(path.resolve(RELEASE_BASE_PATH, "js")));
});

// merge all own css/less into mjj.css
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
    .pipe($.concat("mjj.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.resolve(RELEASE_BASE_PATH, "css")));
});
