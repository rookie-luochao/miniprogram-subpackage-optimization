'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () => '../../node-modules/@clinic/core/src/pages/add-drug/index.js',
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
        (n, o) => ({ a: e.sr(a, '5f1abfeb-0', { k: 'addDrugRef' }) })
      );
    },
  });
wx.createPage(a);
