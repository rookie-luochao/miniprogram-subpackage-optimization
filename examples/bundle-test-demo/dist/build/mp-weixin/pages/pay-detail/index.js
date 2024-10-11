'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () => '../../node-modules/@clinic/core/src/pages/pay-detail/index.js',
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
        e.onPageShow(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = a.value) || e.pageOnShow();
          });
        }),
        (n, o) => ({ a: e.sr(a, '6abfaa35-0', { k: 'payDetailRef' }) })
      );
    },
  });
wx.createPage(a);
