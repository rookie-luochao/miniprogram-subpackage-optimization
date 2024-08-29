'use strict';
const t = require('../../const/index.js'),
  n = require('../../locales/index.js');
function e(e) {
  if ((null == e ? void 0 : e.engineInstance) && !this._tuiCallEngine) {
    const e = `${t.NAME.PREFIX} ${n.t('TUICallKit init is not complete')}`;
    throw (console.error(e), e);
  }
}
exports.statusValidate = function (t) {
  return function (n, i, l) {
    let s = l.value;
    return (
      (l.value = function (...n) {
        return e.call(this, t, n, i), s.apply(this, n);
      }),
      l
    );
  };
};
