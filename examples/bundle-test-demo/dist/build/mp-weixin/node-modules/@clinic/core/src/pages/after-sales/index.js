'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('uni-load-more')();
}
Math ||
  (
    t +
    o +
    l +
    (() =>
      '../../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js') +
    a
  )();
const a = () => '../../components/Empty/index.js',
  t = () => '../../components/Navbar/index.js',
  o = () => '../../components/Tabs/index.js',
  l = () => './components/SalesCard/index.js',
  s = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const o = e.ref([
          { title: '处理中', value: e.AfterSalesOrderStatus.Processing },
          { title: '已同意', value: e.AfterSalesOrderStatus.Pass },
          { title: '已拒绝', value: e.AfterSalesOrderStatus.Refuse },
        ]),
        l = e.ref({
          [e.AfterSalesOrderStatus.Processing]: [],
          [e.AfterSalesOrderStatus.Pass]: [],
          [e.AfterSalesOrderStatus.Refuse]: [],
        }),
        s = e.ref(e.AfterSalesOrderStatus.Processing),
        r = e.ref(0),
        n = e.reactive({ old: 0, value: 0 }),
        u = (e) => {
          n.old = e.detail.scrollTop;
        },
        d = () => {
          console.log('handleLoadMore');
        },
        i = (e, a) => {
          r.value = a;
        },
        c = (a) => {
          console.log('handleSwiperChange', a),
            (r.value = a.detail.current),
            (s.value = o.value[r.value].value),
            (v.pageIndex = 1),
            (v.pages = 10),
            (n.value = n.old),
            e.nextTick$1(() => {
              n.value = 0;
            }),
            p();
        },
        p = async (a = !1) => {
          if (!(0 !== v.pages && v.pageIndex > v.pages))
            try {
              (g.value = e.LoadMoreStatus.Loading),
                a || e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: t } = await e.requestGetAfterSalesOrderList({
                  status: s.value,
                  pageIndex: v.pageIndex,
                  pageSize: v.pages || 10,
                }),
                { current: o, total: r, pages: n, records: u } = t;
              (v.pageIndex = o + 1),
                (v.total = r),
                (v.pages = n),
                (g.value =
                  v.pageIndex > v.pages
                    ? e.LoadMoreStatus.NoMore
                    : e.LoadMoreStatus.More),
                (l.value[s.value] = a
                  ? [...l.value[s.value], ...(null != u ? u : [])]
                  : null != u
                    ? u
                    : []);
            } catch (t) {
              g.value = e.LoadMoreStatus.More;
            } finally {
              e.index.hideLoading();
            }
        },
        v = e.reactive({ total: 0, pageIndex: 1, pages: 10 }),
        g = e.ref(e.LoadMoreStatus.More);
      return (
        t({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (e) => {
            console.log('pageOnload', e), p();
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, t) => ({
          a: e.sr('navbarRef', '1cf3f6c3-0'),
          b: e.p({ title: '售后服务', 'border-bottom': !1 }),
          c: e.o(i),
          d: e.o((e) => (s.value = e)),
          e: e.p({ tabs: o.value, 'active-tab': s.value }),
          f: e.f(o.value, (a, t, o) =>
            e.e(
              { a: l.value[a.value].length > 0 },
              l.value[a.value].length > 0
                ? {
                    b: e.f(l.value[a.value], (a, t, l) => ({
                      a: '1cf3f6c3-2-' + o + '-' + l,
                      b: e.p({ detail: a }),
                      c: a.id,
                      d: e.o((t) => {
                        return (
                          (o = a.id),
                          void e.appNavigator.navigateTo(
                            e.appNavigator.pagesMap['after-sales-detail'],
                            { query: { salesId: o } }
                          )
                        );
                        var o;
                      }, a.id),
                    })),
                    c: '1cf3f6c3-3-' + o,
                    d: e.p({ status: g.value }),
                    e: n.value,
                    f: e.o(u, t),
                    g: e.o(d, t),
                  }
                : {
                    h: '1cf3f6c3-4-' + o,
                    i: e.p({
                      'empty-icon':
                        'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111516524767173690201233.png',
                      title: '暂无售后',
                      'sub-title': '售后服务的处理进度、结果在此查看',
                    }),
                  },
              { j: t }
            )
          ),
          g: r.value,
          h: e.o(c),
        })
      );
    },
  }),
  r = e._export_sfc(s, [['__scopeId', 'data-v-1cf3f6c3']]);
wx.createComponent(r);
