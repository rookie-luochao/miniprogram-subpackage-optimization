'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () => '../../node-modules/@clinic/core/src/pages/web-view/index.js',
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
        (n, r) => ({ a: e.sr(o, '2358199d-0', { k: 'webViewRef' }) })
      );
    },
  });
wx.createPage(o);
