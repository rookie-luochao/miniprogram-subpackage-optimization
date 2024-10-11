'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-countdown')();
}
Math ||
  (
    u +
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js') +
    a
  )();
const a = () => '../../components/Modal/index.js',
  u = () => '../../components/Navbar/index.js',
  t = e.defineComponent({
    __name: 'index',
    props: { isPayment: { type: Boolean, default: !0 } },
    setup(a, { expose: u }) {
      const t = e.ref({ m: '00', s: '00' }),
        n = e.useMedicalInsuranceAuthStore(),
        { medicalAuthStatus: l, payAuthInfo: i } = e.storeToRefs(n),
        { medicalInfo: o, fetchMedicalPayment: r } = e.useMedicalInfo(),
        d = e.ref(''),
        v = e.ref(null),
        s = async () => {
          var a, u;
          if (!i.value.authNo) return;
          const t = {
            [e.AutoJumpEnum.Payment]: e.appNavigator.pagesMap['pay-detail'],
            [e.AutoJumpEnum.Refund]: e.appNavigator.pagesMap['refund-result'],
          };
          try {
            if (
              v.value === e.AutoJumpEnum.Payment ||
              v.value === e.AutoJumpEnum.Refund
            ) {
              const n = t[v.value];
              await r(),
                (null == (a = o.value) ? void 0 : a.pay_auth_no) &&
                  ((v.value = null),
                  e.appNavigator.navigateTo(n, {
                    query: {
                      payAuthNo: null == (u = o.value) ? void 0 : u.pay_auth_no,
                      orderDetail: encodeURIComponent(JSON.stringify(p.value)),
                    },
                  }));
            }
          } catch (n) {}
        },
        m = e.ref(null),
        c = e.ref([]),
        p = e.ref(null),
        y = async (a = !0) => {
          if (d.value)
            try {
              a && e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: u } =
                  await e.requestDetailInquiryOrderWithDoctorComment({
                    orderID: d.value,
                  }),
                [t, n, l] = e.dayjs(u.addTime).format('YYYY-MM-DD').split('-');
              (p.value = { ...u, year: t, month: n, day: l }),
                u.inquiryStatus == e.InquiryStatusEnum.DealingWaitDispatch
                  ? (m.value = setTimeout(() => y(!1), 3e3))
                  : m.value && clearTimeout(m.value);
              const { data: i } = await e.requestSelectMedicineByOrderId({
                inquiryOrderID: d.value,
              });
              c.value = i;
            } finally {
              e.index.hideLoading();
            }
        },
        f = e.computed(() => {
          var a, u, t;
          const n = null == (a = p.value) ? void 0 : a.payStatus,
            l = null == (u = p.value) ? void 0 : u.inquiryStatus;
          if (1 === (null == (t = p.value) ? void 0 : t.referral))
            return '已转诊';
          const i = [
            e.PaymentStatusEnum.PaySuccess,
            e.PaymentStatusEnum.NoNeed,
          ];
          if (l === e.InquiryStatusEnum.DealingWaitAccept) {
            if (n === e.PaymentStatusEnum.WaitPay) return '待支付';
            if (i.includes(n)) return '待接诊';
          }
          return e.InquiryStatusDesc[l] || '--';
        }),
        S = e.computed(() => {
          var a;
          const u = null == (a = p.value) ? void 0 : a.inquiryStatus;
          return e.InquiryStatusTips[u] || '--';
        }),
        g = e.computed(() => {
          var a, u;
          const t = null == (a = p.value) ? void 0 : a.payStatus,
            n = null == (u = p.value) ? void 0 : u.inquiryStatus;
          if (t === e.PaymentStatusEnum.WaitRefund) return !0;
          const l = [
              e.InquiryStatusEnum.EndDoctorCancel,
              e.InquiryStatusEnum.EndOverTimeCancel,
              e.InquiryStatusEnum.EndDoctorRefund,
            ].includes(n),
            i = t === e.PaymentStatusEnum.PaySuccess;
          return l && i;
        }),
        E = e.computed(() => {
          var a, u;
          const t = null == (a = p.value) ? void 0 : a.payStatus,
            n = null == (u = p.value) ? void 0 : u.inquiryStatus,
            l = [
              e.InquiryStatusEnum.DealingAccept,
              e.InquiryStatusEnum.SystemEnd,
              e.InquiryStatusEnum.EndFinish,
              e.InquiryStatusEnum.DealingWaitAccept,
              e.InquiryStatusEnum.EndDoctorCancel,
              e.InquiryStatusEnum.EndDoctorRefund,
            ],
            i = [
              e.PaymentStatusEnum.PaySuccess,
              e.PaymentStatusEnum.RefundSuccess,
              e.PaymentStatusEnum.NoNeed,
            ];
          return l.includes(n) && i.includes(t);
        }),
        h = e.computed(() => {
          var a;
          return (
            (null == (a = p.value) ? void 0 : a.inquiryStatus) ===
            e.InquiryStatusEnum.DealingWaitDispatch
          );
        }),
        D = e.computed(() => {
          var a, u;
          const t = null == (a = p.value) ? void 0 : a.payStatus,
            n = null == (u = p.value) ? void 0 : u.inquiryStatus,
            l = [e.PaymentStatusEnum.WaitPay],
            i = [
              e.InquiryStatusEnum.DealingWaitDispatch,
              e.InquiryStatusEnum.EndPatientCancel,
              e.InquiryStatusEnum.EndOverTimeCancel,
            ];
          return l.includes(t) && !i.includes(n);
        }),
        I = e.computed(() => {
          var a, u;
          const t = null == (a = p.value) ? void 0 : a.payStatus,
            n = null == (u = p.value) ? void 0 : u.inquiryStatus,
            l = n === e.InquiryStatusEnum.DealingWaitDispatch,
            i = ![
              e.InquiryStatusEnum.EndPatientCancel,
              e.InquiryStatusEnum.EndOverTimeCancel,
            ].includes(n),
            o = t === e.PaymentStatusEnum.WaitPay;
          return l || (i && o);
        }),
        q = () => {
          var a;
          return e
            .dayjs(null == (a = p.value) ? void 0 : a.dispatchTime)
            .add(10, 'minute')
            .valueOf();
        },
        T = () => {
          y();
        },
        P = () => {
          var a;
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['dispatch-wait'], {
            query: { orderID: null == (a = p.value) ? void 0 : a.orderID },
          });
        },
        N = () => {
          var a;
          e.appNavigator.navigateTo(e.appNavigator.pagesMap.chat, {
            query: { orderID: null == (a = p.value) ? void 0 : a.orderID },
          });
        },
        A = (a) => {
          if (!p.value) return;
          const u = {
            [e.AutoJumpEnum.Payment]: e.appNavigator.pagesMap['pay-detail'],
            [e.AutoJumpEnum.Refund]: e.appNavigator.pagesMap['refund-result'],
          };
          if (a === e.AutoJumpEnum.Payment || a === e.AutoJumpEnum.Refund) {
            const t = u[a];
            l.value === e.AuthStatus.NO_AUTH &&
              e.appNavigator.navigateTo(t, {
                query: {
                  orderDetail: encodeURIComponent(JSON.stringify(p.value)),
                },
              }),
              l.value === e.AuthStatus.NEED_AUTH &&
                ((v.value = a), e.wxPaymentAuth());
          }
        },
        w = e.ref(null),
        M = () => {
          var a;
          if (!p.value) return;
          const { orderID: u, orgCode: t, orgID: n, orderPrice: l } = p.value;
          null == (a = w.value) ||
            a.openModal({
              content: '是否确认取消该订单？',
              onConfirm: async () => {
                try {
                  e.index.showLoading({ title: '取消中…', mask: !0 }),
                    await e.requestCancelOrder({
                      orderID: u,
                      orgCode: t,
                      orgID: n,
                      refundAmount: l,
                    }),
                    y(),
                    e.index.showToast({ title: '取消成功', icon: 'none' });
                } finally {
                  e.index.hideLoading();
                }
              },
            });
        },
        C = e.ref();
      return (
        u({
          pageOnLoad: (e) => {
            d.value = e.orderID;
          },
          pageOnShow: async () => {
            await y(), await s();
          },
          pageOnHide: () => {
            m.value && clearTimeout(m.value);
          },
          pageOnScroll: (e) => {
            var a;
            null == (a = C.value) || a.pageOnScroll(e);
          },
        }),
        (a, u) => {
          var n,
            l,
            i,
            o,
            r,
            d,
            v,
            s,
            m,
            y,
            b,
            O,
            x,
            R,
            J,
            V,
            W,
            _,
            U,
            Y,
            j,
            k,
            L,
            H,
            Z,
            B,
            F,
            G,
            z;
          return e.e(
            {
              a: e.sr(C, '91359adb-0', { k: 'navbarRef' }),
              b: e.p({
                title: '订单详情',
                'is-show-title': !1,
                'back-left': 23,
              }),
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717464177442930201240.png',
              d: e.t(f.value),
              e: e.t(S.value),
              f: g.value,
            },
            g.value ? { g: e.o((a) => A(e.unref(e.AutoJumpEnum).Refund)) } : {},
            { h: D.value },
            D.value
              ? { i: e.o((a) => A(e.unref(e.AutoJumpEnum).Payment)) }
              : {},
            { j: h.value },
            h.value ? { k: e.o(P) } : {},
            { l: null == (n = p.value) ? void 0 : n.doctorName },
            (null == (l = p.value) ? void 0 : l.doctorName)
              ? e.e(
                  {
                    m: null == (i = p.value) ? void 0 : i.doctorHeadImg,
                    n: e.t(
                      e.unref(e.formatValue)(
                        null == (o = p.value) ? void 0 : o.doctorName
                      )
                    ),
                    o: null == (r = p.value) ? void 0 : r.doctorName,
                  },
                  (null == (d = p.value) || d.doctorName, {}),
                  {
                    p: e.t(
                      null == (v = p.value) ? void 0 : v.doctorSectionName
                    ),
                    q: e.t(null == (s = p.value) ? void 0 : s.titleName),
                    r: e.t(
                      e.unref(e.formatValue)(
                        null == (m = p.value) ? void 0 : m.orderOrigin
                      )
                    ),
                    s: E.value,
                  },
                  E.value
                    ? {
                        t: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692822001/24030711431836267920201233.png',
                        v: e.o(N),
                      }
                    : {}
                )
              : {},
            { w: a.isPayment },
            a.isPayment
              ? e.e(
                  { x: D.value },
                  D.value
                    ? {
                        y: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071616150578152790201233.png',
                        z: e.t(e.unref(e.padZeroToTwoDigits)(t.value.m)),
                        A: e.t(e.unref(e.padZeroToTwoDigits)(t.value.s)),
                        B: e.o(T),
                        C: e.o((e) => (t.value = e)),
                        D: e.p({ 'end-time': q(), modelValue: t.value }),
                      }
                    : {
                        E: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692822001/24030710454958366680201233.png',
                        F: e.t(null == (y = p.value) ? void 0 : y.year),
                        G: e.t(
                          e.unref(e.padZeroToTwoDigits)(
                            null == (b = p.value) ? void 0 : b.month
                          )
                        ),
                        H: e.t(
                          e.unref(e.padZeroToTwoDigits)(
                            null == (O = p.value) ? void 0 : O.day
                          )
                        ),
                      },
                  {
                    I: e.t(
                      e.unref(e.formatCurrency)(
                        null == (x = p.value) ? void 0 : x.inquiryMoney
                      )
                    ),
                  }
                )
              : {},
            {
              J: e.t(
                e.unref(e.inquiryModeDesc)[
                  null == (R = p.value) ? void 0 : R.inquiryWay
                ]
              ),
              K: e.t(
                e.unref(e.formatValue)(
                  null == (J = p.value) ? void 0 : J.patientName
                )
              ),
              L: e.t(
                e.unref(e.GenderDesc)[
                  null == (V = p.value) ? void 0 : V.patientSex
                ]
              ),
              M: e.t(null == (W = p.value) ? void 0 : W.patientAge),
              N: e.t(null == (_ = p.value) ? void 0 : _.illDesc),
              O: e.f(
                null == (U = p.value) ? void 0 : U.certificateUrls,
                (a, u, t) => ({
                  a: a,
                  b: e.o((u) => {
                    return (
                      (t = a),
                      void e.index.previewImage({ urls: [t], current: 1 })
                    );
                    var t;
                  }, a),
                  c: a,
                })
              ),
              P: c.value.length,
            },
            c.value.length
              ? {
                  Q: e.f(c.value, (a, u, t) => ({
                    a: e.t(a.itemCount),
                    b: e.t(a.inventoryUnit),
                    c: e.t(a.itemName),
                    d: e.t(a.drugManufacturerName),
                    e: e.t(a.drugSpec),
                    f: e.t(a.minPreparationValue),
                    g: e.t(a.minPreparationUnit),
                    h: e.t(a.minPackageUnit),
                    i: a.keyID,
                  })),
                }
              : {},
            {
              R: e.t(
                e.unref(e.formatValue)(
                  null == (Y = p.value) ? void 0 : Y.treatedHospital
                )
              ),
              S: e.t(
                e.unref(e.formatValue)(
                  null == (j = p.value) ? void 0 : j.treatedSection
                )
              ),
              T: e.t(
                e.unref(e.formatValue)(
                  (null == (k = p.value) ? void 0 : k.clinicTime) !==
                    e.unref(e.DEFAULT_TIME)
                    ? e
                        .unref(e.dayjs)(
                          null == (L = p.value) ? void 0 : L.clinicTime
                        )
                        .format('YYYY-MM-DD')
                    : ''
                )
              ),
              U: e.t(
                e.unref(e.formatValue)(
                  null == (H = p.value) ? void 0 : H.diagnosis
                )
              ),
              V: e.t(
                e.unref(e.formatValue)(
                  null == (Z = p.value) ? void 0 : Z.orderID
                )
              ),
              W: e.t(
                e.unref(e.formatValue)(
                  null == (B = p.value) ? void 0 : B.addTime
                )
              ),
              X: null == (F = p.value) ? void 0 : F.cancelTime,
            },
            (null == (G = p.value) ? void 0 : G.cancelTime)
              ? {
                  Y: e.t(
                    e.unref(e.formatValue)(
                      null == (z = p.value) ? void 0 : z.cancelTime
                    )
                  ),
                }
              : {},
            { Z: I.value },
            I.value ? { aa: e.o(M) } : {},
            { ab: e.sr(w, '91359adb-2', { k: 'modalRef' }) }
          );
        }
      );
    },
  }),
  n = e._export_sfc(t, [['__scopeId', 'data-v-91359adb']]);
wx.createComponent(n);
