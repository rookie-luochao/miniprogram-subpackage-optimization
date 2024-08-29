'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js'),
  require('../../TUICallService/const/index.js');
const r = require('../context/PopoverContext.js');
exports.usePopover = function () {
  return e.inject(r.PopoverContextKey);
};
