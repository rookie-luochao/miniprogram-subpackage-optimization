'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js'),
  require('../../TUICallService/const/index.js');
const t = require('../context/IsClickableContext.js');
exports.useIsClickableContext = function () {
  return e.inject(t.IsClickableContextKey);
};
