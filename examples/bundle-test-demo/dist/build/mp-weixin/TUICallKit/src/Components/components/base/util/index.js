'use strict';
require('./checkEnv.js'),
  require('../../../../../../common/vendor.js'),
  (exports.findTarget = function (e, r) {
    const { key: n, value: t } = r;
    return e.find((e) => e[n] === t);
  });
