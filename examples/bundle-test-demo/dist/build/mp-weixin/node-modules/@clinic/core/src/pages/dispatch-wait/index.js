'use strict';
const e = require('../../../../../../common/vendor.js');
Math || a();
const a = () => '../../components/Modal/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(a, { expose: o }) {
      const { statusBarHeight: n } = e.useNavSize(),
        t = e.ref('');
      let r = null;
      const i = () => {
          r && (clearInterval(r), (r = null));
        },
        c = e.ref(null),
        s = async () => {
          if (!t.value) return;
          const { data: a } = await e.requestGetInquiryOrderDetail({
            inquiryOrderID: t.value,
          });
          (c.value = a),
            a.doctorImID &&
              (i(),
              e.appNavigator.reLaunch(e.appNavigator.pagesMap.chat, {
                query: { orderID: c.value.keyID },
              }));
        },
        p = e.ref(null),
        u = () => {
          var a;
          c.value &&
            (null == (a = p.value) ||
              a.openModal({
                content: '是否确认取消订单？',
                onConfirm: async () => {
                  try {
                    e.index.showLoading({ title: '取消中…', mask: !0 });
                    const {
                      keyID: a,
                      orgCode: o,
                      orgID: n,
                      inquiryMoney: t,
                    } = c.value;
                    await e.requestCancelOrder({
                      orderID: a,
                      orgCode: o,
                      orgID: n,
                      refundAmount: t,
                    }),
                      i(),
                      e.index.showToast({
                        title: '取消成功',
                        icon: 'none',
                        mask: !0,
                      }),
                      setTimeout(() => {
                        e.index.hideToast(),
                          e.appNavigator.switchTab(
                            e.appNavigator.pagesMap.home
                          );
                      }, 1500);
                  } catch (a) {
                    e.index.hideLoading();
                  }
                },
              }));
        };
      return (
        o({
          pageOnLoad: (e) => {
            t.value = e.orderID;
          },
          pageOnShow: () => {
            s(), (r = setInterval(s, 3e3));
          },
          pageOnHide: () => {
            i();
          },
        }),
        (a, o) =>
          e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071618085440740760201233.png',
              b: e.unref(n) + 8 + 'px',
              c: e.o((a) => e.unref(e.appNavigator).navigateBack()),
              d: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082711061933076950201233.png',
            },
            {},
            { e: e.o(u), f: e.sr(p, 'f21e5e68-0', { k: 'modalRef' }) }
          )
      );
    },
  }),
  n = e._export_sfc(o, [['__scopeId', 'data-v-f21e5e68']]);
wx.createComponent(n);
