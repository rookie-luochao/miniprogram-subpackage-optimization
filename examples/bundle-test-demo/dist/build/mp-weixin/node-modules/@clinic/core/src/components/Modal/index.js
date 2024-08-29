'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math;
const l = e.defineComponent({
    __name: 'index',
    setup(l, { expose: o }) {
      const n = e.ref({
          title: '温馨提示',
          serviceTime: [],
          content: '',
          showCancel: !0,
          cancelText: '取消',
          showConfirm: !0,
          confirmText: '确定',
        }),
        a = e.ref(!1),
        t = () => {
          (a.value = !1), n.value.onConfirm && n.value.onConfirm();
        },
        u = () => {
          (a.value = !1), n.value.onCancel && n.value.onCancel();
        };
      return (
        o({
          openModal: (e) => {
            (a.value = !0), (n.value = { ...n.value, ...e });
          },
        }),
        (l, o) => {
          var v, i;
          return e.e(
            { a: n.value.title },
            n.value.title
              ? { b: e.t(n.value.title), c: n.value.content ? '' : '32px' }
              : {},
            { d: null == (v = n.value.serviceTime) ? void 0 : v.length },
            (null == (i = n.value.serviceTime) ? void 0 : i.length)
              ? {
                  e: e.f(n.value.serviceTime, (l, o, n) => ({
                    a: e.t(l),
                    b: l,
                  })),
                }
              : {},
            { f: n.value.content },
            n.value.content
              ? { g: e.t(n.value.content), h: n.value.title ? '' : '0' }
              : {},
            { i: n.value.showConfirm || n.value.showCancel },
            n.value.showConfirm || n.value.showCancel
              ? e.e(
                  { j: n.value.showCancel },
                  n.value.showCancel
                    ? {
                        k: e.t(n.value.cancelText),
                        l: n.value.showConfirm ? '' : '80%',
                        m: e.o(u),
                      }
                    : {},
                  { n: n.value.showConfirm },
                  n.value.showConfirm
                    ? {
                        o: e.t(n.value.confirmText),
                        p: n.value.showCancel ? '' : '80%',
                        q: e.o(t),
                      }
                    : {}
                )
              : {},
            {
              r: e.o((e) => (a.value = e)),
              s: e.p({
                'custom-style': { borderRadius: '12px' },
                visible: a.value,
              }),
            }
          );
        }
      );
    },
  }),
  o = e._export_sfc(l, [['__scopeId', 'data-v-85e6d46e']]);
wx.createComponent(o);
