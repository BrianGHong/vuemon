/**
 * Given the type, return its corresponding color in hex
 * @param {*} type lowercase string of type
 * @returns corresponding hex color value for type
 */
export function getTypeColor(type) {
  switch (type) {
    case 'bug': return '#A8B81F';
    case 'ghost': return '#705898';
    case 'steel': return '#B8B8D0';
    case 'ice': return '#98D8D8';
    case 'dragon': return '#7038F8';
    case 'dark': return '#705847';
    case 'unknown': return '#111414';
    case 'shadow': return '#111414';
    case 'fire': return '#ED6553';
    case 'grass': return '#53D076';
    case 'water': return '#64B9E9';
    case 'poison': return '#A040A0';
    case 'normal': return '#BBB473';
    case 'flying': return '#DB90F5';
    case 'fighting': return '#BF2F29';
    case 'electric': return '#F8D030';
    case 'fairy': return '#FFBFF1';
    case 'psychic': return '#D053C4';
    case 'ground': return '#E0C068';
    case 'rock': return '#B8A037';
    default: return '#FFF';
  }
}

/**
 * Given a string and a separator (e.g. ", ", "-") return a space-separated
 * string with the first letter of each word capitalized
 * @param {*} originalString original string to be formatted
 * @param {*} separator delimiter to replace
 * @returns formatted string (each word capitalized, separated by spaces)
 */
export function formatString(originalString, separator = '-') {
  if (originalString && separator) {
    return originalString.split(separator)
      .map((word) => word.substring(0, 1).toUpperCase() + word.substring(1))
      .join(' ');
  }
}

// Replaces all "new line" characters contained in `someString` with the given `replacementString`
// credit: https://stackoverflow.com/questions/10805125/how-to-remove-all-line-breaks-from-a-string
export const replaceNewLineChars = ((someString, replacementString = ` `) => { // defaults to just removing
  const LF = `\u{000a}`; // Line Feed (\n)
  const VT = `\u{000b}`; // Vertical Tab
  const FF = `\u{000c}`; // Form Feed
  const CR = `\u{000d}`; // Carriage Return (\r)
  const CRLF = `${CR}${LF}`; // (\r\n)
  const NEL = `\u{0085}`; // Next Line
  const LS = `\u{2028}`; // Line Separator
  const PS = `\u{2029}`; // Paragraph Separator
  const lineTerminators = [LF, VT, FF, CR, CRLF, NEL, LS, PS]; // all Unicode `lineTerminators`
  let finalString = someString && someString.normalize(`NFD`); // better safe than sorry? Or is it?
  for (let lineTerminator of lineTerminators) {
    if (finalString && finalString.includes(lineTerminator)) { // check if the string contains the current `lineTerminator`
      let regex = new RegExp(lineTerminator.normalize(`NFD`), `gu`); // create the `regex` for the current `lineTerminator`
      finalString = finalString.replace(regex, replacementString); // perform the replacement
    };
  };
  return finalString && finalString.normalize(`NFC`); // return the `finalString` (without any Unicode `lineTerminators`)
});