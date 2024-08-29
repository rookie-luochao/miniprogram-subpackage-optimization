'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/health-records-edit/index.js',
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
        (n, r) => ({
          a: e.sr(o, '1b94560e-0', { k: 'healthRecordsEditRef' }),
          b: e.p({ 'is-follow-up-info-required': !1 }),
        })
      );
    },
  });
wx.createPage(o);
