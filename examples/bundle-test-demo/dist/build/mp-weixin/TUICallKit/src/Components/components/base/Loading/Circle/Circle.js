'use strict';
const t = require('../../../../../../../common/vendor.js'),
  e = require('../../constants/index.js'),
  o = {
    width: { type: String, default: '40px' },
    height: { type: String, default: '40px' },
    color: { type: String },
  },
  n = t.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Circle',
    props: o,
    setup(o) {
      const n = o,
        r = t.computed(() => {
          const t = { width: n.width, height: n.height };
          return n.color && (t['--tk-loading-primary-color'] = n.color), t;
        }),
        i = `${e.PREFIX}-loading_circle-container`;
      return (e, o) => ({ a: t.n(i), b: t.s(t.unref(r)) });
    },
  });
wx.createComponent(n);
