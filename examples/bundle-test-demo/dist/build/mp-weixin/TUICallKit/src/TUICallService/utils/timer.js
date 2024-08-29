'use strict';
var t = Object.defineProperty,
  e = (e, a, s) => (
    ((e, a, s) => {
      a in e
        ? t(e, a, { enumerable: !0, configurable: !0, writable: !0, value: s })
        : (e[a] = s);
    })(e, 'symbol' != typeof a ? a + '' : a, s),
    s
  );
const a = require('./common-utils.js'),
  s = require('../const/index.js');
class i {
  static generateTaskID() {
    return this.currentTaskID++;
  }
  static run(t = s.NAME.TIMEOUT, e, i) {
    (i = (s.NAME.INTERVAL, { delay: 2e3, count: 0, backgroundTask: !0, ...i })),
      a.isPlainObject(e) && (i = { ...i, ...e }),
      a.isFunction(t) && ((e = t), (t = s.NAME.TIMEOUT));
    const r = {
      taskID: this.generateTaskID(),
      loopCount: 0,
      intervalID: null,
      timeoutID: null,
      taskName: t,
      callback: e,
      ...i,
    };
    return (
      this.taskMap.set(r.taskID, r),
      t === s.NAME.INTERNAL ? this.interval(r) : this.timeout(r),
      r.taskID
    );
  }
  static interval(t) {
    return (t.intervalID = setInterval(() => {
      t.callback(), (t.loopCount += 1), this.isBreakLoop(t);
    }, t.delay));
  }
  static timeout(t) {
    const e = () => {
      if ((t.callback(), (t.loopCount += 1), !this.isBreakLoop(t)))
        return (t.timeoutID = setTimeout(e, t.delay));
    };
    return (t.timeoutID = setTimeout(e, t.delay));
  }
  static hasTask(t) {
    return this.taskMap.has(t);
  }
  static clearTask(t) {
    if (!this.taskMap.has(t)) return !0;
    const {
      intervalID: e,
      timeoutID: a,
      onVisibilitychange: s,
    } = this.taskMap.get(t);
    return (
      e && clearInterval(e),
      a && clearTimeout(a),
      s && document.removeEventListener('visibilitychange', s),
      this.taskMap.delete(t),
      !0
    );
  }
  static isBreakLoop(t) {
    return (
      !this.taskMap.has(t.taskID) ||
      (0 !== t.count &&
        t.loopCount >= t.count &&
        (this.clearTask(t.taskID), !0))
    );
  }
}
e(i, 'taskMap', new Map()), e(i, 'currentTaskID', 1), (exports.Timer = i);
