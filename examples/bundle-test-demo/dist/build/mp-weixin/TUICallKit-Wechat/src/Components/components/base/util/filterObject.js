'use strict';
exports.filterObject = function (t) {
  const o = {};
  for (const r in t)
    Object.prototype.hasOwnProperty.call(t, r) &&
      void 0 !== t[r] &&
      (o[r] = t[r]);
  return o;
};
