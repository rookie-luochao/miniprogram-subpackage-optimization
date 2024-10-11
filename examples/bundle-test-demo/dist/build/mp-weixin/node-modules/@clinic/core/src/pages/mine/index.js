'use strict';
const e = require('../../../../../../common/vendor.js'),
  t =
    'https://com-shuibei-peach-pharmacy-cs.100cbc.com/rp/21030410325655262692822001/24030714023224393830201253.png',
  p = e.defineComponent({
    __name: 'index',
    props: { isCustomerServiceCenter: { type: Boolean, default: !0 } },
    setup(p, { expose: a }) {
      const o = [
          {
            icon: 'http://hospital-test-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24012411250858133840201065.png',
            title: '健康档案',
            path: e.appNavigator.pagesMap['health-records'],
          },
          {
            icon: 'http://hospital-test-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24012411250883956850201065.png',
            title: '就诊人管理',
            path: e.appNavigator.pagesMap.patient,
          },
          {
            icon: 'http://hospital-test-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24012411250895432310201065.png',
            title: '设置',
            path: e.appNavigator.pagesMap.settings,
          },
        ],
        c = e.useUserInfoStore(),
        { userInfo: i } = e.storeToRefs(c),
        n = (t) => {
          e.appNavigator.navigateTo(t);
        };
      return (
        a({
          pageOnShow: () => {
            if (!e.index.getStorageSync('token'))
              return (
                e.index.showToast({
                  title: '未登录，请先登录',
                  icon: 'none',
                  mask: !0,
                }),
                void setTimeout(() => {
                  e.index.hideToast(),
                    e.appNavigator.navigateTo(e.appNavigator.pagesMap.login);
                }, 1500)
              );
          },
        }),
        (p, a) => {
          var c;
          return e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717504129610380201240.png',
              b: e.t(
                e.unref(e.encryptPhone)(
                  null == (c = e.unref(i)) ? void 0 : c.phone
                )
              ),
              c: 'https://com-shuibei-peach-pharmacy-cs.100cbc.com/rp/21030410325655262692822001/24030711364848859340201253.png',
              d: e.o((t) =>
                n(e.unref(e.appNavigator).pagesMap['inquiry-order'])
              ),
              e: 'https://com-shuibei-peach-pharmacy-cs.100cbc.com/rp/21030410325655262692822001/24030711370616862240201253.png',
              f: e.o((t) => n(e.unref(e.appNavigator).pagesMap.prescription)),
              g: e.f(o, (t, p, a) => ({
                a: t.icon,
                b: e.t(t.title),
                c: t.path,
                d: e.o((e) => n(t.path), t.path),
              })),
              h: t,
              i: p.isCustomerServiceCenter,
            },
            p.isCustomerServiceCenter
              ? {
                  j: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692824465/24081416063609317740201240.png',
                  k: t,
                }
              : {}
          );
        }
      );
    },
  }),
  a = e._export_sfc(p, [['__scopeId', 'data-v-2ac86e6d']]);
wx.createComponent(a);
