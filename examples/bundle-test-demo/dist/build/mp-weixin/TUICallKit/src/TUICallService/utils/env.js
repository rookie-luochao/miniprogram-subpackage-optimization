'use strict';
const e = require('../../../../common/vendor.js'),
  o =
    void 0 !== e.wx$1 &&
    'function' == typeof e.wx$1.getSystemInfoSync &&
    Boolean(e.wx$1.getSystemInfoSync().fontSizeSetting),
  i = void 0 !== e.index && void 0 === e.index,
  t = o || i,
  n = void 0 !== e.index,
  d = (void 0 !== e.index || 'undefined' != typeof window) && !t,
  s = o ? e.wx$1 : n ? e.index : window,
  x = (d && window && window.navigator && window.navigator.userAgent) || '',
  r = /Android/i.test(x),
  w = /(?:Windows Phone)/.test(x),
  I = /(?:SymbianOS)/.test(x),
  P = /iPad/i.test(x) || /iPhone/i.test(x) || /iPod/i.test(x),
  S = r || w || I || P,
  _ = d && !S,
  p = _ && x.includes('Windows NT'),
  A = _ && x.includes('Mac');
(exports.APP_NAMESPACE = s),
  (exports.IN_UNI_APP = n),
  (exports.IN_UNI_NATIVE_APP = i),
  (exports.IN_WX_MINI_APP = o),
  (exports.IS_H5 = S),
  (exports.IS_MAC = A),
  (exports.IS_PC = _),
  (exports.IS_WIN = p);
