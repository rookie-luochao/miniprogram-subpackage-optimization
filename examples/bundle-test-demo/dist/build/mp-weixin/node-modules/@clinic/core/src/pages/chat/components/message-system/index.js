'use strict';
const e = require('../../../../../../../../common/vendor.js'),
  t = e.defineComponent({
    __name: 'index',
    props: { message: {} },
    setup(t) {
      const s = t,
        n = e.ref(null);
      return (
        e.watch(
          () => s.message,
          () => {
            n.value = e.parseSystem(s.message);
          },
          { deep: !0, immediate: !0 }
        ),
        (t, s) => {
          var a;
          return { a: e.t(null == (a = n.value) ? void 0 : a.text) };
        }
      );
    },
  }),
  s = e._export_sfc(t, [['__scopeId', 'data-v-d2cb7bb7']]);
wx.createComponent(s);
