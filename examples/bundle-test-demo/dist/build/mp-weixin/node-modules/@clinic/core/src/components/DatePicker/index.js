'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('nut-date-picker') + e.resolveComponent('nut-popup'))();
}
Math ||
  (
    (() =>
      '../../../node-modules/nutui-uniapp/components/datepicker/datepicker.js') +
    (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js')
  )();
const t = e.defineComponent({
    __name: 'index',
    props: {
      date: { default: '' },
      disabled: { type: Boolean, default: !1 },
      title: { default: '' },
      placeholder: { default: '请选择日期' },
      minDate: { default: () => new Date(1900, 0, 1) },
      maxDate: { default: () => new Date() },
    },
    emits: ['update:date'],
    setup(t, { emit: a }) {
      const o = t,
        d = e.ref(o.disabled);
      e.watch(
        () => o.disabled,
        (e) => {
          d.value = e;
        }
      );
      const n = e.ref(!1),
        p = e.ref(),
        u = () => {
          d.value || (n.value = !0);
        },
        l = a,
        r = ({ selectedValue: t }) => {
          l('update:date', e.dayjs(t.join('-')).format('YYYY-MM-DD HH:mm:ss')),
            (n.value = !1);
        };
      return (t, a) =>
        e.e(
          { a: t.date },
          t.date
            ? {
                b: e.t(e.unref(e.dayjs)(t.date).format('YYYY-MM-DD')),
                c: d.value ? 1 : '',
              }
            : { d: e.t(t.placeholder) },
          {
            e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102809300973943750201233.png',
            f: e.o(u),
            g: e.o(r),
            h: e.o((e) => (n.value = !1)),
            i: e.o((e) => (p.value = e)),
            j: e.p({
              title: t.title,
              formatter: e.unref(e.pickerDateFormatter),
              'min-date': t.minDate,
              'max-date': t.maxDate,
              modelValue: p.value,
            }),
            k: e.o((e) => (n.value = e)),
            l: e.p({ position: 'bottom', round: !0, visible: n.value }),
          }
        );
    },
  }),
  a = e._export_sfc(t, [['__scopeId', 'data-v-74f3cf1f']]);
wx.createComponent(a);
