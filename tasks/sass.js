import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';
import readConfig from 'read-config';

import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
// import pleeease from 'gulp-pleeease';

class SassTask extends DefaultRegistry {

  init() {

    const config = readConfig('./config/config.yml');

    gulp.task('sass', done => {
        gulp.src(`${config.src}/scss/**/*.scss`)
            .pipe(sassGlob())
            .pipe(sass(config.sass).on('error', sass.logError))
            // .pipe(pleeease(config.pleeease))
            .pipe(gulp.dest(`${config.dest}/css/`));
        done();
    });

  }

}

module.exports = new SassTask();
