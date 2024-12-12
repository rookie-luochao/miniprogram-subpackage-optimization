'use strict';
const e = require('../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    props: { tabs: {}, activeTab: {} },
    emits: ['update:activeTab', 'change'],
    setup(a, { emit: t }) {
      const c = a,
        n = t,
        s = e.computed(() => 100 / c.tabs.length),
        o = e.computed(
          () =>
            `calc(${c.tabs.findIndex((e) => e.value === c.activeTab) * s.value}% + ${s.value / 2}% - 8px)`
        );
      return (a, t) => ({
        a: e.f(c.tabs, (t, s, o) => ({
          a: e.t(t.title),
          b: a.activeTab === t.value ? 1 : '',
          c: s,
          d: e.o(
            (e) =>
              ((e) => {
                n('update:activeTab', c.tabs[e].value),
                  n('change', c.tabs[e], e);
              })(s),
            s
          ),
        })),
        b: `${s.value}%`,
        c: `${o.value}`,
      });
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-a0f23641']]);
wx.createComponent(t);
