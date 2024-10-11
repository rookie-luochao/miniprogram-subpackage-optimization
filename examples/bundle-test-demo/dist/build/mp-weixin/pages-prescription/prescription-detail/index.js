'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/prescription-detail/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(n) {
      const o = e.ref(null);
      return (
        e.onLoad((n) => {
          e.nextTick$1(() => {
            var e;
            null == (e = o.value) || e.pageOnLoad(n);
          });
        }),
        e.onShow(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = o.value) || e.pageOnShow();
          });
        }),
        (n, a) => ({ a: e.sr(o, '73bead4c-0', { k: 'prescriptionDetailRef' }) })
      );
    },
  });
wx.createPage(o);
