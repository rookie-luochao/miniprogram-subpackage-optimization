'use strict';
const e = require('../../../../../../common/vendor.js');
Math || o();
const o = () => '../../components/Empty/index.js',
  a = e.defineComponent({
    __name: 'index',
    setup(o, { expose: a }) {
      const { navBarHeight: n, navBarTitleTop: t } = e.useNavSize(),
        i = e.useStudioInfoStore(),
        { studioInfo: l } = e.storeToRefs(i),
        s = e.ref(null),
        u = async () => {
          var o, a, n, t, i, u;
          if (0 !== (null == (o = l.value) ? void 0 : o.orgStatus))
            try {
              e.index.showLoading({ title: '创建咨询中…', mask: !0 });
              const { data: o } = await e.requestConsultationCreateOrder({
                orgId: null == (a = l.value) ? void 0 : a.orgId,
                orgCode: null == (n = l.value) ? void 0 : n.orgCode,
                consultationPackageId:
                  null == (t = s.value) ? void 0 : t.consultationPackageId,
              });
              e.appNavigator.navigateTo(e.appNavigator.pagesMap.chat, {
                query: {
                  chatImId: null == o ? void 0 : o.imGroupId,
                  doctorAssistUserStaffId:
                    null == o ? void 0 : o.doctorAssistUserStaffId,
                  inquiryType: e.InquiryType.Specialist,
                  navigationBarTitle:
                    null !=
                    (u =
                      null == (i = s.value)
                        ? void 0
                        : i.consultationPackageName)
                      ? u
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
          pageOnShow: () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (e) => {
            console.log('pageOnload', e),
              (s.value = JSON.parse(decodeURIComponent(e.consultationPackage)));
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (o, a) => {
          var i, r, c, d, p;
          return e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102810082858620320201233.png',
              b: e.o((o) => e.unref(e.appNavigator).navigateBack()),
              c: e.t(
                null != (r = null == (i = e.unref(l)) ? void 0 : i.orgName)
                  ? r
                  : '--'
              ),
              d: e.unref(t) + 'px',
              e: e.s(`height: ${e.unref(n)}px`),
              f: null == (c = s.value) ? void 0 : c.consultationPackageId,
            },
            (null == (d = s.value) ? void 0 : d.consultationPackageId)
              ? {
                  g: e.f(
                    null == (p = s.value) ? void 0 : p.elementsUrls,
                    (e, o, a) => ({ a: e, b: e })
                  ),
                  h: e.o(u),
                }
              : {
                  i: e.p({
                    'empty-icon':
                      'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110416544408325010201240.png',
                    title: '暂无服务',
                    'sub-title': '当前机构暂未配置服务包',
                  }),
                }
          );
        }
      );
    },
  }),
  n = e._export_sfc(a, [['__scopeId', 'data-v-9b87e8b9']]);
wx.createComponent(n);
