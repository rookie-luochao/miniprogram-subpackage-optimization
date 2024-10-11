'use strict';
const e = require('../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const s = e.useAppConfigStore(),
        { ORG_ID: u, ORG_CODE: o } = s.CONFIG,
        r = e.ref(''),
        c = e.ref(null),
        n = e.ref(!1),
        l = e.ref(!1),
        p = e.ref(''),
        i = async () => {
          if (!c.value)
            return e.index.showToast({ title: '未获取到订单信息，请重试' });
          const a = c.value.payWay,
            { tradeOrderID: t, orgHisOrderNo: s } = c.value;
          if ([e.PaymentWay.Wechatpay, e.PaymentWay.Alipay].includes(a))
            try {
              const { success: a, message: s } = await e.requestRefundCash({
                orgID: u,
                orgCode: o,
                payedTradeOrderID: t,
              });
              (n.value = !0),
                a
                  ? (l.value = !0)
                  : ((l.value = !1), (p.value = s || '退款失败，请重试'));
            } catch (i) {
              const { message: e } = i;
              (n.value = !0), (p.value = e || '退款失败，请重试');
            }
          if ([e.PaymentWay.Insurance].includes(a))
            try {
              const { data: a, message: t } = await e.requestRefundSubmission({
                orgId: u,
                orgCode: o,
                yibaoOrderNo: s,
                payAuthNo: r.value,
              });
              (n.value = !0),
                'SUCC' === (null == a ? void 0 : a.refStatus.toUpperCase())
                  ? (l.value = !0)
                  : ((l.value = !1), (p.value = t || '退款失败，请重试'));
            } catch (i) {
              const { message: e } = i;
              (n.value = !0), (p.value = e || '退款失败，请重试');
            }
        };
      return (
        t({
          pageOnLoad: (e) => {
            (c.value = JSON.parse(decodeURIComponent(e.orderDetail))),
              (r.value = e.payAuthNo),
              i();
          },
        }),
        (a, t) =>
          e.e(
            { a: !n.value },
            n.value
              ? {
                  c: l.value
                    ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24090316460236808580201233.png'
                    : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24090316453345788970201240.png',
                  d: e.t('退款申请' + (l.value ? '成功' : '失败')),
                  e: e.n(l.value ? 'title-success' : 'title-fail'),
                  f: e.t(
                    l.value ? '您的退款申请已经成功，请等待退款到账' : p.value
                  ),
                }
              : {
                  b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24090315534817566480201240.png',
                }
          )
      );
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-63351c7a']]);
wx.createComponent(t);
