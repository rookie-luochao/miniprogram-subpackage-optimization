'use strict';
const e = require('../../../../common/vendor.js'),
  u = require('./useCustomUI.js');
exports.useViewBackgroundConfig = function () {
  const o = u.useCustomUI(),
    r = e.ref(o.value.viewBackground);
  return (
    e.watch(o, () => {
      r.value = o.value.viewBackground;
    }),
    r
  );
};
