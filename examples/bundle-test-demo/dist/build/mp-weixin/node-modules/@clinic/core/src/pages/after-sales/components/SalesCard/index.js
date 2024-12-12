'use strict';
const e = require('../../../../../../../../common/vendor.js');
Math || (n + o)();
const o = () => '../../../../components/Card/index.js',
  n = () => '../../../../components/Image/index.js',
  a =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111315061936102970201240.png',
  l = e.defineComponent({
    __name: 'index',
    props: { detail: {} },
    setup(o) {
      const n = o,
        l = e.computed(() => {
          var e;
          return null == (e = n.detail.goodsList) ? void 0 : e[0];
        }),
        t = e.computed(() => {
          var e;
          return null != (e = n.detail.goodsList) ? e : [];
        });
      return (o, d) => {
        var s, p, u, i, c, r, v, m;
        return e.e(
          {
            a: e.t(n.detail.orderSource),
            b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111315034809590850201233.png',
            c: e.t(t.value.length),
            d: e.t(n.detail.applyTime),
            e: t.value.length > 1,
          },
          t.value.length > 1
            ? {
                f: e.f(t.value, (o, n, l) =>
                  e.e(
                    {
                      a: 'ce965302-1-' + l + ',ce965302-0',
                      b: e.p({ src: o.goodsMainImg, mode: 'scaleToFill' }),
                      c:
                        o.nhsaType &&
                        o.nhsaType !== e.unref(e.GoodsNHSAType).NonMedical,
                    },
                    o.nhsaType &&
                      o.nhsaType !== e.unref(e.GoodsNHSAType).NonMedical
                      ? { d: a }
                      : {},
                    { e: o.id }
                  )
                ),
              }
            : e.e(
                {
                  g: e.p({
                    src: null == (s = l.value) ? void 0 : s.goodsMainImg,
                    mode: 'scaleToFill',
                  }),
                  h:
                    (null == (p = l.value) ? void 0 : p.nhsaType) &&
                    (null == (u = l.value) ? void 0 : u.nhsaType) !==
                      e.unref(e.GoodsNHSAType).NonMedical,
                },
                (null == (i = l.value) ? void 0 : i.nhsaType) &&
                  (null == (c = l.value) ? void 0 : c.nhsaType) !==
                    e.unref(e.GoodsNHSAType).NonMedical
                  ? { i: a }
                  : {},
                {
                  j: e.t(null == (r = l.value) ? void 0 : r.goodsNameDisplay),
                  k: e.t(null == (v = l.value) ? void 0 : v.spec),
                  l: e.t(null == (m = l.value) ? void 0 : m.quantity),
                }
              ),
          { m: e.t(n.detail.applyRefundAmount), n: e.p({ footer: !1 }) }
        );
      };
    },
  }),
  t = e._export_sfc(l, [['__scopeId', 'data-v-ce965302']]);
wx.createComponent(t);
