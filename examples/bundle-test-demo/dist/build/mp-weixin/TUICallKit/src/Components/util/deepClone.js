'use strict';
exports.deepClone = function r(e) {
  if ('object' != typeof e || null === e) return e;
  let t = Array.isArray(e) ? [] : {};
  for (let n in e) e.hasOwnProperty(n) && (t[n] = r(e[n]));
  return t;
};
