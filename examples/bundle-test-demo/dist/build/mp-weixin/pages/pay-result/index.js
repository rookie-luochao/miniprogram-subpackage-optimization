'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () => '../../node-modules/@clinic/core/src/pages/pay-result/index.js',
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
        (n, o) => ({ a: e.sr(a, '3f530b01-0', { k: 'payResultRef' }) })
      );
    },
  });
wx.createPage(a);