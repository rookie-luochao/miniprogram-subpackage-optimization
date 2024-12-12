'use strict';
const e = require('../../common/vendor.js'),
  n = require('../../utils/chat/TCSDK.js');
Math || a();
const a = () => '../../node-modules/@clinic/core/src/pages/settings/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(a) {
      const o = e.ref(null);
      return (
        e.onLoad((a) => {
          e.nextTick$1(() => {
            var e;
            null == (e = o.value) || e.pageOnLoad(a, n.TCSDK);
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
        (n, a) => ({ a: e.sr(o, '76f95f34-0', { k: 'settingsRef' }) })
      );
    },
  });
wx.createPage(o);
