'use strict';
const e = require('../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    props: {
      title: { default: '云门诊' },
      backLeft: { default: 12 },
      borderBottom: { type: Boolean, default: !0 },
      showTitleOnScroll: { type: Boolean, default: !1 },
      back: { type: Function, default: () => e.appNavigator.navigateBack() },
    },
    setup(a, { expose: t }) {
      const { customNavbarHeight: o, statusBarHeight: l } = e.useNavSize(),
        c = a,
        r = e.ref(!c.showTitleOnScroll),
        n = e.computed(() => ({
          height: `${o.value + l.value}px`,
          paddingTop: `${l.value}px`,
        }));
      return (
        t({
          pageOnScroll: (e) => {
            c.showTitleOnScroll && (r.value = e.scrollTop > 80);
          },
        }),
        (a, t) =>
          e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102810082858620320201233.png',
              b: a.backLeft + 'px',
              c: e.o((...e) => a.back && a.back(...e)),
              d: r.value,
            },
            r.value ? { e: e.t(a.title) } : {},
            {
              f: e.n(r.value ? 'navbar-scroll' : 'navbar-default'),
              g: e.s(n.value),
              h: a.borderBottom && '0.5px solid #e7e7e7;',
              i: r.value,
            },
            r.value ? { j: e.unref(o) + e.unref(l) + 'px' } : {}
          )
      );
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-e196d73d']]);
wx.createComponent(t);
