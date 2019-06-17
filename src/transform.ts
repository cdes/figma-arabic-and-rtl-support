import { reshape } from './js-arabic-reshaper';
import direction from 'direction';
import reverse from "reverse-string";
import fixArabicNumbers from 'fix-arabic-numbers';
import isNumber from "is-number";

const isLTR = (str: string) => direction(str) === 'ltr';
const isRTL = (str: string) => direction(str) === 'rtl';
const isNeutral = (str: string) => direction(str) === 'neutral';

const split = (str: string, tokens: Array<string>) => {
  var tempChar = tokens[0]; // We can use the first token as a temporary join character
  for (var i = 1; i < tokens.length; i++){
      str = str.split(tokens[i]).join(tempChar);
  }
  const strArr = str.split(tempChar);
  return strArr;
}

const transform = (str: string, {arabic = true, spaceHack = false, ligatures = false, isolates = false} = {}) => {

  const neutral = str.split('').filter(char => isNeutral(char) && !isNumber(char));
  
  let reversed;

  // A single word, no need to split
  if (neutral.length === 0) {
    reversed = isLTR(str) ? str : reverse(str);
  }
  else {
    reversed = split(str, neutral).map(word => {
      if (isLTR(word) || isNumber(word) || isNumber(fixArabicNumbers(word))) {
        return word;
      }
      else {
        const reshapedWord = arabic ? reshape(word, { ligatures, ignoreIsolates: !isolates }) : word;
        const reverseWord = reverse(reshapedWord);
        return reverseWord;
      }      
    });
  }

  let transformed;

  if (Array.isArray(reversed)) {
    const merged = reversed.map((v,i) => [v, neutral[i]]).reduce((a,b) => a.concat(b));
    transformed = merged.reverse().join('');
  }
  else {
    transformed = reversed;
  }

  if (spaceHack) {
    transformed = transformed.split('').join('\u200a');
  }

  transformed = transformed.split('\n').reverse().join('\n');

  return transformed;
}

export default transform;