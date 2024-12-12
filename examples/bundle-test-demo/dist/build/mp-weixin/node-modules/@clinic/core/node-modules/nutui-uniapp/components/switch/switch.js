'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || t();
const t = () => '../icon/icon.js',
  o = `${e.PREFIX}-switch`,
  a = e.defineComponent({
    name: o,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  i = e.defineComponent({
    ...a,
    props: e.switchProps,
    emits: e.switchEmits,
    setup(t, { emit: a }) {
      const i = t,
        l = a,
        c = e.computed(() => i.disabled || i.disable),
        n = e.useFormDisabled(c),
        s = e.computed(() => i.modelValue === i.activeValue),
        u = e.computed(() =>
          e.getMainClass(i, o, {
            [s.value ? 'nut-switch-open' : 'nut-switch-close']: !0,
            [`${o}-disabled`]: n.value,
            [`${o}-base`]: !0,
          })
        ),
        d = e.computed(() => {
          const t = {
            backgroundColor: s.value ? i.activeColor : i.inactiveColor,
          };
          return e.getMainStyle(i, t);
        });
      let r = '';
      function v(t) {
        if (n.value || i.loading) return;
        const o = s.value ? i.inactiveValue : i.activeValue;
        (r = 'click'), l(e.UPDATE_MODEL_EVENT, o), l(e.CHANGE_EVENT, o, t);
      }
      return (
        e.watch(
          () => i.modelValue,
          (t) => {
            'click' === r ? (r = '') : l(e.CHANGE_EVENT, t);
          }
        ),
        (t, o) =>
          e.e(
            { a: t.loading },
            t.loading
              ? { b: e.p({ name: 'loading1', 'custom-color': t.activeColor }) }
              : {},
            { c: t.activeText },
            t.activeText
              ? {
                  d: e.t(t.activeText),
                  e: s.value ? '' : 1,
                  f: e.t(t.inactiveText),
                  g: s.value ? 1 : '',
                }
              : {},
            { h: e.n(u.value), i: e.s(d.value), j: e.o((...e) => v && v(...e)) }
          )
      );
    },
  });
wx.createComponent(i);
