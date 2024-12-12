'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('uni-load-more') + e.resolveComponent('nut-rate'))();
}
Math ||
  (
    a +
    o +
    (() =>
      '../../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js') +
    t +
    (() => '../../../node-modules/nutui-uniapp/components/rate/rate.js')
  )();
const t = () => '../../components/Empty/index.js',
  a = () => '../../components/Navbar/index.js',
  o = () => '../../components/Tabs/index.js',
  n =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110611413821425060201233.png',
  l =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111119435100092160201240.png',
  r = e.defineComponent({
    __name: 'index',
    setup(t, { expose: a }) {
      const o = e.ref({
          [e.CommentStatus.AwaitingEvaluation]: [],
          [e.CommentStatus.Rated]: [],
        }),
        r = e.reactive({ pages: 1, pageIndex: 1, total: 0 }),
        u = e.ref(e.LoadMoreStatus.Loading),
        i = async (t = !1) => {
          if (!(0 !== r.pages && r.pageIndex > r.pages))
            try {
              e.index.showLoading({ title: '加载中...', mask: !0 });
              const { data: a } = await e.requestEvaluationList({
                  evaluationStatus: s.value,
                  pageIndex: r.pageIndex,
                  pageSize: 10,
                }),
                { current: n, total: l, pages: i, records: d } = a;
              (r.pageIndex = n + 1),
                (r.total = l),
                (r.pages = i),
                (u.value =
                  r.pageIndex > r.pages
                    ? e.LoadMoreStatus.NoMore
                    : e.LoadMoreStatus.More),
                (o.value[s.value] = t
                  ? [...o.value[s.value], ...(null != d ? d : [])]
                  : null != d
                    ? d
                    : []);
            } catch (a) {
              console.error(a), (u.value = e.LoadMoreStatus.More);
            } finally {
              e.index.hideLoading();
            }
        },
        s = e.ref(e.CommentStatus.AwaitingEvaluation),
        d = e.ref(0),
        m = e.ref([
          { title: '待评价', value: e.CommentStatus.AwaitingEvaluation },
          { title: '已评价', value: e.CommentStatus.Rated },
        ]),
        c = () => {
          i(!0);
        },
        p = e.reactive({ old: 0, value: 0 }),
        v = (e) => {
          p.old = e.detail.scrollTop;
        },
        g = (e) => {
          (d.value = e.detail.current),
            (s.value = m.value[e.detail.current].value),
            i(),
            h();
        },
        f = (e, t) => {
          (d.value = t), (r.pageIndex = 1);
        },
        h = () => {
          (p.value = p.old),
            e.nextTick$1(() => {
              p.value = 0;
            });
        },
        b = (t, a, o = !1) => {
          e.appNavigator.navigateTo(
            e.appNavigator.pagesMap['evaluate-detail'],
            {
              query: {
                query: JSON.stringify({
                  evaluationId: t,
                  editMode: o,
                  doctorWorkPhotoUrl: a || n,
                }),
              },
            }
          );
        };
      return (
        a({
          pageOnShow: async () => {
            console.log('pageOnShow'), (r.pageIndex = 1), h(), i();
          },
          pageOnLoad: (e) => {
            console.log('pageOnload', e), i();
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (t, a) =>
          e.e(
            {
              a: e.sr('navbarRef', '93615849-0'),
              b: e.p({ 'border-bottom': !1, title: '评价中心' }),
              c: e.o(f),
              d: e.o((e) => (s.value = e)),
              e: e.p({ tabs: m.value, 'active-tab': s.value }),
              f:
                o.value[e.unref(e.CommentStatus).AwaitingEvaluation].length > 0,
            },
            o.value[e.unref(e.CommentStatus).AwaitingEvaluation].length > 0
              ? {
                  g: e.f(
                    o.value[e.unref(e.CommentStatus).AwaitingEvaluation],
                    (t, a, o) =>
                      e.e(
                        {
                          a: t.doctorWorkPhotoUrl ? t.doctorWorkPhotoUrl : n,
                          b: e.t(e.unref(e.formatValue)(t.doctorName)),
                          c: e.t(e.unref(e.InquiryTypeDesc)[t.orderType]),
                          d: e.t(e.unref(e.InquiryWayDesc)[t.orderWay]),
                          e: e.t(t.titleName),
                          f: t.titleName && t.sectionName,
                        },
                        (t.titleName && t.sectionName, {}),
                        {
                          g: e.t(t.sectionName),
                          h: e.t(e.unref(e.formatValue)(t.patientName)),
                          i: e.t(e.unref(e.formatValue)(t.orderTime)),
                          j: e.o(
                            (e) => b(t.evaluationId, t.doctorWorkPhotoUrl, !0),
                            t.evaluationId
                          ),
                          k: t.evaluationId,
                        }
                      )
                  ),
                  h: e.p({ status: u.value }),
                  i: p.value,
                  j: e.o(c),
                  k: e.o(v),
                }
              : {
                  l: e.p({
                    'empty-icon': l,
                    title: '暂无评价',
                    'sub-title': '医生服务完成后在此评价',
                  }),
                },
            { m: o.value[e.unref(e.CommentStatus).Rated].length > 0 },
            o.value[e.unref(e.CommentStatus).Rated].length > 0
              ? {
                  n: e.f(o.value[e.unref(e.CommentStatus).Rated], (t, a, o) => {
                    var l, r;
                    return e.e(
                      {
                        a: t.doctorWorkPhotoUrl ? t.doctorWorkPhotoUrl : n,
                        b: e.t(e.unref(e.formatValue)(t.doctorName)),
                        c: '93615849-4-' + o,
                        d: e.p({
                          size: '14px',
                          'model-value': t.star,
                          'active-color': '#FFBE3F',
                          'void-color': '#DCDCDC',
                          spacing: '0',
                        }),
                        e: e.t(t.titleName),
                        f: t.titleName && t.sectionName,
                      },
                      (t.titleName && t.sectionName, {}),
                      {
                        g: e.t(t.sectionName),
                        h: e.f(t.keywords, (t, a, o) => ({ a: e.t(t), b: t })),
                        i: e.t(e.unref(e.formatValue)(t.content)),
                        j: null == (l = t.picUrl) ? void 0 : l.length,
                      },
                      (null == (r = t.picUrl) ? void 0 : r.length)
                        ? {
                            k: e.f(t.picUrl, (e, t, a) => ({ a: e, b: e })),
                            l: e.o(() => {}, t.evaluationId),
                          }
                        : {},
                      {
                        m: e.t(e.unref(e.formatValue)(t.patientName)),
                        n: e.t(e.unref(e.formatValue)(t.evaluationTime)),
                        o: t.evaluationId,
                        p: e.o(
                          (e) => b(t.evaluationId, t.doctorWorkPhotoUrl, !1),
                          t.evaluationId
                        ),
                      }
                    );
                  }),
                  o: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110515534601906850201240.png',
                  p: e.p({ status: u.value }),
                  q: p.value,
                  r: e.o(c),
                  s: e.o(v),
                }
              : {
                  t: e.p({
                    'empty-icon': l,
                    title: '暂无评价',
                    'sub-title': '医生服务完成后在此评价',
                  }),
                },
            { v: d.value, w: e.o(g) }
          )
      );
    },
  }),
  u = e._export_sfc(r, [['__scopeId', 'data-v-93615849']]);
wx.createComponent(u);
