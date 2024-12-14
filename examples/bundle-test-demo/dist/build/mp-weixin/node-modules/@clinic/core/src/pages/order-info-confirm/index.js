'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (a + r + d)();
const a = () => '../../components/Navbar/index.js',
  r = () => '../../components/ProductDetailCard/index.js',
  d = () => './components/PayWay/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(a, { expose: r }) {
      const d = e.useStudioInfoStore(),
        { studioInfo: o } = e.storeToRefs(d),
        l = e.ref(''),
        n = e.ref(''),
        s = e.ref(null),
        t = e.ref([]),
        u = e.ref({
          orderCreateUser: null,
          orderCreateUserId: null,
          orderCreateUserType: null,
        }),
        i = e.ref(e.IsSupportInsurancePay.No),
        v = async () => {
          const { data: a } = await e.requestCanInsurancePay({ rpId: l.value });
          i.value = a.canInsurancePay;
        },
        p = e.computed(() => {
          var a, r, d, o, l, n, t, u, i, v;
          return s.value == e.GoodsOrderType.Inquiry
            ? {
                ...m.value,
                orderType: e.GoodsOrderType.Inquiry,
                shippingFee:
                  null != (r = null == (a = m.value) ? void 0 : a.freight)
                    ? r
                    : 0,
                orderSource:
                  null != (o = null == (d = m.value) ? void 0 : d.supplierName)
                    ? o
                    : '',
                goodsList:
                  null == (n = null == (l = m.value) ? void 0 : l.goodsInfos)
                    ? void 0
                    : n.map((e) => ({
                        ...e,
                        quantity: e.goodsCount,
                        subtotal: e.salePrice,
                      })),
              }
            : {
                ...c.value,
                orderType: e.GoodsOrderType.Recommend,
                orderSource:
                  null != (u = null == (t = c.value) ? void 0 : t.goodsSource)
                    ? u
                    : '',
                goodsList:
                  null == (v = null == (i = c.value) ? void 0 : i.goodsInfos)
                    ? void 0
                    : v.map((e) => ({
                        ...e,
                        quantity: e.goodsCount,
                        subtotal: e.salePrice,
                      })),
              };
        }),
        y = () => {
          var a, r;
          (null == (a = m.value) ? void 0 : a.rpInfo.recipeId)
            ? e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['prescription-detail'],
                {
                  query: {
                    recipeId:
                      null == (r = m.value) ? void 0 : r.rpInfo.recipeId,
                  },
                }
              )
            : e.index.showToast({ title: '暂无处方信息', icon: 'none' });
        },
        c = e.ref(null),
        f = async () => {
          var a, r;
          if (!t.value.length)
            return void e.index.showToast({
              title: '商品信息不存在',
              icon: 'none',
            });
          const { data: d } = await e.requestRecommendGoodsInfo({
            orgId: n.value,
            goodsList: t.value,
            deliveryAddressId:
              null != (r = null == (a = g.value) ? void 0 : a.deliveryAddressId)
                ? r
                : '',
          });
          c.value = d;
        },
        m = e.ref(null),
        I = async () => {
          var a, r;
          if (!l.value)
            return void e.index.showToast({
              title: '处方信息不存在',
              icon: 'none',
            });
          const { data: d } = await e.requestRpGoodsInfo({
            rpId: l.value,
            deliveryAddressId:
              null != (r = null == (a = g.value) ? void 0 : a.deliveryAddressId)
                ? r
                : '',
          });
          m.value = d;
        },
        g = e.ref(null),
        h = async () => {
          var a;
          const { data: r } = await e.requestGetDeliveryAddressList();
          if (null == (a = g.value) ? void 0 : a.deliveryAddressId)
            return void (g.value =
              r.find((e) => {
                var a;
                return (
                  e.deliveryAddressId ===
                  (null == (a = g.value) ? void 0 : a.deliveryAddressId)
                );
              }) || null);
          const d = r.find((a) => a.defaultAddress === e.IsDefaultAddress.Yes);
          g.value = d || null;
        },
        T = () => {
          var a;
          e.appNavigator.navigateTo(e.appNavigator.pagesMap.address, {
            query: {
              deliveryAddressId:
                null == (a = g.value) ? void 0 : a.deliveryAddressId,
              isSelect: !0,
            },
          });
        },
        C = e.ref(null),
        A = async () => {
          var a, r, d, o, l, t;
          if (null == (a = g.value) ? void 0 : a.deliveryAddressId) {
            if (s.value === e.GoodsOrderType.Recommend)
              try {
                e.index.showLoading({ title: '加载中…', mask: !0 });
                const { data: a } = await e.requestCreateRecommendGoodsOrder({
                  orgId: n.value,
                  deliveryAddressId:
                    null !=
                    (d = null == (r = g.value) ? void 0 : r.deliveryAddressId)
                      ? d
                      : '',
                  goodsList:
                    null == (l = null == (o = c.value) ? void 0 : o.goodsInfos)
                      ? void 0
                      : l.map((e) => ({
                          goodsCount: e.goodsCount,
                          goodsId: e.goodsId,
                        })),
                  ...u.value,
                });
                e.appNavigator.navigateTo(
                  e.appNavigator.pagesMap['pay-detail'],
                  {
                    query: {
                      totalPrice: a.totalOrderPrice,
                      orderId: a.goodsOrderId,
                      paymentType: e.PaymentType.GoodsPay,
                      orderCreateTime:
                        a.addTime || e.dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    },
                  }
                );
              } finally {
                e.index.hideLoading();
              }
            if (s.value === e.GoodsOrderType.Inquiry) {
              if (i.value === e.IsSupportInsurancePay.Yes)
                return void (null == (t = C.value) || t.openPopup());
              await w(e.PaymentWay.Wechatpay);
            }
          } else e.index.showToast({ title: '请选择收货地址', icon: 'none' });
        },
        w = async (a) => {
          var r, d;
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: o } = await e.requestCreateInquiryGoodsOrder({
              rpId: l.value,
              deliveryAddressId:
                null !=
                (d = null == (r = g.value) ? void 0 : r.deliveryAddressId)
                  ? d
                  : '',
              payWay: a,
              payType: e.PaymentWay.Wechatpay,
              ...u.value,
            });
            e.appNavigator.navigateTo(e.appNavigator.pagesMap['pay-detail'], {
              query: {
                totalPrice: o.totalOrderPrice,
                orderId: o.goodsOrderId,
                paymentType: e.PaymentType.GoodsPay,
                orderCreateTime:
                  o.addTime || e.dayjs().format('YYYY-MM-DD HH:mm:ss'),
              },
            });
          } finally {
            e.index.hideLoading();
          }
        };
      return (
        r({
          pageOnShow: async () => {
            try {
              e.index.showLoading({ title: '加载中…', mask: !0 }),
                await h(),
                s.value === e.GoodsOrderType.Recommend && (await f()),
                s.value === e.GoodsOrderType.Inquiry && (await v(), await I());
            } finally {
              e.index.hideLoading();
            }
            e.index.$on(e.SET_ADDRESS, (e) => {
              g.value = e;
            });
          },
          pageOnLoad: async (e) => {
            var a, r, d;
            console.log('options', e),
              (l.value = e.rpId),
              (n.value =
                null !=
                (r = e.orgId
                  ? e.orgId
                  : null == (a = o.value)
                    ? void 0
                    : a.orgId)
                  ? r
                  : ''),
              (s.value = e.goodsOrderType),
              (t.value = JSON.parse(
                decodeURIComponent(
                  null != (d = e.recommendGoodsList) ? d : '[]'
                )
              )),
              (u.value = {
                orderCreateUser: e.orderCreateUser,
                orderCreateUserId: e.orderCreateUserId,
                orderCreateUserType: e.orderCreateUserType,
              });
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
          selectedAddress: g,
        }),
        (a, r) => {
          var d, o, l, n, t, u;
          return e.e(
            { a: e.p({ title: '订单确认' }), b: g.value },
            g.value
              ? e.e(
                  {
                    c: e.t(
                      e.unref(e.formatValue)(
                        `${null == (d = g.value) ? void 0 : d.province}${null == (o = g.value) ? void 0 : o.city}${null == (l = g.value) ? void 0 : l.area}${null == (n = g.value) ? void 0 : n.fullAddress}`
                      )
                    ),
                    d: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102809300973943750201233.png',
                    e: e.t(
                      e.unref(e.formatValue)(
                        null == (t = g.value) ? void 0 : t.deliveryName
                      )
                    ),
                    f: e.t(
                      e.unref(e.formatValue)(
                        null == (u = g.value) ? void 0 : u.deliveryPhone
                      )
                    ),
                    g:
                      g.value.defaultAddress ===
                      e.unref(e.IsDefaultAddress).Yes,
                  },
                  (g.value.defaultAddress, e.unref(e.IsDefaultAddress).Yes, {}),
                  { h: e.o(T) }
                )
              : {
                  i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111915085254147070201240.png',
                  j: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111915115767922870201240.png',
                  k: e.o(T),
                },
            { l: p.value },
            p.value
              ? {
                  m: e.p({
                    detail: p.value,
                    collapse: !1,
                    'show-footer':
                      s.value === e.unref(e.GoodsOrderType).Inquiry,
                    'view-recipe': y,
                  }),
                }
              : {},
            {
              n: e.t(e.unref(e.formatCurrency)(p.value.totalSalePrice)),
              o: e.t(e.unref(e.formatCurrency)(p.value.shippingFee)),
              p: e.t(e.unref(e.formatCurrency)(p.value.totalOrderPrice)),
              q: e.o(A),
              r: e.sr(C, 'b397afb2-2', { k: 'payWayRef' }),
              s: e.o(w),
            }
          );
        }
      );
    },
  }),
  l = e._export_sfc(o, [['__scopeId', 'data-v-b397afb2']]);
wx.createComponent(l);
