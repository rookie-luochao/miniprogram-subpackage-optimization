'use strict';
require('../../TUICallService/const/index.js');
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js');
const t = require('../context/CustomUIConfigContext.js');
exports.useCustomUI = function () {
  return e.inject(t.CustomUIConfigContextKey);
};
