import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';
import readConfig from 'read-config';

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';


class BrowserifyTask extends DefaultRegistry {

  init() {

    const config = readConfig('./config/config.yml');

    gulp.task('browserify', () => {
        return browserify(`${config.src}/js/script.js`)
            .transform(babelify, { presets: ['es2015'] })
            .bundle()
            .pipe(source('script.js'))
            .pipe(gulp.dest(`${config.dest}/js`));
    });

  }

};

module.exports = new BrowserifyTask();
