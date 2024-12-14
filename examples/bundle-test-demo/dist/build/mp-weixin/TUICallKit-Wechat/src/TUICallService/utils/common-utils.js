'use strict';
const t = require('../const/index.js'),
  e = require('../TUIGlobal/tuiGlobal.js');
(exports.JSONToObject = function (e) {
  return e &&
    (function (e) {
      if (typeof e === t.NAME.STRING)
        try {
          return !!JSON.parse(e);
        } catch (r) {
          return console.debug(r), !1;
        }
      return !1;
    })(e)
    ? JSON.parse(e)
    : e;
}),
  (exports.formatTime = function (t) {
    const e = Math.floor(t / 3600),
      r = Math.floor((t % 3600) / 60),
      o = Math.floor(t % 60);
    let n = e > 9 ? `${e}` : `0${e}`;
    return (
      (n += r > 9 ? `:${r}` : `:0${r}`), (n += o > 9 ? `:${o}` : `:0${o}`), n
    );
  }),
  (exports.getLanguage = () => {
    if (e.TUIGlobal.getInstance().isWeChat) return 'zh-cn';
    let t = 'en';
    switch (
      (
        (null == navigator ? void 0 : navigator.language) ||
        (null == navigator ? void 0 : navigator.userLanguage) ||
        ''
      ).substr(0, 2)
    ) {
      case 'zh':
        t = 'zh-cn';
        break;
      case 'ja':
        t = 'ja_JP';
        break;
      default:
        t = 'en';
    }
    return t;
  }),
  (exports.getType = function (t) {
    return Object.prototype.toString
      .call(t)
      .match(/^\[object (.*)\]$/)[1]
      .toLowerCase();
  }),
  (exports.handleNoDevicePermissionError = function (t) {
    const { message: e } = t;
    return -1 !== e.indexOf('NotAllowedError: Permission denied');
  }),
  (exports.handleRepeatedCallError = function (t) {
    return (
      -1 !==
      (null == t
        ? void 0
        : t.message.indexOf('is ongoing, please avoid repeated calls'))
    );
  }),
  (exports.interpolate = function (t, e) {
    return t.replace(/{{\s*(\w+)(\s*,\s*[^}]+)?\s*}}/g, (t, r) => {
      const o = r.trim();
      return void 0 !== e[o] ? String(e[o]) : t;
    });
  }),
  (exports.isArray = function (e) {
    return typeof Array.isArray === t.NAME.FUNCTION
      ? Array.isArray(e)
      : Object.prototype.toString
          .call(e)
          .match(/^\[object (.*)\]$/)[1]
          .toLowerCase() === t.NAME.ARRAY;
  }),
  (exports.isBoolean = function (e) {
    return typeof e === t.NAME.BOOLEAN;
  }),
  (exports.isFunction = function (e) {
    return typeof e === t.NAME.FUNCTION;
  }),
  (exports.isNumber = function (e) {
    return (
      null !== e &&
      ((typeof e === t.NAME.NUMBER && !isNaN(e - 0)) ||
        (typeof e === t.NAME.OBJECT && e.constructor === Number))
    );
  }),
  (exports.isPlainObject = function (e) {
    if (typeof e !== t.NAME.OBJECT || null === e) return !1;
    const r = Object.getPrototypeOf(e);
    if (null === r) return !0;
    let o = r;
    for (; null !== Object.getPrototypeOf(o); ) o = Object.getPrototypeOf(o);
    return r === o;
  }),
  (exports.isString = function (e) {
    return typeof e === t.NAME.STRING;
  }),
  (exports.isUndefined = function (e) {
    return typeof e === t.NAME.UNDEFINED;
  }),
  (exports.modifyObjectKey = function (t, e, r) {
    if (!t.hasOwnProperty(e)) return t;
    const o = {};
    return (
      Object.keys(t).forEach((n) => {
        n === e ? (o[r] = t[n]) : (o[n] = t[n]);
      }),
      o
    );
  }),
  (exports.noop = function (t) {}),
  (exports.performanceNow = function () {
    return Date.now();
  });
