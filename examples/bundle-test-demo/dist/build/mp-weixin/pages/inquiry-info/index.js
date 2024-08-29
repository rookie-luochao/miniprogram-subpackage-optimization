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
        (n, r) => ({
          a: e.sr(o, '7d20a87c-0', { k: 'inquiryInfoRef' }),
          b: e.p({ 'is-follow-up-info-required': !1 }),
        })
      );
    },
  });
(o.__runtimeHooks = 1), wx.createPage(o);
