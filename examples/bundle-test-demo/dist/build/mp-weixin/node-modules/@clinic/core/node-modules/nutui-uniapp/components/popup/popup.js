'use strict';
const o = require('../../../../../../../common/vendor.js');
Math || (n + s + e)();
const e = () => '../transition/transition.js',
  n = () => '../overlay/overlay.js',
  s = () => '../icon/icon.js',
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
          onClickOverlay: r,
          showSlot: t,
          onClickCloseIcon: i,
          closed: a,
          transitionName: c,
          onOpened: u,
          onClosed: p,
          classes: d,
          popStyle: y,
          onClick: f,
        } = o.usePopup(s, l);
      return (e, n) =>
        o.e(
          { a: e.overlay },
          e.overlay
            ? {
                b: o.o(o.unref(r)),
                c: o.p({
                  visible: e.visible,
                  'close-on-click-overlay': e.closeOnClickOverlay,
                  'z-index': e.zIndex,
                  'lock-scroll': e.lockScroll,
                  duration: e.duration,
                  'overlay-class': e.overlayClass,
                  'overlay-style': e.overlayStyle,
                  'destroy-on-close': e.destroyOnClose,
                  ...e.$attrs,
                }),
              }
            : {},
          { d: o.unref(t) },
          (o.unref(t), {}),
          { e: o.unref(a) },
          o.unref(a)
            ? {
                f: o.p({ name: 'close', height: '12px' }),
                g: o.n(`nut-popup__close-icon--${e.closeIconPosition}`),
                h: o.o((...e) => o.unref(i) && o.unref(i)(...e)),
              }
            : {},
          {
            i: o.o(o.unref(u)),
            j: o.o(o.unref(p)),
            k: o.o(o.unref(f)),
            l: o.p({
              name: o.unref(c),
              'custom-class': o.unref(d),
              show: e.visible,
              'destroy-on-close': e.destroyOnClose,
              'custom-style': o.unref(y),
              duration: Number(e.duration),
            }),
          }
        );
    },
  });
wx.createComponent(t);
