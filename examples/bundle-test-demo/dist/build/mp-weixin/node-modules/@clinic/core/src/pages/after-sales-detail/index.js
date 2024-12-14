'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (l + t + a)();
const a = () => '../../components/Card/index.js',
  l = () => '../../components/Navbar/index.js',
  t = () => '../../components/ProductDetailCard/index.js',
  o =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111215234480478670201240.png',
  s = e.defineComponent({
    __name: 'index',
    setup(a, { expose: l }) {
      const t = e.ref(!1),
        s = e.ref(),
        u = async (a) => {
          const { data: l } = await e.requestGetAfterSalesOrderDetail({
            id: a,
          });
          (s.value = l), (t.value = !0);
        },
        n = e.computed(() =>
          s.value
            ? {
                [e.AfterSalesOrderStatus.Processing]: {
                  title: '商家审核中，请耐心等待',
                  class: 'default',
                },
                [e.AfterSalesOrderStatus.Pass]: {
                  title: '商家已同意，退款成功，请注意查收您的账户',
                  class: 'success',
                },
                [e.AfterSalesOrderStatus.Refuse]: {
                  title: '很抱歉，您的售后申请已被商家拒绝',
                  class: 'fail',
                },
              }[s.value.status]
            : { title: '', class: '' }
        ),
        r = e.computed(() => {
          var e, a;
          return {
            goodsList: null == (e = s.value) ? void 0 : e.goodsList,
            orderSource: null == (a = s.value) ? void 0 : a.orderSource,
          };
        });
      return (
        l({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (e) => {
            console.log('pageOnload', e), u(e.salesId);
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, l) => {
          var t, u, d, c, i, p, v;
          return e.e(
            {
              a: e.p({ title: '售后详情' }),
              b: o,
              c: o,
              d: e.n(n.value.class),
              e: e.t(n.value.title),
              f: e.n(n.value.class),
              g: 'default' !== n.value.class,
            },
            'default' !== n.value.class
              ? {
                  h: e.t(
                    e.unref(e.formatValue)(
                      null == (t = s.value) ? void 0 : t.handleTime
                    )
                  ),
                }
              : {},
            {
              i: e.t(
                e.unref(e.formatValue)(
                  null == (u = s.value) ? void 0 : u.applyTime
                )
              ),
              j: o,
              k: o,
              l: e.p({ detail: r.value, collapse: !0, 'show-footer': !0 }),
              m: o,
              n: o,
              o: e.t(null == (d = s.value) ? void 0 : d.applyRefundAmount),
              p: e.t(null == (c = s.value) ? void 0 : c.id),
              q: e.t(null == (i = s.value) ? void 0 : i.goodsOrderId),
              r: e.t(
                e.unref(e.formatValue)(
                  null == (p = s.value) ? void 0 : p.applyTime
                )
              ),
              s: e.t(null == (v = s.value) ? void 0 : v.reason),
              t: e.p({ footer: !1 }),
            }
          );
        }
      );
    },
  }),
  u = e._export_sfc(s, [['__scopeId', 'data-v-01d95f9a']]);
wx.createComponent(u);
