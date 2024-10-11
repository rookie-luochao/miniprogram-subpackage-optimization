'use strict';
const e = require('../../../../../../common/vendor.js');
Math || a();
const a = () => '../../components/Modal/index.js',
  r = e.defineComponent({
    __name: 'index',
    setup(a, { expose: r }) {
      const t = e.ref(''),
        n = e.ref(''),
        o = e.ref(!1);
      let u = null;
      const s = () => {
          c(), (u = setInterval(c, 3e3));
        },
        i = () => {
          u && (clearInterval(u), (u = null));
        },
        l = e.ref(null),
        c = async () => {
          if (!t.value) return;
          const { data: a } = await e.requestGetInquiryOrderDetail({
            inquiryOrderID: t.value,
          });
          (l.value = a),
            a.doctorImID &&
              (i(),
              e.appNavigator.reLaunch(
                e.appNavigator.pagesMap['dispatch-success'],
                { query: { orderID: l.value.keyID } }
              ));
        },
        d = e.ref(null),
        p = () => {
          var a;
          l.value &&
            (null == (a = d.value) ||
              a.openModal({
                content: '是否确认取消订单？',
                onConfirm: async () => {
                  try {
                    e.index.showLoading({ title: '取消中…', mask: !0 });
                    const {
                      keyID: a,
                      orgCode: r,
                      orgID: t,
                      inquiryMoney: n,
                    } = l.value;
                    await e.requestCancelOrder({
                      orderID: a,
                      orgCode: r,
                      orgID: t,
                      refundAmount: n,
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
        r({
          pageOnLoad: async (a) => {
            if (
              ((t.value = a.orderID),
              (n.value = a.payAuthNo),
              (o.value = JSON.parse(a.isTransfer)),
              o.value)
            ) {
              const { data: a } = await e.requestCreateTransferInquiryOrder({
                inquiryOrderID: t.value,
                authNo: n.value,
              });
              (o.value = !1), (t.value = a.keyID), s();
            }
          },
          pageOnShow: () => {
            o.value || s();
          },
          pageOnHide: () => {
            i();
          },
        }),
        (a, r) =>
          e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082711061933076950201233.png',
              b: l.value,
            },
            l.value
              ? e.e(
                  {
                    c:
                      l.value.payStatus === e.unref(e.PaymentStatusEnum).NoNeed,
                  },
                  (l.value.payStatus, e.unref(e.PaymentStatusEnum).NoNeed, {})
                )
              : {},
            { d: e.o(p), e: e.sr(d, '294c57eb-0', { k: 'modalRef' }) }
          )
      );
    },
  }),
  t = e._export_sfc(r, [['__scopeId', 'data-v-294c57eb']]);
wx.createComponent(t);
