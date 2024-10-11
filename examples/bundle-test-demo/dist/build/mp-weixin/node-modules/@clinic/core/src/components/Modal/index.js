'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math;
const n = e.defineComponent({
    __name: 'index',
    setup(n, { expose: l }) {
      const o = {
          title: '温馨提示',
          serviceTime: [],
          content: '',
          contentAlign: 'center',
          showCancel: !0,
          cancelText: '取消',
          showConfirm: !0,
          confirmText: '确定',
        },
        a = e.ref(o),
        t = e.ref(!1),
        u = () => {
          (t.value = !1), a.value.onConfirm && a.value.onConfirm();
        },
        v = () => {
          (t.value = !1), a.value.onCancel && a.value.onCancel();
        };
      return (
        l({
          openModal: (e) => {
            (t.value = !0), (a.value = { ...o, ...e });
          },
        }),
        (n, l) => {
          var o, c, i;
          return e.e(
            { a: a.value.title },
            a.value.title
              ? { b: e.t(a.value.title), c: a.value.content ? '' : '32px' }
              : {},
            { d: null == (o = a.value.serviceTime) ? void 0 : o.length },
            (null == (c = a.value.serviceTime) ? void 0 : c.length)
              ? {
                  e: e.f(a.value.serviceTime, (n, l, o) => ({
                    a: e.t(n),
                    b: n,
                  })),
                }
              : {},
            { f: a.value.content },
            a.value.content
              ? {
                  g: e.t(a.value.content),
                  h: a.value.title ? '' : '0',
                  i: null != (i = a.value.contentAlign) ? i : 'center',
                }
              : {},
            { j: a.value.showConfirm || a.value.showCancel },
            a.value.showConfirm || a.value.showCancel
              ? e.e(
                  { k: a.value.showCancel },
                  a.value.showCancel
                    ? {
                        l: e.t(a.value.cancelText),
                        m: a.value.showConfirm ? '' : '80%',
                        n: e.o(v),
                      }
                    : {},
                  { o: a.value.showConfirm },
                  a.value.showConfirm
                    ? {
                        p: e.t(a.value.confirmText),
                        q: a.value.showCancel ? '' : '80%',
                        r: e.o(u),
                      }
                    : {}
                )
              : {},
            {
              s: e.o((e) => (t.value = e)),
              t: e.p({
                'custom-style': { borderRadius: '12px' },
                visible: t.value,
              }),
            }
          );
        }
      );
    },
  }),
  l = e._export_sfc(n, [['__scopeId', 'data-v-e9a95047']]);
wx.createComponent(l);
