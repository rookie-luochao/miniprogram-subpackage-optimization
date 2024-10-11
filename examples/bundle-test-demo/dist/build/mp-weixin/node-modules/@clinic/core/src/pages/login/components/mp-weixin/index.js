'use strict';
const e = require('../../../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-checkbox')();
}
Math;
const a = e.defineComponent({
    __name: 'index',
    props: { initTcsdk: {} },
    setup(a, { expose: o }) {
      const { statusBarHeight: t } = e.useNavSize(),
        n = e.useUserInfoStore(),
        i = e.useAppConfigStore(),
        {
          ORG_ID: s,
          ORG_CODE: c,
          ORG_SOURCE: r,
          WECHAT_ORIGINAL_ID: d,
        } = i.CONFIG,
        p = a,
        g = e.ref(!0),
        l = async () => {
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { code: a } = await e.index.login(),
              { data: o } = await e.requestGetPhoneByCode({
                code: a,
                source: r,
                orgID: s,
                orgCode: c,
              });
            g.value = !!o;
          } finally {
            e.index.hideLoading();
          }
        },
        u = e.ref(!1),
        m = () =>
          !!u.value ||
          (e.index.showToast({ title: '请先阅读用户协议并勾选', icon: 'none' }),
          !1),
        h = async (a) => {
          if (a.detail.errMsg.includes('user deny'))
            return void e.index.showToast({
              title: '用户拒绝授权手机号',
              icon: 'none',
            });
          const o = a.detail.code;
          if (o)
            try {
              e.index.showLoading({ title: '登录中...', mask: !0 });
              const { code: a } = await e.index.login(),
                t = await e.index.getUserInfo(),
                { iv: n, encryptedData: i } = t,
                p = {
                  code: a,
                  encryptedData: i,
                  iv: n,
                  phoneCode: o,
                  orgCode: c,
                  orgID: s,
                  source: r,
                  toUserName: d,
                },
                { data: g } = await e.requestWxLogin(p);
              v({ access_token: g.access_token });
            } finally {
              e.index.hideLoading();
            }
          else
            e.index.showToast({
              title: '未获取到授权码，请重试',
              icon: 'none',
            });
        },
        y = async () => {
          if (m())
            try {
              e.index.showLoading({ title: '登录中…', mask: !0 });
              const { code: a } = await e.index.login(),
                { iv: o, encryptedData: t } = await e.index.getUserInfo(),
                n = {
                  code: a,
                  iv: o,
                  encryptedData: t,
                  orgID: s,
                  orgCode: c,
                  source: r,
                },
                { data: i } = await e.requestWxLoginByCode(n);
              v({ access_token: i.access_token });
            } finally {
              e.index.hideLoading();
            }
        },
        v = async ({ access_token: a }) => {
          e.index.setStorageSync('token', a);
          const o = e.weappJwt(a).id;
          try {
            e.index.showLoading({ title: '登录中…', mask: !0 });
            const [a, t] = await Promise.all([
                e.requestGetOrgPersonUser({ personID: o, orgID: s }),
                e.requestGetByPersonID({ personID: o, thirdTypeId: r }),
              ]),
              { data: i } = await e.requestGetImInfo({
                thirdPersonID: a.data.keyID,
              });
            n.setUserInfo({
              ...a.data,
              openID: t.data.thirdUniqueID,
              imSign: i.imSign,
            }),
              p.initTcsdk(a.data.keyID, i.imSign),
              e.appNavigator.navigateBack();
          } finally {
            e.index.hideLoading();
          }
        },
        I = (a) => {
          const o = {
            PRIVACY_POLICY: 'https://polymermgmt-cs.100cbc.com/youai/privacy',
            TERMS_OF_SERVICE:
              'https://polymermgmt-cs.100cbc.com/youai/protocol',
          };
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['web-view'], {
            query: { url: o[a] },
          });
        };
      return (
        o({
          pageOnLoad: () => {
            l();
          },
        }),
        (a, o) =>
          e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717480685646590201233.png',
              b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071618085440740760201233.png',
              c: e.unref(t) + 8 + 'px',
              d: e.o((a) => e.unref(e.appNavigator).navigateBack()),
              e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071913402721255900201240.png',
              f: g.value,
            },
            g.value
              ? { g: e.n(u.value ? 'login-btn-active' : ''), h: e.o(y) }
              : {
                  i: e.n(u.value ? 'login-btn-active' : ''),
                  j: u.value ? 'getPhoneNumber' : void 0,
                  k: e.o(h),
                  l: e.o(m),
                },
            {
              m: e.o((e) => (u.value = e)),
              n: e.p({ modelValue: u.value }),
              o: e.o((e) => I('TERMS_OF_SERVICE')),
              p: e.o((e) => I('PRIVACY_POLICY')),
              q: e.o((e) => (u.value = !u.value)),
            }
          )
      );
    },
  }),
  o = e._export_sfc(a, [['__scopeId', 'data-v-01b020cf']]);
wx.createComponent(o);
