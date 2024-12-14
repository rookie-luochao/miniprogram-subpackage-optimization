'use strict';
const o = require('../../../../../../common/vendor.js');
Math || (a + e + n)();
const e = () => '../../components/Image/index.js',
  a = () => '../../components/Navbar/index.js',
  n = () => './components/NumPopup/index.js',
  d =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111416164095866880201240.png',
  s =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111416171505478350201240.png',
  t = o.defineComponent({
    __name: 'index',
    setup(e, { expose: a }) {
      const n = o.ref(null),
        t = o.ref([]),
        l = o.computed(() => {
          var o, e, a;
          return null !=
            (a =
              null == (e = null == (o = n.value) ? void 0 : o.goodsInfos)
                ? void 0
                : e.filter((o) => 0 === o.status || o.availableStock <= 0))
            ? a
            : [];
        }),
        r = o.computed(() => {
          var o, e, a;
          return null !=
            (a =
              null == (e = null == (o = n.value) ? void 0 : o.goodsInfos)
                ? void 0
                : e.filter((o) => 1 === o.status && o.availableStock > 0))
            ? a
            : [];
        }),
        c = o.ref(''),
        u = o.ref({
          orderCreateUser: '',
          orderCreateUserId: '',
          orderCreateUserType: '',
        }),
        i = async (e, a) => {
          var d;
          try {
            o.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: s } = await o.requestRecommendGoodsInfo({
                orgId: a,
                goodsList: e,
              }),
              l = t.value.some((o) => {
                var e;
                const a =
                  null == (e = s.goodsInfos)
                    ? void 0
                    : e.find((e) => e.goodsId === o.goodsId);
                return a && o.salePrice !== a.salePrice;
              });
            o.index.hideLoading(),
              l && o.index.showToast({ title: '商品价格有变动', icon: 'none' }),
              (n.value = {
                ...s,
                goodsInfos:
                  null == (d = s.goodsInfos)
                    ? void 0
                    : d.map((o) => ({
                        ...o,
                        checked: 1 === o.status && o.availableStock > 0,
                      })),
              });
          } catch (s) {
            o.index.hideLoading();
          }
        },
        p = o.ref(null),
        v = (o, e) => {
          var a, d;
          const s =
            null == (d = null == (a = n.value) ? void 0 : a.goodsInfos)
              ? void 0
              : d.find((o) => o.goodsId === e);
          s && (s.goodsCount = Number(o));
        },
        g = o.computed(() => {
          var e;
          return null == (e = r.value)
            ? void 0
            : e
                .reduce((e, a) => {
                  var n, d, s;
                  return a.checked
                    ? o.numeral(e).add(
                        null !=
                          (s = o
                            .numeral(null != (n = a.salePrice) ? n : 0)
                            .multiply(null != (d = a.goodsCount) ? d : 1)
                            .value())
                          ? s
                          : 0
                      )
                    : e;
                }, o.numeral(0))
                .value();
        }),
        m = o.computed(() => {
          var o, e;
          return (
            !!(null == (o = r.value) ? void 0 : o.length) &&
            (null == (e = r.value) ? void 0 : e.every((o) => o.checked))
          );
        }),
        h = () => {
          var e, a, d;
          if (!(null == (e = r.value) ? void 0 : e.length))
            return void o.index.showToast({
              title: '没有可购买的商品',
              icon: 'none',
            });
          const s = m.value;
          null == (d = null == (a = n.value) ? void 0 : a.goodsInfos) ||
            d.forEach((o) => {
              1 === o.status && o.availableStock > 0 && (o.checked = !s);
            });
        },
        f = () => {
          var e, a, d, s;
          if (
            !(null == (a = null == (e = n.value) ? void 0 : e.goodsInfos)
              ? void 0
              : a.some((o) => o.checked))
          )
            return void o.index.showToast({
              title: '请选择商品',
              icon: 'none',
            });
          if (
            null == (d = n.value.goodsInfos)
              ? void 0
              : d.some((o) => o.goodsCount > o.availableStock && o.checked)
          )
            return void o.index.showToast({
              title: '商品库存不足',
              icon: 'none',
            });
          const t =
            null == (s = n.value.goodsInfos)
              ? void 0
              : s.filter(
                  (o) => 1 === o.status && o.checked && o.availableStock > 0
                );
          o.appNavigator.navigateTo(
            o.appNavigator.pagesMap['order-info-confirm'],
            {
              query: {
                orgId: c.value,
                recommendGoodsList: encodeURIComponent(JSON.stringify(t)),
                goodsOrderType: o.GoodsOrderType.Recommend,
                ...u.value,
              },
            }
          );
        };
      return (
        a({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (o) => {
            (c.value = o.orgId),
              (u.value = {
                orderCreateUser: o.orderCreateUser,
                orderCreateUserId: o.orderCreateUserId,
                orderCreateUserType: o.orderCreateUserType,
              });
            const e = JSON.parse(decodeURIComponent(o.goodsList));
            (t.value = e), i(e, o.orgId);
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (e, a) => {
          var t, c;
          return o.e(
            {
              a: o.sr('navbarRef', '8e6151c0-0'),
              b: o.p({ title: '商品推荐详情' }),
              c: r.value.length,
            },
            r.value.length
              ? {
                  d: o.t(null == (t = n.value) ? void 0 : t.goodsSource),
                  e: o.f(r.value, (e, a, n) => {
                    var t;
                    return o.e(
                      {
                        a: e.checked ? d : s,
                        b: o.o(
                          (o) =>
                            ((o) => {
                              o.checked = !o.checked;
                            })(e),
                          e.goodsId
                        ),
                        c: '8e6151c0-1-' + n,
                        d: o.p({
                          src: null != (t = e.goodsMainImg) ? t : '',
                          mode: 'scaleToFill',
                        }),
                        e: o.t(e.goodsName),
                        f: o.t(e.specDisplay),
                        g: o.t(e.salePrice),
                        h: e.availableStock < e.goodsCount,
                      },
                      e.availableStock < e.goodsCount
                        ? { i: o.t(e.availableStock) }
                        : {},
                      {
                        j:
                          1 === e.goodsCount
                            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111417015885505300201240.png'
                            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111417013837284950201240.png',
                        k: o.o(
                          (o) =>
                            ((o) => {
                              o.goodsCount > 1 &&
                                (o.goodsCount = o.goodsCount - 1);
                            })(e),
                          e.goodsId
                        ),
                        l: 1 === e.goodsCount ? 1 : '',
                        m: o.t(e.goodsCount),
                        n: o.o(
                          (o) =>
                            ((o) => {
                              var e;
                              null == (e = p.value) || e.openPopup(o);
                            })(e),
                          e.goodsId
                        ),
                        o:
                          999 === e.goodsCount
                            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111811343682667030201233.png'
                            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111417002452036810201240.png',
                        p: o.o(
                          (o) =>
                            ((o) => {
                              o.goodsCount < 999 &&
                                (o.goodsCount = o.goodsCount + 1);
                            })(e),
                          e.goodsId
                        ),
                        q: 999 === e.goodsCount ? 1 : '',
                        r: e.goodsId,
                      }
                    );
                  }),
                }
              : {},
            { f: l.value.length },
            l.value.length
              ? {
                  g: o.f(l.value, (e, a, n) => ({
                    a: e.goodsMainImg,
                    b: o.t(e.goodsName),
                    c: e.goodsId,
                  })),
                  h: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111416165523519670201233.png',
                  i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111809525860053500201233.png',
                }
              : {},
            {
              j: m.value ? d : s,
              k: o.o(h),
              l: o.t(null != (c = g.value) ? c : 0),
              m: o.o(f),
              n: o.sr(p, '8e6151c0-2', { k: 'numPopupRef' }),
              o: o.o(v),
            }
          );
        }
      );
    },
  }),
  l = o._export_sfc(t, [['__scopeId', 'data-v-8e6151c0']]);
wx.createComponent(l);
