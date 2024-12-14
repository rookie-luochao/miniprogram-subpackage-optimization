'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (o + t)();
const t = () => './components/Dialog/TDialog.js',
  o = () => './components/Transfer/TTransfer.js',
  s = e.defineComponent({
    __name: 'SelectUser',
    props: {
      isRadio: { type: Boolean, default: !1 },
      isNeedSearch: { type: Boolean, default: !1 },
      title: { type: String, default: '' },
      userList: { type: Array, default: () => [] },
      total: { type: Number, default: 0 },
      isPC: { type: Boolean, default: !0 },
    },
    emits: ['confirm', 'cancel', 'search', 'getMore'],
    setup(t, { emit: o }) {
      const s = o,
        a = t,
        i = () => {
          s('cancel');
        },
        r = (e) => {
          s('confirm', e);
        },
        n = (e) => {
          s('search', e);
        },
        c = () => {
          s('getMore');
        };
      return (o, s) => ({
        a: e.o(c),
        b: e.o(n),
        c: e.o(r),
        d: e.o(i),
        e: e.p({
          isSearch: a.isNeedSearch,
          title: a.title,
          list: a.userList,
          isH5: !t.isPC,
          isRadio: a.isRadio,
          total: a.total,
        }),
        f: e.o(i),
        g: e.p({
          isH5: !t.isPC,
          isHeaderShow: !1,
          isFooterShow: !1,
          background: !1,
        }),
      });
    },
  });
wx.createComponent(s);
