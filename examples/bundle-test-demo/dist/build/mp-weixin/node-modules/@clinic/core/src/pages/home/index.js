'use strict';
const e = require('../../../../../../common/vendor.js');
Math || o();
const o = () => '../../components/Empty/index.js',
  a = e.defineComponent({
    __name: 'index',
    setup(o, { expose: a }) {
      const { scanCode: n } = e.useScanCode(),
        { checkAuth: t } = e.useAuth(),
        { navBarHeight: i, navBarTitleTop: l } = e.useNavSize(),
        d = e.useStudioInfoStore(),
        { studioInfo: r } = e.storeToRefs(d),
        s = e.ref(),
        u = async () => {
          try {
            const o = await n(),
              { orgId: a } = e.queryURLParams(o);
            if (!a)
              return void e.index.showToast({
                title: 'Error: 请扫描正确的二维码',
                icon: 'none',
              });
            await p(a), e.index.hideLoading();
          } catch (o) {
            'string' == typeof o &&
              e.index.showToast({ title: o, icon: 'none' });
          }
        },
        c = e.ref(null),
        g = e.ref(null),
        p = async (o) => {
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: a } = await e.requestGetOrgInfo({ orgId: o });
            (c.value = a), d.setStudioInfo(a);
            const { data: n } = await e.requestGetConsultationHomeInfo({
              orgId: a.orgId,
              orgCode: a.orgCode,
            });
            g.value = n;
          } finally {
            e.index.hideLoading();
          }
        },
        v = async () => {
          var o, a, n, i, l, d;
          if (!t()) return;
          if (0 !== (null == (o = c.value) ? void 0 : o.orgStatus))
            try {
              e.index.showLoading({ title: '创建咨询中…', mask: !0 });
              const { data: o } = await e.requestConsultationCreateOrder({
                orgId: null == (a = c.value) ? void 0 : a.orgId,
                orgCode: null == (n = c.value) ? void 0 : n.orgCode,
                consultationPackageId:
                  null == (i = g.value) ? void 0 : i.consultationPackageId,
              });
              e.appNavigator.navigateTo(e.appNavigator.pagesMap.chat, {
                query: {
                  chatImId: null == o ? void 0 : o.imGroupId,
                  doctorAssistUserStaffId:
                    null == o ? void 0 : o.doctorAssistUserStaffId,
                  inquiryType: e.InquiryType.Specialist,
                  navigationBarTitle:
                    null !=
                    (d =
                      null == (l = g.value)
                        ? void 0
                        : l.consultationPackageName)
                      ? d
                      : '',
                },
              });
            } finally {
              e.index.hideLoading();
            }
          else e.index.showToast({ title: '工作室已禁用', icon: 'none' });
        };
      return (
        a({
          pageOnShow: async () => {
            var e, o;
            null == (e = s.value) || e.pageOnShow(),
              (null == (o = r.value) ? void 0 : o.orgId) &&
                ((c.value = r.value), await p(r.value.orgId));
          },
          pageOnLoad: async (o) => {
            if ((console.log('pageOnload', o), null == o ? void 0 : o.q)) {
              const a = e.queryURLParams(decodeURIComponent(o.q));
              a.orgId && d.setStudioInfo(a);
            }
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (o, a) => {
          var n, t, d, r, s, p, h;
          return e.e(
            { a: !(null == (n = c.value) ? void 0 : n.orgId) },
            (null == (t = c.value) ? void 0 : t.orgId)
              ? e.e(
                  {
                    e: e.t(
                      null != (r = null == (d = c.value) ? void 0 : d.orgName)
                        ? r
                        : '--'
                    ),
                    f: e.unref(l) + 'px',
                    g: e.s(`height: ${e.unref(i)}px`),
                    h: null == (s = g.value) ? void 0 : s.consultationPackageId,
                  },
                  (null == (p = g.value) ? void 0 : p.consultationPackageId)
                    ? {
                        i: e.f(
                          null == (h = g.value) ? void 0 : h.elementsUrls,
                          (e, o, a) => ({ a: e, b: e })
                        ),
                        j: e.o(v),
                      }
                    : {
                        k: e.p({
                          'empty-icon':
                            'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110416544408325010201240.png',
                          title: '暂无服务',
                          'sub-title': '当前机构暂未配置服务包',
                        }),
                      }
                )
              : {
                  b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102309452901205480201240.png',
                  c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102309385728471530201240.png',
                  d: e.o(u),
                }
          );
        }
      );
    },
  }),
  n = e._export_sfc(a, [['__scopeId', 'data-v-8285a220']]);
wx.createComponent(n);
