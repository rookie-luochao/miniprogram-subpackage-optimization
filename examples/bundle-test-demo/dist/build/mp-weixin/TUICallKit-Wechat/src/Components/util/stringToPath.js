'use strict';
function t(e, c) {
  if ('function' != typeof e || (null != c && 'function' != typeof c))
    throw new TypeError('Expected a function');
  const n = function (...t) {
    const r = c ? c.apply(this, t) : t[0],
      o = n.cache;
    if (o.has(r)) return o.get(r);
    const a = e.apply(this, t);
    return (n.cache = o.set(r, a) || o), a;
  };
  return (n.cache = new (t.Cache || Map)()), n;
}
t.Cache = Map;
const e = '.'.charCodeAt(0),
  c = /\\(\\)?/g,
  n = RegExp(
    '[^.[\\]]+|\\[(?:([^"\'][^[]*)|(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
    'g'
  ),
  r = (function (e) {
    const c = t(e, (t) => {
      const { cache: e } = c;
      return 500 === e.size && e.clear(), t;
    });
    return c;
  })((t) => {
    const r = [];
    return (
      t.charCodeAt(0) === e && r.push(''),
      t.replace(n, (t, e, n, o) => {
        let a = t;
        n ? (a = o.replace(c, '$1')) : e && (a = e.trim()), r.push(a);
      }),
      r
    );
  });
exports.stringToPath = r;
