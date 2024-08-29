'use strict';
const e = require('../../../../../../common/vendor.js'),
  i =
    void 0 !== e.wx$1 &&
    'function' == typeof e.wx$1.getSystemInfoSync &&
    Boolean(e.wx$1.getSystemInfoSync().fontSizeSetting),
  n = void 0 !== e.index && void 0 === e.index,
  o = i || n,
  t = (void 0 !== e.index || 'undefined' != typeof window) && !o,
  d = (t && window && window.navigator && window.navigator.userAgent) || '',
  s = /Android/i.test(d),
  w = /(?:Windows Phone)/.test(d),
  r = /(?:SymbianOS)/.test(d),
  x = /iPad/i.test(d) || /iPhone/i.test(d) || /iPod/i.test(d),
  I = s || w || r || x,
  S = t && !I;
S && d.includes('Windows NT'),
  S && d.includes('Mac'),
  (exports.IN_MINI_APP = o),
  (exports.IN_WX_MINI_APP = i),
  (exports.IS_H5 = I),
  (exports.IS_PC = S);
