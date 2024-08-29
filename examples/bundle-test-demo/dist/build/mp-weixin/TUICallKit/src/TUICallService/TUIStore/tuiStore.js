'use strict';
var t = Object.defineProperty,
  e = (e, s, a) => (
    ((e, s, a) => {
      s in e
        ? t(e, s, { enumerable: !0, configurable: !0, writable: !0, value: a })
        : (e[s] = a);
    })(e, 'symbol' != typeof s ? s + '' : s, a),
    a
  );
const s = require('../const/index.js'),
  a = require('./callStore.js'),
  i = require('../utils/common-utils.js'),
  r = require('../const/call.js'),
  n = class t {
    constructor() {
      e(this, 'task'),
        e(this, 'storeMap'),
        e(this, 'timerId', -1),
        (this.storeMap = { [r.StoreName.CALL]: new a.CallStore() }),
        (this.task = {});
    }
    static getInstance() {
      return t.instance || (t.instance = new t()), t.instance;
    }
    watch(t, e, a) {
      this.task[t] || (this.task[t] = {});
      const i = this.task[t];
      Object.keys(e).forEach((r) => {
        const n = e[r];
        i[r] || (i[r] = new Map()), i[r].set(n, 1);
        const { notifyRangeWhenWatch: o } = a || {};
        if ((o === s.NAME.ALL && this.notify(t, r), o === s.NAME.MYSELF)) {
          const e = this.getData(t, r);
          n.call(this, e);
        }
      });
    }
    unwatch(t, e) {
      if (!this.task[t]) return;
      const s = this.task[t];
      Object.keys(e).forEach((t) => {
        s[t].delete(e[t]);
      });
    }
    update(t, e, s) {
      var a;
      if (i.isString(s) || i.isNumber(s) || i.isBoolean(s)) {
        if (this.storeMap[t].store[e] === s) return;
      }
      null == (a = this.storeMap[t]) || a.update(e, s), this.notify(t, e);
    }
    getPrevData(t, e) {
      var s;
      return null == (s = this.storeMap[t]) ? void 0 : s.getPrevData(e);
    }
    getData(t, e) {
      var s;
      return null == (s = this.storeMap[t]) ? void 0 : s.getData(e);
    }
    notify(t, e) {
      if (!this.task[t]) return;
      const s = this.task[t];
      if (s[e]) {
        const a = s[e],
          i = this.getData(t, e);
        for (const [t] of a.entries()) t.call(this, i);
      }
    }
    reset(t, e = [], s = !1) {
      if (t in this.storeMap) {
        const a = this.storeMap[t];
        0 === e.length && (e = Object.keys(null == a ? void 0 : a.store)),
          a.reset(e),
          s &&
            e.forEach((e) => {
              this.notify(t, e);
            });
      }
    }
    updateStore(t, e) {
      const s = e || r.StoreName.CALL;
      Object.keys(t).forEach((e) => {
        this.update(s, e, t[e]);
      });
    }
  };
e(n, 'instance');
let o = n;
exports.TUIStore = o;
