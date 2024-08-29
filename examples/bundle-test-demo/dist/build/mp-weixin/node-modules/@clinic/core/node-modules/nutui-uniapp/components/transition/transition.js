'use strict';
const e = require('../../../../../../../common/vendor.js'),
  n = `${e.PREFIX}-transition`,
  s = e.defineComponent({
    name: n,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  o = e.defineComponent({
    ...s,
    props: e.transitionProps,
    emits: e.transitionEmits,
    setup(n, { emit: s }) {
      const o = n,
        t = s,
        {
          display: r,
          classes: i,
          clickHandler: a,
          styles: l,
        } = e.useTransition(o, t);
      return (n, s) =>
        e.e(
          { a: !o.destroyOnClose || e.unref(r) },
          !o.destroyOnClose || e.unref(r)
            ? {
                b: e.n(e.unref(i)),
                c: e.s(e.unref(l)),
                d: e.o((...n) => e.unref(a) && e.unref(a)(...n)),
              }
            : {}
        );
    },
  });
wx.createComponent(o);
