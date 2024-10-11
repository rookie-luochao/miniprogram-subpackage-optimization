'use strict';
const e = require('../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const n = e.useAppConfigStore(),
        { ORG_ID: o, ORG_CODE: r, ORG_NAME: i, WECHAT_APP_ID: u } = n.CONFIG,
        s = e.useUserInfoStore(),
        { userInfo: l } = e.storeToRefs(s),
        c = e.useMedicalInsuranceAuthStore(),
        { paymentInfo: y } = e.storeToRefs(c),
        d = e.reactive({
          totalAmount: '0',
          medicalInsurancePayment: '0',
          personalAccountPayment: '0',
          cashPayment: '0',
        }),
        p = e.ref(''),
        m = e.ref(null),
        h = async () => {
          if (!m.value) return;
          const a = m.value.payWay,
            t = m.value.inquiryMoney;
          if (
            ([e.PaymentWay.Wechatpay, e.PaymentWay.Alipay].includes(a) &&
              (await f(),
              (d.totalAmount = e.formatCurrency(t)),
              (d.cashPayment = e.formatCurrency(t))),
            [e.PaymentWay.Insurance].includes(a))
          ) {
            e.index.showLoading({ title: '正在获取支付信息…', mask: !0 });
            try {
              const { data: a } = await e.requestUldFeeInfo({
                orgId: o,
                orgCode: r,
                yibaoOrderNo: m.value.orgHisOrderNo,
                payAuthNo: p.value,
              });
              (d.totalAmount = e.formatCurrency(a.feeSumamt)),
                (d.medicalInsurancePayment = e.formatCurrency(a.fundPay)),
                (d.personalAccountPayment = e.formatCurrency(a.psnAcctPay)),
                (d.cashPayment = e.formatCurrency(a.ownPayAmt));
            } finally {
              e.index.hideLoading();
            }
          }
        },
        v = e.ref(null),
        f = async () => {
          var a, t;
          try {
            e.index.showLoading({ title: '正在获取支付信息…', mask: !0 });
            const { data: n } = await e.requestArousePay({
              orgID: o,
              tradeOrderID: null == (a = m.value) ? void 0 : a.tradeOrderID,
              arouseClient: i,
              arouseClientType: 'wx_pro',
              appID: u,
              thirdUserID: null == (t = l.value) ? void 0 : t.openID,
            });
            v.value = n;
          } finally {
            e.index.hideLoading();
          }
        },
        { requestWechatPay: g } = e.useWechatPay(),
        I = async () => {
          var a, t;
          if (!m.value)
            return e.index.showToast({ title: '未获取到订单信息，请重试' });
          const n = m.value.payWay;
          if ([e.PaymentWay.Wechatpay, e.PaymentWay.Alipay].includes(n)) {
            if (!(null == (a = v.value) ? void 0 : a.arousePayData))
              return e.index.showToast({ title: '未获取到支付信息，请重试' });
            let t = !1;
            try {
              (t = await g(v.value)),
                t &&
                  e.appNavigator.navigateTo(
                    e.appNavigator.pagesMap['pay-result'],
                    {
                      query: {
                        orderDetail: encodeURIComponent(
                          JSON.stringify(m.value)
                        ),
                      },
                    }
                  );
            } catch (i) {
              e.index.showToast({ title: '支付失败，请重试', icon: 'none' });
            }
          }
          if ([e.PaymentWay.Insurance].includes(n))
            try {
              e.index.showLoading({ title: '支付中…', mask: !0 });
              const { data: a } = await e.requestUnifieOrder({
                orgId: o,
                orgCode: r,
                yibaoOrderNo: m.value.orgHisOrderNo,
                openid: null == (t = l.value) ? void 0 : t.openID,
                payAuthNo: p.value,
                returnUrl: 'test',
              });
              e.index.hideLoading(),
                e.index.navigateToMiniProgram({
                  appId: a.payAppid,
                  path: a.payUrl,
                });
            } catch (i) {
              e.index.hideLoading(),
                e.index.showToast({
                  title: '未获取到支付信息，请重试',
                  icon: 'none',
                });
            }
        };
      return (
        t({
          pageOnLoad: async (e) => {
            (m.value = JSON.parse(decodeURIComponent(e.orderDetail))),
              (p.value = e.payAuthNo),
              h();
          },
          pageOnShow: async () => {
            var a, t;
            (null == (a = y.value) ? void 0 : a.orderDetail) &&
              (null == (t = y.value) ? void 0 : t.payAuthNo) &&
              (c.setPaymentInfo({ orderDetail: '', payAuthNo: '' }),
              e.appNavigator.navigateTo(e.appNavigator.pagesMap['pay-result'], {
                query: {
                  orderDetail: encodeURIComponent(JSON.stringify(m.value)),
                },
              }));
          },
        }),
        (a, t) => ({
          a: e.t(e.unref(i)),
          b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717333982154340201240.png',
          c: e.t(d.totalAmount),
          d: e.t(d.medicalInsurancePayment),
          e: e.t(d.personalAccountPayment),
          f: e.t(d.cashPayment),
          g: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717343840950020201233.png',
          h: e.t(d.cashPayment),
          i: e.o(I),
        })
      );
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-52af4471']]);
wx.createComponent(t);
