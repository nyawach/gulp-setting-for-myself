import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';
import readConfig from 'read-config';

import watch from 'gulp-watch';

class WatchTask extends DefaultRegistry {

  init() {

    const config = readConfig('./config/config.yml');

  	gulp.task('watch', done => {
  		watch([`${config.src}/pug/**/*.pug`, `${config.src}/pug/locals.json`], gulp.series('pug', 'reload'));
  		watch(`${config.src}/scss/**/*.scss`, gulp.series('sass', 'reload'));
  		watch(`${config.src}/js/**/*.js`, gulp.series('js', 'reload'));
  		done();
   	});

  }

}

module.exports = new WatchTask();
