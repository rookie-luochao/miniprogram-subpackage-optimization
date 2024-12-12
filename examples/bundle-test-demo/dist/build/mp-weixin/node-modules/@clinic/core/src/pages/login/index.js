'use strict';
const e = require('../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    setup(a, { expose: n }) {
      const { resetAuthCheck: o } = e.useAuth(),
        { navBarTitleTop: i } = e.useNavSize(),
        t = e.useUserInfoStore(),
        s = e.useAppConfigStore(),
        { WECHAT_APP_ID: p } = s.CONFIG,
        c = e.ref(null),
        r = e.ref(''),
        d = e.ref(''),
        u = e.ref(''),
        l = async () => {
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { code: a } = await e.index.login(),
              { data: n } = await e.requestGetOpenId({ appid: p, code: a });
            (r.value = n.phone), (d.value = n.openId), (u.value = n.unionId);
          } finally {
            e.index.hideLoading();
          }
        },
        g = e.ref(!1),
        v = () =>
          !!g.value ||
          (e.index.showToast({ title: '请先阅读协议以及勾选', icon: 'none' }),
          !1),
        h = async (a) => {
          if (a.detail.errMsg.includes('user deny'))
            return void e.index.showToast({
              title: '用户拒绝授权手机号',
              icon: 'none',
            });
          const n = a.detail.code;
          if (n)
            try {
              e.index.showLoading({ title: '登录中...', mask: !0 });
              const { data: a } = await e.requestWxPhone({ appid: p, code: n }),
                { data: o } = await e.requestUserLogin({
                  phone: a,
                  wxOpenId: d.value,
                  wxUnionId: u.value,
                });
              await I(o.token);
            } finally {
              e.index.hideLoading();
            }
          else
            e.index.showToast({
              title: '未获取到授权码，请重试',
              icon: 'none',
            });
        },
        m = async () => {
          if (v())
            try {
              e.index.showLoading({ title: '登录中…', mask: !0 });
              const { data: a } = await e.requestUserLogin({
                phone: r.value,
                wxOpenId: d.value,
                wxUnionId: u.value,
              });
              await I(a.token);
            } finally {
              e.index.hideLoading();
            }
        },
        I = async (a) => {
          var n;
          e.index.setStorageSync('token', a);
          const { data: i } = await e.requestGetUserInfo();
          t.setUserInfo({ ...i, openId: d.value }),
            (null == (n = c.value) ? void 0 : n.init) &&
              i.loginId &&
              i.userSign &&
              c.value.init({ userID: i.loginId, userSig: i.userSign }),
            o(),
            e.appNavigator.navigateBack();
        },
        w = (a) => {
          const n = {
            PRIVACY_POLICY: e.appNavigator.pagesMap['agreement-privacy-policy'],
            TERMS_OF_SERVICE: e.appNavigator.pagesMap['agreement-user'],
          };
          e.appNavigator.navigateTo(n[a]);
        };
      return (
        n({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (e, a) => {
            a && (c.value = a), l();
          },
          pageOnHide: () => {
            console.log('pageOnHide'), o();
          },
        }),
        (a, n) =>
          e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24120213540268841570201233.png',
              b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102810475802687540201233.png',
              c: e.unref(i) + 'px',
              d: e.o((a) => e.unref(e.appNavigator).navigateBack()),
              e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102310165644910880201240.png',
              f: r.value,
            },
            r.value
              ? { g: e.n(g.value ? 'login-btn-active' : ''), h: e.o(m) }
              : {
                  i: e.n(g.value ? 'login-btn-active' : ''),
                  j: g.value ? 'getPhoneNumber' : void 0,
                  k: e.o(h),
                  l: e.o(v),
                },
            {
              m: g.value
                ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110215004205362350201240.png'
                : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110215012423223020201233.png',
              n: e.o((e) => (g.value = !g.value)),
              o: e.o((e) => w('TERMS_OF_SERVICE')),
              p: e.o((e) => w('PRIVACY_POLICY')),
              q: e.o((e) => (g.value = !g.value)),
            }
          )
      );
    },
  }),
  n = e._export_sfc(a, [['__scopeId', 'data-v-d1360ad8']]);
wx.createComponent(n);
