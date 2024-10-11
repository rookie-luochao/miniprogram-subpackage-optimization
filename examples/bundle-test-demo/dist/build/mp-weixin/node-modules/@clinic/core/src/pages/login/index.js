'use strict';
const e = require('../../../../../../common/vendor.js');
Math || n();
const n = () => './components/mp-weixin/index.js',
  a = e.defineComponent({
    __name: 'index',
    setup(n, { expose: a }) {
      const l = e.ref(null),
        o = e.ref(null),
        u = e.ref(null),
        t = e.ref(null),
        r = (e, n) => {
          var a;
          null == (a = t.value) || a.init({ userID: e, userSig: n });
        };
      return (
        a({
          pageOnLoad: (n) => {
            n && (t.value = n),
              e.nextTick$1(() => {
                var e, n, a;
                null == (e = l.value) || e.pageOnLoad(),
                  null == (n = o.value) || n.pageOnLoad(),
                  null == (a = u.value) || a.pageOnLoad();
              });
          },
        }),
        (n, a) => ({
          a: e.sr(u, '06d19484-0', { k: 'weixinRef' }),
          b: e.p({ 'init-tcsdk': r }),
        })
      );
    },
  }),
  l = e._export_sfc(a, [['__scopeId', 'data-v-06d19484']]);
wx.createComponent(l);
