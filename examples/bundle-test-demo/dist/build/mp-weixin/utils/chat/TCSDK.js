'use strict';
var t = Object.defineProperty,
  a = (a, e, i) => (
    ((a, e, i) => {
      e in a
        ? t(a, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (a[e] = i);
    })(a, 'symbol' != typeof e ? e + '' : e, i),
    i
  );
const e = require('../../common/vendor.js'),
  i = require('./ChatCall.js'),
  s = require('./ChatTim.js');
const h = new (class {
  constructor() {
    a(this, 'chatTim'),
      a(this, 'chatCall'),
      (this.chatTim = new s.ChatTim()),
      (this.chatCall = new i.ChatCall());
  }
  async init(t) {
    try {
      await this.chatTim.tim.login(t), await this.chatCall.init(t);
    } catch (a) {
      throw (
        (e.useAuth().getAuthStatus() ||
          (e.useAuth().setAuthStatus(!0), e.request.handleLoggedOut()),
        a)
      );
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
exports.TCSDK = h;
