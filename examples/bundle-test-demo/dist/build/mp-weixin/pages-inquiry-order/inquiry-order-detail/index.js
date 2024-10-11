'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/inquiry-order-detail/index.js',
  a = e.defineComponent({
    __name: 'index',
    setup(n) {
      const a = e.ref(null);
      return (
        e.onLoad((n) => {
          e.nextTick$1(() => {
            var e;
            null == (e = a.value) || e.pageOnLoad(n);
          });
        }),
        e.onShow(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = a.value) || e.pageOnShow();
          });
        }),
        e.onPageScroll((n) => {
          e.nextTick$1(() => {
            var e;
            null == (e = a.value) || e.pageOnScroll(n);
          });
        }),
        e.onHide(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = a.value) || e.pageOnHide();
          });
        }),
        e.onUnload(() => {
          var e;
          null == (e = a.value) || e.pageOnHide();
        }),
        (n, l) => ({
          a: e.sr(a, '5738913a-0', { k: 'inquiryOrderDetailRef' }),
          b: e.p({ 'is-payment': !0 }),
        })
      );
    },
  });
(a.__runtimeHooks = 1), wx.createPage(a);
