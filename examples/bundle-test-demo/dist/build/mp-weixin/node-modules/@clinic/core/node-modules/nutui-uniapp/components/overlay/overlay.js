'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || o();
const o = () => '../transition/transition.js',
  t = `${e.PREFIX}-overlay`,
  s = e.defineComponent({
    name: t,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  n = e.defineComponent({
    ...s,
    props: e.overlayProps,
    emits: e.overlayEmits,
    setup(o, { emit: s }) {
      const n = o,
        a = s,
        r = e.computed(() => e.getMainClass(n, t, { [n.overlayClass]: !0 })),
        i = e.computed(() =>
          e.getMainStyle(n, {
            transitionDuration: `${n.duration}ms`,
            zIndex: +n.zIndex,
            ...n.overlayStyle,
          })
        );
      function l(o) {
        a(e.CLICK_EVENT, o),
          n.closeOnClickOverlay && a(e.UPDATE_VISIBLE_EVENT, !1);
      }
      return (o, t) => ({
        a: e.o(l),
        b: e.p({
          show: o.visible,
          name: 'fade',
          'custom-style': i.value,
          'custom-class': r.value,
          duration: Number(n.duration),
          'destroy-on-close': n.destroyOnClose,
        }),
      });
    },
  });
wx.createComponent(n);
