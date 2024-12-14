'use strict';
const e = require('../../../../../../common/vendor.js');
exports.checkVueVersion = function () {
  let n = 'unknow';
  return (n = e.version.split('.')[0]), { version: e.version, majorVersion: n };
};
