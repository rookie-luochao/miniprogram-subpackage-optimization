'use strict';
var i = Object.defineProperty,
  s = (s, t, e) => (
    ((s, t, e) => {
      t in s
        ? i(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
        : (s[t] = e);
    })(s, 'symbol' != typeof t ? t + '' : t, e),
    e
  );
const t = require('../utils/env.js'),
  e = class i {
    constructor() {
      s(this, 'global', t.APP_NAMESPACE),
        s(this, 'isPC', !1),
        s(this, 'isH5', !1),
        s(this, 'isWeChat', !1),
        s(this, 'isApp', !1),
        s(this, 'isUniPlatform', !1),
        s(this, 'isOfficial', !1),
        s(this, 'isWIN', !1),
        s(this, 'isMAC', !1),
        this.initEnv();
    }
    static getInstance() {
      return i.instance || (i.instance = new i()), i.instance;
    }
    initEnv() {
      (this.isPC = t.IS_PC),
        (this.isH5 = t.IS_H5),
        (this.isWeChat = t.IN_WX_MINI_APP),
        (this.isApp = t.IN_UNI_NATIVE_APP && !t.IN_WX_MINI_APP),
        (this.isUniPlatform = t.IN_UNI_APP),
        (this.isWIN = t.IS_WIN),
        (this.isMAC = t.IS_MAC);
    }
    initOfficial(i) {
      this.isOfficial = 1400187352 === i || 1400188366 === i;
    }
  };
s(e, 'instance');
let n = e;
exports.TUIGlobal = n;
