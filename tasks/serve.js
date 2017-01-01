import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';
import readConfig from 'read-config';

import browserSync from 'browser-sync';

class ServeTask extends DefaultRegistry {

  init() {

    const config = readConfig('./config/config.yml');

    gulp.task('serve', done => {
      browserSync(config.browserSync);
      done();
    });

    gulp.task('reload', done => {
      browserSync.reload();
      done();
    });

  }

};


module.exports = new ServeTask();
