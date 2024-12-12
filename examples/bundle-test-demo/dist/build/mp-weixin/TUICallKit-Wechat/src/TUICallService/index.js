'use strict';
const e = require('./CallService/index.js');
require('./const/index.js'), require('./utils/env.js');
const r = e.TUICallService.getInstance();
exports.TUICallKitServer = r;
