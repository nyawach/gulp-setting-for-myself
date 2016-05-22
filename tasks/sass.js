import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';

import sass from 'gulp-sass';
import pleeease from 'gulp-pleeease';
import sourcemaps from 'gulp-sourcemaps';

class SassTask extends DefaultRegistry {

  init() {

    const config = require('../config/config.json');

    gulp.task('sass', () => {

        return gulp.src(`${config.src}/scss/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass).on('error', sass.logError))
        .pipe(pleeease(config.pleeease))
        .pipe(sourcemaps.write(config.sourcemaps))
        .pipe(gulp.dest(`${config.dest}/css`));

    });

    gulp.task('sass:build', () => {

        return gulp.src(`${config.src}/scss/**/*.scss`)
        .pipe(sass(config.sass).on('error', sass.logError))
        .pipe(pleeease(config.pleeease))
        .pipe(gulp.dest(`${config.dest}/css`));

    });
  }

};


module.exports = new SassTask();