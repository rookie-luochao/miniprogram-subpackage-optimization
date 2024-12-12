'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('nut-countdown') + e.resolveComponent('uni-load-more'))();
}
Math ||
  (
    t +
    d +
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js') +
    r +
    (() =>
      '../../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js') +
    a +
    o
  )();
const a = () => '../../components/Empty/index.js',
  o = () => '../../components/Modal/index.js',
  t = () => '../../components/Navbar/index.js',
  r = () => '../../components/ProductCard/index.js',
  d = () => '../../components/Tabs/index.js',
  n = e.defineComponent({
    __name: 'index',
    setup(a, { expose: o }) {
      const t = e.useUserInfoStore(),
        r = e.ref([
          { title: '全部', value: 'all' },
          {
            title: '待支付',
            value: e.OrderStatus.WaitPay,
            query: { orderStatus: e.OrderStatus.WaitPay },
          },
          {
            title: '待发货',
            value: e.OrderStatus.WaitDeliver,
            query: { orderStatus: e.OrderStatus.WaitDeliver },
          },
          {
            title: '待收货',
            value: e.OrderStatus.Delivered,
            query: { orderStatus: e.OrderStatus.Delivered },
          },
          {
            title: '已完成',
            value: e.OrderStatus.Finish,
            query: { orderStatus: e.OrderStatus.Finish },
          },
        ]),
        d = e.ref({
          [e.OrderStatus.WaitPay]: [],
          [e.OrderStatus.WaitDeliver]: [],
          [e.OrderStatus.Delivered]: [],
          [e.OrderStatus.Finish]: [],
          all: [],
        }),
        n = e.ref('all'),
        l = e.ref(0),
        u = e.reactive({ old: 0, value: 0 }),
        s = (e) => {
          u.old = e.detail.scrollTop;
        },
        i = () => {
          f(!0, n.value, r.value[l.value].query);
        },
        v = () => {
          (u.value = u.old),
            e.nextTick$1(() => {
              u.value = 0;
            });
        },
        c = (e, a) => {
          (l.value = a), (g.pageIndex = 1);
        },
        p = (e) => {
          (l.value = e.detail.current),
            (n.value = r.value[l.value].value),
            (g.pageIndex = 1),
            v(),
            f(!1, r.value[l.value].value, r.value[l.value].query);
        },
        g = e.reactive({ total: 0, pageIndex: 1, pages: 1 }),
        y = e.ref(e.LoadMoreStatus.More),
        f = async (a = !1, o, t) => {
          var r;
          if (!(0 !== g.pages && g.pageIndex > g.pages))
            try {
              (y.value = e.LoadMoreStatus.Loading),
                a || e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: n } = await e.requestQueryGoodsOrderPage({
                  pageIndex: g.pageIndex,
                  pageSize: 10,
                  ...t,
                }),
                { total: l, records: u, pages: s, current: i } = n;
              (g.total = l),
                (g.pageIndex = i + 1),
                (g.pages = s),
                (y.value =
                  g.pageIndex > g.pages
                    ? e.LoadMoreStatus.NoMore
                    : e.LoadMoreStatus.More),
                (d.value[o] = a
                  ? [
                      ...(null != (r = d.value[o]) ? r : []),
                      ...(null != u ? u : []),
                    ]
                  : null != u
                    ? u
                    : []);
            } catch (n) {
              y.value = e.LoadMoreStatus.More;
            } finally {
              e.index.hideLoading();
            }
        },
        m = async () => {
          (g.pageIndex = 1),
            (g.total = 0),
            (g.pages = 1),
            v(),
            await f(!1, n.value, r.value[l.value].query);
        },
        O = e.ref(),
        I = async (a) => {
          var o;
          try {
            if (
              ((a) =>
                e.dayjs(a.addTime).add(15, 'minute').valueOf() <
                e.dayjs().valueOf())(a)
            )
              return void e.index.showToast({
                title: '超时未支付，订单已过期',
                icon: 'none',
              });
            e.index.showLoading({ title: '加载中...', mask: !0 });
            const { data: t } = await e.requestGoodsOrderDetail(
                null != (o = a.goodsOrderId) ? o : ''
              ),
              { rpInfo: r } = t;
            e.appNavigator.navigateTo(e.appNavigator.pagesMap['pay-detail'], {
              query: {
                totalPrice: a.totalAmount,
                orderId: a.goodsOrderId,
                orderCreateTime:
                  a.addTime || e.dayjs().format('YYYY-MM-DD HH:mm:ss'),
                paymentType: (null == r ? void 0 : r.recipeId)
                  ? e.PaymentType.InquiryPay
                  : e.PaymentType.GoodsPay,
              },
            });
          } catch (t) {
            console.error(t);
          } finally {
            e.index.hideLoading();
          }
        },
        S = e.ref(!0);
      return (
        o({
          pageOnShow: async () => {
            S.value ? (S.value = !1) : await m();
          },
          pageOnLoad: async (e) => {
            const a = e.status;
            a &&
              ((n.value = a),
              (l.value = r.value.findIndex((e) => e.value === a)),
              0 === l.value && (await m()));
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, o) => ({
          a: e.p({ title: '订单列表', 'border-bottom': !1 }),
          b: e.o(c),
          c: e.o((e) => (n.value = e)),
          d: e.p({ tabs: r.value, 'active-tab': n.value }),
          e: e.f(r.value, (a, o, r) =>
            e.e(
              { a: d.value[a.value].length > 0 },
              d.value[a.value].length > 0
                ? {
                    b: e.f(d.value[a.value], (o, n, l) =>
                      e.e(
                        { a: o.orderStatus == e.unref(e.OrderStatus).WaitPay },
                        o.orderStatus == e.unref(e.OrderStatus).WaitPay
                          ? {
                              b: e.o(
                                (t) =>
                                  ((a, o) => {
                                    const t = d.value[a].findIndex(
                                      (e) => e.goodsOrderId === o.goodsOrderId
                                    );
                                    -1 !== t &&
                                      (d.value[a][t].orderStatus =
                                        e.OrderStatus.Cancel);
                                  })(a.value, o),
                                o.goodsOrderId
                              ),
                              c: '27331ef1-2-' + r + '-' + l,
                              d: e.p({
                                'end-time': e
                                  .unref(e.dayjs)(o.addTime)
                                  .add(15, 'minutes')
                                  .valueOf(),
                              }),
                            }
                          : {},
                        {
                          e: '27331ef1-3-' + r + '-' + l,
                          f: e.p({
                            order: o,
                            'show-footer':
                              o.orderStatus !==
                              e.unref(e.OrderStatus).WaitDeliver,
                            'on-cancel': () =>
                              (async (a) => {
                                var o;
                                try {
                                  null == (o = O.value) ||
                                    o.openModal({
                                      content: '确定取消订单吗？',
                                      onConfirm: async () => {
                                        var o;
                                        await e.requestCancelGoodsOrder(
                                          null != (o = a.goodsOrderId) ? o : ''
                                        ),
                                          e.index.showToast({
                                            title: '取消订单成功',
                                            icon: 'success',
                                          }),
                                          await m();
                                      },
                                    });
                                } catch (t) {
                                  console.error(t);
                                }
                              })(o),
                            'on-delete': () =>
                              (async (a) => {
                                var o;
                                try {
                                  null == (o = O.value) ||
                                    o.openModal({
                                      content: '确定删除订单吗？',
                                      onConfirm: async () => {
                                        var o, r, d;
                                        await e.requestDeleteGoodsOrder({
                                          orderId:
                                            null != (o = a.goodsOrderId)
                                              ? o
                                              : '',
                                          userId:
                                            null !=
                                            (d =
                                              null == (r = t.userInfo)
                                                ? void 0
                                                : r.loginId)
                                              ? d
                                              : '',
                                        }),
                                          e.index.showToast({
                                            title: '删除订单成功',
                                            icon: 'success',
                                          }),
                                          await m();
                                      },
                                    });
                                } catch (r) {
                                  console.error(r);
                                }
                              })(o),
                            'on-confirm': () =>
                              (async (a) => {
                                var o;
                                try {
                                  null == (o = O.value) ||
                                    o.openModal({
                                      content: '确定确认收货吗？',
                                      onConfirm: async () => {
                                        var o, r, d;
                                        await e.requestConfirmReceipt({
                                          orderId:
                                            null != (o = a.goodsOrderId)
                                              ? o
                                              : '',
                                          userId:
                                            null !=
                                            (d =
                                              null == (r = t.userInfo)
                                                ? void 0
                                                : r.loginId)
                                              ? d
                                              : '',
                                        }),
                                          e.index.showToast({
                                            title: '确认收货成功',
                                            icon: 'success',
                                          }),
                                          await m();
                                      },
                                    });
                                } catch (r) {
                                  console.error(r);
                                }
                              })(o),
                            'on-pay': () => I(o),
                          }),
                          g: o.goodsOrderId,
                          h: e.o((a) => {
                            return (
                              (t = o.goodsOrderId),
                              void e.appNavigator.navigateTo(
                                e.appNavigator.pagesMap['product-order-detail'],
                                { query: { orderId: t } }
                              )
                            );
                            var t;
                          }, o.goodsOrderId),
                        }
                      )
                    ),
                    c: '27331ef1-4-' + r,
                    d: e.p({ status: y.value }),
                    e: u.value,
                    f: e.o(s, a.value),
                    g: e.o(i, a.value),
                  }
                : {
                    h: '27331ef1-5-' + r,
                    i: e.p({
                      'empty-icon':
                        'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111316492455843220201233.png',
                      title: '暂无订单',
                      'sub-title': '商品订单在此查看',
                    }),
                  },
              { j: a.value }
            )
          ),
          f: l.value,
          g: e.o(p),
          h: e.sr(O, '27331ef1-6', { k: 'modalRef' }),
        })
      );
    },
  }),
  l = e._export_sfc(n, [['__scopeId', 'data-v-27331ef1']]);
wx.createComponent(l);
