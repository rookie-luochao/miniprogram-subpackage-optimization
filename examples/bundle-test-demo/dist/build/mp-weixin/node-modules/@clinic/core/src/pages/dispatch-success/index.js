'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-countdown')();
}
Math;
const a = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const u = e.useMedicalInsuranceAuthStore(),
        { medicalAuthStatus: o, payAuthInfo: l } = e.storeToRefs(u),
        { medicalInfo: n, fetchMedicalPayment: r } = e.useMedicalInfo(),
        i = e.ref(''),
        v = e.ref(null),
        d = e.ref(0),
        c = e.ref(null),
        p = async () => {
          var a;
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: t } =
              await e.requestDetailInquiryOrderWithDoctorComment({
                orderID: i.value,
              });
            (c.value = t),
              (null == (a = c.value) ? void 0 : a.dispatchTime) &&
                (d.value = e
                  .dayjs(c.value.dispatchTime)
                  .add(10, 'minute')
                  .valueOf());
          } finally {
            e.index.hideLoading();
          }
        },
        m = e.ref(!1),
        s = () => {
          m.value = !0;
        },
        y = () => {
          var a;
          e.appNavigator.navigateTo(e.appNavigator.pagesMap.chat, {
            query: { orderID: null == (a = c.value) ? void 0 : a.orderID },
          });
        },
        h = () => {
          c.value &&
            (o.value === e.AuthStatus.NO_AUTH &&
              e.appNavigator.navigateTo(e.appNavigator.pagesMap['pay-result'], {
                query: {
                  orderDetail: encodeURIComponent(JSON.stringify(c.value)),
                },
              }),
            o.value === e.AuthStatus.NEED_AUTH &&
              ((v.value = e.AutoJumpEnum.Payment), e.wxPaymentAuth()));
        };
      return (
        t({
          pageOnLoad: async (e) => {
            (i.value = e.orderID), await p();
          },
          pageOnShow: async () => {
            var a, t;
            if (v.value === e.AutoJumpEnum.Payment) {
              if (!l.value.authNo) return;
              try {
                await r(),
                  (null == (a = n.value) ? void 0 : a.pay_auth_no) &&
                    ((v.value = null),
                    e.appNavigator.redirectTo(
                      e.appNavigator.pagesMap['pay-detail'],
                      {
                        query: {
                          payAuthNo:
                            null == (t = n.value) ? void 0 : t.pay_auth_no,
                          orderDetail: encodeURIComponent(
                            JSON.stringify(c.value)
                          ),
                        },
                      }
                    ));
              } catch (u) {}
            }
          },
        }),
        (a, t) => {
          var u, o, l, n, r, i, v, p, f, N, g;
          return e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082715050678127620201233.png',
              b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082714303357865670201233.png',
              c: null == (u = c.value) ? void 0 : u.doctorHeadImg,
              d: e.t(
                e.unref(e.formatValue)(
                  null == (o = c.value) ? void 0 : o.doctorName
                )
              ),
              e: null == (l = c.value) ? void 0 : l.doctorName,
            },
            (null == (n = c.value) || n.doctorName, {}),
            {
              f: e.t(null == (r = c.value) ? void 0 : r.titleName),
              g: e.t(
                e.unref(e.formatValue)(
                  null == (i = c.value) ? void 0 : i.doctorSectionName
                )
              ),
              h: null == (v = c.value) ? void 0 : v.doctorSectionName,
            },
            (null == (p = c.value) || p.doctorSectionName, {}),
            {
              i: e.t(null == (f = c.value) ? void 0 : f.orderOrigin),
              j: c.value,
            },
            c.value
              ? e.e(
                  {
                    k:
                      (null == (N = c.value) ? void 0 : N.payStatus) ===
                      e.unref(e.PaymentStatusEnum).NoNeed,
                  },
                  (null == (g = c.value) ? void 0 : g.payStatus) ===
                    e.unref(e.PaymentStatusEnum).NoNeed
                    ? { l: e.o(y) }
                    : e.e(
                        { m: !m.value },
                        m.value
                          ? {}
                          : {
                              n: e.o(s),
                              o: e.p({
                                'end-time': d.value,
                                format: 'mm分ss秒',
                              }),
                            },
                        { p: !m.value },
                        m.value ? {} : { q: e.o(h) }
                      )
                )
              : {}
          );
        }
      );
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-2be7518c']]);
wx.createComponent(t);
