'use strict';
const r = require('./common-utils.js');
exports.isEmpty = function (t) {
  if (null == t) return !0;
  if ('boolean' == typeof t) return !1;
  if ('number' == typeof t) return 0 === t;
  if ('string' == typeof t) return 0 === t.length;
  if ('function' == typeof t) return 0 === t.length;
  if (Array.isArray(t)) return 0 === t.length;
  if (t instanceof Error) return '' === t.message;
  if (r.isPlainObject(t)) {
    for (const r in t)
      if (Object.prototype.hasOwnProperty.call(t, r)) return !1;
    return !0;
  }
  return !1;
};
