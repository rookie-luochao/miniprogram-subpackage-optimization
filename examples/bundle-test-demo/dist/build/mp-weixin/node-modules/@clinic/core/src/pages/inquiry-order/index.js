'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('nut-countdown') + e.resolveComponent('uni-load-more'))();
}
Math ||
  (
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js') +
    (() =>
      '../../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js')
  )();
const a = e.defineComponent({
    __name: 'index',
    props: { isPayment: { type: Boolean, default: !0 } },
    setup(a, { expose: t }) {
      const u = e.useUserInfoStore(),
        { userInfo: n } = e.storeToRefs(u),
        o = e.useMedicalInsuranceAuthStore(),
        { medicalAuthStatus: r, payAuthInfo: s } = e.storeToRefs(o),
        { medicalInfo: i, fetchMedicalPayment: d } = e.useMedicalInfo(),
        c = e.ref({ m: '00', s: '00' }),
        m = e.reactive({ pages: 1, pageIndex: 1, total: 0 }),
        p = e.ref(null),
        l = async () => {
          var a, t;
          if (!s.value.authNo) return;
          const u = {
            [e.AutoJumpEnum.Payment]: e.appNavigator.pagesMap['pay-detail'],
            [e.AutoJumpEnum.Refund]: e.appNavigator.pagesMap['refund-result'],
          };
          try {
            if (
              p.value === e.AutoJumpEnum.Payment ||
              p.value === e.AutoJumpEnum.Refund
            ) {
              const n = u[p.value];
              await d(),
                (null == (a = i.value) ? void 0 : a.pay_auth_no) &&
                  ((p.value = null),
                  e.appNavigator.navigateTo(n, {
                    query: {
                      payAuthNo: null == (t = i.value) ? void 0 : t.pay_auth_no,
                      orderDetail: encodeURIComponent(JSON.stringify(q.value)),
                    },
                  }));
            }
          } catch (n) {}
        },
        y = e.ref(e.LoadMoreStatus.More),
        S = e.ref([]),
        f = async (a = !1) => {
          var t, u;
          if (!(m.pageIndex > m.pages))
            try {
              (y.value = e.LoadMoreStatus.Loading),
                a || e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: o } = await e.requestCusPageMyInquiryOrder({
                  pageIndex: m.pageIndex,
                  pageSize: 10,
                  orgID: null == (t = n.value) ? void 0 : t.orgID,
                  patientID: null == (u = n.value) ? void 0 : u.keyID,
                  serviceCode: e.SERVICE_CODE,
                }),
                { current: r, total: s, pages: i, records: d } = o;
              (m.pageIndex = r + 1),
                (m.total = s),
                (m.pages = i),
                (y.value =
                  m.pageIndex > m.pages
                    ? e.LoadMoreStatus.NoMore
                    : e.LoadMoreStatus.More);
              const c = d.map((a) => {
                const [t, u, n] = e
                  .dayjs(a.addTime)
                  .format('YYYY-MM-DD')
                  .split('-');
                return { ...a, year: t, month: u, day: n };
              });
              S.value = a ? [...S.value, ...c] : c;
            } catch (o) {
              y.value = e.LoadMoreStatus.More;
            } finally {
              e.index.hideLoading();
            }
        },
        v = (a) => e.dayjs(a.dispatchTime).add(10, 'minute').valueOf(),
        g = (a) => {
          const t = a.inquiryStatus;
          return e.InquiryStatusColor[t] || '#cccccc';
        },
        E = (a) => {
          const t = a.payStatus,
            u = a.inquiryStatus;
          if (1 === a.referral) return '已转诊';
          const n = [
            e.PaymentStatusEnum.PaySuccess,
            e.PaymentStatusEnum.NoNeed,
          ];
          if (u === e.InquiryStatusEnum.DealingWaitAccept) {
            if (t === e.PaymentStatusEnum.WaitPay) return '待支付';
            if (n.includes(t)) return '待接诊';
          }
          return e.InquiryStatusDesc[u] || '--';
        },
        I = (a) => {
          const t = a.payStatus,
            u = a.inquiryStatus,
            n = [e.PaymentStatusEnum.WaitPay],
            o = [
              e.InquiryStatusEnum.DealingWaitDispatch,
              e.InquiryStatusEnum.EndPatientCancel,
              e.InquiryStatusEnum.EndOverTimeCancel,
            ];
          return n.includes(t) && !o.includes(u);
        },
        h = (a) => {
          const t = a.payStatus,
            u = a.inquiryStatus;
          if (t === e.PaymentStatusEnum.WaitRefund) return !0;
          const n = [
              e.InquiryStatusEnum.EndDoctorCancel,
              e.InquiryStatusEnum.EndOverTimeCancel,
              e.InquiryStatusEnum.EndDoctorRefund,
            ].includes(u),
            o = t === e.PaymentStatusEnum.PaySuccess;
          return n && o;
        },
        D = (a) => {
          const t = a.payStatus,
            u = a.inquiryStatus,
            n = [
              e.InquiryStatusEnum.DealingAccept,
              e.InquiryStatusEnum.SystemEnd,
              e.InquiryStatusEnum.EndFinish,
              e.InquiryStatusEnum.DealingWaitAccept,
              e.InquiryStatusEnum.EndDoctorCancel,
              e.InquiryStatusEnum.EndDoctorRefund,
            ],
            o = [
              e.PaymentStatusEnum.PaySuccess,
              e.PaymentStatusEnum.RefundSuccess,
              e.PaymentStatusEnum.NoNeed,
            ];
          return n.includes(u) && o.includes(t);
        },
        q = e.ref(null),
        P = (a, t) => {
          q.value = a;
          const u = {
            [e.AutoJumpEnum.Payment]: e.appNavigator.pagesMap['pay-detail'],
            [e.AutoJumpEnum.Refund]: e.appNavigator.pagesMap['refund-result'],
          };
          if (t === e.AutoJumpEnum.Payment || t === e.AutoJumpEnum.Refund) {
            const n = u[t];
            r.value === e.AuthStatus.NO_AUTH &&
              e.appNavigator.navigateTo(n, {
                query: { orderDetail: encodeURIComponent(JSON.stringify(a)) },
              }),
              r.value === e.AuthStatus.NEED_AUTH &&
                ((p.value = t), e.wxPaymentAuth());
          }
        };
      return (
        t({
          pageOnShow: async () => {
            (m.pageIndex = 1),
              f(!1),
              e.index.pageScrollTo({ scrollTop: 0, duration: 0 }),
              await l();
          },
          pageOnReachBottom: () => {
            f(!0);
          },
        }),
        (a, t) =>
          e.e(
            { a: S.value.length },
            S.value.length
              ? {
                  b: e.f(S.value, (t, u, n) =>
                    e.e(
                      { a: I(t) },
                      I(t)
                        ? {
                            b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24061315284909309340201240.png',
                            c: e.t(e.unref(e.padZeroToTwoDigits)(c.value.m)),
                            d: e.t(e.unref(e.padZeroToTwoDigits)(c.value.s)),
                            e: e.o((a) => {
                              return (
                                (u = t),
                                void S.value.forEach((a) => {
                                  a.orderID === u.orderID &&
                                    ((a.payStatus =
                                      e.PaymentStatusEnum.OverTime),
                                    (a.inquiryStatus =
                                      e.InquiryStatusEnum.EndOverTimeCancel));
                                })
                              );
                              var u;
                            }, t.orderID),
                            f: '19511559-0-' + n,
                            g: e.o((e) => (c.value = e), t.orderID),
                            h: e.p({ 'end-time': v(t), modelValue: c.value }),
                          }
                        : {
                            i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692822001/24030710454958366680201233.png',
                            j: e.t(t.year),
                            k: e.t(e.unref(e.padZeroToTwoDigits)(t.month)),
                            l: e.t(e.unref(e.padZeroToTwoDigits)(t.day)),
                          },
                      { m: e.t(E(t)), n: g(t) },
                      a.isPayment
                        ? { o: e.t(e.unref(e.formatCurrency)(t.inquiryMoney)) }
                        : {},
                      {
                        p: e.t(e.unref(e.formatValue)(t.doctorName)),
                        q: t.doctorName,
                      },
                      (t.doctorName, {}),
                      {
                        r: e.t(t.sectionName),
                        s: e.t(e.unref(e.formatValue)(t.patientName)),
                        t: e.t(e.unref(e.inquiryModeDesc)[t.inquiryWay]),
                        v:
                          t.payStatus ===
                          e.unref(e.PaymentStatusEnum).RefundSuccess,
                      },
                      (t.payStatus,
                      e.unref(e.PaymentStatusEnum).RefundSuccess,
                      {}),
                      { w: D(t) },
                      D(t)
                        ? {
                            x: e.o(
                              (a) =>
                                ((a) => {
                                  e.appNavigator.navigateTo(
                                    e.appNavigator.pagesMap.chat,
                                    { query: { orderID: a.orderID } }
                                  );
                                })(t),
                              t.orderID
                            ),
                          }
                        : {},
                      { y: h(t) },
                      h(t)
                        ? {
                            z: e.o(
                              (a) => P(t, e.unref(e.AutoJumpEnum).Refund),
                              t.orderID
                            ),
                          }
                        : {},
                      { A: I(t) },
                      I(t)
                        ? {
                            B: e.o(
                              (a) => P(t, e.unref(e.AutoJumpEnum).Payment),
                              t.orderID
                            ),
                          }
                        : {},
                      {
                        C: t.orderID,
                        D: e.o(
                          (a) =>
                            ((a) => {
                              e.appNavigator.navigateTo(
                                e.appNavigator.pagesMap['inquiry-order-detail'],
                                { query: { orderID: a.orderID } }
                              );
                            })(t),
                          t.orderID
                        ),
                      }
                    )
                  ),
                  c: a.isPayment,
                  d: e.p({ status: y.value }),
                }
              : {
                  e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717461502315460201233.png',
                }
          )
      );
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-19511559']]);
wx.createComponent(t);
