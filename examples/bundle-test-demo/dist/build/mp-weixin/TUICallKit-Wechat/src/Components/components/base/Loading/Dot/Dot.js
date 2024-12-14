'use strict';
const t = require('../../../../../../../common/vendor.js'),
  e = require('../../constants/index.js'),
  n = {
    width: { type: String, default: '40px' },
    height: { type: String, default: '40px' },
    color: { type: String },
  },
  o = t.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Dot',
    props: n,
    setup(n) {
      const o = n,
        r = `${e.PREFIX}-loading_dot-container`,
        i = `${e.PREFIX}-loading_dot`,
        s = t.computed(() => ({ width: o.width, height: o.height })),
        d = t.computed(() => {
          const t = {};
          return o.color && (t.backgroundColor = o.color), t;
        });
      return (e, n) => ({
        a: t.n(i),
        b: t.s(t.unref(d)),
        c: t.n(i),
        d: t.s(t.unref(d)),
        e: t.n(i),
        f: t.s(t.unref(d)),
        g: t.n(r),
        h: t.s(t.unref(s)),
      });
    },
  });
wx.createComponent(o);
