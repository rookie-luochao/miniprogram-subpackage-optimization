'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (l + o)();
const o = () => '../Card/index.js',
  l = () => '../Image/index.js',
  r =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111315034809590850201233.png',
  a = e.defineComponent({
    __name: 'index',
    props: {
      collapse: { type: Boolean },
      detail: {},
      showFooter: { type: Boolean, default: !0 },
      viewRecipe: { type: Function, default: () => {} },
    },
    setup(o) {
      const l = o,
        a = e.computed(() => {
          var e, o;
          return null != (o = null == (e = l.detail) ? void 0 : e.goodsList)
            ? o
            : [];
        }),
        n = e.computed(() => (l.collapse ? a.value.slice(0, 1) : a.value)),
        t = e.computed(() => n.value < a.value),
        p = () => {
          l.viewRecipe();
        };
      return (o, u) => {
        var d, i, c, s, f, v, m, y, h;
        return e.e(
          {
            a: e.t(
              e.unref(e.formatValue)(
                null == (d = o.detail) ? void 0 : d.orderSource
              )
            ),
            b: !o.collapse,
          },
          o.collapse
            ? {}
            : { c: r, d: e.t(a.value.length), e: o.collapse ? '0px' : '12px' },
          {
            f: e.f(n.value, (l, r, a) => {
              var n, t, p;
              return e.e(
                {
                  a: 'b3866594-1-' + a + ',b3866594-0',
                  b: e.p({
                    src: null != (n = l.goodsMainImg) ? n : '',
                    mode: 'scaleToFill',
                  }),
                  c:
                    l.nhsaType &&
                    l.nhsaType !== e.unref(e.GoodsNHSAType).NonMedical &&
                    (null == (t = o.detail) ? void 0 : t.orderType) ===
                      e.unref(e.GoodsOrderType).Inquiry,
                },
                l.nhsaType &&
                  l.nhsaType !== e.unref(e.GoodsNHSAType).NonMedical &&
                  (null == (p = o.detail) ? void 0 : p.orderType) ===
                    e.unref(e.GoodsOrderType).Inquiry
                  ? {
                      d: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111315061936102970201240.png',
                    }
                  : {},
                {
                  e: e.t(e.unref(e.formatValue)(l.goodsNameDisplay)),
                  f: e.t(e.unref(e.formatValue)(l.specDisplay)),
                  g: e.t(l.quantity),
                  h: e.t(e.unref(e.PrescriptionTypeDesc)[l.prescriptionDrug]),
                  i: e.t(l.salePrice),
                  j: l.id,
                }
              );
            }),
            g: o.collapse,
          },
          o.collapse
            ? e.e(
                { h: r, i: e.t(a.value.length), j: a.value.length > 1 },
                a.value.length > 1
                  ? {
                      k: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111321002868440980201233.png',
                      l: t.value ? 'rotate(0deg)' : 'rotate(180deg)',
                    }
                  : {}
              )
            : e.e(
                {
                  m: e.t(
                    null == (c = null == (i = o.detail) ? void 0 : i.rpInfo)
                      ? void 0
                      : c.patientName
                  ),
                  n: e.t(
                    e.unref(e.formatValue)(
                      e.unref(e.GenderDesc)[
                        null == (f = null == (s = o.detail) ? void 0 : s.rpInfo)
                          ? void 0
                          : f.sex
                      ]
                    )
                  ),
                  o: e.t(
                    e.unref(e.formatValue)(
                      null == (m = null == (v = o.detail) ? void 0 : v.rpInfo)
                        ? void 0
                        : m.age
                    )
                  ),
                  p:
                    (null == (y = o.detail) ? void 0 : y.orderType) ===
                    e.unref(e.GoodsOrderType).Inquiry,
                },
                (null == (h = o.detail) ? void 0 : h.orderType) ===
                  e.unref(e.GoodsOrderType).Inquiry
                  ? { q: e.o(p) }
                  : {}
              ),
          { r: e.p({ footer: l.showFooter }) }
        );
      };
    },
  }),
  n = e._export_sfc(a, [['__scopeId', 'data-v-b3866594']]);
wx.createComponent(n);
