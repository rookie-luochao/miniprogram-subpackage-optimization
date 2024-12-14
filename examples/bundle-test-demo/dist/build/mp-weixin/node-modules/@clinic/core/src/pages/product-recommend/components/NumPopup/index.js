'use strict';
const e = require('../../../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math;
const o = e.defineComponent({
    __name: 'index',
    emits: ['confirmNum'],
    setup(o, { expose: u, emit: a }) {
      const l = e.ref(!1),
        v = e.ref(null),
        n = e.ref(0),
        t = a,
        r = () => {
          var e;
          s(),
            t(
              'confirmNum',
              Number(n.value),
              (null == (e = v.value) ? void 0 : e.goodsId) || ''
            ),
            (l.value = !1);
        },
        s = () => {
          n.value < 1 && (n.value = 1), n.value > 999 && (n.value = 999);
        };
      return (
        u({
          openPopup: (e) => {
            (l.value = !0), (v.value = e), (n.value = e.goodsCount || 0);
          },
        }),
        (o, u) =>
          e.e(
            { a: l.value },
            l.value
              ? {
                  b: e.o(s),
                  c: n.value,
                  d: e.o((e) => (n.value = e.detail.value)),
                }
              : {},
            {
              e: e.o(r),
              f: e.o((e) => (l.value = e)),
              g: e.p({
                'custom-style': { borderRadius: '12px' },
                visible: l.value,
              }),
            }
          )
      );
    },
  }),
  u = e._export_sfc(o, [['__scopeId', 'data-v-fb79d30e']]);
wx.createComponent(u);
