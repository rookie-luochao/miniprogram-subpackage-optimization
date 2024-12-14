'use strict';
var a = Object.defineProperty,
  e = (e, l, t) => (
    ((e, l, t) => {
      l in e
        ? a(e, l, { enumerable: !0, configurable: !0, writable: !0, value: t })
        : (e[l] = t);
    })(e, 'symbol' != typeof l ? l + '' : l, t),
    t
  );
const l = require('../../TUICallKit-Wechat/src/TUICallService/serve/callManager.js');
exports.ChatCall = class {
  constructor() {
    e(this, 'callManger'), (this.callManger = new l.CallManager());
  }
  async init(a) {
    await this.callManger.init({
      sdkAppID: Number('1400822105'),
      globalCallPagePath: 'TUICallKit-Wechat/src/Components/TUICallKit',
      ...a,
    });
  }
};
