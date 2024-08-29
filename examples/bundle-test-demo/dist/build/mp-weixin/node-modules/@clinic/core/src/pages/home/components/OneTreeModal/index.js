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
        r = e.ref(null),
        t = e.ref(null),
        i = async () => {
          var a;
          try {
            e.index.showLoading({ title: '删除中…', mask: !0 }),
              await e.requestDelErpInquiryOrder({
                patientID: (null == (a = r.value) ? void 0 : a.patientID) || '',
              }),
              (n.value = !1),
              e.index.showToast({ title: '删除成功', icon: 'none' });
          } catch (o) {
            e.index.hideLoading();
          }
        },
        l = () => {
          console.log(t.value),
            e.appNavigator.navigateTo(e.appNavigator.pagesMap['inquiry-info'], {
              query: {
                subOrgInfo: JSON.stringify(t.value),
                orderDetail: JSON.stringify(r.value),
              },
            });
        };
      return (
        o({
          openModal: (e) => {
            (r.value = { ...e.orderDetail, formSource: 'yishuerp' }),
              (t.value = e.subOrgInfo),
              (n.value = !0);
          },
        }),
        (a, o) => {
          var t, u;
          return {
            a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082318520149813220201233.png',
            b: e.o((e) => (n.value = !1)),
            c: e.t(
              e.unref(e.formatValue)(
                null == (t = r.value) ? void 0 : t.patientName
              )
            ),
            d: e.t(
              e.unref(e.formatValue)(null == (u = r.value) ? void 0 : u.illDesc)
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
  o = e._export_sfc(a, [['__scopeId', 'data-v-d6b7430b']]);
wx.createComponent(o);
