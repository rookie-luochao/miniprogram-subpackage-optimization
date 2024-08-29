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
const o = e.defineComponent({
    __name: 'index',
    props: { isPayment: { type: Boolean, default: !0 } },
    setup(o, { expose: a }) {
      const r = e.useUserInfoStore(),
        { userInfo: t } = e.storeToRefs(r);
      e.ref({ m: '00', s: '00' });
      const n = e.reactive({ pages: 1, pageIndex: 1, total: 0 }),
        u = e.ref(!0),
        i = e.ref(!1),
        d = e.ref([]),
        s = async (o = !1) => {
          var a, r;
          if (!(n.pageIndex > n.pages))
            try {
              (u.value = !0),
                o || e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: s } = await e.requestCusPageMyInquiryOrder({
                  pageIndex: n.pageIndex,
                  pageSize: 10,
                  orgID: null == (a = t.value) ? void 0 : a.orgID,
                  patientID: null == (r = t.value) ? void 0 : r.keyID,
                  serviceCode: e.SERVICE_CODE,
                }),
                { current: p, total: c, pages: l, records: m } = s;
              (n.pageIndex = p + 1),
                (n.total = c),
                (n.pages = l),
                (i.value = n.pageIndex > n.pages);
              const g = m.map((o) => {
                const [a, r, t] = e
                  .dayjs(o.addTime)
                  .format('YYYY-MM-DD')
                  .split('-');
                return { ...o, year: a, month: r, day: t };
              });
              d.value = o ? [...d.value, ...g] : g;
            } finally {
              (u.value = !1), e.index.hideLoading();
            }
        },
        p = e.computed(() =>
          u.value
            ? e.LoadMoreStatus.Loading
            : i.value
              ? e.LoadMoreStatus.NoMore
              : e.LoadMoreStatus.More
        ),
        c = (o) => {
          if (1 === o.referral) return '已转诊';
          const a = o.inquiryStatus;
          return e.InquiryStatusDesc[a] || '--';
        },
        l = (o) => {
          const a = o.inquiryStatus;
          return e.InquiryStatusColor[a] || '#cccccc';
        };
      return (
        a({
          pageOnShow: () => {
            (n.pageIndex = 1),
              s(!1),
              e.index.pageScrollTo({ scrollTop: 0, duration: 0 });
          },
          pageOnReachBottom: () => {
            s(!0);
          },
        }),
        (o, a) =>
          e.e(
            { a: d.value.length },
            d.value.length
              ? {
                  b: e.f(d.value, (a, r, t) =>
                    e.e(
                      {
                        a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692822001/24030710454958366680201233.png',
                        b: e.t(a.year),
                        c: e.t(e.unref(e.padZeroToTwoDigits)(a.month)),
                        d: e.t(e.unref(e.padZeroToTwoDigits)(a.day)),
                      },
                      { k: e.t(c(a)), l: l(a) },
                      o.isPayment
                        ? { m: e.t(e.unref(e.formatCurrency)(a.inquiryMoney)) }
                        : {},
                      {
                        n: e.t(e.unref(e.formatValue)(a.doctorName)),
                        o: a.doctorName,
                      },
                      (a.doctorName, {}),
                      {
                        p: e.t(a.sectionName),
                        q: e.t(e.unref(e.formatValue)(a.patientName)),
                        r: e.t(e.unref(e.inquiryModeDesc)[a.inquiryWay]),
                      },
                      {},
                      {},
                      {},
                      { v: a.doctorName },
                      a.doctorName
                        ? {
                            w: e.o(
                              (o) =>
                                ((o) => {
                                  e.appNavigator.navigateTo(
                                    e.appNavigator.pagesMap.chat,
                                    { query: { orderID: o.orderID } }
                                  );
                                })(a),
                              a.orderID
                            ),
                          }
                        : {},
                      {
                        x: a.orderID,
                        y: e.o(
                          (o) =>
                            ((o) => {
                              e.appNavigator.navigateTo(
                                e.appNavigator.pagesMap['inquiry-order-detail'],
                                { query: { orderID: o.orderID } }
                              );
                            })(a),
                          a.orderID
                        ),
                      }
                    )
                  ),
                  c: o.isPayment,
                  d: e.p({ status: p.value }),
                }
              : {
                  e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717461502315460201233.png',
                }
          )
      );
    },
  }),
  a = e._export_sfc(o, [['__scopeId', 'data-v-71ad9f7a']]);
wx.createComponent(a);
