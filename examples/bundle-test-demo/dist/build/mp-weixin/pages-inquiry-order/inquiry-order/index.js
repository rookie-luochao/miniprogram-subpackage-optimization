'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/inquiry-order/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(n) {
      const o = e.ref(null);
      return (
        e.onReachBottom(() => {
          var e;
          null == (e = o.value) || e.pageOnReachBottom();
        }),
        e.onShow(async () => {
          e.nextTick$1(() => {
            var e;
            null == (e = o.value) || e.pageOnShow();
          });
        }),
        (n, r) => ({
          a: e.sr(o, '6017954c-0', { k: 'inquiryOrderRef' }),
          b: e.p({ 'is-payment': !0 }),
        })
      );
    },
  });
wx.createPage(o);
