'use strict';
const e = require('../../common/vendor.js'),
  n = require('../../utils/chat/TCSDK.js');
Math || o();
const o = () => '../../node-modules/@clinic/core/src/pages/login/index.js',
  r = e.defineComponent({
    __name: 'index',
    setup(o) {
      const r = e.ref(null);
      return (
        e.onLoad(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = r.value) || e.pageOnLoad(n.TCSDK);
          });
        }),
        (n, o) => ({ a: e.sr(r, '1cde2340-0', { k: 'loginRef' }) })
      );
    },
  });
wx.createPage(r);
