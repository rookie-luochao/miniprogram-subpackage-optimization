'use strict';
const e = require('../../../../../../../common/vendor.js'),
  o = `${e.PREFIX}-icon`,
  n = e.defineComponent({
    name: o,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  t = e.defineComponent({
    ...n,
    props: e.iconProps,
    emits: e.iconEmits,
    setup(n, { emit: t }) {
      const s = n,
        a = t;
      function i(o) {
        a(e.CLICK_EVENT, o);
      }
      const c = e.computed(() => !!s.name && s.name.includes('/')),
        l = e.computed(() => {
          const n = {};
          return (
            c.value
              ? (n[`${o}__img`] = !0)
              : ((n[s.fontClassName] = !0),
                (n[`${s.classPrefix}-${s.name}`] = !0),
                (n[s.popClass] = !0)),
            e.getMainClass(s, o, n)
          );
        }),
        u = e.computed(() => {
          const o = {
            color: s.customColor,
            fontSize: e.pxCheck(s.size),
            width: e.pxCheck(s.width),
            height: e.pxCheck(s.height),
          };
          return e.getMainStyle(s, o);
        });
      return (o, n) =>
        e.e(
          { a: c.value },
          c.value
            ? { b: e.n(l.value), c: e.s(u.value), d: o.name, e: e.o(i) }
            : { f: e.n(l.value), g: e.s(u.value), h: e.o(i) }
        );
    },
  });
wx.createComponent(t);
