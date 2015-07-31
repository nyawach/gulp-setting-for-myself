
var gulp = require('gulp'),

	/*
		プラグイン(gulp-load-pluginsでgulp関連のものは一括導入)
		キャメルケースで各プラグインを実行できるようになる
	*/
	plugins = require('gulp-load-plugins')({ camelize: true }),
	browserSync = require('browser-sync'),

	/*
		各種パス
		docRoot  : プロジェクトのルート(いらない...?)
		docDir   : browserSyncでサーバー立ち上げる際のルートディレクトリ
		**Src    : リソースのパス
		**Dest   : 出力先のパス
		**Target : watch対象
	*/
	path = {
		// 各種ローカルサーバー情報
		docRoot    : './',
		docDir     : 'build/',
		port       : 3000,
		proxy      : 'localhost/',
		// html
		htmlSrc    : 'assets/**/*.html',
		htmlDest   : 'build/',
		htmlTarget : 'assets/**/*.html',
		// php
		phpSrc     : 'assets/**/*.php',
		phpDest    : 'build/',
		phpTarget  : 'assets/**/*.php',
		// Sass(scss)
		scssSrc    : 'assets/scss/**.scss',
		scssDest   : 'build/css',
		scssTarget : 'assets/scss/**/*.scss',
		// css
		cssSrc    : 'build/css/*.css',
		cssDest   : 'build/css',
		cssTarget : 'build/css/*.css',
		// javascript
		jsSrc      : 'assets/js/script.js',
		jsDest     : 'build/js',
		jsTarget   : 'assets/js/**/*.js',
		// images
		imageSrc   : 'assets/images/**/*.+(png|jpg|gif|svg)',
		imageDest  : 'build/images',
		imageTarget: 'assets/images/**/*.+(png|jpg|gif|svg)'
	};


/* 簡易ローカルサーバーの立ち上げ */
gulp.task('server', function() {
	browserSync({
		server: {
			baseDir: path.docDir
			// proxy  : path.proxy,
			// port   : path.port
		}
	});
});

/* HTMLの出力 */
gulp.task('html', function(){
	gulp.src(path.htmlSrc)
		.pipe(plugins.plumber())
		// 差分ファイルのみ次のストリームに流す
		.pipe(plugins.changed(path.htmlDest))
		// Validate .html file
		.pipe(plugins.w3cjs())
		.pipe(gulp.dest(path.htmlDest))
		.pipe(browserSync.reload({stream:true}));
});

/* phpの出力 */
gulp.task('php', function(){
	gulp.src(path.phpSrc)
		.pipe(plugins.plumber())
		// 差分ファイルのみ次のストリームに流す
		.pipe(plugins.changed(path.phpDest))
		.pipe(gulp.dest(path.phpDest))
		.pipe(browserSync.reload({stream:true}));
});

/* Sass(SCSS)ビルド */
gulp.task('sass', function() {
	gulp.src(path.scssSrc)
		.pipe(plugins.plumber())
		// 差分ファイルのみ次のストリームに流す
		.pipe(plugins.changed(path.scssDest))
		// Compile .scss file
		.pipe(plugins.sass())
		// Output .css file
		.pipe(gulp.dest(path.scssDest));
});

/* CSSの整形など */
gulp.task('css', function(){
	gulp.src(path.cssSrc)
		.pipe(plugins.plumber())
		// autoprefixer, media-query packer, altenative rem font-size, etc.
	    .pipe(plugins.pleeease({
	        autoprefixer: ['last 4 versions'],
	        minifier: false,
	        mqpacker: true,
	        rem: true
	    }))
	    // Combine css properties
		.pipe(plugins.csscomb())
		// Linter
		.pipe(plugins.csslint("csslintrc.json"))
		.pipe(plugins.csslint.reporter())
		// Minify
		.pipe(plugins.cssmin())
		// Output .css file
		.pipe(gulp.dest(path.cssDest))
		// Reload browser
		.pipe(browserSync.reload({stream:true}))
});

/* Style Stats でCSSの評価 */
gulp.task('stats', function(){
	gulp.src(path.cssTarget)
        .pipe(plugins.stylestats());
});

/* .jsファイルの圧縮 */
gulp.task('jsmin', function(){
	gulp.src(path.jsSrc)
		.pipe(plugins.plumber())
		// 差分ファイルのみ次のストリームに流す
		.pipe(plugins.changed(path.jsDest))
		//minify
		.pipe(plugins.jsmin())
		//出力ファイル先の指定
		.pipe(gulp.dest(path.jsDest))
		.pipe(browserSync.reload({stream:true}));
});

/* 画像ファイルの圧縮 */
gulp.task('imgmin', function(){
	gulp.src(path.imageSrc)
		// 差分ファイルのみ次のストリームに流す
		.pipe(plugins.changed(path.imageDest))
		.pipe(plugins.imagemin({
			optimizationLevel: 8
		}))
		.pipe(gulp.dest(path.imageDest));
});

/* default(サーバー立ち上げて自動更新) */
gulp.task('default', ['server'], function() {
    gulp.watch([path.htmlTarget], ['html']);
    // gulp.watch([path.phpTarget], ['php']);
    gulp.watch([path.scssTarget], ['sass', 'css']);
    gulp.watch([path.jsTarget], ['jsmin']);
    // gulp.watch([path.imageTarget], ['imgmin']);
});


