'use strict';
var e = Object.defineProperty,
  a = (a, t, l) => (
    ((a, t, l) => {
      t in a
        ? e(a, t, { enumerable: !0, configurable: !0, writable: !0, value: l })
        : (a[t] = l);
    })(a, 'symbol' != typeof t ? t + '' : t, l),
    l
  );
const t = require('../../../../common/vendor.js'),
  l = require('../index.js'),
  r = require('../const/index.js'),
  s = require('../utils/validate/avoidRepeatedCall.js');
require('../utils/validate/validateParams.js'),
  require('../utils/validate/validateConfig.js');
const i = require('../CallService/index.js'),
  o = require('../utils/env.js'),
  n = require('../const/call.js');
var c = Object.defineProperty,
  h = Object.getOwnPropertyDescriptor;
const u = 'callManager';
class g {
  constructor() {
    a(this, '_globalCallPagePath', ''),
      a(this, '_handleCallStatusChange', async (e) => {
        switch (e) {
          case n.CallStatus.CALLING:
          case n.CallStatus.CONNECTED:
            this._handleCallStatusToCalling();
            break;
          case n.CallStatus.IDLE:
            this._handleCallStatusToIdle();
        }
      });
  }
  async init(e) {
    const {
      sdkAppID: a,
      userID: t,
      userSig: r,
      globalCallPagePath: s,
      tim: i,
    } = e;
    if (s) {
      this._globalCallPagePath = s;
      try {
        await l.TUICallKitServer.init({
          sdkAppID: a,
          userID: t,
          userSig: r,
          tim: i,
        }),
          this._watchTUIStore(),
          o.IN_WX_MINI_APP || l.TUICallKitServer.enableFloatWindow(!1),
          console.log(`${u} init Ready!`);
      } catch (n) {
        throw (console.error(`${u} init fail!`, n), n);
      }
    } else console.error(`${u} globalCallPagePath Can not be empty!`);
  }
  _watchTUIStore() {
    var e;
    null == (e = i.TUIStore) ||
      e.watch(
        n.StoreName.CALL,
        { [r.NAME.CALL_STATUS]: this._handleCallStatusChange },
        { notifyRangeWhenWatch: r.NAME.MYSELF }
      );
  }
  _unwatchTUIStore() {
    var e;
    null == (e = i.TUIStore) ||
      e.unwatch(n.StoreName.CALL, {
        [r.NAME.CALL_STATUS]: this._handleCallStatusChange,
      });
  }
  _handleCallStatusToCalling() {
    this.getRoute() !== this._globalCallPagePath &&
      t.wx$1.navigateTo({
        url: `/${this._globalCallPagePath}`,
        success: () => {},
        fail: () => {
          console.error(`${u} navigateTo fail!`);
        },
        complete: () => {},
      });
  }
  _handleCallStatusToIdle() {
    this.getRoute() === this._globalCallPagePath &&
      t.wx$1.navigateBack({
        success: () => {},
        fail: () => {
          console.error(`${u} navigateBack fail!`);
        },
        complete: () => {},
      });
  }
  getRoute() {
    const e = getCurrentPages();
    return e[e.length - 1].route;
  }
  async destroyed() {
    (this._globalCallPagePath = ''),
      this._unwatchTUIStore(),
      await l.TUICallKitServer.destroyed();
  }
}
((e, a, t, l) => {
  for (var r, s = h(a, t), i = e.length - 1; i >= 0; i--)
    (r = e[i]) && (s = r(a, t, s) || s);
  s && c(a, t, s);
})([s.avoidRepeatedCall()], g.prototype, 'init'),
  (exports.CallManager = g);
