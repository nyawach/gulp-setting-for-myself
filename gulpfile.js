
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
			// css, Sass(scss)
			scssSrc    : 'assets/scss/**.scss',
			scssDest   : 'build/css',
			scssTarget : 'assets/scss/**/*.scss',
			// javascript
			jsSrc      : 'assets/js/script.js',
			jsDest     : 'build/js',
			jsTarget   : 'assets/js/**/*.js',
			// images
			imageSrc   : 'assets/images/**/*.+(png|jpg|gif|svg)',
			imageDest  : 'build/images',
			imageTarget: 'assets/images/**/*.+(png|jpg|gif|svg)'
		};

/* ローカルサーバーの立ち上げ */
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
gulp.task('html',function(){
	gulp.src(path.htmlSrc)
		.pipe(plugins.plumber())
		.pipe(gulp.dest(path.htmlDest))
		.pipe(browserSync.reload({stream:true}));
});

/* phpの出力 */
gulp.task('php',function(){
	gulp.src(path.phpSrc)
		.pipe(plugins.plumber())
		.pipe(gulp.dest(path.phpDest))
		.pipe(browserSync.reload({stream:true}));
});

/* Sass(SCSS)ビルド、css minify */
gulp.task('sassmin', function () {
	gulp.src(path.scssSrc)
		.pipe(plugins.plumber())
		//SASSコンパイル
		.pipe(plugins.sass({
			style : 'nested'
		}))
		//ベンダープレフィックス挿入
		.pipe(plugins.autoprefixer([
			'last 2 version', 'ie 9'
		]))
		//minify
		.pipe(plugins.cssmin())
		//コンパイル後出力ファイル先の指定
		.pipe(gulp.dest(path.scssDest))
		.pipe(browserSync.reload({stream:true}));
});

/* .jsファイルの圧縮 */
gulp.task('jsmin', function(){
	gulp.src(path.jsSrc)
		.pipe(plugins.plumber())
		//minify
		.pipe(plugins.jsmin())
		//出力ファイル先の指定
		.pipe(gulp.dest(path.jsDest))
		.pipe(browserSync.reload({stream:true}));
});

/* 画像ファイルの圧縮タスク */
/*
gulp.task('imgmin', function(){
	gulp.src(path.imageSrc)
		.pipe(plugins.imagemin({
			optimizationLevel: 8
		}))
		.pipe(gulp.dest(path.imageDest));
});
*/

/* default(サーバー立ち上げて自動更新) */
gulp.task('default', ['server'], function() {
    gulp.watch([path.htmlTarget], ['html']);
    // gulp.watch([path.phpTarget], ['php']);
    gulp.watch([path.scssTarget], ['sassmin']);
    gulp.watch([path.jsTarget], ['jsmin']);
    // gulp.watch([path.imageTarget], ['imgmin']);
});