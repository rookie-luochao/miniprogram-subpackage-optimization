'use strict';
const e = require('../../../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-range')();
}
Math;
const t = e.defineComponent({
    __name: 'index',
    props: {
      value: { default: 0 },
      title: { default: '' },
      unit: { default: '' },
    },
    emits: ['update:value'],
    setup(t, { emit: a }) {
      const n = t,
        u = e.ref(n.value),
        o = a;
      return (
        e.watch(
          () => u.value,
          (e) => {
            o('update:value', e);
          }
        ),
        (t, a) => ({
          a: e.t(t.title),
          b: e.t(t.value),
          c: e.t(t.unit),
          d: e.o((e) => (u.value = e)),
          e: e.p({
            ...t.$attrs,
            'hidden-range': !0,
            'hidden-tag': !0,
            modelValue: u.value,
          }),
        })
      );
    },
  }),
  a = e._export_sfc(t, [['__scopeId', 'data-v-0ecf6c72']]);
wx.createComponent(a);
