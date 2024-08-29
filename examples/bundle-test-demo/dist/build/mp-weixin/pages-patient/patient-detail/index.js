'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/patient-detail/index.js',
  t = e.defineComponent({
    __name: 'index',
    setup(n) {
      const t = e.ref(null);
      return (
        e.onLoad((n) => {
          e.nextTick$1(() => {
            var e;
            null == (e = t.value) || e.pageOnLoad(n);
          });
        }),
        (n, a) => ({ a: e.sr(t, '0cfb94af-0', { k: 'patientDetailRef' }) })
      );
    },
  });
wx.createPage(t);
