'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || o();
const o = () => '../transition/transition.js',
  t = `${e.PREFIX}-overlay`,
  n = e.defineComponent({
    name: t,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  s = e.defineComponent({
    ...n,
    props: e.overlayProps,
    emits: e.overlayEmits,
    setup(o, { emit: n }) {
      const s = o,
        a = n,
        r = e.computed(() => e.getMainClass(s, t, { [s.overlayClass]: !0 })),
        i = e.computed(() =>
          'number' == typeof s.duration ? s.duration : Number(s.duration)
        ),
        l = e.computed(() =>
          e.getMainStyle(s, {
            transitionDuration: `${i.value}ms`,
            zIndex: s.zIndex,
            ...s.overlayStyle,
          })
        );
      function u(o) {
        a(e.CLICK_EVENT, o),
          s.closeOnClickOverlay && a(e.UPDATE_VISIBLE_EVENT, !1);
      }
      return (o, t) => ({
        a: e.o(u),
        b: e.p({
          'custom-class': r.value,
          'custom-style': l.value,
          show: s.visible,
          name: 'fade',
          duration: i.value,
          'destroy-on-close': s.destroyOnClose,
        }),
      });
    },
  });
wx.createComponent(s);
