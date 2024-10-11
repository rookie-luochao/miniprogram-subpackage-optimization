'use strict';
const e = require('../../common/vendor.js');
Math || n();
const n = () => '../../node-modules/@clinic/core/src/pages/chat/index.js',
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
        e.onShow(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = a.value) || e.pageOnShow();
          });
        }),
        e.onHide(() => {
          e.nextTick$1(() => {
            var e;
            null == (e = a.value) || e.pageOnHide();
          });
        }),
        e.onUnload(() => {
          var e;
          null == (e = a.value) || e.pageOnHide();
        }),
        (n, o) => ({
          a: e.sr(a, '4d7300f7-0', { k: 'chatRef' }),
          b: e.p({
            'is-prescription-auth': !1,
            'is-show-medical-documents': !1,
          }),
        })
      );
    },
  });
wx.createPage(a);
