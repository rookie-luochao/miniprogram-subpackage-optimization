'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js');
const r = require('../context/CallerUserInfoContext.js');
require('../../TUICallService/const/index.js'),
  (exports.useCallerUserInfoContext = function () {
    return e.inject(r.CallerUserInfoContextKey);
  });
