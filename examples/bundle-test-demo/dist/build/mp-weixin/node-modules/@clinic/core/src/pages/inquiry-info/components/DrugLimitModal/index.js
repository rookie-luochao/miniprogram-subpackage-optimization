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
      const u = e.ref(!1),
        p = e.ref([]);
      return (
        n({
          openModal: (e) => {
            (u.value = !0), (p.value = e.drugList);
          },
        }),
        (o, n) => ({
          a: e.f(p.value, (o, n, u) => ({
            a: '14921685-1-' + u + ',14921685-0',
            b: e.p({
              'drug-info': o,
              'is-show-operate': !1,
              'is-show-drug-count': !0,
            }),
            c: o.keyID,
          })),
          b: e.o((e) => (u.value = !1)),
          c: e.o((e) => (u.value = e)),
          d: e.p({
            'custom-style': { borderRadius: '12px' },
            visible: u.value,
          }),
        })
      );
    },
  }),
  u = e._export_sfc(n, [['__scopeId', 'data-v-14921685']]);
wx.createComponent(u);
