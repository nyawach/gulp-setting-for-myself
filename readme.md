# README

package.jsonに以下を追加

```json
  "babel": {
    "presets": [
      "es2015"
    ]
  }
```


// taskの読み込み


// taskの処理順番を書く
// watch, default, build, serveはこのファイルに書いて、他のは別ファイルで書く?

// gulp.task('css:build', gulp.series('sass', 'lint:css', 'minify:css'));
// gulp.task('js:build', gulp.pallarel('copy-bower', gulp.series('browserify', 'lint:js', 'minify:js')));
// gulp.task('html:build', gulp.series('jade', 'minify:html'));


// defaultとbuildを書く
// gulp.task('default', gulp.series('serve', 'watch'));
// gulp.task('build', gulp.series('serve', gulp.pallarel('html:build', 'css:build', 'js:build', 'imagemin')));



基本的にこのファイルには
- 開発用のdefaultタスク
- 公開用のbuildタスク
の２つだけ設定する。
`npm start` => `gulp`
`npm run build` => `gulp build`
`npm run taskName` => `gulp taskName`
となるようにpackage.jsonの`script`に追加記述する
こうすれば`browserify:react`などのタスクも別ファイルで作ってここでタスク追加すればいいので便利なきがす



## タスクいるもの


### HTML

- jade compile
- html validate
- html minify


### CSS

- sass compile
- sourcemap(devのみ)
- pleeease
- css linter
- minify(buildのみ)
- frontnote(できれば)


### JS

- browserify
- js linter
- minify(buildのみ)
- Docblockr(できれば)


### 画像

- minify(buildのみ)
- copy(devの時のみ)
- スプライト画像の作成(フォルダfunctionでいいかも)


### その他

- browser-sync(devのみ)
- watch or watchfy(devのみ)
- plumber(devのみ)
- koko(buildのみ)