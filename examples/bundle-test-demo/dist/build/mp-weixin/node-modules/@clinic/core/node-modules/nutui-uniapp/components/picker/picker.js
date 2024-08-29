'use strict';
const e = require('../../../../../../../common/vendor.js'),
  n = e.defineComponent({
    name: e.componentName,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  t = e.defineComponent({
    ...n,
    props: e.pickerProps,
    emits: e.pickerEmits,
    setup(n, { emit: t }) {
      const o = n,
        r = t,
        a = e.computed(() => Number(o.visibleOptionNum)),
        i = e.computed(() => Number(o.optionHeight)),
        { translate: l } = e.useTranslate(e.componentName),
        {
          changeHandler: u,
          confirm: c,
          defaultValues: s,
          defaultIndexes: f,
          delayDefaultIndexes: m,
          columnsList: d,
          columnFieldNames: p,
          classes: h,
          cancel: k,
          confirmHandler: v,
        } = e.usePicker(o, r);
      const {
        confirmHandler: g,
        handleTileChange: b,
        handlePickStart: x,
        handlePickEnd: T,
        pickerViewStyles: C,
      } = (function () {
        const n = e.reactive({ show: !1, picking: !1 }),
          t = e.computed(() => {
            const e = {};
            return (
              (e.height = a.value * i.value + 'px'),
              (e['--line-height'] = `${i.value}px`),
              e
            );
          });
        return {
          ...e.toRefs(n),
          pickerViewStyles: t,
          handleTileChange: (e) => {
            const n = e.detail.value,
              t = f.value;
            let o = 0;
            for (let r = 0; r < n.length; r++)
              if (t[r] !== n[r]) {
                o = r;
                break;
              }
            u(o, d.value[o][n[o]]);
          },
          confirmHandler: () => {
            n.picking
              ? setTimeout(() => {
                  c();
                }, 0)
              : c();
          },
          handlePickStart: () => {
            n.picking = !0;
          },
          handlePickEnd: () => {
            n.picking = !1;
          },
        };
      })();
      function w() {
        g();
      }
      return (n, t) =>
        e.e(
          { a: o.showToolbar },
          o.showToolbar
            ? {
                b: e.t(o.cancelText || e.unref(l)('cancel')),
                c: e.o((...n) => e.unref(k) && e.unref(k)(...n)),
                d: e.t(o.title),
                e: e.t(o.okText || e.unref(l)('confirm')),
                f: e.o((...e) => w && w(...e)),
              }
            : {},
          {
            g: e.f(e.unref(d), (n, t, o) => ({
              a: e.f(n, (n, t, o) => ({
                a: e.t(n[e.unref(p).text]),
                b: n[e.unref(p).value] ? n[e.unref(p).value] : t,
              })),
              b: t,
            })),
            h: e.unref(e.pxCheck)(i.value),
            i: e.s(e.unref(C)),
            j: `height:${i.value}px`,
            k: e.unref(m),
            l: e.o((...n) => e.unref(b) && e.unref(b)(...n)),
            m: e.o((...n) => e.unref(x) && e.unref(x)(...n)),
            n: e.o((...n) => e.unref(T) && e.unref(T)(...n)),
            o: e.n(e.unref(h)),
            p: e.s(o.customStyle),
          }
        );
    },
  });
wx.createComponent(t);
