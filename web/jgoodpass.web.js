#!/usr/local/bin/node
// #!/usr/local/bin/node
// #!/usr/bin/node

const mod_name = "jgoodpass.web.js";
const func_name = `global`; // <== default, needs to be locally overwritten

//= jgoodpass.web.js
// John's Password Generator (c)2025 John@de-Graaff.net

// inspri:
// https://packages.debian.org/search?keywords=pwgen
// https://packages.debian.org/trixie/pwgen
// https://github.com/tytso/pwgen
// https://github.com/jbernard/pwgen

// - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - .
// imports:

// import { parseArgs } from "node:util";
// import { randomInt } from "node:crypto";

// - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - .

// [script commandline arguments: 1] using: process.argv
// https://nodejs.org/docs/latest/api/process.html
// https://nodejs.org/docs/latest/api/process.html#processargv
//
// const json_file = process.argv[2];
//
// $ cat argv.js
// console.log(process.argv);
// $ node argv.js one two three four five
// [ 'node',
//   '/home/avian/argvdemo/argv.js',
//   'one',
//   'two',
//   'three',
//   'four',
//   'five' ]
//
// console_log_print(func_name, process.argv);

// - - - - - - = = = - - - - - - .

// // [script commandline arguments: 2] using: node:util-parseArgs
// // https://nodejs.org/api/util.html#utilparseargsconfig
// // https://stackoverflow.com/questions/8868381/is-there-a-module-equivalent-of-pythons-argparse-for-node-js
// // " In 18.3.0 nodejs has landed a core addition util.parseArgs([config])
// //   Detailed documentation is available here: https://github.com/pkgjs/parseargs#faqs "
// // https://github.com/pkgjs/parseargs#faqs
// //
// // import { parseArgs } from "node:util";
// // const args = ["-f", "--bar", "b"];
// // const args = process.argv;
// const options = {
//   verbose: {
//     type: "boolean",
//     short: "v",
//     default: false,
//   },
//   length: {
//     type: "string",
//     short: "l",
//     default: "3",
//     post_processing: {
//       type: "integer",
//       min: 2,
//       max: 8,
//     },
//   },
//   charset: {
//     type: "string",
//     short: "c",
//     default: "safe",
//     post_processing: {
//       type: "enum",
//       enum: ["alpha", "safe"],
//     },
//   },
//   punctuation: {
//     type: "string",
//     short: "p",
//     default: "small",
//     post_processing: {
//       type: "enum",
//       enum: ["large", "middle", "small", "none"],
//     },
//   },
// };
// //
// let arg_values = {};
// //
// try {
//   // const { values, positionals } = parseArgs({ args, options });
//   // Prints: [Object: null prototype] { foo: true, bar: 'b' } []
//   //
//   const { values, positionals } = parseArgs({ args: process.argv, options, allowPositionals: true });
//   // console_log_print(func_name, "{values, positionals}", { values, positionals });
//   //
//   // > ./jgoodpass.web.js -v --length 6 firstpositional secondpositional 3
//   // # jgoodpass.web.js:global(): {values, positionals} {
//   //   values: [Object: null prototype] { verbose: true, length: '6' },
//   //   positionals: [
//   //     '/usr/local/bin/node',
//   //     '/Users/jdg/colorprompt/bin/jgoodpass.web.js',
//   //     'firstpositional',
//   //     'secondpositional',
//   //     '3'
//   //   ]
//   // }
//   //
//   arg_values = { ...values };
//   //
//   for (let [key, obj] of Object.entries(options)) {
//     //
//     const arg_value = arg_values?.[key];
//     //
//     if (obj?.post_processing?.type == "integer") {
//       const min = obj?.post_processing?.min ?? 1;
//       const max = obj?.post_processing?.max ?? 100;
//       const int = ~~parseInt(arg_value, 10); // nevers throws, NaN if not-a-integer
//       if (int < min) {
//         throw new Error(`Option ${key} is lower than minimum ${min}`);
//       }
//       if (int > max) {
//         throw new Error(`Option ${key} is higher than maximum ${max}`);
//       }
//       arg_values[key] = int;
//     }
//     //
//     if (obj?.post_processing?.type == "enum") {
//       const this_enum = obj?.post_processing?.enum ?? [];
//       if (!this_enum.includes(arg_value)) {
//         throw new Error(`Option ${key} is not defined in enum-set [${this_enum.join(",")}]`);
//       }
//     }
//   }
//   //
// } catch (ex) {
//   //
//   // console_log_error(func_name, `try-catch-error ex =`, ex);
//   console_log_error(func_name, `Error: ${ex.message}`);
//   process.exit(1);
//   //
// }

let arg_values = {
  length: 3,
  charset: "safe",
  punctuation: "small",
  verbose: false,
};

// - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - .

// const node_env = process.env.NODE_ENV; // undefined if undefined ;-)
// const v_glob_verbose = node_env === "development";
// // const DEBUG_THIS = v_glob_verbose;
const DEBUG_THIS = arg_values.verbose;
//
function console_log_debug(func_name, ...args) {
  // API: const func_name = `console_log_debug`; console_log_debug(func_name, `my_var =`, my_var);
  if (DEBUG_THIS) {
    console.log(`# ${mod_name}:${func_name}()`, ...args);
  }
}
console_log_debug(func_name, `Start`);

function console_log_print(func_name, ...args) {
  // API: const func_name = `console_log_print`; console_log_print(func_name, `my_var =`, my_var);
  console.log(`# ${mod_name}:${func_name}()`, ...args);
}

function console_log_error(func_name, ...args) {
  // API: const func_name = `console_log_error`; console_log_error(func_name, `my_var =`, my_var);
  console.error(`# ${mod_name}:${func_name}()`, ...args);
}
// const f_my_func = () => {
//   const func_name = "f_my_func";
//   // Note: the 'func_name' could also be fetched via this.name (see link) .. BUT .. code monifiers/webpack breaks this!
//   // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
//   console_log_debug(func_name, `start.`);
// };

// - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - .

console_log_debug(func_name, "arg_values =", arg_values);
// > ./jgoodpass.web.js -v
// # jgoodpass.web.js:global(): arg_values = { verbose: true, length: '3' }

// - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - .

// function print_usage() {
//   // https://en.wikipedia.org/wiki/Command-line_interface#Command_description_syntax
//   // <angle>        brackets for required parameters:   ping <hostname>
//   // [square]       brackets for optional parameters:   mkdir [-p] <dirname>
//   // ellipses ...   for repeated items:                 cp <source1> [source2...] <dest>
//   // vertical |     bars for choice of items:           netstat {-t|-u}
//   //
//   console_log_print(func_name, `# Usage: ${mod_name} { <filename.json> | - } `);
// }
// if (!json_file) {
//   print_usage();
//   process.exit(0);
// }

// - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - .
// suport functions:

const f_nr_to_padzero_string = function (nr, digits) {
  // better name: f_pre_padzero_string_to_nr_length(str, nr)
  var padded_str = "00000" + nr;
  return padded_str.substr(-1 * digits);
};

// - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - .

const number_2_power_32 = Math.pow(2, 32); // 4B so 10 digits

function f_get_32bit_random_int() {
  // https://tecadmin.net/generate-random-numbers-in-node-js/
  //
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // "Note: Math.random() does not provide cryptographically secure random numbers. Do not use them for anything related to security. Use the Web Crypto API instead, and more precisely the Crypto.getRandomValues() method."
  //
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  // console.log("Your lucky numbers:");
  // for (const num of array) {
  //   console.log(num);
  // }
  const random_nr = array[0];
  //
  // https://nodejs.org/api/crypto.html#crypto_crypto_randomint_min_max_callback
  // const { randomInt } = await import("node:crypto");
  // import { randomInt } from "node:crypto";
  // const n = randomInt(3);
  // console.log(`Random number chosen from (0, 1, 2): ${n}`);
  //
  // The range (max - min) must be less than 248. min and max must be safe integers.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
  //
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
  // const number_2_power_32 = Math.pow(2, 32); // 4B so 10 digits
  //
  // const random_nr = randomInt(1, number_2_power_32 - 1);
  // const random_nr_10dig = f_nr_to_padzero_string(random_nr, 10);
  // console_log_debug(func_name, `random_nr_10dig = ${random_nr_10dig}`);
  //
  return random_nr;
}

function f_get_random_float_between_0_1() {
  const random_int = f_get_32bit_random_int();
  //
  // https://www.w3schools.com/Js/js_numbers.asp
  // " JavaScript Numbers are Always 64-bit Floating Point
  //  Unlike many other programming languages, JavaScript does not define different types of numbers, like integers, short, long, floating-point etc.
  //  JavaScript numbers are always stored as double precision floating point numbers, following the international IEEE 754 standard.
  //  This format stores numbers in 64 bits, where the number (the fraction) is stored in bits 0 to 51, the exponent in bits 52 to 62, and the sign in bit 63:"
  //
  // Integer Precision
  // Integers (numbers without a period or exponent notation) are accurate up to 15 digits.
  // Example
  // let x = 999999999999999;   // x will be 999999999999999
  // let y = 9999999999999999;  // y will be 10000000000000000
  //
  const random_float = random_int / number_2_power_32;
  console_log_debug(func_name, `random_float = ${random_float}`);
  return random_float;
}

// - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - .

// - V = Vowel = Klinker
// - C = Consonant = Medeklinker
// - D = Digit = Cijfer
// - Letters = Vowels + Consonants
// - Characters = Letters + Digits + Punctuation

const ambigous = `
0 o O
1 i l 
2 z Z
5 s S
9 g    `;

const alpha_set = `
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
`;
const safe_set = `
abcdef h jk mn pqr tuvwxy 
ABCDEFGH JKLMN PQR TUVWXY 
`;
const punct_large_set = "-_+?.,*&^%$#@!;:";
const punct_middle_set = "-_.&^%#!;:";
const punct_small_set = "-_.";

const our_sets = {
  charset: {
    alpha: {
      all: `
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
`
        .split("")
        .filter((c) => !/\s/.test(c)),
      vowels: `
 bcd fgh jklmn pqrst vwxyz
 BCD FGH JKLMN PQRST VWXYZ
`
        .split("")
        .filter((c) => !/\s/.test(c)),
      consonants: `
a   e   i     o     u
A   E   I     O     U
`
        .split("")
        .filter((c) => !/\s/.test(c)),
    },

    safe: {
      all: `
abcdef h jk mn pqr tuvwxy 
ABCDEFGH JKLMN PQR TUVWXY 
`
        .split("")
        .filter((c) => !/\s/.test(c)),
      vowels: `
 bcd f h jk mn pqr t vwxy 
 BCD FGH JKLMN PQR T VWXY 
`
        .split("")
        .filter((c) => !/\s/.test(c)),
      consonants: `
a   e               u
A   E               U
`
        .split("")
        .filter((c) => !/\s/.test(c)),
    },
  },
  punctuation: {
    large: "-_+?.,*&^%$#@!;:".split(""),
    middle: "-_.&^%#!;:".split(""),
    small: "-_.".split(""),
    none: "",
  },
};
// console_log_debug(func_name, `our_sets =`, our_sets);
// console_log_debug(func_name, `our_sets =`, JSON.stringify(our_sets, null, 2));

function f_gen_pwd_string({ length }) {
  //
  const vowels = our_sets.charset[arg_values.charset].vowels;
  const consonants = our_sets.charset[arg_values.charset].consonants;
  const punctuation = our_sets.punctuation[arg_values.punctuation];
  //
  let sections = [];
  for (let i = 0; i < length; i++) {
    const left = f_get_random_float_between_0_1() < 0.5;
    const nr1 = ~~(f_get_random_float_between_0_1() * 10);
    const nr2 = ~~(f_get_random_float_between_0_1() * 10);
    const nr_str = `${nr1}${nr2}`;
    //
    const letter1 = vowels[~~(f_get_random_float_between_0_1() * vowels.length)];
    const letter2 = consonants[~~(f_get_random_float_between_0_1() * consonants.length)];
    const tmp_vowels = vowels.filter((c) => c != letter1);
    const letter3 = tmp_vowels[~~(f_get_random_float_between_0_1() * tmp_vowels.length)];
    const cvc_str = `${letter1}${letter2}${letter3}`;
    //
    const section = left ? nr_str + cvc_str : cvc_str + nr_str;
    sections.push(section);
  }
  //
  // const pwd_str = sections.join("-");
  let pwd_str = "";
  for (let index in sections) {
    const str = sections[index];
    if (index < sections.length - 1) {
      pwd_str += str;
      const punct = punctuation[~~(f_get_random_float_between_0_1() * punctuation.length)];
      pwd_str += punct;
    } else {
      pwd_str += str;
    }
  }
  //
  console_log_debug(func_name, `pwd_str = ${pwd_str}`);
  return pwd_str;
}

// - - - - - - = = = - - - - - - .
//
async function fa_main() {
  // console.log(`start: fa_main()`);
  //
  const pwd_str = f_gen_pwd_string({ length: arg_values.length });
  //
  console_log_print(func_name, `pwd_str = ${pwd_str}`);
  //
  // > ~/colorprompt/bin/jgoodpass.web.js
  // # jgoodpass.web.js:global() pwd_str = QaP26-jeP68_Rar85
  // # jgoodpass.web.js:global() pwd_str = nuG87-nAN47-07vAd
  // # jgoodpass.web.js:global() pwd_str = 31GaF-vAX27.xUQ37
  // # jgoodpass.web.js:global() pwd_str = 84GUB-vEQ57_46tUb
  // # jgoodpass.web.js:global() pwd_str = Qev76.87Xap_61DAq
  // # jgoodpass.web.js:global() pwd_str = pEC10.47Ger.46MUq
  // # jgoodpass.web.js:global() pwd_str = duh97_51kuN-reB63
  // # jgoodpass.web.js:global() pwd_str = yUC19-CEb99_90Had
  // # jgoodpass.web.js:global() pwd_str = Lub35.42LUT.10fuq
  //
}
// fa_main();

// - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - . - - - - - - = = = - - - - - - .
// - - - - - - = = = - - - - - - .
//-eof
