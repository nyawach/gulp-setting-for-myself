import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';

import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

class ImageTask extends DefaultRegistry {

  init() {

    const config = require('../config/config.json');

    // image copy
	gulp.task('copy-image', () => {
	    return gulp.src(`${config.src}/images/**/*`)
	        .pipe(gulp.dest(`${config.dest}/images`));
	});

	// imagemin
	gulp.task('imagemin', () => {
	    return gulp.src(`${config.src}/images/**/*`)
	        .pipe(imagemin(config.imagemin))
	        .pipe(gulp.dest(`${config.dest}/images`));
	});



  }

};


module.exports = new ImageTask();
