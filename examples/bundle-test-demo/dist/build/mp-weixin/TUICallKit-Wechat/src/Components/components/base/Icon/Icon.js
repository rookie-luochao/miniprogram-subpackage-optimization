'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = { src: { type: String }, size: { type: Number, default: 20 } };
Math || n();
const n = () => '../TKImage/TKImage.js',
  o = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Icon',
    props: t,
    setup(t) {
      const n = t,
        o = e.computed(() => `${n.size}px`),
        s = e.computed(() => `${n.size}px`);
      return (t, n) => ({
        a: e.p({ src: t.src, width: e.unref(o), height: e.unref(s) }),
      });
    },
  });
wx.createComponent(o);
