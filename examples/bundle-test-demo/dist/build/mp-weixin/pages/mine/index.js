'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () => '../../node-modules/@clinic/core/src/pages/mine/index.js',
  c = e.defineComponent({
    __name: 'index',
    setup(n) {
      const c = e.ref(null);
      return (
        e.onShow(async () => {
          e.nextTick$1(() => {
            var e;
            null == (e = c.value) || e.pageOnShow();
          });
        }),
        (n, s) => ({
          a: e.sr(c, '8d82579c-0', { k: 'mineRef' }),
          b: e.p({ 'is-customer-service-center': !1 }),
        })
      );
    },
  });
wx.createPage(c);
