'use strict';
const e = require('../../../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math;
const a = e.defineComponent({
    __name: 'index',
    setup(a, { expose: r }) {
      const o = e.ref(!1),
        t = e.ref(!0),
        u = e.ref([]),
        n = (a) => {
          if (1 === a.referral) return '已转诊';
          const r = a.inquiryStatus;
          return e.InquiryStatusDesc[r] || '--';
        };
      return (
        r({
          openModal: (e) => {
            (o.value = !0),
              (u.value = e.inquiryOrderList),
              (t.value = e.canCreateOrder);
          },
        }),
        (a, r) =>
          e.e(
            {
              a: e.t(
                t.value
                  ? '您当前存在未完成的订单，请前往处理！'
                  : `您当前存在${u.value.length}个未完成的订单，请前往处理，否则将无法创单！`
              ),
              b: e.f(u.value, (a, r, o) =>
                e.e(
                  {
                    a: e.t(n(a)),
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
                      (r) =>
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
              c: t.value,
            },
            t.value ? { d: e.o((e) => (o.value = !1)) } : {},
            {
              e: e.o((e) => (o.value = e)),
              f: e.p({
                'custom-style': { borderRadius: '12px' },
                'close-on-click-overlay': !1,
                visible: o.value,
              }),
            }
          )
      );
    },
  }),
  r = e._export_sfc(a, [['__scopeId', 'data-v-fa8c97a0']]);
wx.createComponent(r);
