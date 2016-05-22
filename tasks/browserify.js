import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import debowerify from 'debowerify';


class BrowserifyTask extends DefaultRegistry {

  init() {

    const config = require('../config/config.json');

// js
// gulp.task('copy-bower', () => {
//     const config = readConfig(`${CONFIG}/copy-bower.json`);
//     return gulp.src(config.src, {
//         cwd: 'bower_components'
//     }).pipe(gulp.dest(`${DEST}/js/lib`));
// });

    gulp.task('browserify', () => {
        return browserify(`${config.src}/js/script.js`)
            .transform(babelify)
            .transform(debowerify)
            .bundle()
            .pipe(source('script.js'))
            .pipe(gulp.dest(`${config.dest}/js`));
    });

  }

};


module.exports = new BrowserifyTask();