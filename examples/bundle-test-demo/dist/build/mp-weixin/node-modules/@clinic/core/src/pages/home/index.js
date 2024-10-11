'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (n + o)();
const o = () => '../../components/Modal/index.js',
  n = () => './components/OneTree/index.js',
  a = e.defineComponent({
    __name: 'index',
    props: {
      mainBg: { default: '' },
      logoIcon: { default: '' },
      isCheckCode: { type: Boolean, default: !1 },
    },
    setup(o, { expose: n }) {
      const a = e.useAppConfigStore(),
        { ORG_ID: i, ORG_CODE: t, ORG_NAME: l } = a.CONFIG,
        r = e.useUserInfoStore(),
        { userInfo: s } = e.storeToRefs(r),
        { scanCode: u } = e.useScanCode(),
        d = e.ref(null),
        c = e.ref(null),
        p = o,
        g = e.ref({ orgCode: '', orgID: '', orgName: '' }),
        v = e.ref(),
        h = async () => {
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: o } = await e.requestSelectGroupOneJson({
              orgID: i,
              groupCode: 'INQUIRY_CONVENIENT_CONFIG',
              paraCode: '1',
            });
            v.value = o;
          } finally {
            e.index.hideLoading();
          }
        },
        f = e.ref(null),
        m = async () => {
          if (g.value.orgID)
            try {
              e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: o } = await e.requestGetBaseInfo({
                orgID: g.value.orgID,
                serviceCode: e.SERVICE_CODE,
              });
              f.value = o;
            } finally {
              e.index.hideLoading();
            }
        },
        I = async () => {
          var o, n, a, t, l, r;
          if (v.value) {
            const { paraValueJson: e } = v.value;
            if (!(null == e ? void 0 : e.service_expire))
              return (
                null == (o = d.value) ||
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
          if ((null == (n = g.value) ? void 0 : n.uuidStr) && p.isCheckCode)
            try {
              e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: o } = await e.requestCheckUrlExpire({
                orgID: i,
                uuid: null == (a = g.value) ? void 0 : a.uuidStr,
              });
              if ((e.index.hideLoading(), !o))
                return (
                  null == (t = d.value) ||
                    t.openModal({
                      content: '该二维码已失效，请使用新的二维码进行问诊',
                      showCancel: !1,
                    }),
                  !1
                );
            } catch (u) {
              return e.index.hideLoading(), !1;
            }
          if (f.value) {
            const {
              orgID: o,
              orgCode: n,
              clientAppIsDisable: a,
              orgIsDisable: i,
            } = f.value;
            if (1 === a || 1 === i)
              return (
                null == (l = d.value) ||
                  l.openModal({
                    title: '当前服务已关闭',
                    content: '请联系工作人员',
                    showCancel: !1,
                  }),
                !1
              );
            try {
              e.index.showLoading({ title: '加载中…', mask: !0 });
              const { success: a, message: i } =
                await e.requestQueryCurrentPrepaid({ orgID: o, orgCode: n });
              if (!a)
                return (
                  i.includes('门店处方余量不足') &&
                    (null == (r = d.value) ||
                      r.openModal({
                        title: '处方提示',
                        content:
                          '请联系工作人门店处方余量不足，请联系店员处理员',
                        showCancel: !1,
                      })),
                  !1
                );
            } catch (u) {
              const { message: o } = u;
              return e.index.showToast({ title: o, icon: 'none' }), !1;
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
        n({
          pageOnShow: async () => {
            e.nextTick$1(() => {
              var e;
              null == (e = c.value) || e.pageOnShow();
            });
          },
          pageOnLoad: async (o) => {
            if (null == o ? void 0 : o.q) {
              const n = e.queryURLParams(decodeURIComponent(o.q));
              (g.value = n), await m();
            }
            await h();
          },
          pageOnHide: () => {
            e.nextTick$1(() => {
              var e;
              null == (e = c.value) || e.pageOnHide();
            });
          },
        }),
        (o, n) => {
          var a, i, r, s, p, v, h, C, y;
          return e.e(
            {
              a: o.logoIcon,
              b: o.mainBg,
              c: e.n(
                (null == (a = f.value) ? void 0 : a.orgID)
                  ? 'icon-position'
                  : 'icon-hi'
              ),
              d: (null == (i = f.value) ? void 0 : i.orgID)
                ? 'http://hospital-pro-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24041015563248097670201018.png'
                : 'https://hospital-pro-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24041015563219991240201018.png',
              e: e.t(
                (null == (r = f.value) ? void 0 : r.orgID)
                  ? '当前药店'
                  : '欢迎进入'
              ),
              f: e.t(
                (null == (s = f.value) ? void 0 : s.orgID)
                  ? `${g.value.orgName}`
                  : e.unref(l)
              ),
              g: e.sr(c, '2718b01b-0', { k: 'oneTreeRef' }),
              h: e.p({ 'sub-org-info': f.value, 'sub-org-params': g.value }),
              i: !(null == (p = c.value) ? void 0 : p.isErpOpen),
            },
            (null == (v = c.value) ? void 0 : v.isErpOpen)
              ? {}
              : {
                  j: e.t(
                    (null == (h = f.value) ? void 0 : h.orgID)
                      ? '点击下方按钮进行问诊'
                      : '请扫描药店二维码进行购药'
                  ),
                },
            {
              k: (null == (C = f.value) ? void 0 : C.orgID)
                ? 'https://hospital-pro-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24041015563239840190201018.png'
                : 'https://hospital-pro-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24041015563260162680201018.png',
              l: e.t(
                (null == (y = f.value) ? void 0 : y.orgID)
                  ? '立即问诊'
                  : '扫码问诊'
              ),
              m: e.o((o) => {
                var n;
                return (null == (n = f.value) ? void 0 : n.orgID)
                  ? (async () => {
                      (await I()) &&
                        e.appNavigator.navigateTo(
                          e.appNavigator.pagesMap['inquiry-info'],
                          {
                            query: {
                              subOrgInfo: JSON.stringify({
                                ...f.value,
                                ...g.value,
                              }),
                            },
                          }
                        );
                    })()
                  : (async () => {
                      var o, n;
                      if (await I())
                        if (t)
                          try {
                            const a = await u(),
                              i = e.queryURLParams(a);
                            if (
                              !(null == (o = i.orgCode)
                                ? void 0
                                : o.includes(t))
                            )
                              return void e.index.showToast({
                                title: 'Error: 请扫描正确的药店码',
                                icon: 'none',
                              });
                            (g.value = i),
                              await m(),
                              await (null == (n = c.value)
                                ? void 0
                                : n.getOneTreeBusiness());
                          } catch (a) {
                            'string' == typeof a &&
                              e.index.showToast({ title: a, icon: 'none' });
                          }
                        else
                          e.index.showToast({
                            title: '未配置机构信息',
                            icon: 'none',
                          });
                    })();
              }),
              n: e.sr(d, '2718b01b-1', { k: 'modalRef' }),
            }
          );
        }
      );
    },
  }),
  i = e._export_sfc(a, [['__scopeId', 'data-v-2718b01b']]);
wx.createComponent(i);
