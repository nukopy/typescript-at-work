# part 1：TypeScript の世界を知る

## chap01：前書き

JavaScript の歴史

- [TypeScript の世界を知る - 前書き](https://future-architect.github.io/typescript-guide/preface.html)

## chap02：Node.js エコシステム

TypeScript は JavaScript への変換を目的として作られた言語．公式の処理系があるが，それで変換する
と，JavaScript が生成される．

勉強目的で TypeScript で書いたコードを実行するには，現在のところいくつかのオプションがある．こ
のなかで，とりあえず安定して使えて，比較的簡単なのは ts-node．

- TypeScript のウェブサイトの playground
  - 公式のコンパイラで変換してブラウザで実行
- tsc + Node.js
  - 公式のコンパイラで変換してから Node.js で JavaScript を実行
- babel + ts-loader + Node.js
  - Babel 経由で公式のコンパイラで変換してから Node.js で実行
- babel + @babel/preset-typescript + Node.js
  - Babel で型情報だけを落として簡易的に変換して Node.js で実行
- ts-node
  - TypeScript を変換してそのまま Node.js で実行する処理系
- Deno
  - TypeScript をネイティブサポートした処理系（2020-05-13 に 1.0 がリリースされた）

Node.js は JavaScript にファイル入出力やウェブサーバー作成に必要な API などを足した処理系．現在の Web プログラミングをはじめとした JavaScript/TypeScript の利用の核となっている．

- プログラミング言語を学ぶとき，ソースコードだけでは不十分
  - どこにソースコードを書き，
  - どのようにビルドツールを動かし，
  - どのように処理系を起動し，
  - どのようにテストを行うか

など，言語周辺のエコシステムを学ばないと，どこから手をつけて良いか分からない．

### Node.js のエコシステムの周辺ツールや設定ファイル

Node.js のエコシステムの基本的な周辺ツールや設定ファイルは以下の通り．

- Node.js
  - 処理系
- npm
  - パッケージマネージャ
- package.json
  - プロジェクトファイル
  - 依存パッケージの管理
  - scripts で開発用のタスクのランチャーとして利用
- npx
  - Node.js 用の npm パッケージで提供されているツールの実行
- TypeScript 関連のパッケージ
  - tsc
    - TypeScript のコンパイラ（プロジェクト用の TypeScript の設定ファイルの作成）
  - ts-node
    - TypeScript を js に変換しながら実行する，Node.js のラッパーコマンド

### package.json の作成によるプロジェクトの初期化

- `package.json` の作成

```sh
cd typescript-at-work/
npm init -y
```

公開したくない場合，`"private": true` を書き足しておく．

- ts-node と typescript のインストール
  - `--save-dev` オプションは，「開発には必要だが，リリースにはいらない」という意味になる．こういったパッケージのことを dev-dependencies と呼んだりする（逆にアプリケーションで使われるパッケージを dependencies と呼ぶ）．
  - `--save` オプションは，deperecated である．元々は，`npm install` 時に `package.json` の `dependencies` に追加してくれるオプションだったが，npm v5 以降はインストール時にデフォルトで追加してくれるようになった（参考：[npm install時に「--save」オプションはいらない](https://qiita.com/havveFn/items/c5beda8572aa8c1e6be6)）．
  - インストール後，`node_modules` ディレクトリが作成される．これは `.gitignore` に追加しておくこと．

<!-- TODO: PR を送る npm install --save はいらない -->

```sh
# dev-dependencies としてインストール
npm install --save-dev ts-node typescript

# dependencies としてインストール
npm install ts-node
npm install --save ts-node
```

### プロジェクトフォルダ共有後の環境構築

チーム内では，git などでプロジェクトのソースコードを共有する．
JavaScript 系のプロジェクトでは，その中に `package.json` と `package-lock.json` があり，
デプロイ時に環境を作ったり，共有された人は環境を手元で再現したりするのが簡単にできる．

以下は，環境変数 `NODE_ENV` が未設定または「`production` 以外」の場合の動作．

|  npm コマンド  |  処理  |
| ---- | ---- |
|  npm install |  dependencies と devDependencies の両方をインストールする．  |
|  npm install --prod |  dependencies のみをインストールする．  |
|  npm ci |  dependencies と devDependencies の両方をインストールする．`package-lock.json` は更新しない．  |
|  npm ci --prod |  dependencies のみをインストールする．`package-lock.json` は更新しない．  |

### インストールしたコマンドの実行

npm コマンドでインストールするパッケージは，プログラムから使うライブラリ以外に実行できるコマンドを含むものがある．
例えば，先ほどインストールした `typescript` と `ts-node` というパッケージは両方ともこれを含む．
コマンドは `node_modules/.bin` 以下にインストールされている．
これを直接相対パスで指定しても良いが，パッケージのコマンドを実行するための専用のコマンド `npx` が Node.js では用意されている．
ts-node を気軽に試す REPL（1 行ごとに実行されるインタプリタ）の実行もできる．

- npx：ts-node の REPL を起動

```sh
$ npx ts-node
> console.log('hello world')
hello world
```

- `package.json` の `scripts` セクションに登録すると，npm コマンドを使って実行できる．

```json
{
  ...
  "scripts": {
    "start": "ts-node"
  }
}
```

`scripts` にはオブジェクトを書き，その中には key-value の形でコマンドが定義できる．
上記では，`start` というコマンド名を定義している．コマンドが実行されたときに実行されるコードを書ける．
ここでは `node_modules/.bin` 以下のコードをパスを設定せずに書くことができる（npm がよしなに解決してくれる）．

- `npm run [コマンド名]`

上記のコマンドをシェルで実行すると，この `scripts` セクションのコマンドが実行される．

```sh
$ npm run start
> console.log('hello world')
hello world
```

#### scripts セクションの実践例

実際のプロジェクトでは，`scripts` セクションを利用して，便利コマンドを定義して活用している場合が多い．
およそ，以下のようなコマンドを定義することが多い．

- `start` / `serve`：パッケージがウェブアプリケーションを含む場合はこれを起動（ex) React を `https://localhost:3000` でインタラクティブに開発できる）
- `test`：テストを実行
- `lint`：コードの品質チェックを行う
- `build`：ビルドが必要なライブラリではビルドを実行して配布できるようにする

ビルドツールや処理系，テスティングフレームワークなどは，プロジェクトによって千差万別だが，
この `scripts` セクションを読むと，どのようにソースコードを処理したり，テストしたりしているかが一目で分かる．
これは，プロジェクトのコードを読むための強い武器になる．

また，このコマンド実行までは Windows だろうが，Linux だろうが，macOS だろうが，どれでもポータブルに動作する．
Node.js と npm コマンドさえあれば，開発機（Windows，macOS），CI サーバ（Linux），本番環境（Linux）で動作する．
もちろん，中で動作させるプログラムに，Node.js 以外の OS のコマンドを書くとそこのポータビリティは下がるが，
それに関してはおすすめパッケージの中でポータブルな `scripts` セクションを書くのに使えるパッケージがあるため後述する．

### TypeScript の環境設定

TypeScript を使うには，npm による `typescript` パッケージのインストールの他，いくつか設定が必要．

JavaScript 系のツールのビルドは大きく分けて，2 つのフェーズがある．

- **コンパイル** compile
  - TypeScript や最新の JavaScript 文法で書かれたコードを，実行環境にあわせた JavaScript に変換
  - 処理系はコンパイラと呼ばれる
  - ツール：TypeScript，Babel
- **バンドル** bundle
  - ソースコードは通常，整理しやすいクラス毎，コンポーネント毎といった単位で分けて記述する．配布時には 1 ファイルにまとめてダウンロードの高速化，無駄な使われてないコードの排除が行われる．
  - バンドルするためのパッケージはバンドラと呼ばれる．
  - ツール：webpack，Browserify，Rollup，Parcel など
  - 後者は大規模なアプリケーションでなければ必要ない

#### TypeScript のコンパイルの設定：tsconfig.json

何も設定せずとも，TypeScript のコンパイルは可能だが，入力フォルダを設定したい，出力形式を調整したい，いくつかのデフォルトでオフになっている新しい機能を使いたいなどの場合は設定ファイル `tsconfig.json` を作成する．このファイルの雛形は TypeScript の処理系を使って生成できる．TypeScript の処理系は，`tsc` というコマンドを提供しており，`tsconfig.json` の作成にはこれを利用する．

```sh
$ npx tsc --init
message TS6071: Successfully created a tsconfig.json file.
```

あとはこの JSON ファイルを編集すれば，コンパイラの動作を調整できる．
TypeScript を Node.js で実行するだけであれば細かい設定は不要だが，オプションを使わないといけない文法もあるため注意．

#### 実行

- `first.ts`

```ts
const personName: string = 'nukopy';

console.log(`Hello ${personName}`!);
```

- コードの実行には，npx 経由で ts-node を実行する

```sh
$ npx ts-node src/chap02/first.ts
Hello nukopy
```

## まとめ

本章では次のようなことを学んで来た．

- JavaScript のエコシステムと `package.json`
- サンプルを動かすための最低限の環境設定

次章からはコーディングの仕方を学んで行く．
