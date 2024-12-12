'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (o + n)();
const n = () => '../../components/Modal/index.js',
  o = () => '../../components/Navbar/index.js',
  a = e.defineComponent({
    __name: 'index',
    setup(n, { expose: o }) {
      const a = e.useUserInfoStore(),
        { userInfo: t } = e.storeToRefs(a),
        { logout: l } = e.useAuth(),
        r = e.ref(null),
        c = e.ref(''),
        s = () => {
          e.appNavigator.navigateTo(
            e.appNavigator.pagesMap['settings-nickname']
          );
        },
        u = e.ref(null),
        p = () => {
          var e;
          null == (e = u.value) ||
            e.openModal({
              content: '是否确认退出登录？',
              onConfirm: async () => {
                var e, n;
                l(),
                  null == (n = null == (e = r.value) ? void 0 : e.destroyed) ||
                    n.call(e);
              },
            });
        };
      return (
        o({
          pageOnShow: () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (n, o) => {
            console.log('pageOnLoad', o, n),
              console.log(
                'uni.getAccountInfoSync()',
                e.index.getAccountInfoSync()
              ),
              (c.value = e.index.getAccountInfoSync().miniProgram.version),
              o && (r.value = o);
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (n, o) => {
          var a, l, r, i;
          return e.e(
            {
              a: e.sr('navbarRef', '404de149-0'),
              b: e.p({ title: '设置' }),
              c: e.t(
                null != (l = null == (a = e.unref(t)) ? void 0 : a.userName)
                  ? l
                  : '--'
              ),
              d: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102809300973943750201233.png',
              e: e.o(s),
              f: e.t(
                e.unref(e.encryptPhone)(
                  null != (i = null == (r = e.unref(t)) ? void 0 : r.phone)
                    ? i
                    : ''
                )
              ),
              g: c.value,
            },
            c.value ? { h: e.t(c.value) } : {},
            { i: e.o(p), j: e.sr(u, '404de149-1', { k: 'modalRef' }) }
          );
        }
      );
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-404de149']]);
wx.createComponent(t);
