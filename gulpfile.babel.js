import gulp from 'gulp';
import config from './config/config.json';

import JadeTask from './tasks/jade.js';
import SassTask from './tasks/sass.js';
import BrowserifyTask from './tasks/browserify.js';
import ServeTask from './tasks/serve.js';
import ImageTask from './tasks/image.js';
import WatchTask from './tasks/watch.js';

gulp.registry(JadeTask);
gulp.registry(SassTask);
gulp.registry(BrowserifyTask);
gulp.registry(ServeTask);
gulp.registry(ImageTask);
gulp.registry(WatchTask);

gulp.task('css', gulp.series('sass'));
gulp.task('js', gulp.parallel('browserify'));
gulp.task('html', gulp.series('jade'));

gulp.task('default', gulp.series(gulp.parallel('html', 'css', 'js'), 'serve', gulp.parallel('watch')));

gulp.task('build', gulp.series(gulp.parallel('html', 'css', 'js', 'imagemin'), 'serve'));