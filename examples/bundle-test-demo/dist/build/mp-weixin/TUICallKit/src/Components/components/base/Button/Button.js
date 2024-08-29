'use strict';
const t = require('../../../../../../common/vendor.js'),
  e = require('../util/classNames.js'),
  i = require('../util/checkEnv.js'),
  o = require('../constants/index.js'),
  n = {
    iconSrc: { type: String },
    iconSize: { type: Number },
    text: { type: String },
    loading: { type: Boolean, default: !1 },
    loadingColor: { type: String, default: '#fff' },
    loadingWidth: { type: String, default: '40px' },
    loadingHeight: { type: String, default: '40px' },
    size: {
      type: String,
      values: ['small', 'middle', 'large'],
      default: 'middle',
    },
    width: { type: String },
    height: { type: String },
    color: { type: String },
    direction: { type: String, values: ['row', 'column'], default: 'row' },
    shape: { type: String, values: ['circle', 'round'] },
    buttonStyle: { type: Object },
    buttonTextStyle: { type: Object },
  };
Math || (r + l)();
const r = () => '../Loading/Loading.js',
  l = () => '../Icon/Icon.js',
  c = t.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Button',
    props: n,
    emits: ['click'],
    setup(n, { emit: r }) {
      const l = n,
        c = `${o.PREFIX}-button--content`,
        a = t.computed(() => ({
          width: l.width,
          height: l.height,
          backgroundColor: l.color,
          flexDirection: l.direction,
          cursor: i.IS_PC ? 'pointer' : 'auto',
          ...l.buttonStyle,
        })),
        d = e.classNames([
          `${o.PREFIX}-button`,
          { [`${o.PREFIX}-${l.shape}`]: l.shape },
          `${o.PREFIX}-button--${l.size}`,
        ]),
        s = r,
        g = (t) => {
          !l.loading && s('click', t);
        };
      return (e, i) =>
        t.e(
          { a: e.loading },
          e.loading
            ? {
                b: t.p({
                  loadingWidth: e.loadingWidth,
                  loadingHeight: e.loadingHeight,
                  color: e.loadingColor,
                }),
              }
            : {},
          { c: e.iconSrc && !e.loading },
          e.iconSrc && !e.loading
            ? { d: t.p({ size: e.iconSize, src: e.iconSrc }) }
            : {},
          { e: e.text },
          e.text
            ? { f: t.t(e.text), g: t.s(e.buttonTextStyle), h: t.n(c) }
            : {},
          { i: t.s(t.unref(a)), j: t.n(t.unref(d)), k: t.o(g) }
        );
    },
  });
wx.createComponent(c);
