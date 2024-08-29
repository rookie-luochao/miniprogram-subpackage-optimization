'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../util/classNames.js');
require('../util/checkEnv.js');
const r = require('../constants/index.js'),
  s = {
    icon: { type: String },
    size: { type: [Number, String], default: 100 },
    shape: { type: String, values: ['circle', 'square'], default: 'square' },
    src: { type: String },
    defaultSrc: { type: String },
    text: { type: String },
    fit: {
      type: String,
      values: ['fill', 'contain', 'cover'],
      default: 'cover',
    },
    customClass: { type: String },
  };
Math || a();
const a = () => '../TKImage/TKImage.js',
  n = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Avatar',
    props: s,
    setup(s) {
      const a = s,
        n = e.ref('');
      e.watch(
        () => a.src,
        () => {
          n.value = a.src;
        },
        { immediate: !0 }
      );
      const i = e.computed(() =>
          t.classNames([
            `${r.PREFIX}-avatar`,
            `${r.PREFIX}-avatar--${a.shape}`,
            `${r.PREFIX}-avatar--${a.size}`,
            a.customClass,
          ])
        ),
        u = e.computed(() =>
          'number' == typeof a.size ? `${a.size}px` : a.size
        ),
        c = e.computed(() =>
          'number' == typeof a.size ? `${a.size}px` : a.size
        ),
        o = e.computed(() => ({ width: u.value, height: c.value }));
      function p(e) {
        console.error(e), a.defaultSrc && (n.value = a.defaultSrc);
      }
      return (t, r) =>
        e.e(
          { a: e.unref(n) },
          e.unref(n)
            ? {
                b: e.o(p),
                c: e.p({
                  fit: t.fit,
                  width: e.unref(u),
                  height: e.unref(c),
                  src: e.unref(n),
                }),
              }
            : {},
          { d: e.n(e.unref(i)), e: e.s(e.unref(o)) }
        );
    },
  });
wx.createComponent(n);
