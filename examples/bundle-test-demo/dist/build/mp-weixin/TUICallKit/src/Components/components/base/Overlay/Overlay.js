'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../util/classNames.js');
require('../util/checkEnv.js');
const o = require('../constants/index.js'),
  s = {
    show: { type: Boolean, default: !0 },
    showMask: { type: Boolean, default: !0 },
    showBackgroundImage: { type: Boolean, default: !0 },
    blur: { type: Boolean, default: !0 },
    bgColor: { type: String },
    bgImage: { type: String },
    zIndex: { type: Number, default: 11e3 },
    customClass: { type: String },
    customStyle: { type: Object },
    customMaskStyle: { type: Object },
    fit: { type: String, default: 'cover' },
    defaultSrc: { type: String },
  };
Math || r();
const r = () => '../TKImage/TKImage.js',
  a = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Overlay',
    props: s,
    emits: ['click', 'error'],
    setup(s, { emit: r }) {
      const a = s,
        n = r,
        c = t.classNames([`${o.PREFIX}-overlay`, a.customClass]),
        u = `${o.PREFIX}-overlay_mask-container`,
        l = e.computed(() =>
          t.classNames([
            `${o.PREFIX}-overlay_mask`,
            { [`${o.PREFIX}-blur`]: a.blur },
          ])
        ),
        m = `${o.PREFIX}-overlay_slot`,
        i = e.computed(() => ({ zIndex: a.zIndex, ...a.customStyle })),
        d = e.computed(() => ({
          backgroundColor: a.bgColor,
          ...a.customMaskStyle,
        }));
      function g() {
        n('click');
      }
      const p = (e) => {
        n('error', e);
      };
      return (t, o) =>
        e.e(
          { a: t.show },
          t.show
            ? e.e(
                { b: t.showMask },
                t.showMask ? { c: e.n(e.unref(l)), d: e.s(e.unref(d)) } : {},
                { e: t.showBackgroundImage },
                t.showBackgroundImage
                  ? {
                      f: e.o(p),
                      g: e.p({
                        fit: t.fit,
                        src: t.bgImage,
                        width: '100%',
                        height: '100%',
                        defaultSrc: t.defaultSrc,
                      }),
                    }
                  : {},
                {
                  h: e.n(u),
                  i: e.n(m),
                  j: e.n(e.unref(c)),
                  k: e.s(e.unref(i)),
                  l: e.o(g),
                }
              )
            : {}
        );
    },
  });
wx.createComponent(a);
