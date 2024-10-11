'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/dispatch-success/index.js',
  s = e.defineComponent({
    __name: 'index',
    setup(n) {
      const s = e.ref(null);
      return (
        e.onLoad((n) => {
          e.nextTick$1(() => {
            var e;
            null == (e = s.value) || e.pageOnLoad(n);
          });
        }),
        e.onShow(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = s.value) || e.pageOnShow();
          });
        }),
        (n, c) => ({ a: e.sr(s, '724f074f-0', { k: 'dispatchSuccessRef' }) })
      );
    },
  });
wx.createPage(s);
