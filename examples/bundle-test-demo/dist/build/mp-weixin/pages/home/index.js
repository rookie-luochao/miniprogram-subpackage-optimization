'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () => '../../node-modules/@clinic/core/src/pages/home/index.js',
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
        e.onHide(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = o.value) || e.pageOnHide();
          });
        }),
        (n, c) => ({
          a: e.sr(o, '3571dd29-0', { k: 'homeRef' }),
          b: e.p({
            'main-bg':
              'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717360796831560201240.png',
            'logo-icon':
              'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24070417013882344880201233.png',
          }),
        })
      );
    },
  }),
  c = e._export_sfc(o, [['__scopeId', 'data-v-3571dd29']]);
wx.createPage(c);
