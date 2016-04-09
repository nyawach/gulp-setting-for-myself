var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    plugins = require('gulp-load-plugins')({ camelize: true });


/**
* HTMLファイルの操作
* - buildフォルダへコピー
*/
var html = {
    src: './assets/html/*.html',
    dest: './build/'
};

gulp.task('html', function () {
    gulp.src(html.src)
        .pipe(plugins.plumber())
        .pipe(plugins.cached())
        .pipe(gulp.dest(html.dest))
        .pipe(browserSync.reload({ stream: true }));
});


/**
* PHPファイルの操作
* - buildフォルダへコピー
*/
var php = {
    src: './assets/php/*.php',
    dest: './build/'
};

gulp.task('php', function () {
    gulp.src(php.src)
        .pipe(plugins.plumber())
        .pipe(plugins.cached())
        .pipe(gulp.dest(php.dest))
        .pipe(browserSync.reload({ stream: true }));
});


/**
* JavaScriptファイルの操作
* - Uglify
* - buildフォルダへコピー
*/
var js = {
    src: './assets/js/**/*.js',
    dest: './build/js/'
};

gulp.task('js', function(){
    gulp.src(js.src)
        .pipe(plugins.plumber())
        .pipe(plugins.uglify({mangle: false}))
        .pipe(gulp.dest(js.dest))
        .pipe(browserSync.reload({ stream: true }));
});


/**
* Sass(SCSS)ファイルの操作
* - .scssファイルのコンパイル
* - autoprefix, minify, Media Queryの結合など
* - sourcemap対応
* - .cssファイルをbuildフォルダへコピー
*/
var sass = {
    src: './assets/scss/**/*.scss',
    dest: './build/'
};
gulp.task('sass', function(){
  return plugins.rubySass(sass.src, {
        sourcemap: true,
        style: 'expanded'
    })
    .on('error', function(err){
        console.error('Error!', err.message);
    })
    .pipe(plugins.plumber())
    .pipe(plugins.cached())
    // autoprefixer, media-query packer, altenative rem font-size, etc.
    .pipe(plugins.pleeease({
        sass: true,
        autoprefixer: {'browsers': ['last 2 versions']},
        minifier: false,
        mqpacker: true,
        sourcemaps: true,
        rem: false,
    }))
    .pipe(plugins.sourcemaps.write('./', {
        includeContent: false,
        sourceRoot: './'
    }))
    // Output .css file
    .pipe(gulp.dest(sass.dest))
    // Reload browser
    .pipe(browserSync.reload({ stream: true }));
});


/**
* CSSファイルの評価
* `gulp stats`
*/
var css = {
    src: './build/*.css'
};
/* Style Stats でCSSの評価 */
gulp.task('stats', function(){
    gulp.src('./build/*.css')
        .pipe(plugins.stylestats());
});


/*
* 画像ファイルの操作
* - 圧縮
* - buildフォルダへコピー
*/
var image = {
    src: './assets/images/**/*.+(jpg|png|jpeg|svg)',
    dest: './build/images/'
};
gulp.task('image', function(){
  gulp.src(image.src)
      .pipe(plugins.plumber())
      .pipe(plugins.cached())
      .pipe(plugins.imagemin())
      .pipe(gulp.dest(image.dest))
      .pipe(browserSync.reload({ stream: true }));
});


/**
* WordPressサーバーで自動リロード
*/
gulp.task('wpserver', function(){
  browserSync({
    proxy: 'localhost/wordpress/',
    notify: true,
    port: 80
  });
});


/**
* ローカルサーバーで自動リロード
*/
gulp.task('server', function(){
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  });
});


/**
* defaultタスク
* `gulp` or `gulp default`
*/
gulp.task('default', ['wpserver'], function(){
    gulp.watch([html.src], ['html']);
    gulp.watch([php.src], ['php']);
    gulp.watch([sass.src], ['sass']);
    gulp.watch([js.src], ['js']);
    gulp.watch([image.src], ['image']);
});

gulp.task('watch', function(){
    gulp.watch([html.src], ['html']);
    gulp.watch([php.src], ['php']);
    gulp.watch([sass.src], ['sass']);
    gulp.watch([js.src], ['js']);
    gulp.watch([image.src], ['image']);
});


/**
* WordPress Serverタスク
* `gulp wp`
*/
gulp.task('wp', ['wpserver'], function(){
    gulp.watch([html.src], ['html']);
    gulp.watch([php.src], ['php']);
    gulp.watch([sass.src], ['sass']);
    gulp.watch([js.src], ['js']);
    gulp.watch([image.src], ['image']);
});

