'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (o + t)();
const t = () => './components/Dialog/TDialog.js',
  o = () => './components/Transfer/TTransfer.js',
  a = e.defineComponent({
    __name: 'SelectUser',
    props: {
      isRadio: { type: Boolean, default: !1 },
      isNeedSearch: { type: Boolean, default: !1 },
      title: { type: String, default: '' },
      userList: { type: Array, default: () => [] },
      total: { type: Number, default: 0 },
      isShow: { type: Boolean, default: !1 },
      isPC: { type: Boolean, default: !0 },
    },
    emits: ['complete', 'search', 'getMore', 'update:isShow'],
    setup(t, { emit: o }) {
      const a = o,
        s = t,
        i = e.ref(!1);
      e.watchEffect(() => {
        i.value = s.isShow;
      });
      const r = () => {
          (i.value = !i.value), a('complete', []), a('update:isShow', i.value);
        },
        l = (e) => {
          a('complete', e);
        },
        n = (e) => {
          a('search', e);
        },
        u = () => {
          a('getMore');
        };
      return (o, a) => ({
        a: e.o(u),
        b: e.o(n),
        c: e.o(l),
        d: e.o(r),
        e: e.p({
          isSearch: s.isNeedSearch,
          title: s.title,
          list: s.userList,
          isH5: !t.isPC,
          isRadio: s.isRadio,
          total: s.total,
        }),
        f: e.o(r),
        g: e.p({
          moduleValue: e.unref(i),
          isH5: !t.isPC,
          isHeaderShow: !1,
          isFooterShow: !1,
          background: !1,
        }),
      });
    },
  });
wx.createComponent(a);
