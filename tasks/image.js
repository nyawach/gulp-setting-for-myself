import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';
import readConfig from 'read-config';

import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

class ImageTask extends DefaultRegistry {

  init() {

    const config = readConfig('./config/config.yml');

    // imagemin
    gulp.task('image', () => {
        return gulp.src(`${config.src}/images/**/*.{png,jpg,jpeg,gif}`)
          .pipe(imagemin(config.imagemin))
          .pipe(gulp.dest(`${config.dest}`));
  	});

  }

};


module.exports = new ImageTask();
