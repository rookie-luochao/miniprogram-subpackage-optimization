'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('nut-picker') + e.resolveComponent('nut-popup'))();
}
Math ||
  (
    (() => '../../../node-modules/nutui-uniapp/components/picker/picker.js') +
    (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js')
  )();
const o = e.defineComponent({
    __name: 'index',
    props: {
      value: { default: '' },
      title: { default: '' },
      columns: { default: () => [] },
      disabled: { type: Boolean, default: !1 },
      placeholder: { default: '请选择' },
    },
    emits: ['update:value'],
    setup(o, { emit: t }) {
      const u = o,
        a = e.ref(u.disabled);
      e.watch(
        () => u.disabled,
        (e) => {
          a.value = e;
        }
      );
      const p = e.ref(!1),
        l = () => {
          a.value || (p.value = !0);
        },
        n = t,
        s = ({ selectedOptions: e }) => {
          n('update:value', e[0].value), (p.value = !1);
        };
      return (o, t) =>
        e.e(
          { a: o.value },
          o.value
            ? { b: e.t(o.value), c: a.value ? 1 : '' }
            : { d: e.t(o.placeholder) },
          {
            e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111116204222179200201233.png',
            f: e.o(l),
            g: e.o(s),
            h: e.o((e) => (p.value = !1)),
            i: e.p({ columns: o.columns, title: o.title }),
            j: e.o((e) => (p.value = e)),
            k: e.p({ position: 'bottom', round: !0, visible: p.value }),
          }
        );
    },
  }),
  t = e._export_sfc(o, [['__scopeId', 'data-v-a5c10ad5']]);
wx.createComponent(t);
