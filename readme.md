# gulp-setting-for-myself



## install

```bash
yarn
```


## start

```bash
yarn start
```



## Task Tree

```bash
$ gulp -T
├─┬ default
│ └─┬ <series>
│   ├─┬ <parallel>
│   │ ├─┬ html
│   │ │ └─┬ <series>
│   │ │   └── pug
│   │ ├─┬ css
│   │ │ └─┬ <series>
│   │ │   └── sass
│   │ └─┬ js
│   │   └─┬ <series>
│   │     └── browserify
│   ├── serve
│   └─┬ <parallel>
│     └── watch
├─┬ css
│ └─┬ <series>
│   └── sass
├─┬ html
│ └─┬ <series>
│   └── pug
├─┬ js
│ └─┬ <series>
│   └── browserify
├── image
├── browserify
├── pug
├── reload
├── sass
├── serve
└── watch
```



## ディレクトリ構造

画像・CSS・JSごとにフォルダを分けています。

```bash
├── public/
│   ├── about/
│   │   └── index.html
│   ├── css/
│   │   └── style.css
│   ├── index.html
│   └── js/
│       └── script.js
├── src/
│   ├── images/
│   ├── js/
│   │   ├── about/
│   │   │   └── script.js
│   │   ├── lib/
│   │   └── script.js
│   ├── pug/
│   │   ├── about/
│   │   ├── index.pug
│   │   ├── locals.yml
│   │   └── module/
│   └── scss/
│       ├── about/
│       ├── base/
│       ├── object/
│       └── style.scss
├── config/
│   └── config.yml
├── tasks/
├── gulpfile.babel.js
├── package.json
└── yarn.lock
├── readme.md
```


## DevDependencies

`package.json`参照



## Dependencies

- jquery: ^3.1.1
