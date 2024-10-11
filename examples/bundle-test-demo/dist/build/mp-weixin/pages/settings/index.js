'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () => '../../node-modules/@clinic/core/src/pages/settings/index.js',
  s = e.defineComponent({
    __name: 'index',
    setup(n) {
      const s = e.ref(null);
      return (
        e.onShow(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = s.value) || e.pageOnShow();
          });
        }),
        (n, t) => ({ a: e.sr(s, '756df3fc-0', { k: 'settingsRef' }) })
      );
    },
  });
wx.createPage(s);
