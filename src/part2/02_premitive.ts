console.log(true);
console.log(false);

const flag: boolean = true;
const list = ['hello', 'good morning'];
console.log(list);

// 他のデータ型への変換
console.log(flag, typeof flag);
console.log(flag.toString(), typeof flag.toString());
list.push('hoge')
console.log(list);

const P = true;
const Q = false;

console.log(`${!(P || Q)} = ${!P && !Q}`);
console.log(`${!(P && Q)} = ${!P || !Q}`)

// 数値型 number
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);

const num_10 = 7;
const num_2 = 0b111;  // 2 進数リテラル
// error: const num_8 = 07;  // 昔の 8 進数リテラル
const num_8 = 0o07;  // 8 進数リテラル こっちが現代の書き方
// error: Octal literals are not allowed in strict mode.
console.log(num_10.toString(2));  // 111
console.log(num_2.toString(2));  // 111
console.log(Number(num_2));  // 111

// error: console.log(year.toString(100));  2 ~ 36 進数に変換できる
// error: RangeError: toString() radix argument must be between 2 and 36
console.log(parseInt("111", 2));  // 7

// 演算子
// 小数値を整数にする
console.log('===== 小数値を整数にする =====');
const dec: number = 12.34;
const int: number = 1234;
console.log(dec);
console.log(~~dec);  // 12
console.log(dec | 0);  // 12

// 仕組み：小数値を整数にする
const dec_2: string = dec.toString(2);
const dec_2_inv: string = (~dec_2).toString();
const dec_2_inv_inv: string = (~parseFloat(dec_2_inv)).toString();
console.log(dec_2);
console.log(dec_2_inv);
console.log(dec_2_inv_inv);
// console.log(parseInt(num.toString(2), 2).toString(2));
// console.log(~~num.toString(2));
// console.log(~~num);
console.log((2147483647).toString(2).length);
console.log((2147483648).toString(2).length);

// todo: 浮動小数点数のビット反転についての知識が微妙：https://future-architect.github.io/typescript-guide/primitive.html#id11
console.log(~~dec);
console.log(~~int);

// Math オブジェクト
const num = 13.25;
console.log('===== Math object =====');
console.log(num);
console.log('ceil:', Math.ceil(num));
console.log('floor:', Math.floor(num));
console.log(Math.SQRT1_2);
console.log(Math.SQRT2);
console.log(Math.sqrt(2));

// string
const address = `
Tokyo,
Japan
`
const address2 = `Tokyo,
Japan
`

const address3 = `Tokyo,
Japan`

console.log('===== string =====');
console.log(address);
console.log(address2);
console.log(address3);

const emoji = 'これはサロゲートペアのテスト💯❗🕐';
const idx_100 = 14;
const idx_exp = 15;
const idx_clock = 16;
console.log(emoji[idx_100]);
console.log(emoji[idx_exp]);
console.log(emoji[idx_clock]);

console.log('文字コードの正規化');
console.log("ＡＢＣｱｲｳｴｵ㍻".normalize("NFKC"));

console.log(...list);

let favoriteGame: string;
// tsconfig.json のコンパイルオプションで、"strictNullChecks": true だとコンパイルエラーになる
// error: console.log(favoriteGame);
// error: error TS2454: Variable 'favoriteGame' is used before being assigned.

function print(name: string, age?: number) {
    console.log(`name: ${name}, age: ${age || 'empty'}`);
}
print('nukopy');
print('nukopy', 10);

// null と undefined は別物
// error: const a: string | null = undefined;
// error: const b: string | undefined = null;
/*
TSError: ⨯ Unable to compile TypeScript:
src/part2/02_premitive.ts:115:7 - error TS2322: Type 'undefined' is not assignable to type 'string | null'.

115 const a: string | null = undefined;
          ~
src/part2/02_premitive.ts:116:7 - error TS2322: Type 'null' is not assignable to type 'string | undefined'.

116 const b: string | undefined = null;
          ~
*/
