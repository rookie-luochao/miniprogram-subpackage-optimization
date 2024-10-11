'use strict';
const e = require('../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    setup(a, { expose: r }) {
      const t = e.useAppConfigStore(),
        { ORG_ID: u, ORG_CODE: l } = t.CONFIG,
        c = e.ref(null);
      let s = null;
      const o = () => {
          s && (clearInterval(s), (s = null));
        },
        v = e.ref(!1),
        n = e.ref(!1),
        p = e.ref(''),
        d = async () => {
          var a;
          if (!c.value) return;
          const r = c.value.payWay,
            { tradeOrderID: t } = c.value;
          if ([e.PaymentWay.Wechatpay, e.PaymentWay.Alipay].includes(r))
            try {
              const { data: r, message: l } = await e.requestGetPayOrder({
                orgID: u,
                keyID: t,
              });
              (v.value = !0),
                'SUCCESS' ===
                (null == (a = r.tradeStatusCode) ? void 0 : a.toUpperCase())
                  ? (n.value = !0)
                  : ((n.value = !1), (p.value = l || '支付失败，请重试'));
            } catch (s) {
              const { message: e } = s;
              (v.value = !0),
                (n.value = !1),
                (p.value = e || '支付失败，请重试');
            }
          if ([e.PaymentWay.Insurance].includes(r))
            try {
              const {
                data: a,
                code: r,
                message: t,
              } = await e.requestQueryWxPayResult({
                orgId: u,
                orgCode: l,
                yibaoOrderNo: c.value.orgHisOrderNo,
              });
              if (((v.value = !0), '20000' !== r))
                return (n.value = !1), void (p.value = t || '支付失败，请重试');
              if (a.medTradeState)
                switch (a.medTradeState.toUpperCase()) {
                  case 'SUCCESS':
                    n.value = !0;
                    break;
                  case 'REFUND':
                    (n.value = !1), (p.value = '转入退款');
                    break;
                  case 'SYS_REFUNDED':
                    (n.value = !1), (p.value = '支付失败');
                    break;
                  case 'INITIAL':
                    (n.value = !1), (p.value = '未绑卡');
                    break;
                  case 'CLOSED':
                    (n.value = !1), (p.value = '已关闭');
                    break;
                  case 'NOTPAY':
                    (n.value = !1), (p.value = '未支付');
                    break;
                  case 'PAYING':
                    return;
                  default:
                    n.value = !1;
                }
            } catch (s) {
              const { message: e } = s;
              (v.value = !0),
                (n.value = !1),
                (p.value = e || '支付失败，请重试');
            }
        },
        i = () => {
          var a;
          e.appNavigator.reLaunch(e.appNavigator.pagesMap.chat, {
            query: { orderID: null == (a = c.value) ? void 0 : a.orderID },
          });
        };
      return (
        r({
          pageOnLoad: (e) => {
            c.value = JSON.parse(decodeURIComponent(e.orderDetail));
          },
          pageOnShow: () => {
            d(), (s = setInterval(d, 2e3));
          },
          pageOnHide: () => {
            o();
          },
        }),
        (a, r) =>
          e.e(
            { a: !v.value },
            v.value
              ? e.e(
                  {
                    c: n.value
                      ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24090316460236808580201233.png'
                      : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24090316453345788970201240.png',
                    d: e.t('支付' + (n.value ? '成功' : '失败')),
                    e: e.n(n.value ? 'title-success' : 'title-fail'),
                    f: e.t(
                      n.value ? '支付成功后请进入小程序进行问诊' : p.value
                    ),
                    g: n.value,
                  },
                  n.value ? { h: e.o(i) } : {}
                )
              : {
                  b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24090315534817566480201240.png',
                }
          )
      );
    },
  }),
  r = e._export_sfc(a, [['__scopeId', 'data-v-dffa165a']]);
wx.createComponent(r);
