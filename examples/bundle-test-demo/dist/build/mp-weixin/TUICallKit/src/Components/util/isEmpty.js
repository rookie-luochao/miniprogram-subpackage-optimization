'use strict';
exports.isEmpty = function (t) {
  return (
    null == t ||
    ('string' == typeof t && 0 === t.trim().length) ||
    (!(!Array.isArray(t) && 'object' != typeof t) &&
      0 === Object.keys(t).length)
  );
};
