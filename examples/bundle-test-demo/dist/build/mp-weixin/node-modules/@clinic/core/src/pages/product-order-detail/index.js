'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('nut-countdown') + e.resolveComponent('nut-overlay'))();
}
Math ||
  (
    o +
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js') +
    l +
    (() => '../../../node-modules/nutui-uniapp/components/overlay/overlay.js') +
    a
  )();
const a = () => '../../components/Modal/index.js',
  o = () => '../../components/Navbar/index.js',
  l = () => '../../components/ProductDetailCard/index.js',
  r = e.defineComponent({
    __name: 'index',
    setup(a, { expose: o }) {
      const l = e.useUserInfoStore(),
        r = e.ref({ m: '', s: '' }),
        i = e.computed(() => {
          var a;
          return e
            .dayjs(null == (a = p.value) ? void 0 : a.createTime)
            .add(15, 'minutes')
            .valueOf();
        }),
        t = () => {
          p.value.orderStatus = e.OrderStatus.Cancel;
        },
        u = e.ref(!1),
        n = () => {
          u.value = !0;
        },
        d = () => {
          u.value = !1;
        },
        s = () => {
          var a, o, l, r, i;
          e.appNavigator.navigateTo(
            e.appNavigator.pagesMap['product-order-logistics'],
            {
              query: {
                goodsOrderId: '202411271861676332079702017',
                logisticsNumber:
                  null == (a = p.value) ? void 0 : a.logisticsNumber,
                logisticsCompany:
                  null == (o = p.value) ? void 0 : o.logisticsCompany,
                address: `${null == (l = p.value) ? void 0 : l.consigneeName}，${null == (r = p.value) ? void 0 : r.consigneePhone}，${null == (i = p.value) ? void 0 : i.receiverAddress} `,
              },
            }
          );
        },
        v = () => {
          (u.value = !1), e.index.makePhoneCall({ phoneNumber: '13800138000' });
        },
        c = () => {
          var a;
          e.appNavigator.navigateTo(
            e.appNavigator.pagesMap['product-order-after-sales'],
            {
              query: {
                goodsOrderId: null == (a = p.value) ? void 0 : a.goodsOrderId,
              },
            }
          );
        },
        p = e.ref({}),
        m = {
          [e.OrderStatus.WaitPay]: {
            title: '待支付',
            desc: '请在限定时间内完成支付，超时订单将自动取消',
            footerActions: ['取消订单'],
          },
          [e.OrderStatus.WaitDeliver]: {
            title: '待发货',
            desc: '商品订单待发货，请耐心等待配送',
            extraFields: ['payTime'],
          },
          [e.OrderStatus.Delivered]: {
            title: '待收货',
            desc: '已下单，包裹正在准备中，可点击查看物流信息',
            extraFields: [
              'payTime',
              'deliveryTime',
              'logisticsCompany',
              'logisticsNumber',
            ],
            footerActions: ['确认收货'],
          },
          [e.OrderStatus.Finish]: {
            title: '交易成功',
            desc: '订单交易成功，商品已确认，感谢您的购买！',
            extraFields: [
              'payTime',
              'deliveryTime',
              'logisticsCompany',
              'logisticsNumber',
              'receiveTime',
            ],
            footerActions: ['删除订单', '申请售后'],
          },
          [e.OrderStatus.Cancel]: {
            title: '交易取消',
            desc:
              p.value.payStatus == e.GoodsOrderPayStatus.Paid
                ? '医保退费 等相关操作，请点击联系客服完成'
                : '若您仍希望购买该商品，请重新进行创单',
            extraFields: ['cancelTime'],
            footerActions:
              p.value.payStatus !== e.GoodsOrderPayStatus.Paid
                ? ['删除订单']
                : [],
          },
        },
        y = e.computed(() => {
          var a, o;
          return m[
            null != (o = null == (a = p.value) ? void 0 : a.orderStatus)
              ? o
              : e.OrderStatus.WaitPay
          ];
        }),
        f = e.ref(''),
        g = e.ref(),
        T = async () => {
          var a;
          try {
            null == (a = g.value) ||
              a.openModal({
                content: '确定取消订单吗？',
                onConfirm: async () => {
                  await e.requestCancelGoodsOrder(f.value),
                    e.index.showToast({
                      title: '取消订单成功',
                      icon: 'success',
                    }),
                    e.appNavigator.navigateBack();
                },
              });
          } catch (o) {
            console.error(o);
          }
        },
        h = async () => {
          var a;
          try {
            null == (a = g.value) ||
              a.openModal({
                content: '确定删除订单吗？',
                onConfirm: async () => {
                  var a, o;
                  await e.requestDeleteGoodsOrder({
                    orderId: f.value,
                    userId:
                      null !=
                      (o = null == (a = l.userInfo) ? void 0 : a.loginId)
                        ? o
                        : '',
                  }),
                    e.index.showToast({
                      title: '删除订单成功',
                      icon: 'success',
                    }),
                    e.appNavigator.navigateBack();
                },
              });
          } catch (o) {
            console.error(o);
          }
        },
        O = async () => {
          var a;
          try {
            null == (a = g.value) ||
              a.openModal({
                content: '确定确认收货吗？',
                onConfirm: async () => {
                  var a, o;
                  await e.requestConfirmReceipt({
                    orderId: f.value,
                    userId:
                      null !=
                      (o = null == (a = l.userInfo) ? void 0 : a.loginId)
                        ? o
                        : '',
                  }),
                    e.index.showToast({
                      title: '确认收货成功',
                      icon: 'success',
                    }),
                    e.appNavigator.navigateBack();
                },
              });
          } catch (o) {
            console.error(o);
          }
        },
        S = async () => {
          try {
            if (
              ((a = p.value),
              e.dayjs(a.createTime).add(15, 'minute').valueOf() <
                e.dayjs().valueOf())
            )
              return void e.index.showToast({
                title: '超时未支付，订单已过期',
                icon: 'none',
              });
            e.index.showLoading({ title: '加载中...', mask: !0 });
            const { rpInfo: o } = p.value;
            e.appNavigator.navigateTo(e.appNavigator.pagesMap['pay-detail'], {
              query: {
                orderId: f.value,
                orderCreateTime:
                  p.value.createTime || e.dayjs().format('YYYY-MM-DD HH:mm:ss'),
                totalPrice: p.value.totalAmount,
                paymentType: (null == o ? void 0 : o.recipeId)
                  ? e.PaymentType.InquiryPay
                  : e.PaymentType.GoodsPay,
              },
            });
          } catch (o) {
            console.error(o);
          } finally {
            e.index.hideLoading();
          }
          var a;
        },
        x = () => {
          var a, o, l, r;
          (
            null == (o = null == (a = p.value) ? void 0 : a.rpInfo)
              ? void 0
              : o.recipeId
          )
            ? e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['prescription-detail'],
                {
                  query: {
                    recipeId:
                      null == (r = null == (l = p.value) ? void 0 : l.rpInfo)
                        ? void 0
                        : r.recipeId,
                  },
                }
              )
            : e.index.showToast({ title: '暂无处方信息', icon: 'none' });
        };
      return (
        o({
          pageOnShow: async () => {
            console.log('pageOnShow'),
              (async () => {
                try {
                  e.index.showLoading({ title: '加载中…', mask: !0 });
                  const { data: a } = await e.requestGoodsOrderDetail(f.value);
                  p.value = a;
                } catch (a) {
                  console.error(a);
                } finally {
                  e.index.hideLoading();
                }
              })();
          },
          pageOnLoad: (e) => {
            console.log(e), (f.value = e.orderId);
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, o) => {
          var l,
            m,
            f,
            I,
            N,
            w,
            C,
            F,
            P,
            A,
            b,
            q,
            D,
            M,
            j,
            G,
            V,
            W,
            k,
            L,
            _,
            H,
            Y,
            B,
            $,
            R,
            Z,
            z,
            U,
            E,
            J,
            K,
            Q,
            X,
            ee,
            ae,
            oe,
            le,
            re,
            ie;
          return e.e(
            {
              a: e.p({ title: '订单详情' }),
              b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24112519262321856380201240.png',
              c: e.t(y.value.title),
              d:
                (null == (l = p.value) ? void 0 : l.orderStatus) ==
                e.unref(e.OrderStatus).WaitPay,
            },
            (null == (m = p.value) ? void 0 : m.orderStatus) ==
              e.unref(e.OrderStatus).WaitPay
              ? {
                  e: e.t(e.unref(e.padZeroToTwoDigits)(r.value.m)),
                  f: e.t(e.unref(e.padZeroToTwoDigits)(r.value.s)),
                  g: e.o(t),
                  h: e.o((e) => (r.value = e)),
                  i: e.p({ 'end-time': i.value, modelValue: r.value }),
                }
              : {},
            {
              j: e.t(y.value.desc),
              k: p.value.orderStatus == e.unref(e.OrderStatus).Delivered,
            },
            p.value.orderStatus == e.unref(e.OrderStatus).Delivered
              ? { l: e.o(s) }
              : {},
            { m: e.o(n) },
            {
              n: e.t(null == (f = p.value) ? void 0 : f.receiverAddress),
              o: e.t(null == (I = p.value) ? void 0 : I.consigneeName),
              p: e.t(null == (N = p.value) ? void 0 : N.consigneePhone),
              q: e.p({
                collapse: !1,
                detail: p.value,
                'view-recipe': x,
                'show-footer':
                  (null == (w = p.value) ? void 0 : w.orderType) ==
                  e.unref(e.GoodsOrderType).Inquiry,
              }),
              r: e.t(null == (C = p.value) ? void 0 : C.orderGoodsPrice),
              s: e.t(
                (null == (F = p.value) ? void 0 : F.shippingFee)
                  ? `¥${null == (P = p.value) ? void 0 : P.shippingFee}`
                  : '免运费'
              ),
              t: e.t(null == (A = p.value) ? void 0 : A.totalAmount),
              v:
                null == (b = y.value.extraFields)
                  ? void 0
                  : b.includes('logisticsCompany'),
            },
            (
              null == (q = y.value.extraFields)
                ? void 0
                : q.includes('logisticsCompany')
            )
              ? {
                  w: e.t(
                    e.unref(e.formatValue)(
                      null == (D = p.value) ? void 0 : D.logisticsCompany
                    )
                  ),
                }
              : {},
            {
              x:
                null == (M = y.value.extraFields)
                  ? void 0
                  : M.includes('logisticsNumber'),
            },
            (
              null == (j = y.value.extraFields)
                ? void 0
                : j.includes('logisticsNumber')
            )
              ? {
                  y: e.t(
                    e.unref(e.formatValue)(
                      null == (G = p.value) ? void 0 : G.logisticsNumber
                    )
                  ),
                }
              : {},
            {
              z: e.t(
                e.unref(e.formatValue)(
                  null == (V = p.value) ? void 0 : V.goodsOrderId
                )
              ),
              A: e.t(
                e.unref(e.formatValue)(
                  null == (W = p.value) ? void 0 : W.createTime
                )
              ),
              B:
                null == (k = y.value.extraFields)
                  ? void 0
                  : k.includes('payTime'),
            },
            (null == (L = y.value.extraFields) ? void 0 : L.includes('payTime'))
              ? {
                  C: e.t(
                    e.unref(e.formatValue)(
                      null == (_ = p.value) ? void 0 : _.payTime
                    )
                  ),
                }
              : {},
            {
              D:
                null == (H = y.value.extraFields)
                  ? void 0
                  : H.includes('cancelTime'),
            },
            (
              null == (Y = y.value.extraFields)
                ? void 0
                : Y.includes('cancelTime')
            )
              ? {
                  E: e.t(
                    e.unref(e.formatValue)(
                      null == (B = p.value) ? void 0 : B.cancelTime
                    )
                  ),
                }
              : {},
            {
              F:
                null == ($ = y.value.extraFields)
                  ? void 0
                  : $.includes('deliveryTime'),
            },
            (
              null == (R = y.value.extraFields)
                ? void 0
                : R.includes('deliveryTime')
            )
              ? {
                  G: e.t(
                    e.unref(e.formatValue)(
                      null == (Z = p.value) ? void 0 : Z.shippingTime
                    )
                  ),
                }
              : {},
            {
              H:
                null == (z = y.value.extraFields)
                  ? void 0
                  : z.includes('receiveTime'),
            },
            (
              null == (U = y.value.extraFields)
                ? void 0
                : U.includes('receiveTime')
            )
              ? {
                  I: e.t(
                    e.unref(e.formatValue)(
                      null == (E = p.value) ? void 0 : E.signingTime
                    )
                  ),
                }
              : {},
            { J: y.value.footerActions },
            y.value.footerActions
              ? e.e(
                  {
                    K:
                      !p.value.hasAfterSaleOrder &&
                      p.value.orderType !== e.unref(e.GoodsOrderType).Inquiry &&
                      p.value.orderStatus == e.unref(e.OrderStatus).Finish,
                  },
                  p.value.hasAfterSaleOrder ||
                    p.value.orderType === e.unref(e.GoodsOrderType).Inquiry ||
                    p.value.orderStatus != e.unref(e.OrderStatus).Finish
                    ? {}
                    : {
                        L: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111419592235021920201233.png',
                        M: e.o(c),
                      },
                  {
                    N:
                      null == (J = y.value.footerActions)
                        ? void 0
                        : J.includes('取消订单'),
                  },
                  (
                    null == (K = y.value.footerActions)
                      ? void 0
                      : K.includes('取消订单')
                  )
                    ? { O: e.o(T) }
                    : {},
                  {
                    P:
                      null == (Q = y.value.footerActions)
                        ? void 0
                        : Q.includes('删除订单'),
                  },
                  (
                    null == (X = y.value.footerActions)
                      ? void 0
                      : X.includes('删除订单')
                  )
                    ? { Q: e.o(h) }
                    : {},
                  {
                    R:
                      null == (ee = y.value.footerActions)
                        ? void 0
                        : ee.includes('确认收货'),
                  },
                  (
                    null == (ae = y.value.footerActions)
                      ? void 0
                      : ae.includes('确认收货')
                  )
                    ? { S: e.o(O) }
                    : {}
                )
              : {},
            {
              T:
                (null == (oe = p.value) ? void 0 : oe.orderStatus) !=
                e.unref(e.OrderStatus).WaitPay
                  ? 1
                  : '',
              U:
                (null == (le = p.value) ? void 0 : le.orderStatus) ==
                e.unref(e.OrderStatus).WaitPay,
            },
            (null == (re = p.value) ? void 0 : re.orderStatus) ==
              e.unref(e.OrderStatus).WaitPay
              ? {
                  V: e.t(null == (ie = p.value) ? void 0 : ie.totalAmount),
                  W: e.o(S),
                }
              : {},
            {
              X: e.o(v),
              Y: e.o(d),
              Z: e.o(() => {}),
              aa: e.o((e) => (u.value = e)),
              ab: e.p({ 'z-index': 2e3, visible: u.value }),
              ac: e.sr(g, 'c6109200-4', { k: 'modalRef' }),
            }
          );
        }
      );
    },
  }),
  i = e._export_sfc(r, [['__scopeId', 'data-v-c6109200']]);
wx.createComponent(i);
