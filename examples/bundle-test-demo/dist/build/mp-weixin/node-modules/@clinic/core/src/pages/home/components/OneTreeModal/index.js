'use strict';
const e = require('../../../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math;
const a = e.defineComponent({
    __name: 'index',
    setup(a, { expose: o }) {
      const n = e.ref(!1),
        t = e.ref(null),
        r = e.ref(null),
        i = async () => {
          var a;
          try {
            e.index.showLoading({ title: '删除中…', mask: !0 }),
              await e.requestDelErpInquiryOrder({
                patientID: (null == (a = t.value) ? void 0 : a.patientID) || '',
              }),
              (n.value = !1),
              e.index.showToast({ title: '删除成功', icon: 'none' });
          } catch (o) {
            e.index.hideLoading();
          }
        },
        l = () => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['inquiry-info'], {
            query: {
              subOrgInfo: JSON.stringify(r.value),
              orderDetail: JSON.stringify(t.value),
            },
          });
        };
      return (
        o({
          openModal: (e) => {
            (t.value = { ...e.orderDetail }),
              (r.value = e.subOrgInfo),
              (n.value = !0);
          },
        }),
        (a, o) => {
          var r, u;
          return {
            a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082318520149813220201233.png',
            b: e.o((e) => (n.value = !1)),
            c: e.t(
              e.unref(e.formatValue)(
                null == (r = t.value) ? void 0 : r.patientName
              )
            ),
            d: e.t(
              e.unref(e.formatValue)(null == (u = t.value) ? void 0 : u.illDesc)
            ),
            e: e.o(i),
            f: e.o(l),
            g: e.o((e) => (n.value = e)),
            h: e.p({
              'custom-style': { borderRadius: '12px' },
              'close-on-click-overlay': !1,
              visible: n.value,
            }),
          };
        }
      );
    },
  }),
  o = e._export_sfc(a, [['__scopeId', 'data-v-248e5119']]);
wx.createComponent(o);
