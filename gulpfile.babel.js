import gulp from 'gulp';

const TASK_FILES = [
  './tasks/pug',
  './tasks/sass',
  './tasks/browserify',
  './tasks/watch',
  './tasks/serve',
  './tasks/image',
];

TASK_FILES.forEach((file, i) => {
  gulp.registry(require(file));
});

gulp.task('html', gulp.series('pug'));
gulp.task('css', gulp.series('sass'));
gulp.task('js', gulp.series('browserify'));

gulp.task('default', gulp.series(gulp.parallel('html', 'css', 'js'), 'serve', gulp.parallel('watch')));
