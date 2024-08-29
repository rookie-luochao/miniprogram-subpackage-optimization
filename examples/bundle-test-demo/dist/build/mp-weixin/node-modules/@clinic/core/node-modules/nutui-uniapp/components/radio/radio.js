'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || n();
const n = () => '../icon/icon.js',
  a = `${e.PREFIX}-radio`,
  o = e.defineComponent({
    name: a,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  c = e.defineComponent({
    ...o,
    props: e.radioProps,
    setup(n) {
      const o = n,
        { parent: c } = e.useInject(e.RADIO_KEY),
        i = e.useFormDisabled(e.toRef(o, 'disabled')),
        u = e.computed(() => 'left' === c.position.value),
        t = e.computed(() =>
          e.getMainClass(o, a, {
            [`${a}--reverse`]: u.value,
            [`${a}--${o.shape}`]: !0,
          })
        );
      function l() {
        s.value || i.value || c.updateValue(o.label);
      }
      const s = e.computed(() => c.label.value === o.label),
        p = e.computed(() =>
          i.value
            ? 'nut-radio__icon--disable'
            : s.value
              ? 'nut-radio__icon'
              : 'nut-radio__icon--unchecked'
        ),
        h = e.computed(
          () =>
            `${a}__button ${a}__button--${o.size} ${s.value && `${a}__button--active`} ${i.value ? `${a}__button--disabled` : ''}`
        ),
        d = e.computed(
          () => `${a}__label ${i.value ? `${a}__label--disabled` : ''}`
        );
      return (n, a) =>
        e.e(
          { a: 'button' === n.shape },
          'button' === n.shape
            ? { b: e.n(h.value) }
            : u.value
              ? e.e(
                  { d: e.n(d.value), e: !s.value },
                  s.value
                    ? {
                        g: e.p({
                          name: 'check-checked',
                          size: e.unref(e.pxCheck)(n.iconSize),
                          width: e.unref(e.pxCheck)(n.iconSize),
                          height: e.unref(e.pxCheck)(n.iconSize),
                          'pop-class': p.value,
                        }),
                      }
                    : {
                        f: e.p({
                          name: 'check-normal',
                          size: e.unref(e.pxCheck)(n.iconSize),
                          width: e.unref(e.pxCheck)(n.iconSize),
                          height: e.unref(e.pxCheck)(n.iconSize),
                          'pop-class': p.value,
                        }),
                      }
                )
              : e.e(
                  { h: !s.value },
                  s.value
                    ? {
                        j: e.p({
                          name: 'check-checked',
                          size: e.unref(e.pxCheck)(n.iconSize),
                          width: e.unref(e.pxCheck)(n.iconSize),
                          height: e.unref(e.pxCheck)(n.iconSize),
                          'pop-class': p.value,
                        }),
                      }
                    : {
                        i: e.p({
                          name: 'check-normal',
                          size: e.unref(e.pxCheck)(n.iconSize),
                          width: e.unref(e.pxCheck)(n.iconSize),
                          height: e.unref(e.pxCheck)(n.iconSize),
                          'pop-class': p.value,
                        }),
                      },
                  { k: e.n(d.value) }
                ),
          { c: u.value, l: e.n(t.value), m: e.s(n.customStyle), n: e.o(l) }
        );
    },
  });
wx.createComponent(c);
