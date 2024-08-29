'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js'),
  require('../../TUICallService/const/index.js');
const t = require('../context/FocusItemContext.js');
exports.useFocusContext = function () {
  return e.inject(t.FocusContextKey, e.ref('open'));
};
