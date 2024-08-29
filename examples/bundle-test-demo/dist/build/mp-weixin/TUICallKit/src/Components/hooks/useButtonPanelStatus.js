'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js'),
  require('../../TUICallService/const/index.js');
const t = require('../context/ButtonPanelContext.js');
exports.useButtonPanelStatus = function () {
  return e.inject(t.ButtonPanelContextKey, { status: e.ref('open') });
};
