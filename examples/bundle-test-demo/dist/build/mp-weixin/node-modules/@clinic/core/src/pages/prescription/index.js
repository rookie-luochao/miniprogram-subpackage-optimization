'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('uni-load-more')();
}
Math ||
  (
    t +
    (() =>
      '../../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js') +
    a
  )();
const a = () => '../../components/Empty/index.js',
  t = () => '../../components/Navbar/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const o = e.reactive({ pages: 1, pageIndex: 1, total: 0 }),
        i = e.ref(e.LoadMoreStatus.More),
        n = e.ref([]),
        s = async (a = !1) => {
          if (!(o.pageIndex > o.pages))
            try {
              (i.value = e.LoadMoreStatus.Loading),
                a || e.index.showLoading({ title: '加载中...', mask: !0 });
              const { data: t } = await e.requestInquiryRecipeList({
                  pageIndex: o.pageIndex,
                  pageSize: 10,
                  recipeStatus: e.RecipeStatus.Pass,
                }),
                { current: s, total: r, pages: p, records: d } = t;
              (o.pageIndex = s + 1),
                (o.total = r),
                (o.pages = p),
                (i.value =
                  o.pageIndex > o.pages
                    ? e.LoadMoreStatus.NoMore
                    : e.LoadMoreStatus.More),
                (n.value = a ? [...n.value, ...d] : d);
            } catch (t) {
              i.value = e.LoadMoreStatus.More;
            } finally {
              e.index.hideLoading();
            }
        },
        r = (a) =>
          e.calculateTimeDifference(e.dayjs(), e.dayjs(a.expirationTime))
            .diffValue <= 0,
        p = (a) =>
          a.recipeStatus == e.RecipeStatus.Pass && r(a)
            ? '已过期'
            : e.RecipeStatusDesc[a.recipeStatus],
        d = () => {
          s(!0);
        };
      return (
        t({
          pageOnShow: () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (e) => {
            console.log('pageOnload', e), s();
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
          pageOnReachBottom: d,
        }),
        (a, t) =>
          e.e(
            {
              a: e.sr('navbarRef', 'dd370abc-0'),
              b: e.p({ title: '我的处方' }),
              c: n.value.length > 0,
            },
            n.value.length > 0
              ? {
                  d: e.f(n.value, (a, t, o) => {
                    return {
                      a: e.t(e.unref(e.formatValue)(a.primaryDiagnosis)),
                      b: e.t(
                        ((i = a),
                        e.formatValue(
                          [
                            ...(null != (n = i.recipeChineseMedicineVOList)
                              ? n
                              : []),
                            ...(null != (s = i.recipeMedicineList) ? s : []),
                          ]
                            .map((e) => e.medicineName)
                            .join('、')
                        ))
                      ),
                      c: e.t(a.patientName),
                      d: e.t(a.pharmacistAuditTime),
                      e: e.t(p(a)),
                      f:
                        a.recipeStatus == e.unref(e.RecipeStatus).Pass && r(a)
                          ? 1
                          : '',
                      g: e.o((t) => {
                        return (
                          (o = a.id),
                          void e.appNavigator.navigateTo(
                            e.appNavigator.pagesMap['prescription-detail'],
                            { query: { recipeId: o } }
                          )
                        );
                        var o;
                      }, a.id),
                      h: a.id,
                    };
                    var i, n, s;
                  }),
                  e: e.p({ status: i.value }),
                  f: e.o(d),
                }
              : {
                  g: e.p({
                    top: 118,
                    'empty-icon':
                      'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110619283468599300201240.png',
                    title: '暂无处方',
                    'sub-title': '医生开药后处方在此查询',
                  }),
                }
          )
      );
    },
  }),
  i = e._export_sfc(o, [['__scopeId', 'data-v-dd370abc']]);
wx.createComponent(i);
