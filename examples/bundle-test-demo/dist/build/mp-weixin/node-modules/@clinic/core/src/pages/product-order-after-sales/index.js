'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (a + t + o + n)();
const o = () => '../../components/Card/index.js',
  a = () => '../../components/Navbar/index.js',
  n = () => '../../components/ProductDetailCard/index.js',
  t = () => '../../components/Textarea/index.js',
  r =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111215234480478670201240.png',
  s = e.defineComponent({
    __name: 'index',
    setup(o, { expose: a }) {
      const n = e.ref(''),
        t = async () => {
          if (n.value)
            try {
              await e.requestCreateAfterSalesOrder({
                goodsOrderId: s.value,
                reason: n.value,
              }),
                e.index.navigateBack();
            } catch (o) {
              console.error(o);
            }
          else e.index.showToast({ title: '请填写退款说明', icon: 'none' });
        },
        s = e.ref(''),
        d = e.ref();
      return (
        a({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (o) => {
            console.log('pageOnload', o),
              (s.value = o.goodsOrderId),
              (async (o) => {
                const { data: a } = await e.requestGoodsOrderDetail(o);
                d.value = a;
              })(o.goodsOrderId);
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (o, a) => {
          var s, c;
          return {
            a: e.p({ title: '申请售后' }),
            b: r,
            c: r,
            d: e.t(null == (s = d.value) ? void 0 : s.totalAmount),
            e: e.o((e) => (n.value = e)),
            f: e.p({
              height: 104,
              placeholder: '请填写退款说明，有助于更好的处理售后问题',
              modelValue: n.value,
            }),
            g: e.p({ footer: !1 }),
            h: r,
            i: r,
            j: e.p({
              collapse: !0,
              detail: null != (c = d.value) ? c : {},
              'show-footer': !0,
            }),
            k: e.o(t),
          };
        }
      );
    },
  }),
  d = e._export_sfc(s, [['__scopeId', 'data-v-f6a56cd2']]);
wx.createComponent(d);
