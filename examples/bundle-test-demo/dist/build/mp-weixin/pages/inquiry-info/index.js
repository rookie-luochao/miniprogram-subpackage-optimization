'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/inquiry-info/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(n) {
      const o = e.ref(null);
      return (
        e.onShow(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = o.value) || e.pageOnshow();
          });
        }),
        e.onLoad((n) => {
          e.nextTick$1(() => {
            var e;
            null == (e = o.value) || e.pageOnLoad(n);
          });
        }),
        e.onPageScroll((n) => {
          e.nextTick$1(() => {
            var e;
            null == (e = o.value) || e.pageOnScroll(n);
          });
        }),
        (n, i) => ({
          a: e.sr(o, '0ccd5793-0', { k: 'inquiryInfoRef' }),
          b: e.p({
            'is-prescription-auth': !1,
            'is-follow-up-info-required': !1,
            'is-payment': !0,
            'is-open-drug-confirm': !0,
          }),
        })
      );
    },
  });
(o.__runtimeHooks = 1), wx.createPage(o);
