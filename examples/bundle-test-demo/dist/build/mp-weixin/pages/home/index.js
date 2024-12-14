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
        e.onUnload(() => {
          var e;
          null == (e = o.value) || e.pageOnHide();
        }),
        (n, a) => ({ a: e.sr(o, '3c069680-0', { k: 'homeRef' }) })
      );
    },
  });
wx.createPage(o);
