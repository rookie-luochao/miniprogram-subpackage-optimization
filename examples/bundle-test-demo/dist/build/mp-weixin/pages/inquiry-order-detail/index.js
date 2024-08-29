'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/inquiry-order-detail/index.js',
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
        e.onPageScroll((n) => {
          e.nextTick$1(() => {
            var e;
            null == (e = r.value) || e.pageOnScroll(n);
          });
        }),
        (n, o) => ({ a: e.sr(r, '5af3a978-0', { k: 'inquiryOrderDetailRef' }) })
      );
    },
  });
(r.__runtimeHooks = 1), wx.createPage(r);
