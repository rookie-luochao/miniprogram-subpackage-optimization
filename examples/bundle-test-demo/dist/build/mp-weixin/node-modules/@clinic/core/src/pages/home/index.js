'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (a + o)();
const o = () => '../../components/Modal/index.js',
  a = () => './components/OneTree/index.js',
  n = e.defineComponent({
    __name: 'index',
    props: { mainBg: { default: '' }, logoIcon: { default: '' } },
    setup(o, { expose: a }) {
      const n = e.useAppConfigStore(),
        { ORG_ID: i, ORG_CODE: l, ORG_NAME: r } = n.CONFIG,
        t = e.useUserInfoStore(),
        { userInfo: s } = e.storeToRefs(t),
        u = e.ref(null),
        d = e.ref(null),
        p = e.ref({ orgCode: '', orgID: '', orgName: '' }),
        c = e.ref(),
        g = async () => {
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: o } = await e.requestSelectGroupOneJson({
              orgID: i,
              groupCode: 'INQUIRY_CONVENIENT_CONFIG',
              paraCode: '1',
            });
            c.value = o;
          } finally {
            e.index.hideLoading();
          }
        },
        v = e.ref(null),
        m = async () => {
          if (p.value.orgID)
            try {
              e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: o } = await e.requestGetBaseInfo({
                orgID: p.value.orgID,
                serviceCode: e.SERVICE_CODE,
              });
              v.value = o;
            } finally {
              e.index.hideLoading();
            }
        },
        f = async () => {
          var o, a, n;
          if (c.value) {
            const { paraValueJson: e } = c.value;
            if (!e.service_expire)
              return (
                null == (o = u.value) ||
                  o.openModal({
                    title: '当前不在服务时间',
                    serviceTime: e.periods.map(
                      (e) => `${e.startTime}-${e.endTime}`
                    ),
                    content: '请在医生服务时间内进行问诊',
                    showCancel: !1,
                  }),
                !1
              );
          }
          if (v.value) {
            const {
              orgID: o,
              orgCode: l,
              clientAppIsDisable: r,
              orgIsDisable: t,
            } = v.value;
            if (1 === r || 1 === t)
              return (
                null == (a = u.value) ||
                  a.openModal({
                    title: '当前服务已关闭',
                    content: '请联系工作人员',
                    showCancel: !1,
                  }),
                !1
              );
            try {
              e.index.showLoading({ title: '加载中…', mask: !0 }),
                await e.requestQueryCurrentPrepaid({ orgID: o, orgCode: l });
            } catch (i) {
              const { message: e } = i;
              if (e.includes('门店处方余量不足'))
                return (
                  null == (n = u.value) ||
                    n.openModal({
                      title: '处方提示',
                      content: '请联系工作人门店处方余量不足，请联系店员处理员',
                      showCancel: !1,
                    }),
                  !1
                );
            } finally {
              e.index.hideLoading();
            }
          }
          return (
            !!s.value ||
            (e.appNavigator.navigateTo(e.appNavigator.pagesMap.login), !1)
          );
        };
      return (
        a({
          pageOnShow: async () => {
            e.nextTick$1(() => {
              var e;
              null == (e = d.value) || e.pageOnShow();
            });
          },
          pageOnLoad: async (o) => {
            if (o.q) {
              const a = e.queryURLParams(decodeURIComponent(o.q));
              (p.value = a), await m();
            }
            await g();
          },
          pageOnHide: () => {
            e.nextTick$1(() => {
              var e;
              null == (e = d.value) || e.pageOnHide();
            });
          },
        }),
        (o, a) => {
          var n, i, t, s, c, g, I, h, y;
          return e.e(
            {
              a: o.logoIcon,
              b: o.mainBg,
              c: e.n(
                (null == (n = v.value) ? void 0 : n.orgID)
                  ? 'icon-position'
                  : 'icon-hi'
              ),
              d: (null == (i = v.value) ? void 0 : i.orgID)
                ? 'http://hospital-pro-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24041015563248097670201018.png'
                : 'https://hospital-pro-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24041015563219991240201018.png',
              e: e.t(
                (null == (t = v.value) ? void 0 : t.orgID)
                  ? '当前药店'
                  : '欢迎进入'
              ),
              f: e.t(
                (null == (s = v.value) ? void 0 : s.orgID)
                  ? `${p.value.orgName}`
                  : e.unref(r)
              ),
              g: e.sr(d, '50320e59-0', { k: 'oneTreeRef' }),
              h: e.p({ 'sub-org-info': v.value, 'sub-org-params': p.value }),
              i: !(null == (c = d.value) ? void 0 : c.isErpOpen),
            },
            (null == (g = d.value) ? void 0 : g.isErpOpen)
              ? {}
              : {
                  j: e.t(
                    (null == (I = v.value) ? void 0 : I.orgID)
                      ? '点击下方按钮进行问诊'
                      : '请扫描药店二维码进行购药'
                  ),
                },
            {
              k: (null == (h = v.value) ? void 0 : h.orgID)
                ? 'https://hospital-pro-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24041015563239840190201018.png'
                : 'https://hospital-pro-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24041015563260162680201018.png',
              l: e.t(
                (null == (y = v.value) ? void 0 : y.orgID)
                  ? '立即问诊'
                  : '扫码问诊'
              ),
              m: e.o((o) => {
                var a;
                return (null == (a = v.value) ? void 0 : a.orgID)
                  ? (async () => {
                      (await f()) &&
                        e.appNavigator.navigateTo(
                          e.appNavigator.pagesMap['inquiry-info'],
                          {
                            query: {
                              subOrgInfo: JSON.stringify({
                                ...v.value,
                                ...p.value,
                              }),
                            },
                          }
                        );
                    })()
                  : (async () => {
                      (await f()) &&
                        (l
                          ? e.index.scanCode({
                              success: async (o) => {
                                var a, n;
                                const i = e.queryURLParams(o.result);
                                (
                                  null == (a = i.orgCode)
                                    ? void 0
                                    : a.includes(l)
                                )
                                  ? ((p.value = i),
                                    await m(),
                                    await (null == (n = d.value)
                                      ? void 0
                                      : n.getOneTreeBusiness()))
                                  : e.index.showToast({
                                      title: 'Error: 请扫描正确的药店码',
                                      icon: 'none',
                                    });
                              },
                            })
                          : e.index.showToast({
                              title: '未配置机构信息',
                              icon: 'none',
                            }));
                    })();
              }),
              n: e.sr(u, '50320e59-1', { k: 'modalRef' }),
            }
          );
        }
      );
    },
  }),
  i = e._export_sfc(n, [['__scopeId', 'data-v-50320e59']]);
wx.createComponent(i);
