'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-countdown')();
}
Math ||
  (
    a +
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js')
  )();
const a = () => '../../components/Navbar/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(a, { expose: o }) {
      const r = e.ref({ d: 0, h: 0, m: 0, s: 0 }),
        d = () => {
          s.value = !0;
        },
        i = e.ref(!1),
        n = e.ref({}),
        u = e.ref({}),
        t = async (a) => {
          const { data: o } = await e.requestInquiryRecipeGoodsOrderInfo({
            rpId: a,
          });
          u.value = o;
        },
        l = e.computed(() => {
          var a;
          return (
            !s.value &&
            ((u.value.hasGoodsOrder &&
              (null == (a = u.value.goodsOrderDetail)
                ? void 0
                : a.payStatus) === e.InquiryPayStatus.Unpaid) ||
              !u.value.hasGoodsOrder)
          );
        }),
        p = e.computed(() => {
          var a, o;
          return (null == (a = n.value) ? void 0 : a.recipeStatus) ===
            e.RecipeStatus.Pass
            ? e
                .dayjs(null == (o = n.value) ? void 0 : o.expirationTime)
                .valueOf()
            : 0;
        }),
        s = e.ref(!0),
        v = () => {
          var a;
          s.value = e
            .dayjs()
            .isAfter(
              e.dayjs(null == (a = n.value) ? void 0 : a.expirationTime)
            );
        },
        c = () => {
          var a;
          u.value.hasGoodsOrder
            ? e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['product-order-detail'],
                {
                  query: {
                    orderId:
                      null == (a = u.value.goodsOrderDetail)
                        ? void 0
                        : a.goodsOrderId,
                  },
                }
              )
            : e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['order-info-confirm'],
                {
                  query: {
                    orgId: n.value.channelId,
                    rpId: n.value.id,
                    goodsOrderType: e.GoodsOrderType.Inquiry,
                  },
                }
              );
        };
      return (
        o({
          pageOnShow: () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (a) => {
            a.recipeId &&
              (async (a) => {
                try {
                  e.index.showLoading({ title: '加载中...', mask: !0 });
                  const { data: o } = await e.requestInquiryRecipeDetail({
                    recipeId: a,
                  });
                  (n.value = o), v(), o.id && (await t(o.id)), (i.value = !0);
                } catch (o) {
                  console.error(o);
                } finally {
                  e.index.hideLoading();
                }
              })(a.recipeId);
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, o) =>
          e.e(
            {
              a: e.sr('navbarRef', '00fc02e0-0'),
              b: e.p({ title: '处方详情' }),
              c: n.value.id,
            },
            n.value.id
              ? e.e(
                  {
                    d: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111223531919927720201240.png',
                    e: s.value,
                  },
                  s.value
                    ? {}
                    : {
                        f: e.t(
                          e.unref(e.padZeroToTwoDigits)(
                            24 * r.value.d + r.value.h
                          )
                        ),
                        g: e.t(e.unref(e.padZeroToTwoDigits)(r.value.m)),
                        h: e.t(e.unref(e.padZeroToTwoDigits)(r.value.s)),
                        i: e.o(d),
                        j: e.o((e) => (r.value = e)),
                        k: e.p({ 'end-time': p.value, modelValue: r.value }),
                      },
                  {
                    l: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111223571666847940201233.png',
                    m: n.value.recipeImgFileUrl,
                    n: e.o((a) => {
                      var o, r;
                      (r = null != (o = n.value.recipeImgFileUrl) ? o : '') &&
                        e.index.previewImage({ urls: [r] });
                    }),
                    o: !s.value || u.value.hasGoodsOrder,
                  },
                  !s.value || u.value.hasGoodsOrder
                    ? e.e(
                        { p: l.value },
                        l.value
                          ? {
                              q: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111223581246712500201240.png',
                              r: e.o((e) => c()),
                            }
                          : { s: e.o((e) => c()) }
                      )
                    : {}
                )
              : {}
          )
      );
    },
  }),
  r = e._export_sfc(o, [['__scopeId', 'data-v-00fc02e0']]);
wx.createComponent(r);
