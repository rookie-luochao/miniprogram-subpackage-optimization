'use strict';
const e = require('../../TUICallService/utils/common-utils.js'),
  r = require('../../../../common/vendor.js');
require('../../TUICallService/index.js'),
  require('../../TUICallService/const/index.js');
const t = require('../context/TranslateContext.js');
exports.useTranslate = function () {
  return r.inject(t.translateContextKey, r.ref(e.noop));
};
