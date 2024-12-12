'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js');
const o = require('../context/UserInfoContextExcludeVolume.js');
exports.useUserInfoExcludeVolumeContext = function () {
  return e.inject(o.UserInfoExcludeVolumeContextKey);
};
