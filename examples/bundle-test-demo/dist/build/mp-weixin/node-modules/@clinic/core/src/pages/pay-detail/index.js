'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-countdown')();
}
Math ||
  (
    a +
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js')
  )();
const a = () => '../../components/Navbar/index.js',
  t = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      e.ref(1);
      const n = e.useAppConfigStore(),
        { MEDICAL_INSURANCE_ORG_CODG: o, MEDICAL_INSURANCE_HOS_CODE: u } =
          n.CONFIG,
        i = e.useUserInfoStore(),
        { userInfo: l } = e.storeToRefs(i),
        r = e.useMedicalInsuranceAuthStore(),
        { paymentInfo: d } = e.storeToRefs(r),
        s = e.ref(''),
        p = e.ref(0),
        v = e.ref(e.PaymentType.GoodsPay),
        c = e.ref(''),
        m = e.ref({ m: 0, s: 0 }),
        g = () => {
          e.index.showToast({
            title: '支付时间已过，请重新支付',
            icon: 'none',
            mask: !0,
          }),
            setTimeout(() => {
              e.appNavigator.navigateBack();
            }, 1500);
        },
        y = e.ref([]),
        f = async () => {
          const { data: a } = await e.requestQueryPaymentDetails({
            orderId: s.value,
          });
          y.value = a;
        },
        h = async () => {
          var a, t;
          if (
            (1 === y.value.length &&
              ('CASH' === y.value[0].billType && (await I(), await C()),
              'INSURANCE' === y.value[0].billType && (await S())),
            2 === y.value.length)
          ) {
            const n =
                null != (a = y.value.find((e) => 'INSURANCE' === e.billType))
                  ? a
                  : {},
              o =
                null != (t = y.value.find((e) => 'CASH' === e.billType))
                  ? t
                  : {},
              u = null == n ? void 0 : n.tradeStatus,
              i = null == o ? void 0 : o.tradeStatus;
            [e.TradeStatus.Init, e.TradeStatus.Commit].includes(u) &&
              (await S()),
              [e.TradeStatus.Success].includes(u) &&
                [e.TradeStatus.Init, e.TradeStatus.Commit].includes(i) &&
                (await I(), await C());
          }
        },
        T = e.ref(null),
        I = async () => {
          var a;
          const { data: t } = await e.requestArousePay({
            orderId: s.value,
            openId: null == (a = l.value) ? void 0 : a.openId,
          });
          T.value = t;
        },
        { requestWechatPay: w } = e.useWechatPay(),
        C = async () => {
          var a;
          if (!(null == (a = T.value) ? void 0 : a.paySign))
            return e.index.showToast({
              title: '未获取到支付信息，请重试',
              icon: 'none',
            });
          let t = !1;
          try {
            (t = await w(T.value)),
              t &&
                e.appNavigator.navigateTo(
                  e.appNavigator.pagesMap['pay-result'],
                  { query: { paymentType: v.value, orderId: s.value } }
                );
          } catch (n) {
            e.index.showToast({ title: '支付失败，请重试', icon: 'none' });
          }
        },
        S = async () => {
          var a;
          const t = requirePlugin('AuthParamPlugin'),
            n = await t.getAuthParam({
              orgCodg: o,
              hosCode: u,
              openId: null == (a = l.value) ? void 0 : a.openId,
            });
          '0' === n.code && e.wx$1.navigateToMiniProgram(n.data);
        };
      return (
        t({
          pageOnShow: async () => {
            var a, t, n, i;
            if ((await f(), null == (a = d.value) ? void 0 : a.authNo)) {
              const a = d.value.authNo,
                s =
                  null !=
                  (n =
                    null ==
                    (t = y.value.find((e) => 'INSURANCE' === e.billType))
                      ? void 0
                      : t.thirdTransId)
                    ? n
                    : '',
                p = null == (i = l.value) ? void 0 : i.openId,
                v = encodeURIComponent(e.appNavigator.pagesMap['pay-detail']);
              e.index.navigateTo({
                url: `plugin://AuthParamPlugin/order-page?authCode=${a}&medOrgOrd=${s}&openId=${p}&hosCode=${u}&orgCodg=${o}&callBackPath=${v}`,
              }),
                r.setPaymentInfo({ authNo: '' });
            }
          },
          pageOnLoad: async (a) => {
            var t;
            if (
              ((s.value = a.orderId),
              (p.value = Number(a.totalPrice)),
              (v.value = a.paymentType),
              (c.value = null != (t = a.orderCreateTime) ? t : ''),
              !s.value)
            )
              return e.index.showToast({
                title: '未获取到订单信息，请重试',
                icon: 'none',
              });
            try {
              e.index.showLoading({ title: '正在获取支付信息…', mask: !0 }),
                await f(),
                await h();
            } finally {
              e.index.hideLoading();
            }
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, t) =>
          e.e(
            {
              a: e.p({ title: '收银台' }),
              b: e.t(e.unref(e.padZeroToTwoDigits)(m.value.m)),
              c: e.t(e.unref(e.padZeroToTwoDigits)(m.value.s)),
              d: e.o(g),
              e: e.o((e) => (m.value = e)),
              f: e.p({
                'end-time': e.dayjs(c.value).add(15, 'minutes').valueOf(),
                modelValue: m.value,
              }),
              g: e.t(e.unref(e.formatCurrency)(p.value)),
            },
            {},
            {
              m: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111911064005109920201233.png',
              n: e.o(h),
            }
          )
      );
    },
  }),
  n = e._export_sfc(t, [['__scopeId', 'data-v-d9a81737']]);
wx.createComponent(n);
