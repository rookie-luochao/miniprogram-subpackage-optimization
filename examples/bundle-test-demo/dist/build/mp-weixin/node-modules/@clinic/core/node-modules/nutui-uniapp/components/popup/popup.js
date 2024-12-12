'use strict';
const o = require('../../../../../../../common/vendor.js');
Math || (n + e + s)();
const e = () => '../icon/icon.js',
  n = () => '../overlay/overlay.js',
  s = () => '../transition/transition.js',
  l = `${o.PREFIX}-popup`,
  r = o.defineComponent({
    name: l,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  t = o.defineComponent({
    ...r,
    props: o.popupProps,
    emits: o.popupEmits,
    setup(e, { emit: n }) {
      const s = e,
        l = n,
        {
          classes: r,
          popStyle: t,
          innerIndex: i,
          showSlot: a,
          transitionName: c,
          onClick: u,
          onClickCloseIcon: p,
          onClickOverlay: y,
          onOpened: d,
          onClosed: v,
        } = o.usePopup(s, l),
        m = o.computed(() => Number(s.duration));
      return (e, n) =>
        o.e(
          { a: s.overlay },
          s.overlay
            ? {
                b: o.o(o.unref(y)),
                c: o.p({
                  'overlay-class': s.overlayClass,
                  'overlay-style': s.overlayStyle,
                  visible: s.visible,
                  'z-index': o.unref(i),
                  duration: m.value,
                  'lock-scroll': s.lockScroll,
                  'close-on-click-overlay': s.closeOnClickOverlay,
                  'destroy-on-close': s.destroyOnClose,
                }),
              }
            : {},
          { d: o.unref(a) },
          (o.unref(a), {}),
          { e: s.closeable },
          s.closeable
            ? {
                f: o.p({ name: 'close', height: '12px' }),
                g: o.n(`nut-popup__close-icon--${s.closeIconPosition}`),
                h: o.o((...e) => o.unref(p) && o.unref(p)(...e)),
              }
            : {},
          {
            i: o.o(o.unref(d)),
            j: o.o(o.unref(v)),
            k: o.o(o.unref(u)),
            l: o.p({
              'custom-class': o.unref(r),
              'custom-style': o.unref(t),
              name: o.unref(c),
              show: s.visible,
              duration: m.value,
              'destroy-on-close': s.destroyOnClose,
            }),
          }
        );
    },
  });
wx.createComponent(t);
