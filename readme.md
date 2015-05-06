# Gulp Template for myself

Gulp.jsによる開発環境のテンプレートです。  
gulpで行っている内容は主に以下の内容です。

- Javascript minify (gulp-jsmin)
- SASS(SCSS) compile & CSS minify (gulp-sass, gulp-cssmin, gulp-autoprefixer)
- image minify (gulp-imagemin)
- \*.html, \*.php, \*.scss, \*.js, ..., etcの更新時にブラウザの自動リロード (browser-sync)

## 使用目的

主にHTML・CSS・JSのみのページの制作用です。特に数ページなどの制作の際に使用しています。  
一応、WordPressなどCMSのテンプレート更新も、proxyの設定などをすればローカル環境次第で出来ます。

## ディレクトリ構造

```text
root/
  ┣ _shared/          // 各種資料を入れとく場所。ignore対象
  ┣　assets/           // 作業ディレクトリ
  ┃   ┣ js/           // js用フォルダ
  ┃   ┣ images/       // 画像用フォルダ
  ┃   ┣ scss/         // .scssファイル。基本的にはstyle.scssに各モジュールを@importしてコンパイルする。
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
  ┗ readme.md        // このファイル。

```
## 注意事項

`npm install -g node-sass`をターミナル(コマンドプロンプト)で実行し、node-sassをインストールする必要があるかもしれないです。  
また、gulp-sassは、SASS3.3には2015/5/6現在では対応していないようなので、3.3を使用したい場合は`gulp-ruby-sass`などを用いたほうが良いと思います。