'use strict';
var a = Object.defineProperty,
  l = (l, e, r) => (
    ((l, e, r) => {
      e in l
        ? a(l, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (l[e] = r);
    })(l, 'symbol' != typeof e ? e + '' : e, r),
    r
  );
const e = require('../../TUICallKit/src/TUICallService/serve/callManager.js');
exports.ChatCall = class {
  constructor() {
    l(this, 'callManger'), (this.callManger = new e.CallManager());
  }
  async init(a) {
    await this.callManger.init({
      sdkAppID: Number('1400642667'),
      globalCallPagePath: 'TUICallKit/src/Components/TUICallKit',
      ...a,
    });
  }
};
