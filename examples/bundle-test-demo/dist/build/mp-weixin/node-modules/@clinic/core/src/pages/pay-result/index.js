'use strict';
const e = require('../../../../../../common/vendor.js');
Math || a();
const a = () => '../../components/Navbar/index.js',
  t = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const { getToken: r } = e.useAuth(),
        u = e.ref(''),
        n = e.ref(e.PaymentType.GoodsPay),
        o = e.ref(null),
        i = () => {
          o.value && (clearTimeout(o.value), (o.value = null));
        },
        s = e.ref(!1),
        l = e.ref(!1),
        d = async () => {
          const { data: a } = await e.requestQueryPaymentDetails({
            orderId: u.value,
          });
          return a[0].tradeStatus;
        },
        y = e.ref(null),
        p = async () => {
          if (r())
            if (u.value)
              try {
                if (n.value === e.PaymentType.GoodsPay) {
                  const { data: a } = await e.requestGoodsOrderDetail(u.value),
                    t = a.payStatus;
                  if ([e.GoodsOrderPayStatus.Unpaid].includes(t))
                    return void (o.value = setTimeout(p, 2e3));
                  i(),
                    (l.value = !0),
                    t === e.GoodsOrderPayStatus.Paid && (s.value = !0);
                }
                if (n.value === e.PaymentType.InquiryPay) {
                  const { data: a } = await e.requestInquiryOrderDetail({
                    inquiryOrderId: u.value,
                  });
                  y.value = a;
                  const t = a.payStatus;
                  if ([e.InquiryPayStatus.Unpaid].includes(t))
                    return void (o.value = setTimeout(p, 2e3));
                  i(),
                    (l.value = !0),
                    t === e.InquiryPayStatus.Paid && (s.value = !0);
                }
              } catch (a) {
                console.error(a);
              }
            else e.index.showToast({ title: '订单信息不存在', icon: 'none' });
        },
        v = () => {
          if (
            (n.value === e.PaymentType.GoodsPay &&
              e.appNavigator.redirectTo(
                e.appNavigator.pagesMap['product-order-detail'],
                { query: { orderId: u.value } }
              ),
            n.value === e.PaymentType.InquiryPay)
          ) {
            if (!y.value)
              return void e.index.showToast({
                title: '订单信息不存在',
                icon: 'none',
              });
            const { inquiryType: a, id: t, groupImId: r } = y.value || {};
            e.appNavigator.reLaunch(e.appNavigator.pagesMap.chat, {
              query: {
                inquiryOrderId: t,
                inquiryType: a,
                chatImId: r,
                navigationBarTitle: e.getServiceUserInfo(y.value).name,
                fromPage: e.appNavigator.pagesMap['pay-result'],
              },
            });
          }
        };
      return (
        t({
          pageOnShow: async () => {
            await d(),
              setTimeout(async () => {
                await p();
              }, 2e3);
          },
          pageOnLoad: async (e) => {
            (u.value = e.orderId), (n.value = e.paymentType);
          },
          pageOnHide: () => {
            i();
          },
        }),
        (a, t) =>
          e.e(
            { a: e.p({ title: '支付结果' }), b: !l.value },
            l.value
              ? e.e(
                  {
                    d: e.t(s.value ? '支付成功' : '支付失败'),
                    e: e.t(
                      s.value
                        ? '本次交易支付成功'
                        : '本次交易支付失败，请尝试重新支付'
                    ),
                    f: e.n(s.value ? 'result-success' : 'result-fail'),
                    g: s.value,
                  },
                  s.value
                    ? {
                        h: e.t(
                          n.value === e.unref(e.PaymentType).GoodsPay
                            ? '查看订单详情'
                            : '进入线上诊室'
                        ),
                        i: e.o(v),
                      }
                    : {}
                )
              : {
                  c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24112016412602179930201240.gif',
                }
          )
      );
    },
  }),
  r = e._export_sfc(t, [['__scopeId', 'data-v-301108f5']]);
wx.createComponent(r);
