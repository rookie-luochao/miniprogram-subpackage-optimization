'use strict';
const e = require('../../../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math;
const a = e.defineComponent({
    __name: 'index',
    emits: ['confirmPay'],
    setup(a, { expose: o, emit: t }) {
      const c = e.ref(!1),
        i = e.ref(e.PaymentWay.Insurance),
        n = e.ref([
          {
            id: e.PaymentWay.Insurance,
            icon: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24112014502177558660201240.png',
            title: '医保移动支付',
          },
          {
            id: e.PaymentWay.Wechatpay,
            icon: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24112014471707998100201233.png',
            title: '微信支付',
          },
        ]),
        p = t,
        r = () => {
          p('confirmPay', i.value), (c.value = !1);
        };
      return (
        o({
          openPopup: () => {
            c.value = !0;
          },
        }),
        (a, o) => ({
          a: e.o((e) => (c.value = !1)),
          b: e.f(n.value, (a, o, t) => ({
            a: a.icon,
            b: e.t(a.title),
            c:
              i.value === a.id
                ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111317214165489040201233.png'
                : '',
            d: a.id,
            e: i.value === a.id ? 1 : '',
            f: e.o((e) => {
              return (o = a.id), void (i.value = o);
              var o;
            }, a.id),
          })),
          c: e.o(r),
          d: e.o((e) => (c.value = e)),
          e: e.p({
            position: 'bottom',
            'custom-style': { borderRadius: '16px 16px 0 0' },
            visible: c.value,
          }),
        })
      );
    },
  }),
  o = e._export_sfc(a, [['__scopeId', 'data-v-3742e75f']]);
wx.createComponent(o);
