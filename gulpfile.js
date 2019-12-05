const gulp = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync')

const reload = browserSync.reload
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const shell = require('gulp-shell')

gulp.task('webpack', function () {
  return gulp.src('*.js', { read: false })
    .pipe(shell([
      'webpack'
    ]))
    .pipe(browserSync.stream())
})

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({

      cascade: false
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './public',
    notify: false,
    open: false
  })
})

// gulp.task("printName", function () {
//     return new Promise(function (resolve, reject) {
//         console.log("HELLO USING GULP");
//         resolve()
//     })

// })

// gulp.task("printAge", function () {
//     return new Promise(function (resolve, reject) {
//         console.log("HELLO I'M 23");
//         resolve()
//     })

// })

// gulp.task("default", gulp.series('printAge', 'printName'))
gulp.task("default", function () {
  {
    gulp.watch('./src/scss/**/*', gulp.series('sass','browser-sync'))
    gulp.watch('./src/js/**/*', gulp.series('webpack'))
  }
})

gulp.task('sass:minify', function () {
  return gulp.src('./public/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
});

gulp.task('production', gulp.series('sass:minify'))
