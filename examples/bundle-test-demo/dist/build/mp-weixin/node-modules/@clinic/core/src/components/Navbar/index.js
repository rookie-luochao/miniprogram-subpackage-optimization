'use strict';
const e = require('../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    props: {
      title: { default: '便民门诊' },
      isShowTitle: { type: Boolean, default: !0 },
      backLeft: { default: 12 },
    },
    setup(a, { expose: t }) {
      const { customNavbarHeight: o, statusBarHeight: p } = e.useNavSize(),
        c = e.ref(!1),
        l = e.computed(() => ({
          height: `${o.value + p.value}px`,
          paddingTop: `${p.value}px`,
        })),
        u = e.computed(() =>
          c.value
            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071618085440740760201233.png'
            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071618093030673350201233.png'
        ),
        s = () => {
          e.appNavigator.navigateBack();
        };
      return (
        t({
          pageOnScroll: (e) => {
            c.value = e.scrollTop > 80;
          },
        }),
        (a, t) =>
          e.e(
            {
              a: u.value,
              b: a.backLeft + 'px',
              c: e.o(s),
              d: a.isShowTitle || c.value,
            },
            a.isShowTitle || c.value ? { e: e.t(a.title) } : {},
            {
              f: e.n(c.value ? 'navbar-scroll' : 'navbar-default'),
              g: e.s(l.value),
            }
          )
      );
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-e288ed9a']]);
wx.createComponent(t);
