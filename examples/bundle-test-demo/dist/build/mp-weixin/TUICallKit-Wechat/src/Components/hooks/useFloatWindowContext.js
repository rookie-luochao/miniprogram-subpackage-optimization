'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js'),
  require('../../TUICallService/const/index.js');
const t = require('../context/FloatWindowContext.js');
exports.useFloatWindowContext = function () {
  return e.inject(t.FloatWindowContextKey);
};
