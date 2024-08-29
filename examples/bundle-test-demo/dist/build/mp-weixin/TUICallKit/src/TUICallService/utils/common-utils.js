'use strict';
const e = require('../const/index.js'),
  t = require('../TUIGlobal/tuiGlobal.js');
(exports.formatTime = function (e) {
  const t = Math.floor(e / 3600),
    r = Math.floor((e % 3600) / 60),
    o = Math.floor(e % 60);
  let n = t > 9 ? `${t}` : `0${t}`;
  return (
    (n += r > 9 ? `:${r}` : `:0${r}`), (n += o > 9 ? `:${o}` : `:0${o}`), n
  );
}),
  (exports.getLanguage = () => {
    if (t.TUIGlobal.getInstance().isWeChat) return 'zh-cn';
    let e = 'en';
    switch (
      (
        (null == navigator ? void 0 : navigator.language) ||
        (null == navigator ? void 0 : navigator.userLanguage) ||
        ''
      ).substr(0, 2)
    ) {
      case 'zh':
        e = 'zh-cn';
        break;
      case 'ja':
        e = 'ja_JP';
        break;
      default:
        e = 'en';
    }
    return e;
  }),
  (exports.getType = function (e) {
    return Object.prototype.toString
      .call(e)
      .match(/^\[object (.*)\]$/)[1]
      .toLowerCase();
  }),
  (exports.handleNoDevicePermissionError = function (e) {
    const { message: t } = e;
    return -1 !== t.indexOf('NotAllowedError: Permission denied');
  }),
  (exports.handleRepeatedCallError = function (e) {
    return (
      -1 !==
      (null == e
        ? void 0
        : e.message.indexOf('is ongoing, please avoid repeated calls'))
    );
  }),
  (exports.isArray = function (t) {
    return typeof Array.isArray === e.NAME.FUNCTION
      ? Array.isArray(t)
      : Object.prototype.toString
          .call(t)
          .match(/^\[object (.*)\]$/)[1]
          .toLowerCase() === e.NAME.ARRAY;
  }),
  (exports.isBoolean = function (t) {
    return typeof t === e.NAME.BOOLEAN;
  }),
  (exports.isFunction = function (t) {
    return typeof t === e.NAME.FUNCTION;
  }),
  (exports.isNumber = function (t) {
    return (
      null !== t &&
      ((typeof t === e.NAME.NUMBER && !isNaN(t - 0)) ||
        (typeof t === e.NAME.OBJECT && t.constructor === Number))
    );
  }),
  (exports.isPlainObject = function (t) {
    if (typeof t !== e.NAME.OBJECT || null === t) return !1;
    const r = Object.getPrototypeOf(t);
    if (null === r) return !0;
    let o = r;
    for (; null !== Object.getPrototypeOf(o); ) o = Object.getPrototypeOf(o);
    return r === o;
  }),
  (exports.isString = function (t) {
    return typeof t === e.NAME.STRING;
  }),
  (exports.isUndefined = function (t) {
    return typeof t === e.NAME.UNDEFINED;
  }),
  (exports.modifyObjectKey = function (e, t, r) {
    if (!e.hasOwnProperty(t)) return e;
    const o = {};
    return (
      Object.keys(e).forEach((n) => {
        n === t ? (o[r] = e[n]) : (o[n] = e[n]);
      }),
      o
    );
  }),
  (exports.performanceNow = function () {
    return Date.now();
  });
