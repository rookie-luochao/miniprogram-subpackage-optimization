'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || o();
const o = () => '../icon/icon.js',
  t = `${e.PREFIX}-rate`,
  l = e.defineComponent({
    name: t,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  a = e.defineComponent({
    ...l,
    props: e.rateProps,
    emits: e.rateEmits,
    setup(o, { emit: l }) {
      const a = o,
        n = l,
        s = e.useFormDisabled(e.toRef(a, 'disabled')),
        c = e.getRandomId();
      e.ref([]);
      const m = e.computed(() => e.getMainClass(a, t));
      function u(o, t) {
        if (s.value || a.readonly) return;
        let l = 0;
        (1 === t && a.modelValue === t) ||
          ((l = t), a.allowHalf && 2 === o && (l -= 0.5)),
          (function (o) {
            n(e.UPDATE_MODEL_EVENT, o), n(e.CHANGE_EVENT, o);
          })(l);
      }
      return (o, t) => ({
        a: e.f(Number(o.count), (t, l, n) =>
          e.e(
            {
              a: '2c0c060f-0-' + n,
              b: e.p({
                size: a.size,
                'custom-class':
                  'nut-rate-item__icon ' +
                  (e.unref(s) || t > +o.modelValue
                    ? 'nut-rate-item__icon--disabled'
                    : ''),
                name: o.customIcon,
                'custom-color':
                  t <= +o.modelValue ? o.activeColor : o.voidColor,
              }),
              c: e.o((e) => u(1, t), t),
              d: o.allowHalf && Number(o.modelValue) + 1 > t,
            },
            o.allowHalf && Number(o.modelValue) + 1 > t
              ? {
                  e: e.o((e) => u(2, t), t),
                  f: '2c0c060f-1-' + n,
                  g: e.p({
                    size: a.size,
                    'custom-class': 'nut-rate-item__icon',
                    name: o.customIcon,
                    'custom-color':
                      t <= Number(o.modelValue) + 1
                        ? o.activeColor
                        : o.voidColor,
                  }),
                  h: e.o((e) => u(2, t), t),
                }
              : o.allowHalf && Number(o.modelValue) + 1 < t
                ? {
                    j: '2c0c060f-2-' + n,
                    k: e.p({
                      size: a.size,
                      name: o.customIcon,
                      'custom-class':
                        'nut-rate-item__icon nut-rate-item__icon--disabled',
                      'custom-color': o.voidColor,
                    }),
                    l: e.o((e) => u(2, t), t),
                  }
                : {},
            {
              i: o.allowHalf && Number(o.modelValue) + 1 < t,
              m: `rateRefs-${e.unref(c)}${t}`,
              n: t,
              o: e.s(
                t < Number(o.count)
                  ? { marginRight: e.unref(e.pxCheck)(o.spacing) }
                  : {}
              ),
            }
          )
        ),
        b: e.n(m.value),
        c: e.s(o.customStyle),
      });
    },
  });
wx.createComponent(a);
