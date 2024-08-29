'use strict';
var t = Object.defineProperty,
  a = (a, i, e) => (
    ((a, i, e) => {
      i in a
        ? t(a, i, { enumerable: !0, configurable: !0, writable: !0, value: e })
        : (a[i] = e);
    })(a, 'symbol' != typeof i ? i + '' : i, e),
    e
  );
const i = require('./ChatCall.js'),
  e = require('./ChatTim.js');
const c = new (class {
  constructor() {
    a(this, 'chatTim'),
      a(this, 'chatCall'),
      (this.chatTim = new e.ChatTim()),
      (this.chatCall = new i.ChatCall());
  }
  async init(t) {
    try {
      await this.chatTim.tim.login(t), await this.chatCall.init(t);
    } catch (a) {
      throw a;
    }
  }
  async destroyed() {
    try {
      await this.chatCall.callManger.destroyed();
    } catch (t) {
      throw t;
    }
  }
})();
exports.TCSDK = c;
