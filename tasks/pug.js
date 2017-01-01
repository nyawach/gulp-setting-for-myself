import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';
import readConfig from 'read-config';

import pug from 'gulp-pug';

class PugTask extends DefaultRegistry {

  init() {

    const config = readConfig('./config/config.yml');
    const locals = readConfig('./src/pug/locals.yml');

    gulp.task('pug', done => {

      gulp.src(`${config.src}/pug/**/[!_]*.pug`)
        .pipe(pug({
          locals: locals,
          pretty: true
        }))
        .pipe(gulp.dest(`${config.dest}/`));
      done();

    });

  }

}

module.exports = new PugTask();
