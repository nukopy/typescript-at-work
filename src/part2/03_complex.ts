const years: number[] = [2019, 2020, 2021];
// error: const years_error: number[] = [2019, 2020, '2021'];
console.log(years);
const years_complex = [2020, "2021"]; // 複数の型を持つこともできる
console.log(years_complex);

// tuple
const movie: [string, number] = ["Gozilla", 1954];
movie[0] = "hoge"; // OK

// 違う型を入れようとするとエラーに鳴る
// error: movie[0] = 2019;
// error TS2322: Type 'number' is not assignable to type 'string'.

// 配列からのデータの取り出し
const smalls = ["小動物", "小型車", "小論文"];

// 古い書き方
var smallCar = smalls[1];
var smallAnimal = smalls[0];
var others = smalls.slice(1);
console.log("smalls の 2 番目以降のデータ:", others);

// 新しい書き方：残余構文（Rest 構文）
// `...` はスプレッド演算子という
const [smallAnimal2, smallCar2, smallThesis] = smalls;
const [smallAnimal3, smallCar3] = smalls;

const [, ...others2] = smalls;
// Python だと↓みたいにスター演算子で展開できる
// [_, *others] = smalls;
console.log(others2);

// 配列の要素の存在チェック
const places = ["小岩駅", "小浜市", "小倉駅"];
console.log(typeof places);

// 旧：indexOf
// if (places.indexOf("小淵沢") > -1) {
// if (places.indexOf("小淵沢") !== -1) {
const idxKobuchi = places.indexOf("小淵沢");
if (idxKobuchi !== -1) {
  console.log("見つかった");
} else {
  console.log("見つからない");
}

// 新：includes
const isExistKobuchi = places.includes("小淵沢");
// if (places.includes("小淵沢")) {
if (isExistKobuchi) {
  console.log("見つかった");
} else {
  console.log("見つからない");
}

// 配列の加工
const smalls_ = ["小動物", "小型車", "小論文"];
const others_ = ["小市民", "小田急"];

// 旧：3 番目（idx: 2）から要素を 1 つ削除して、1 つの要素を追加する
console.log("===== 配列の加工 =====");

console.log('before:', smalls_);
smalls_.splice(2, 1, 'foo');
console.log('after:', smalls_);
// idx: 0 から要素を 2 つ削除し、その位置に 'bar' を挿入する
smalls_.splice(0, 2, 'bar');
console.log('after1:', smalls_);
smalls_.concat(others_);  // 配列の結合
// concat は非破壊的操作で新しい配列を返す
console.log('after2:', smalls_);
const newSmalls = smalls_.concat(others_);  // 配列の結合
console.log('after concat:', newSmalls);

// 新：スプレッド構文で同じ操作をする
console.log('===== new =====');
const smalls_2 = ["小動物", "小型車", "小論文"];
console.log(smalls_2);
const newSmalls2 = [...smalls_2.slice(0, 2), 'foo'];
console.log(newSmalls2);
const newSmalls2_ = ['bar', newSmalls2.slice(2)[0], ...others];
console.log(newSmalls2_);

// 旧：配列のコピー
const org = [1, 1, 2, 3, 5];
const copy_old = Array.from(org);
copy_old[0] = 100;
console.log(org);
console.log(copy_old);

// 新：配列のコピー
const copy = [...org];
copy[0] = 100;
console.log(org);
console.log(copy);

// 配列のソート
console.log('===== sort =====');
const numbers = [30, 1, 200];
console.log(numbers);
// caution: ソートをそのまま実行すると、中の要素をすべて文字列化した上で、辞書順でソートします。
numbers.sort(); // 破壊的変更
console.log('意図しないソート:', numbers);
numbers.sort((a, b) => a - b)
console.log('期待どおりのソート:', numbers);
// 非破壊的なソートは無いので、元の配列を変更せずにソートした結果だけを得たい場合は、前節のスプレッド構文を組み合わせて行う。

// ループ
console.log('===== loop =====');
const iterable = ['foo', 'bar', 'buz'];

// 旧
for (let i = 0; i < iterable.length; i++) {
    const element = iterable[i];
    console.log(element);
}

// 旧: ES5
iterable.forEach(value => {
    console.log(value);
});

// 新
// 配列の中身
for (const value of iterable.values()) {
    console.log(value);
}
// 配列のインデックス
for (const idx of iterable.keys()) {
    console.log(idx);
}
// 配列の中身とインデックス
for (const pair of iterable.entries()) {
    console.log(pair);
}
// 配列の中身とインデックス: 分割代入
for (const [idx, value] of iterable.entries()) {
    console.log(`${idx}: ${value}`);
}
// iterable なオブジェクト：Array, Set, Map, String
// reading: スプレッド構文は、実はイテレータを取り出すシュガーシンタックス
const copy_iterable = [...iterable];

/*
イテレータはES2015(ES6)以降にしか存在しないため、
スプレッド構文を使ってイテレータを配列に変換するのは、
出力ターゲットがES2015以上でなければなりません。

例えば、tsconfig.json のコンパイラの target を es3 にすると、
イテレータを内部で使っている keys(), entries() やスプレッド構文などが
コンパイルエラーになる。

TSError: ⨯ Unable to compile TypeScript:
src/part2/03_complex.ts:126:21 - error TS2569: Type 'IterableIterator<string>' is not an array type or a string type. Use compiler option '--downlevelIteration' to allow iterating of iterators.

126 for (const value of iterable.values()) {
                        ~~~~~~~~~~~~~~~~~
src/part2/03_complex.ts:130:19 - error TS2569: Type 'IterableIterator<number>' is not an array type or a string type. Use compiler option '--downlevelIteration' to allow iterating of iterators.

130 for (const idx of iterable.keys()) {
                      ~~~~~~~~~~~~~~~
src/part2/03_complex.ts:134:20 - error TS2569: Type 'IterableIterator<[number, string]>' is not an array type or a string type. Use compiler option '--downlevelIteration' to allow iterating of iterators.

134 for (const pair of iterable.entries()) {
                       ~~~~~~~~~~~~~~~~~~
src/part2/03_complex.ts:138:28 - error TS2569: Type 'IterableIterator<[number, string]>' is not an array type or a string type. Use compiler option '--downlevelIteration' to allow iterating of iterators.

138 for (const [idx, value] of iterable.entries()) {
                               ~~~~~~~~~~~~~~~~~~

*/
