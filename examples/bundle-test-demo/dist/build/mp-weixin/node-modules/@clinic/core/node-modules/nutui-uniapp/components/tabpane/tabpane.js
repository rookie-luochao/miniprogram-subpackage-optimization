'use strict';
const e = require('../../../../../../../common/vendor.js'),
  n = `${e.PREFIX}-tab-pane`,
  t = e.defineComponent({
    name: n,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  a = e.defineComponent({
    ...t,
    props: e.tabpaneProps,
    emits: e.tabpaneEmits,
    setup(t) {
      const a = t,
        { parent: o } = e.useInject(e.TAB_KEY),
        i = e.computed(() => {
          const n = {
            display:
              0 === (null == o ? void 0 : o.animatedTime.value) &&
              a.paneKey !== o.activeKey.value
                ? 'none'
                : void 0,
          };
          return e.getMainStyle(a, n);
        }),
        s = e.computed(() =>
          e.getMainClass(a, n, {
            inactive:
              String(a.paneKey) !== (null == o ? void 0 : o.activeKey.value) &&
              (null == o ? void 0 : o.autoHeight.value),
          })
        );
      return (n, t) => ({ a: e.s(i.value), b: e.n(s.value) });
    },
  });
wx.createComponent(a);
