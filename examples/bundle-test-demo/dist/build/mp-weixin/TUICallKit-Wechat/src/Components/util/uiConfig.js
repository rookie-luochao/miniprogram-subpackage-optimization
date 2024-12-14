'use strict';
const t = require('./stringToPath.js');
(exports.add = function (n, e, r) {
  if ('object' != typeof n) return;
  const o = t.stringToPath(e);
  let i = n;
  for (let t = 0; t < o.length; t++) {
    if (null == i) return;
    const n = o[t];
    t !== o.length - 1
      ? (i = null == i ? void 0 : i[n])
      : Array.isArray(i) && i.splice(n, 0, r);
  }
}),
  (exports.modify = function (n, e, r) {
    if ('object' != typeof n || !e) return;
    const o = t.stringToPath(e);
    let i = n;
    for (let t = 0; t < o.length; t++) {
      if (null == i) return;
      const n = o[t];
      t !== o.length - 1
        ? (i = null == i ? void 0 : i[n])
        : Object.assign(i, { [n]: r });
    }
  });
