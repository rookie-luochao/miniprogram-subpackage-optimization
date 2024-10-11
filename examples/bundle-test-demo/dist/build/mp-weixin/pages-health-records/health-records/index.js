'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/health-records/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(n) {
      const o = e.ref(null);
      return (
        e.onShow(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = o.value) || e.pageOnShow();
          });
        }),
        (n, r) => ({ a: e.sr(o, '7e669c68-0', { k: 'healthRecordsRef' }) })
      );
    },
  });
wx.createPage(o);
