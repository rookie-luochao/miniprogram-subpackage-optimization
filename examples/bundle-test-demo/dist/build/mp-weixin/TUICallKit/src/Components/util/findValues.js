'use strict';
const e = require('./isEmpty.js');
exports.findValues = function t(s, o, i, c, f) {
  Object.keys(s).forEach((n) => {
    const r = s[n],
      y = e.isEmpty(i) ? n : `${i}.${n}`;
    if ('object' == typeof r)
      if (Array.isArray(r))
        for (let e = 0; e < r.length; e++) {
          const s = `${y}.${e}`;
          t(r[e], o, s, c, f);
        }
      else t(r, o, y, c, f);
    else if (o(r)) {
      const e = 'function' == typeof f ? f({ key: r, value: y }) : y;
      c.push(e);
    }
  });
};
