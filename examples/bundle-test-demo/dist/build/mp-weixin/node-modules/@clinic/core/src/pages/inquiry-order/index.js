'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('nut-countdown') + e.resolveComponent('uni-load-more'))();
}
Math ||
  (
    n +
    u +
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js') +
    (() =>
      '../../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js') +
    a +
    t
  )();
const a = () => '../../components/Empty/index.js',
  t = () => '../../components/Modal/index.js',
  n = () => '../../components/Navbar/index.js',
  u = () => '../../components/Tabs/index.js',
  i = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const n = e.ref('all'),
        u = e.ref(0),
        i = e.reactive({ old: 0, value: 0 }),
        o = e.ref([
          { title: '全部', value: 'all' },
          {
            title: '待支付',
            value: 'waitPay',
            query: { payStatus: e.InquiryPayStatus.Unpaid },
          },
          {
            title: '待接诊',
            value: 'waitConsult',
            query: { inquiryStatus: e.InquiryStatus.WaitDiagnosis },
          },
          {
            title: '问诊中',
            value: 'consulting',
            query: { inquiryStatus: e.InquiryStatus.DealingDiagnosis },
          },
          {
            title: '待评价',
            value: 'waitEvaluate',
            query: { commentStatus: e.CommentStatus.AwaitingEvaluation },
          },
        ]),
        s = e.ref({
          all: [],
          waitPay: [],
          waitConsult: [],
          consulting: [],
          waitEvaluate: [],
        }),
        l = (e, a) => {
          (u.value = a), (v.pageIndex = 1);
        },
        r = (e) => {
          i.old = e.detail.scrollTop;
        },
        d = () => {
          (i.value = i.old),
            e.nextTick$1(() => {
              i.value = 0;
            });
        },
        c = (e) => {
          (u.value = e.detail.current),
            (n.value = o.value[u.value].value),
            (v.pageIndex = 1),
            f(!1, n.value, o.value[u.value].query),
            d();
        },
        v = e.reactive({ pages: 1, pageIndex: 1, total: 0 }),
        p = () => {
          f(!0, n.value);
        },
        y = (a) =>
          a.map((a) => {
            const t = e.calcInquiryOrderStatus(a);
            return { ...a, actions: e.StatusButtons[t], status: t };
          }),
        g = e.ref(e.LoadMoreStatus.More),
        f = async (a = !1, t, n) => {
          if (!(0 !== v.pages && v.pageIndex > v.pages))
            try {
              (g.value = e.LoadMoreStatus.Loading),
                a || e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: u } = await e.requestInquiryOrderList({
                  ...n,
                  pageIndex: v.pageIndex,
                  pageSize: 10,
                  customDeleted: 0,
                }),
                { current: i, total: o, pages: l, records: r } = u;
              (v.pageIndex = i + 1),
                (v.total = o),
                (v.pages = l),
                (g.value =
                  v.pageIndex > v.pages
                    ? e.LoadMoreStatus.NoMore
                    : e.LoadMoreStatus.More),
                (s.value[t] = a ? [...s.value[t], ...y(r)] : y(r));
            } catch (u) {
              g.value = e.LoadMoreStatus.More;
            } finally {
              e.index.hideLoading();
            }
        },
        m = e.ref(null),
        O = () => {
          (v.pageIndex = 1), d(), f(!1, n.value);
        };
      return (
        t({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (a) => {
            console.log('pageOnload', a),
              O(),
              e.index.$on(e.REFRESH_INQUIRY_ORDER_LIST, () => {
                O();
              });
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, t) => ({
          a: e.sr('navbarRef', 'd11db613-0'),
          b: e.p({ title: '订单列表', 'border-bottom': !1 }),
          c: e.o(l),
          d: e.o((e) => (n.value = e)),
          e: e.p({ tabs: o.value, 'active-tab': n.value }),
          f: e.f(o.value, (a, t, n) =>
            e.e(
              { a: s.value[a.value].length > 0 },
              s.value[a.value].length > 0
                ? {
                    b: e.f(s.value[a.value], (t, u, i) => {
                      var o, l, r;
                      return e.e(
                        {
                          a: t.payStatus == e.unref(e.InquiryPayStatus).Unpaid,
                        },
                        t.payStatus == e.unref(e.InquiryPayStatus).Unpaid
                          ? {
                              b: e.o(
                                (n) =>
                                  ((a, t) => {
                                    const n = s.value[a].findIndex(
                                      (e) => e.id === t.id
                                    );
                                    -1 !== n &&
                                      ((s.value[a][n].status =
                                        e.DetailStatus.TIMEOUT),
                                      (s.value[a][n].actions =
                                        e.StatusButtons[
                                          e.DetailStatus.TIMEOUT
                                        ]));
                                  })(a.value, t),
                                t.id
                              ),
                              c: 'd11db613-2-' + n + '-' + i,
                              d: e.p({
                                'end-time': e
                                  .unref(e.dayjs)(t.addTime)
                                  .add(15, 'minutes')
                                  .valueOf(),
                              }),
                            }
                          : {},
                        {
                          e: e.unref(e.getServiceUserInfo)(t).avatar,
                          f: e.t(e.unref(e.getServiceUserInfo)(t).name),
                          g: e.t(e.unref(e.DetailStatusDesc)[t.status]),
                          h: [
                            e.unref(e.DetailStatus).CANCELLED,
                            e.unref(e.DetailStatus).TIMEOUT,
                            e.unref(e.DetailStatus).WITHDRAWAL,
                          ].includes(t.status)
                            ? 1
                            : '',
                          i: e.t(e.unref(e.InquiryTypeDesc)[t.inquiryType]),
                          j: null !== t.inquiryWay || void 0 !== t.inquiryWay,
                        },
                        (null !== t.inquiryWay || t.inquiryWay, {}),
                        {
                          k: e.t(e.unref(e.InquiryWayDesc)[t.inquiryWay]),
                          l:
                            null == (o = t.inquiryPatientVO)
                              ? void 0
                              : o.illDesc,
                        },
                        (null == (l = t.inquiryPatientVO) ? void 0 : l.illDesc)
                          ? {
                              m: e.t(
                                null == (r = t.inquiryPatientVO)
                                  ? void 0
                                  : r.illDesc
                              ),
                            }
                          : {},
                        {
                          n: e.t(t.addTime),
                          o: t.actions.includes(e.unref(e.Buttons).TO_PAY),
                        },
                        t.actions.includes(e.unref(e.Buttons).TO_PAY)
                          ? {
                              p: e.o(
                                (a) =>
                                  ((a) => {
                                    e.OrderActions.toPay(a);
                                  })(t),
                                t.id
                              ),
                            }
                          : {},
                        {
                          q: t.actions.includes(
                            e.unref(e.Buttons).CONTACT_DOCTOR
                          ),
                        },
                        t.actions.includes(e.unref(e.Buttons).CONTACT_DOCTOR)
                          ? {
                              r: e.o(
                                (a) =>
                                  ((a) => {
                                    e.OrderActions.contactDoctor(a);
                                  })(t),
                                t.id
                              ),
                            }
                          : {},
                        {
                          s: t.actions.includes(
                            e.unref(e.Buttons).DELETE_ORDER
                          ),
                        },
                        t.actions.includes(e.unref(e.Buttons).DELETE_ORDER)
                          ? {
                              t: e.o(
                                (a) =>
                                  ((a) => {
                                    var t;
                                    null == (t = m.value) ||
                                      t.openModal({
                                        content: '是否删除订单?',
                                        confirmText: '删除',
                                        onConfirm: async () => {
                                          e.index.showLoading({
                                            title: '删除中…',
                                            mask: !0,
                                          }),
                                            await e.OrderActions.deleteOrder(a),
                                            e.index.showToast({
                                              title: '删除成功',
                                              icon: 'none',
                                              mask: !0,
                                            }),
                                            O();
                                        },
                                      });
                                  })(t),
                                t.id
                              ),
                            }
                          : {},
                        {
                          v: t.actions.includes(
                            e.unref(e.Buttons).EVALUATE_DOCTOR
                          ),
                        },
                        t.actions.includes(e.unref(e.Buttons).EVALUATE_DOCTOR)
                          ? {
                              w: e.o(
                                (a) =>
                                  ((a) => {
                                    e.index.$on(
                                      e.REFRESH_INQUIRY_ORDER_LIST,
                                      async () => {
                                        await O(),
                                          e.index.$off(
                                            e.REFRESH_INQUIRY_ORDER_LIST
                                          );
                                      }
                                    ),
                                      e.OrderActions.evaluateDoctor(a);
                                  })(t),
                                t.id
                              ),
                            }
                          : {},
                        {
                          x: e.o((a) => {
                            return (
                              (n = t.id),
                              void e.appNavigator.navigateTo(
                                e.appNavigator.pagesMap['inquiry-order-detail'],
                                { query: { inquiryOrderId: n } }
                              )
                            );
                            var n;
                          }, t.id),
                          y: t.id,
                        }
                      );
                    }),
                    c: 'd11db613-3-' + n,
                    d: e.p({ status: g.value }),
                    e: i.value,
                    f: e.o(r, a.value),
                    g: e.o(p, a.value),
                  }
                : {
                    h: 'd11db613-4-' + n,
                    i: e.p({
                      'empty-icon':
                        'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110616150969161510201233.png',
                      title: '暂无订单',
                      'sub-title': '订单在此查看',
                    }),
                  },
              { j: a.value }
            )
          ),
          g: u.value,
          h: e.o(c),
          i: e.sr(m, 'd11db613-5', { k: 'modalRef' }),
        })
      );
    },
  }),
  o = e._export_sfc(i, [['__scopeId', 'data-v-d11db613']]);
wx.createComponent(o);
