# jGoodPass

jGoodPass is **John's Good Password Generator** -- combining "hard-to-guess" with "easy-to-remember"

## Our Theory

I found that short (3-letter) 'semi-words' with the pattern 'Vowel-Consonant-Vowel' combined with 2 digits, which together I call a 'section', and then 2 or more sections combined with some connecting-punctuation, is both easy to remember as it is relatively secure.

This is an example of some GoodPassword's generated with `config = { length: 3, charset: 'safe', punctuation: 'small' }` :

```
Qax11-tuT07.74kuH
HUW87-35DEp.50Hef
56bAn_BuV13.29GuJ
34Yaw-11Dab_75daM
10JEm_15qUj-jAN17
jen26-REt41.44fuY
vEX69-rAp02_cEM16
PaX16-58QuG.YUk89
48HAV_Kej58_13puY
TaD34.JUK23-WEq47
03VEY_BeY13-VEY93
91PAW-ReP77-47XUk
hUB91.bAX09-yUr47
nEC73_TEj73-Yut36
51YAm-46kEq_25daf
```

## Disambiguation

In order to prevent errors when people need to read a GoodPassword or communicate it over a telephone-line or such, you can choose to use a 'safe' character-set in which all letters or ommited that look like another letter or like a number.

This is the actual code we use for the character-sets:

```js
const ambigous_items = `
0 o O
1 i l
2 z Z
5 s S
9 g  `;

const token_sets = {
  charset: {
    alpha: {
      vowels: `
   bcd fgh jklmn pqrst vwxyz
   BCD FGH JKLMN PQRST VWXYZ
  `,
      consonants: `
  a   e   i     o     u
  A   E   I     O     U
  `,
    },
    safe: {
      all: `
  abcdef h jk mn pqr tuvwxy
  ABCDEFGH JKLMN PQR TUVWXY
  `,
      vowels: `
   bcd f h jk mn pqr t vwxy
   BCD FGH JKLMN PQR T VWXY
  `,
      consonants: `
  a   e               u
  A   E               U
  `,
    },
  },
  punctuation: {
    large: "-_+?.,*&^%$#@!;:",
    middle: "-_.&^%#!;:",
    small: "-_.",
    none: "",
  },
};
```

## Security of a Password (Generator)

There is a little concern about the "strength" of these GoodPassword's concidering the mentioned disambiguation.

In general one should assume the strength of a password to be the number of possibilities ('option-space') there is when generating a password of a certain length (number of characters).

For example, a password of length `3` where each character is randomly choosen from a certain set, in this case the roman lowercase alphabet `a-z`, which is a set of `size 26`, the number of possibilities or option-space is `26 x 26 x 26 = 17,576`

The way to view this 'option-space' number, or simply the shorthand 'size', is that a hacker would need to guess 'size' options (actually, on average 50% of the 'size'), before finding the correct password.
In cryptography we call this a **brute-force attack**.

How 'difficult' this attack actually is, depends on whether the computer system, for which we need this password, allows many, rapid login attempts in succession. If there are no limits for "maximum wrong password attempts", then a typical modern computer system could test `1 million` password-guesses per second, and then in above 3-letter password would be guessed in `8 milliseconds`!

But, if there is a "maximum wrong password attempts" constraint in the system, such as "10-second waiting after 3 wrong passwords", then the brute-force attack would take on average: `50% change x (17,576 / 3 passwords) x 10 seconds = 29,293 seconds or 8 hours and 8 minutes`.

In Computer (Information, Cryptography) Theory we typically convert the 'option-size' to 'Log2', which we then call 'entropy' and express this in the unit 'bits'.
In above example the entropy is `14,10 bits`.
Meaning, we express entropy as the equivalent number of digital bits (`set = {0, 1}`) and we can calculate the option-space simply with the power of 2: `2 ^ entropy`.
In this case `2^14 = 16,384` (a little less than `17,576` because we rounded the number of bits)

In the code we have included a function `f_calc_entropy_space()` to calculate the entropy of the given configuration.

We include the entropy of this common configuration:

```
config = { length: 3, charset: 'safe', punctuation: 'small' }
entropy_space = 5,443,200
entropy_bits  = 22.38
```

So the example GoodPassword's of above have `22 bits` strength.

For comparison, a 4-digit PIN code, has:
```
entropy_space = 10^4 
entropy_bits = 13.29 bits
```

It is quite difficult to imagine very large numbers, above 1-billion (`10^9`) or the digital equivalent `2^32` (which is roughly 4-billion). <br>
This video has found a very nice way to explain how big a number 2^256 actually is:

URL = https://www.youtube.com/watch?v=S9JGmA5_unY <br>
Title = "How secure is 256 bit security?" from the channel **3Blue1Brown**
