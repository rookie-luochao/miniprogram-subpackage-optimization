'use strict';
const e = require('../../../../../../common/vendor.js');
Math || a();
const a = () => '../../components/Navbar/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(a, { expose: o }) {
      const n = e.useUserInfoStore(),
        { userInfo: s } = e.storeToRefs(n),
        t = e.ref(''),
        i = async () => {
          var a;
          if (t.value.trim())
            try {
              e.index.showLoading({ title: '修改中…', mask: !0 }),
                await e.requestEditUserInfo({
                  phone: null == (a = s.value) ? void 0 : a.phone,
                  userName: t.value,
                }),
                n.setUserInfo({ ...s.value, userName: t.value }),
                e.appNavigator.navigateBack();
            } finally {
              e.index.hideLoading();
            }
          else e.index.showToast({ title: '请输入昵称', icon: 'none' });
        };
      return (
        o({
          pageOnShow: () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (e) => {
            var a;
            console.log('pageOnload', e),
              (t.value = (null == (a = s.value) ? void 0 : a.userName) || '');
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, o) => ({
          a: e.sr('navbarRef', 'a4edc01d-0'),
          b: e.p({ title: '修改昵称' }),
          c: t.value,
          d: e.o(e.m((e) => (t.value = e.detail.value), { trim: !0 })),
          e: t.value,
          f: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102811200148355460201240.png',
          g: e.o((e) => (t.value = '')),
          h: e.o(i),
        })
      );
    },
  }),
  n = e._export_sfc(o, [['__scopeId', 'data-v-a4edc01d']]);
wx.createComponent(n);
