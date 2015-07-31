# Gulp Template for myself

Gulp.jsによる開発環境のテンプレートです。  
gulpで行っている内容は主に以下の内容です。


## Tools

- Javascript minify (gulp-jsmin)
- SASS(SCSS) compile &amp; CSS minify (gulp-sass, gulp-cssmin, gulp-pleeease)
- HTML Validate (gulp-w3cjs)
- CSS Lint (gulp-csslint)
- Image minify (gulp-imagemin)
- Browser Reload (\*.html, \*.php, \*.scss, \*.js, ..., browser-sync)
- StyleStats (`gulp stats`)


## How to use

- `cd path/to/dir`
- `npm install -g browser-sync`
- `npm install`
- `gulp`

### `gulp`

- ブラウザ起動
- 各ファイルの更新を監視
- 更新されたファイルのみにタスク処理

### `gulp stats`

- CSSの評価


## Directory

```text
root/
  ┣ _shared/          // 各種資料を入れとく場所。ignore対象
  ┣　assets/           // 作業ディレクトリ
  ┃   ┣ js/           // js用フォルダ
  ┃   ┣ images/       // 画像用フォルダ
  ┃   ┣ scss/         // .scssファイル。以下は[FLOCSS](https://github.com/hiloki/flocss)を参考にさせていただいてます。
  ┃   ┃   ┣ base/     // normalize, reset, senitize etc.
  ┃   ┃   ┣ object/   // utility, layout(page), components etc.
  ┃   ┃   ┗ style.scss // import & コンパイル用ファイル。分けない場合はここに直接かいたりしてます。
  ┃   ┗ index.html
  ┣ build/            // 出力先のディレクトリ
  ┃   ┣ js/
  ┃   ┣ images/
  ┃   ┣ css/
  ┃   ┗ index.html
  ┣ node_modules/    // ignore対象
  ┣ .gitignore       // ./_sharedと./node_modulesを無視
  ┣ gulpfile.js      // Gulpの自動化処理を書いているファイル。
  ┣ package.json     // 各種パッケージのインストール情報、プロジェクトの情報が書かれたファイル。
  ┣ csslintrc.json   // CSSLinterの設定ファイル
  ┗ readme.md        // このファイル。

```


## Dependencies

`npm install -g node-sass`をターミナル(コマンドプロンプト)で実行し、node-sassをインストールする必要があるかもしれないです。  
また、gulp-sassは、SASS3.3には2015/5/6現在では対応していないようなので、3.3を使用したい場合は`gulp-ruby-sass`などを用いたほうが良いと思います。