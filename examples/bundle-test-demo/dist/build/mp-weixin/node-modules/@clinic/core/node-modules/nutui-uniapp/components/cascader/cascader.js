'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || (l + t)();
const l = () => '../cascaderitem/cascaderitem.js',
  t = () => '../popup/popup.js',
  o = `${e.PREFIX}-cascader`,
  i = e.defineComponent({
    name: o,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  s = e.defineComponent({
    ...i,
    props: e.cascaderProps,
    emits: e.cascaderEmits,
    setup(l, { emit: t }) {
      const i = l,
        s = t,
        a = e.useSlots(),
        n = e.ref(i.modelValue),
        c = e.computed({
          get: () => i.visible,
          set(l) {
            s(e.UPDATE_VISIBLE_EVENT, l);
          },
        }),
        p = e.computed(() => e.getMainClass(i, o)),
        u = e.computed(() => `${o}__popup ${i.popClass}`),
        r = e.computed(() => `${o}__overlay ${i.overlayClass}`);
      function y(l, t) {
        (n.value = l),
          (c.value = !1),
          s(e.UPDATE_MODEL_EVENT, l),
          s(e.CHANGE_EVENT, l, t);
      }
      function v(e) {
        s('pathChange', e);
      }
      function d() {
        s(e.OPEN_EVENT);
      }
      function E() {
        s(e.OPENED_EVENT);
      }
      function m() {
        s(e.CLOSE_EVENT);
      }
      function f() {
        s(e.CLOSED_EVENT);
      }
      return (
        e.watch(
          () => i.modelValue,
          (e) => {
            e !== n.value && (n.value = e);
          }
        ),
        (l, t) =>
          e.e(
            { a: i.poppable },
            i.poppable
              ? e.e(
                  { b: e.unref(a).title },
                  e.unref(a).title
                    ? {}
                    : e.e({ c: i.title }, i.title ? { d: i.title } : {}),
                  {
                    e: e.o(y),
                    f: e.o(v),
                    g: e.p({
                      'model-value': n.value,
                      visible: c.value,
                      options: i.options,
                      lazy: i.lazy,
                      'lazy-load': i.lazyLoad,
                      'value-key': i.valueKey,
                      'text-key': i.textKey,
                      'children-key': i.childrenKey,
                      'convert-config': i.convertConfig,
                      'title-type': i.titleType,
                      'title-size': i.titleSize,
                      'title-gutter': i.titleGutter,
                      'title-ellipsis': i.titleEllipsis,
                    }),
                    h: e.o(d),
                    i: e.o(E),
                    j: e.o(m),
                    k: e.o(f),
                    l: e.o((e) => (c.value = e)),
                    m: e.p({
                      'custom-class': u.value,
                      'custom-style': i.popStyle,
                      'overlay-class': r.value,
                      'overlay-style': i.overlayStyle,
                      position: 'bottom',
                      round: !0,
                      closeable: i.closeable,
                      'close-icon': i.closeIcon,
                      'close-icon-position': i.closeIconPosition,
                      'z-index': i.zIndex,
                      'lock-scroll': i.lockScroll,
                      overlay: i.overlay,
                      'close-on-click-overlay': i.closeOnClickOverlay,
                      'destroy-on-close': !1,
                      visible: c.value,
                    }),
                  }
                )
              : {
                  n: e.o(y),
                  o: e.o(v),
                  p: e.p({
                    'model-value': n.value,
                    visible: c.value,
                    options: i.options,
                    lazy: i.lazy,
                    'lazy-load': i.lazyLoad,
                    'value-key': i.valueKey,
                    'text-key': i.textKey,
                    'children-key': i.childrenKey,
                    'convert-config': i.convertConfig,
                    'title-type': i.titleType,
                    'title-size': i.titleSize,
                    'title-gutter': i.titleGutter,
                    'title-ellipsis': i.titleEllipsis,
                  }),
                },
            { q: e.n(p.value), r: e.s(i.customStyle) }
          )
      );
    },
  });
wx.createComponent(s);
