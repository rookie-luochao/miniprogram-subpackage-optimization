'use strict';
const p = require('../../../../../../common/vendor.js'),
  t =
    'https://com-shuibei-peach-pharmacy-cs.100cbc.com/rp/21030410325655262692822001/24030714023224393830201253.png',
  a = p.defineComponent({
    __name: 'index',
    setup(a, { expose: e }) {
      const o = [
          {
            icon: 'http://hospital-test-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24012411250858133840201065.png',
            title: '健康档案',
            path: p.appNavigator.pagesMap['health-records'],
          },
          {
            icon: 'http://hospital-test-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24012411250883956850201065.png',
            title: '就诊人管理',
            path: p.appNavigator.pagesMap.patient,
          },
          {
            icon: 'http://hospital-test-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24012411250895432310201065.png',
            title: '设置',
            path: p.appNavigator.pagesMap.settings,
          },
        ],
        c = p.useUserInfoStore(),
        { userInfo: i } = p.storeToRefs(c),
        n = (t) => {
          p.appNavigator.navigateTo(t);
        };
      return (
        e({
          pageOnShow: () => {
            if (!p.index.getStorageSync('token'))
              return (
                p.index.showToast({
                  title: '未登录，请先登录',
                  icon: 'none',
                  mask: !0,
                }),
                void setTimeout(() => {
                  p.index.hideToast(),
                    p.appNavigator.navigateTo(p.appNavigator.pagesMap.login);
                }, 1500)
              );
          },
        }),
        (a, e) => {
          var c;
          return {
            a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717504129610380201240.png',
            b: p.t(
              p.unref(p.encryptPhone)(
                null == (c = p.unref(i)) ? void 0 : c.phone
              )
            ),
            c: 'https://com-shuibei-peach-pharmacy-cs.100cbc.com/rp/21030410325655262692822001/24030711364848859340201253.png',
            d: p.o((t) => n(p.unref(p.appNavigator).pagesMap['inquiry-order'])),
            e: 'https://com-shuibei-peach-pharmacy-cs.100cbc.com/rp/21030410325655262692822001/24030711370616862240201253.png',
            f: p.o((t) => n(p.unref(p.appNavigator).pagesMap.prescription)),
            g: p.f(o, (t, a, e) => ({
              a: t.icon,
              b: p.t(t.title),
              c: t.path,
              d: p.o((p) => n(t.path), t.path),
            })),
            h: t,
            i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692824465/24081416063609317740201240.png',
            j: t,
          };
        }
      );
    },
  }),
  e = p._export_sfc(a, [['__scopeId', 'data-v-8d0c3635']]);
wx.createComponent(e);
