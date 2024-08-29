'use strict';
const o = require('../../../../../../../common/vendor.js'),
  e = `${o.PREFIX}-radio-group`,
  t = o.defineComponent({
    name: e,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  s = o.defineComponent({
    ...t,
    props: o.radiogroupProps,
    emits: o.radiogroupEmits,
    setup(t, { emit: s }) {
      const n = t,
        a = s;
      o.useProvide(o.RADIO_KEY)({
        label: o.readonly(o.computed(() => n.modelValue)),
        position: o.readonly(o.computed(() => n.textPosition)),
        updateValue: (e) => a(o.UPDATE_MODEL_EVENT, e),
      });
      const i = o.computed(() =>
        o.getMainClass(n, e, { [`${e}--${n.direction}`]: !0 })
      );
      return (
        o.watch(
          () => n.modelValue,
          (e) => a(o.CHANGE_EVENT, e)
        ),
        (e, t) => ({ a: o.n(i.value), b: o.s(e.customStyle) })
      );
    },
  });
wx.createComponent(s);
