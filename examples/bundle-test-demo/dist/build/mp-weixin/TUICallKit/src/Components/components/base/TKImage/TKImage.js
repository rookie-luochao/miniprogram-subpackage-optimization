'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../util/classNames.js'),
  r = require('../util/checkEnv.js'),
  n = require('../constants/index.js'),
  u = { fill: 'scaleToFill', contain: 'aspectFit', cover: 'aspectFill' },
  i = {
    width: { type: String, default: '320px' },
    height: { type: String, default: '240px' },
    src: { type: String },
    fit: {
      type: String,
      values: ['fill', 'contain', 'cover'],
      default: 'fill',
    },
    customStyle: { type: Object },
    defaultSrc: { type: String },
  },
  c = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'TKImage',
    props: i,
    emits: { error: (e) => e },
    setup(i, { emit: c }) {
      const s = i,
        a = c,
        f = e.ref(!1),
        l = e.ref(s.src);
      e.watch(
        () => s.src,
        () => {
          (f.value = !1), (l.value = s.src);
        }
      );
      const o = e.computed(() => t.classNames([`${n.PREFIX}-image`])),
        m = e.computed(() => ({
          width: s.width,
          height: s.height,
          ...s.customStyle,
        })),
        p = e.computed(() => t.classNames([`${n.PREFIX}-image_inner`])),
        d = e.computed(() => (r.IN_WX_MINI_APP ? u[s.fit] || u.cover : s.fit));
      function I(e) {
        (f.value = !0), (l.value = s.defaultSrc), a('error', e);
      }
      return (t, n) =>
        e.e(
          { a: e.unref(f) && !t.defaultSrc },
          e.unref(f) && !t.defaultSrc
            ? {}
            : e.e(
                { b: !e.unref(r.IN_WX_MINI_APP) },
                e.unref(r.IN_WX_MINI_APP)
                  ? {}
                  : {
                      c: e.n(e.unref(p)),
                      d: e.unref(l),
                      e: e.unref(d),
                      f: e.o(I),
                    },
                { g: e.unref(r.IN_WX_MINI_APP) },
                e.unref(r.IN_WX_MINI_APP)
                  ? {
                      h: e.n(e.unref(p)),
                      i: e.unref(l),
                      j: e.unref(d),
                      k: e.o(I),
                    }
                  : {}
              ),
          { l: e.n(e.unref(o)), m: e.s(e.unref(m)) }
        );
    },
  });
wx.createComponent(c);
