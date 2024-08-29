'use strict';
const e = require('../../../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math ||
  (
    o +
    (() => '../../../../../node-modules/nutui-uniapp/components/popup/popup.js')
  )();
const o = () => '../../../add-drug/components/DrugItem/index.js',
  n = e.defineComponent({
    __name: 'index',
    setup(o, { expose: n }) {
      const s = e.ref(!1),
        u = e.ref([]);
      return (
        n({
          openModal: (e) => {
            console.log(e), (s.value = !0), (u.value = e.drugList);
          },
        }),
        (o, n) => ({
          a: e.f(u.value, (o, n, s) => ({
            a: '9ff784da-1-' + s + ',9ff784da-0',
            b: e.p({
              'drug-info': o,
              'is-show-operate': !1,
              'is-show-drug-count': !0,
            }),
            c: o.keyID,
          })),
          b: e.o((e) => (s.value = !1)),
          c: e.o((e) => (s.value = e)),
          d: e.p({
            'custom-style': { borderRadius: '12px' },
            visible: s.value,
          }),
        })
      );
    },
  }),
  s = e._export_sfc(n, [['__scopeId', 'data-v-9ff784da']]);
wx.createComponent(s);
