'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math;
const n = e.defineComponent({
    __name: 'index',
    setup(n, { expose: o }) {
      const l = {
          title: '温馨提示',
          content: '',
          contentAlign: 'center',
          showCancel: !0,
          cancelText: '取消',
          showConfirm: !0,
          confirmText: '确定',
        },
        t = e.ref(l),
        a = e.ref(!1),
        u = () => {
          (a.value = !1), t.value.onConfirm && t.value.onConfirm();
        },
        v = () => {
          (a.value = !1), t.value.onCancel && t.value.onCancel();
        };
      return (
        o({
          openModal: (e) => {
            (a.value = !0), (t.value = { ...l, ...e });
          },
        }),
        (n, o) => {
          var l;
          return e.e(
            { a: t.value.title },
            t.value.title
              ? { b: e.t(t.value.title), c: t.value.content ? '' : '32px' }
              : {},
            { d: t.value.content },
            t.value.content
              ? {
                  e: e.t(t.value.content),
                  f: t.value.title ? '' : '0',
                  g: null != (l = t.value.contentAlign) ? l : 'center',
                }
              : {},
            { h: t.value.showConfirm || t.value.showCancel },
            t.value.showConfirm || t.value.showCancel
              ? e.e(
                  { i: t.value.showCancel },
                  t.value.showCancel
                    ? {
                        j: e.t(t.value.cancelText),
                        k: t.value.showConfirm ? '' : '80%',
                        l: e.o(v),
                      }
                    : {},
                  { m: t.value.showConfirm },
                  t.value.showConfirm
                    ? {
                        n: e.t(t.value.confirmText),
                        o: t.value.showCancel ? '' : '80%',
                        p: e.o(u),
                      }
                    : {}
                )
              : {},
            {
              q: e.o((e) => (a.value = e)),
              r: e.p({
                'custom-style': { borderRadius: '12px' },
                visible: a.value,
              }),
            }
          );
        }
      );
    },
  }),
  o = e._export_sfc(n, [['__scopeId', 'data-v-1d231c70']]);
wx.createComponent(o);
