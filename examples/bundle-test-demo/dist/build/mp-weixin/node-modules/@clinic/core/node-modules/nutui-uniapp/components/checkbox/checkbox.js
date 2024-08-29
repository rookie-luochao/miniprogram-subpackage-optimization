'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || l();
const l = () => '../icon/icon.js',
  a = `${e.PREFIX}-checkbox`,
  t = e.defineComponent({
    name: a,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  c = e.defineComponent({
    ...t,
    props: e.checkboxProps,
    emits: e.checkboxEmits,
    setup(l, { emit: t }) {
      const c = l,
        i = t;
      e.useSlots();
      const n = e.useFormDisabled(e.toRef(c, 'disabled')),
        { parent: u } = e.useInject(e.CHECKBOX_KEY),
        o = e.reactive({ partialSelect: c.indeterminate }),
        s = e.computed(() => !!u),
        d = e.computed(() =>
          s.value
            ? null == u
              ? void 0
              : u.value.value.includes(c.label)
            : c.modelValue
        ),
        p = e.computed(() =>
          s.value && (null == u ? void 0 : u.disabled.value)
            ? u.disabled.value
            : n.value
        ),
        h = e.computed(() => !!c.modelValue),
        r = e.computed(() =>
          p.value
            ? 'nut-checkbox__icon--disable'
            : o.partialSelect
              ? 'nut-checkbox__icon--indeterminate'
              : d.value
                ? 'nut-checkbox__icon'
                : 'nut-checkbox__icon--unchecked'
        ),
        v = e.computed(() =>
          e.getMainClass(c, a, { [`${a}--reverse`]: 'left' === c.textPosition })
        ),
        m = e.computed(
          () => `${a}__label ${p.value ? `${a}__label--disabled` : ''}`
        ),
        b = e.computed(
          () =>
            `${a}__button ${d.value && `${a}__button--active`} ${p.value ? `${a}__button--disabled` : ''}`
        );
      let k = '';
      function _(l, a) {
        (k = 'click'), i(e.UPDATE_MODEL_EVENT, l), i(e.CHANGE_EVENT, l, a);
      }
      function f() {
        if (!p.value) {
          if (h.value && o.partialSelect)
            return (o.partialSelect = !1), void _(h.value, c.label);
          if ((_(!h.value, c.label), s.value)) {
            const e = null == u ? void 0 : u.value.value,
              l = null == u ? void 0 : u.max.value,
              { label: a } = c,
              t = e.indexOf(a);
            t > -1
              ? null == e || e.splice(t, 1)
              : t <= -1 && (e.length < l || !l) && (null == e || e.push(a)),
              null == u || u.updateValue(e);
          }
        }
      }
      return (
        e.watch(
          () => c.modelValue,
          (l) => {
            'click' === k ? (k = '') : i(e.CHANGE_EVENT, l);
          }
        ),
        e.watch(
          () => c.indeterminate,
          (e) => {
            o.partialSelect = e;
          }
        ),
        (l, a) =>
          e.e(
            { a: 'button' === l.shape },
            'button' === l.shape
              ? { b: e.n(b.value) }
              : e.e(
                  { c: o.partialSelect },
                  o.partialSelect
                    ? {
                        d: e.p({
                          name: 'check-disabled',
                          size: e.unref(e.pxCheck)(l.iconSize),
                          width: e.unref(e.pxCheck)(l.iconSize),
                          height: e.unref(e.pxCheck)(l.iconSize),
                          'pop-class': r.value,
                        }),
                      }
                    : d.value
                      ? {
                          g: e.p({
                            name: 'checked',
                            size: e.unref(e.pxCheck)(l.iconSize),
                            width: e.unref(e.pxCheck)(l.iconSize),
                            height: e.unref(e.pxCheck)(l.iconSize),
                            'pop-class': r.value,
                          }),
                        }
                      : {
                          f: e.p({
                            name: 'check-normal',
                            size: e.unref(e.pxCheck)(l.iconSize),
                            width: e.unref(e.pxCheck)(l.iconSize),
                            height: e.unref(e.pxCheck)(l.iconSize),
                            'pop-class': r.value,
                          }),
                        },
                  { e: !d.value, h: e.n(m.value) }
                ),
            { i: e.n(v.value), j: e.s(l.customStyle), k: e.o(f) }
          )
      );
    },
  });
wx.createComponent(c);
