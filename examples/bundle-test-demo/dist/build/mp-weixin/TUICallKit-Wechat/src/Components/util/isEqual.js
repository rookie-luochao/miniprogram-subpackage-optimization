'use strict';
const e = require('./isObject.js'),
  t = (r, s) => {
    if (!e.isObject(r) || !e.isObject(s)) return r === s;
    if (r === s) return !0;
    const i = Object.keys(r),
      n = Object.keys(s);
    if (i.length !== n.length) return !1;
    for (let e in r) {
      if (!t(r[e], s[e])) return !1;
    }
    return !0;
  };
exports.isEqual = t;
