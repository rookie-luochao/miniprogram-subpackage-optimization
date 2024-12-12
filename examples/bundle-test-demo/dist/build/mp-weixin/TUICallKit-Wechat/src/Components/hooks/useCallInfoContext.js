'use strict';
const e = require('../../../../common/vendor.js'),
  n = require('../context/CallInfoContext.js');
require('../../TUICallService/const/index.js'),
  (exports.useCallInfoContext = function () {
    return e.inject(n.CallInfoContextKey);
  });
