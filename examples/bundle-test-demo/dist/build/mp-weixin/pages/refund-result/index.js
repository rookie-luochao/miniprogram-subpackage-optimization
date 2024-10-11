'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/refund-result/index.js',
  r = e.defineComponent({
    __name: 'index',
    setup(n) {
      const r = e.ref(null);
      return (
        e.onLoad((n) => {
          e.nextTick$1(() => {
            var e;
            null == (e = r.value) || e.pageOnLoad(n);
          });
        }),
        (n, o) => ({ a: e.sr(r, 'f1b016ae-0', { k: 'refundResultRef' }) })
      );
    },
  });
wx.createPage(r);
