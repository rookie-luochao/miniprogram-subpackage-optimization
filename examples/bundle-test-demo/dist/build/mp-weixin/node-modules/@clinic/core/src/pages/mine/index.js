'use strict';
const e = require('../../../../../../common/vendor.js'),
  a =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110515534601906850201240.png',
  t =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102515562443956060201240.png',
  p = 'customer service',
  r = e.defineComponent({
    __name: 'index',
    setup(r, { expose: c }) {
      const i = e.useUserInfoStore(),
        { userInfo: o } = e.storeToRefs(i),
        { checkAuth: n } = e.useAuth(),
        s = e.ref(a),
        h = (a) => {
          e.index.setStorageSync('avatarUrl', a.detail.avatarUrl),
            (s.value = a.detail.avatarUrl);
        },
        l = () => {
          s.value = a;
        },
        u = e.ref(),
        m = e.ref([
          { number: 0, title: '待付款', key: e.OrderStatus.WaitPay },
          { number: 0, title: '待发货', key: e.OrderStatus.WaitDeliver },
          { number: 0, title: '待收货', key: e.OrderStatus.Delivered },
        ]),
        g = async () => {
          var a, t, p;
          const { data: r } = await e.requestQueryGoodsOrderStatus();
          m.value = [
            {
              number: null != (a = r.waitPay) ? a : 0,
              title: '待付款',
              key: e.OrderStatus.WaitPay,
            },
            {
              number: null != (t = r.waitDeliver) ? t : 0,
              title: '待发货',
              key: e.OrderStatus.WaitDeliver,
            },
            {
              number: null != (p = r.delivered) ? p : 0,
              title: '待收货',
              key: e.OrderStatus.Delivered,
            },
          ];
        },
        v = [
          {
            path: e.appNavigator.pagesMap['inquiry-order'],
            title: '问诊订单',
            icon: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102515591290320580201240.png',
          },
          {
            path: e.appNavigator.pagesMap.patient,
            title: '就诊人',
            icon: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102515595649641270201240.png',
          },
          {
            path: e.appNavigator.pagesMap.address,
            title: '收货地址',
            icon: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102516002215114530201240.png',
          },
          {
            path: e.appNavigator.pagesMap.prescription,
            title: '我的处方',
            icon: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102516003446846410201233.png',
          },
          {
            path: e.appNavigator.pagesMap.evaluate,
            title: '评价中心',
            icon: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102516004946839920201240.png',
          },
          {
            path: e.appNavigator.pagesMap['after-sales'],
            title: '售后服务',
            icon: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102516010035262140201233.png',
          },
          {
            path: p,
            title: '联系客服',
            icon: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102516011171761270201240.png',
          },
          {
            path: e.appNavigator.pagesMap.settings,
            title: '设置',
            icon: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102516013715127690201240.png',
          },
        ],
        d = (a) => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['product-order'], {
            query: { status: a },
          });
        };
      return (
        c({
          pageOnShow: () => {
            var e;
            n() && (null == (e = u.value) || e.pageOnShow(), g());
          },
          pageOnLoad: (a) => {
            console.log('pageOnload', a);
            const t = e.index.getStorageSync('avatarUrl');
            t && (s.value = t);
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, r) => {
          var c, i;
          return {
            a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102515295426259830201233.png',
            b: s.value,
            c: e.o(l),
            d: e.o(h),
            e: e.t(null == (c = e.unref(o)) ? void 0 : c.userName),
            f: e.t(
              e.unref(e.encryptPhone)(
                null == (i = e.unref(o)) ? void 0 : i.phone
              )
            ),
            g: t,
            h: t,
            i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102515563820856020201233.png',
            j: e.o((e) => d('all')),
            k: e.f(m.value, (a, t, p) =>
              e.e(
                {
                  a: e.t(a.number),
                  b: e.t(a.title),
                  c: e.o((e) => d(a.key), a.title),
                  d: t !== m.value.length - 1,
                },
                (m.value.length, {}),
                { e: a.title }
              )
            ),
            l: t,
            m: t,
            n: e.f(v, (a, t, r) =>
              e.e(
                { a: a.path === p },
                a.path === p
                  ? { b: a.icon, c: e.t(a.title) }
                  : {
                      d: a.icon,
                      e: e.t(a.title),
                      f: e.o(
                        (t) => e.unref(e.appNavigator).navigateTo(a.path),
                        a.title
                      ),
                    },
                { g: a.title }
              )
            ),
          };
        }
      );
    },
  }),
  c = e._export_sfc(r, [['__scopeId', 'data-v-e9e87d41']]);
wx.createComponent(c);
