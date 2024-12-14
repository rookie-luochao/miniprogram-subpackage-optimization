'use strict';
exports.classNames = function t(...n) {
  const o = [],
    e = {}.hasOwnProperty;
  for (let i = 0; i < n.length; i++) {
    const s = n[i];
    if (!s) continue;
    const r = typeof s;
    if ('string' === r || 'number' === r) o.push(s);
    else if (Array.isArray(s)) {
      if (s.length) {
        const n = t.apply(null, s);
        n && o.push(n);
      }
    } else if ('object' === r) {
      if (
        s.toString !== Object.prototype.toString &&
        !s.toString.toString().includes('[native code]')
      ) {
        o.push(s.toString());
        continue;
      }
      for (const t in s) e.call(s, t) && s[t] && o.push(t);
    }
  }
  return o.join(' ');
};
