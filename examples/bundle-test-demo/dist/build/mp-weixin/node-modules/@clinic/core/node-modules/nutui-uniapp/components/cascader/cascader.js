'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || (l + t)();
const t = () => '../popup/popup.js',
  l = () => '../cascaderitem/cascaderitem.js',
  o = `${e.PREFIX}-cascader`,
  i = e.defineComponent({
    name: o,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  s = e.defineComponent({
    ...i,
    props: e.cascaderProps,
    emits: e.cascaderEmits,
    setup(t, { emit: l }) {
      const o = t,
        i = l,
        s = e.ref(o.modelValue),
        a = e.computed({
          get: () => o.visible,
          set(t) {
            i(e.UPDATE_VISIBLE_EVENT, t);
          },
        });
      function c(t, l) {
        (s.value = t),
          (a.value = !1),
          i(e.CHANGE_EVENT, t, l),
          i(e.UPDATE_MODEL_EVENT, t);
      }
      function n(e) {
        i('pathChange', e);
      }
      return (
        e.watch(
          () => o.modelValue,
          (e) => {
            e !== s.value && (s.value = e);
          }
        ),
        (t, l) =>
          e.e(
            { a: t.poppable },
            t.poppable
              ? e.e({ b: t.title }, t.title ? { c: t.title } : {}, {
                  d: e.o(c),
                  e: e.o(n),
                  f: e.p({
                    'model-value': s.value,
                    options: t.options,
                    lazy: t.lazy,
                    'lazy-load': t.lazyLoad,
                    'value-key': t.valueKey,
                    'text-key': t.textKey,
                    'children-key': t.childrenKey,
                    'convert-config': t.convertConfig,
                    visible: a.value,
                    'title-ellipsis': t.titleEllipsis,
                    'title-gutter': t.titleGutter,
                    'title-size': t.titleSize,
                    'title-type': t.titleType,
                  }),
                  g: e.o((e) => (a.value = e)),
                  h: e.p({
                    position: 'bottom',
                    'z-index': t.zIndex,
                    'pop-class': 'nut-cascader__popup',
                    round: !0,
                    'custom-class': t.customClass,
                    'custom-style': t.customStyle,
                    closeable: t.closeable,
                    'close-icon': t.closeIcon,
                    'destroy-on-close': !1,
                    'close-icon-position': t.closeIconPosition,
                    'lock-scroll': t.lockScroll,
                    visible: a.value,
                  }),
                })
              : {
                  i: e.o(c),
                  j: e.o(n),
                  k: e.p({
                    'model-value': s.value,
                    options: t.options,
                    lazy: t.lazy,
                    'lazy-load': t.lazyLoad,
                    'value-key': t.valueKey,
                    'text-key': t.textKey,
                    'children-key': t.childrenKey,
                    'convert-config': t.convertConfig,
                    visible: a.value,
                    'title-ellipsis': t.titleEllipsis,
                    'title-gutter': t.titleGutter,
                    'title-size': t.titleSize,
                    'title-type': t.titleType,
                  }),
                }
          )
      );
    },
  });
wx.createComponent(s);
