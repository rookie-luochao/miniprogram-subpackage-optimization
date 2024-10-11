'use strict';
const e = require('../../../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math;
const a = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const r = e.ref(!1),
        u = e.ref(!0),
        n = e.ref([]),
        o = (a) => {
          const t = a.payStatus,
            r = a.inquiryStatus;
          if (1 === a.referral) return '已转诊';
          if (t === e.PaymentStatusEnum.WaitPay) return '待支付';
          const u = [
            e.PaymentStatusEnum.PaySuccess,
            e.PaymentStatusEnum.NoNeed,
          ];
          return r === e.InquiryStatusEnum.DealingWaitAccept && u.includes(t)
            ? '待接诊'
            : e.InquiryStatusDesc[r] || '--';
        };
      return (
        t({
          openModal: (e) => {
            (r.value = !0),
              (n.value = e.inquiryOrderList),
              (u.value = e.canCreateOrder);
          },
        }),
        (a, t) =>
          e.e(
            {
              a: e.t(
                u.value
                  ? '您当前存在未完成的订单，请前往处理！'
                  : `您当前存在${n.value.length}个未完成的订单，请前往处理，否则将无法创单！`
              ),
              b: e.f(n.value, (a, t, r) =>
                e.e(
                  {
                    a: e.t(o(a)),
                    b: e.t(e.unref(e.inquiryModeDesc)[a.inquiryWay]),
                    c: e.t(e.unref(e.formatValue)(a.illDesc)),
                    d: e.t(
                      e.unref(e.formatValue)(
                        null == a ? void 0 : a.doctorStaffName
                      )
                    ),
                    e: null == a ? void 0 : a.doctorStaffName,
                  },
                  (null == a || a.doctorStaffName, {}),
                  {
                    f: e.t(null == a ? void 0 : a.doctorSectionName),
                    g: e.t(a.addTime),
                    h: a.keyID,
                    i: e.o(
                      (t) =>
                        ((a) => {
                          e.appNavigator.navigateTo(
                            e.appNavigator.pagesMap['inquiry-order-detail'],
                            { query: { orderID: a.keyID } }
                          );
                        })(a),
                      a.keyID
                    ),
                  }
                )
              ),
              c: u.value,
            },
            u.value ? { d: e.o((e) => (r.value = !1)) } : {},
            {
              e: e.o((e) => (r.value = e)),
              f: e.p({
                'custom-style': { borderRadius: '12px' },
                'close-on-click-overlay': !1,
                visible: r.value,
              }),
            }
          )
      );
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-ecfa8595']]);
wx.createComponent(t);
