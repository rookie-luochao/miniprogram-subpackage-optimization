'use strict';
const t = require('../../../../../../common/vendor.js'),
  e = require('../constants/index.js'),
  o = {
    mode: { type: String, values: ['circle', 'dot'], default: 'circle' },
    loadingWidth: { type: String, default: '40px' },
    loadingHeight: { type: String, default: '40px' },
    color: { type: String },
    text: { type: String },
    layout: { type: String, values: ['row', 'column'], default: 'column' },
  };
Math || (i + n)();
const i = () => './Dot/Dot.js',
  n = () => './Circle/Circle.js',
  d = t.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Loading',
    props: o,
    setup(o) {
      const i = o,
        n = `${e.PREFIX}-loading ${e.PREFIX}-loading--${i.mode}`,
        d = `${e.PREFIX}-loading_text`,
        l = t.computed(() => ({ flexDirection: i.layout }));
      return (e, o) =>
        t.e(
          { a: 'dot' === e.mode },
          'dot' === e.mode
            ? {
                b: t.p({
                  width: e.loadingWidth,
                  height: e.loadingHeight,
                  color: e.color,
                }),
              }
            : {
                c: t.p({
                  width: e.loadingWidth,
                  height: e.loadingHeight,
                  color: e.color,
                }),
              },
          { d: e.text },
          e.text ? { e: t.t(e.text), f: t.n(d) } : {},
          { g: t.n(n), h: t.s(t.unref(l)) }
        );
    },
  });
wx.createComponent(d);
