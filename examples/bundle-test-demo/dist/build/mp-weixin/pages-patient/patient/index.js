'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () => '../../node-modules/@clinic/core/src/pages/patient/index.js',
  t = e.defineComponent({
    __name: 'index',
    setup(n) {
      const t = e.ref(null);
      return (
        e.onShow(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = t.value) || e.pageOnShow();
          });
        }),
        (n, o) => ({ a: e.sr(t, '2a531bd8-0', { k: 'patientRef' }) })
      );
    },
  });
wx.createPage(t);
