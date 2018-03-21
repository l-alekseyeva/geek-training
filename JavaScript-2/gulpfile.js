var gulp = require('gulp');
var scss = require('gulp-sass');
var browserSync = require('browser-sync'); // синхронизация браузера
var useref = require('gulp-useref'); // объединение кода
var uglify = require('gulp-uglify'); // минимизация кода
var imagemin = require('gulp-imagemin'); // минимизация изображений
var runSequence = require('run-sequence'); //постедовательность задач
var del = require('del'); // удаление файлов и папок

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'HW_7/src'
    },
  });
});

gulp.task('scss', function() {
  return gulp.src('HW_7/src/scss/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('HW_7/src/css'))
    .pipe(browserSync.reload({
      stream: true
  }));
});

gulp.task('watch', ['browserSync', 'scss'], function() {
  gulp.watch('HW_7/src/scss/**/*.scss', ['scss']);
  gulp.watch('HW_7/src/**/*.html', browserSync.reload);
  gulp.watch('HW_7/src/scripts/**/*.js', browserSync.reload);
});

gulp.task('useref', ['scss'], function() {
  return gulp.src('HW_7/src/**/*.html')
    .pipe(useref())
    .pipe(gulp.dest('HW_7/dist'))
});

gulp.task('uglify', function() {
  return gulp.src('HW_7/dist/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('HW_7/dist'))
});

gulp.task('images', function() {
  gulp.src('HW_7/src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('HW_7/dist/images'))
});

gulp.task('clean', function(){
  del('HW_7/dist/*')
});

gulp.task('pre-build', function(callback){
  runSequence('useref', ['uglify'], callback)
});

gulp.task('build', function(callback) {
  runSequence('clean',['pre-build','images'], callback)
})
