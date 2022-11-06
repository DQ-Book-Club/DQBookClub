/**
 * Returns a random number between 0 and 1 exclusive
 * @param {number} seed The random seed
 * @returns {number} A random number between 0 and 1 exclusive
 * @see https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 */
export function random(seed: number) {
  // "10000, which represents about the minimum amount of digits you must throw away to avoid odd patterns"
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Returns a hash code from a string
 * @param  {string} str The string to hash.
 * @return {number} A 32 bit integer
 * @see https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
export function hashCode(str: any): number {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32 bit integer
  }
  return hash;
}
