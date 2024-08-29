'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-countdown')();
}
Math ||
  (
    n +
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js') +
    a
  )();
const a = () => '../../components/Modal/index.js',
  n = () => '../../components/Navbar/index.js',
  t = e.defineComponent({
    __name: 'index',
    setup(a, { expose: n }) {
      e.ref({ m: '00', s: '00' });
      const t = e.ref([]),
        l = e.ref(null),
        u = async (a) => {
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: n } =
                await e.requestDetailInquiryOrderWithDoctorComment({
                  orderID: a,
                }),
              [u, o, r] = e.dayjs(n.addTime).format('YYYY-MM-DD').split('-');
            l.value = { ...n, year: u, month: o, day: r };
            const { data: i } = await e.requestSelectMedicineByOrderId({
              inquiryOrderID: a,
            });
            t.value = i;
          } finally {
            e.index.hideLoading();
          }
        },
        o = e.computed(() => {
          var a, n;
          if (1 === (null == (a = l.value) ? void 0 : a.referral))
            return '已转诊';
          const t = null == (n = l.value) ? void 0 : n.inquiryStatus;
          return e.InquiryStatusDesc[t] || '--';
        }),
        r = e.computed(() => {
          var a;
          const n = null == (a = l.value) ? void 0 : a.inquiryStatus;
          return e.InquiryStatusTips[n] || '--';
        }),
        i = () => {
          var a;
          e.appNavigator.navigateTo(e.appNavigator.pagesMap.chat, {
            query: { orderID: null == (a = l.value) ? void 0 : a.orderID },
          });
        },
        d = e.ref(null),
        v = () => {
          var a;
          if (!l.value) return;
          const { orderID: n, orgCode: t, orgID: o, orderPrice: r } = l.value;
          null == (a = d.value) ||
            a.openModal({
              content: '是否确认取消该订单？',
              onConfirm: async () => {
                try {
                  e.index.showLoading({ title: '取消中…', mask: !0 }),
                    await e.requestCancelOrder({
                      orderID: n,
                      orgCode: t,
                      orgID: o,
                      refundAmount: r,
                    }),
                    u(n),
                    e.index.showToast({ title: '取消成功', icon: 'none' });
                } finally {
                  e.index.hideLoading();
                }
              },
            });
        },
        c = e.ref();
      return (
        n({
          pageOnLoad: (e) => {
            const { orderID: a } = e;
            u(a);
          },
          pageOnScroll: (e) => {
            var a;
            null == (a = c.value) || a.pageOnScroll(e);
          },
        }),
        (a, n) => {
          var u,
            s,
            m,
            f,
            p,
            y,
            g,
            h,
            D,
            I,
            q,
            T,
            S,
            w,
            M,
            N,
            x,
            b,
            C,
            V,
            O,
            k,
            Y,
            j,
            L,
            _,
            A,
            E,
            P,
            U,
            W;
          return e.e(
            {
              a: e.sr(c, '3a0370f9-0', { k: 'navbarRef' }),
              b: e.p({
                title: '问诊订单',
                'is-show-title': !1,
                'back-left': 23,
              }),
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717464177442930201240.png',
              d: e.t(o.value),
              e: e.t(r.value),
            },
            {},
            {},
            { f: null == (u = l.value) ? void 0 : u.doctorName },
            (null == (s = l.value) ? void 0 : s.doctorName)
              ? e.e(
                  {
                    g: null == (m = l.value) ? void 0 : m.doctorHeadImg,
                    h: e.t(
                      e.unref(e.formatValue)(
                        null == (f = l.value) ? void 0 : f.doctorName
                      )
                    ),
                    i: null == (p = l.value) ? void 0 : p.doctorName,
                  },
                  (null == (y = l.value) || y.doctorName, {}),
                  {
                    j: e.t(
                      null == (g = l.value) ? void 0 : g.doctorSectionName
                    ),
                    k: e.t(null == (h = l.value) ? void 0 : h.titleName),
                    l: e.t(
                      e.unref(e.formatValue)(
                        null == (D = l.value) ? void 0 : D.orderOrigin
                      )
                    ),
                    m: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692822001/24030711431836267920201233.png',
                    n: e.o(i),
                  }
                )
              : {},
            {
              o: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692822001/24030710454958366680201233.png',
              p: e.t(null == (I = l.value) ? void 0 : I.year),
              q: e.t(
                e.unref(e.padZeroToTwoDigits)(
                  null == (q = l.value) ? void 0 : q.month
                )
              ),
              r: e.t(
                e.unref(e.padZeroToTwoDigits)(
                  null == (T = l.value) ? void 0 : T.day
                )
              ),
            },
            {
              y: e.t(
                e.unref(e.formatCurrency)(
                  null == (S = l.value) ? void 0 : S.inquiryMoney
                )
              ),
            },
            {
              z: e.t(
                e.unref(e.inquiryModeDesc)[
                  null == (w = l.value) ? void 0 : w.inquiryWay
                ]
              ),
              A: e.t(
                e.unref(e.formatValue)(
                  null == (M = l.value) ? void 0 : M.patientName
                )
              ),
              B: e.t(
                e.unref(e.GenderDesc)[
                  null == (N = l.value) ? void 0 : N.patientSex
                ]
              ),
              C: e.t(null == (x = l.value) ? void 0 : x.patientAge),
              D: e.t(null == (b = l.value) ? void 0 : b.illDesc),
              E: e.f(
                null == (C = l.value) ? void 0 : C.certificateUrls,
                (a, n, t) => ({
                  a: a,
                  b: e.o((n) => {
                    return (
                      (t = a),
                      void e.index.previewImage({ urls: [t], current: 1 })
                    );
                    var t;
                  }, a),
                  c: a,
                })
              ),
              F: t.value.length,
            },
            t.value.length
              ? {
                  G: e.f(t.value, (a, n, t) => ({
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
              H: e.t(
                e.unref(e.formatValue)(
                  null == (V = l.value) ? void 0 : V.treatedHospital
                )
              ),
              I: e.t(
                e.unref(e.formatValue)(
                  null == (O = l.value) ? void 0 : O.treatedSection
                )
              ),
              J: e.t(
                e.unref(e.formatValue)(
                  (null == (k = l.value) ? void 0 : k.clinicTime) !==
                    e.unref(e.DEFAULT_TIME)
                    ? e
                        .unref(e.dayjs)(
                          null == (Y = l.value) ? void 0 : Y.clinicTime
                        )
                        .format('YYYY-MM-DD')
                    : ''
                )
              ),
              K: e.t(
                e.unref(e.formatValue)(
                  null == (j = l.value) ? void 0 : j.diagnosis
                )
              ),
              L: e.t(
                e.unref(e.formatValue)(
                  null == (L = l.value) ? void 0 : L.orderID
                )
              ),
              M: e.t(
                e.unref(e.formatValue)(
                  null == (_ = l.value) ? void 0 : _.addTime
                )
              ),
              N: null == (A = l.value) ? void 0 : A.cancelTime,
            },
            (null == (E = l.value) ? void 0 : E.cancelTime)
              ? {
                  O: e.t(
                    e.unref(e.formatValue)(
                      null == (P = l.value) ? void 0 : P.cancelTime
                    )
                  ),
                }
              : {},
            {
              P:
                (null == (U = l.value) ? void 0 : U.inquiryStatus) ==
                e.unref(e.InquiryStatusEnum).DealingWaitDispatch,
            },
            (null == (W = l.value) ? void 0 : W.inquiryStatus) ==
              e.unref(e.InquiryStatusEnum).DealingWaitDispatch
              ? { Q: e.o(v) }
              : {},
            { R: e.sr(d, '3a0370f9-2', { k: 'modalRef' }) }
          );
        }
      );
    },
  }),
  l = e._export_sfc(t, [['__scopeId', 'data-v-3a0370f9']]);
wx.createComponent(l);
