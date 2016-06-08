var gulp = require('gulp');
var cssimport = require("gulp-cssimport");

var globalConfig = {
  src: 'css' 
};

// Process CSS
gulp.task('styles', function(){
  return gulp.src('css/[^_]*')
    .pipe(cssimport())
    .pipe(gulp.dest('assets/'));
})

// Watch files
gulp.task('watch', function () {
  gulp.watch(globalConfig.src + '/**/*.*', ['styles']);
});

// Default task
gulp.task('default', ['watch']);
