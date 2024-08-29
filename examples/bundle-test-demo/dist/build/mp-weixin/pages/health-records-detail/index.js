'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () =>
    '../../node-modules/@clinic/core/src/pages/health-records-detail/index.js',
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
          a: e.sr(o, '27e45d55-0', { k: 'healthRecordsDetailRef' }),
          b: e.p({ 'is-follow-up-info-required': !1 }),
        })
      );
    },
  });
wx.createPage(o);
