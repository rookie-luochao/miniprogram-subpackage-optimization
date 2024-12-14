'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = e.defineComponent({
    __name: 'index',
    props: { footer: { type: Boolean, default: !0 } },
    setup(o) {
      const t = o,
        n = e.computed(() =>
          t.footer
            ? { paddingBottom: '11px', borderBottom: '1px solid #eeeeee' }
            : { paddingBottom: 0 }
        );
      return (o, r) => e.e({ a: e.s(n.value), b: t.footer }, (t.footer, {}));
    },
  }),
  t = e._export_sfc(o, [['__scopeId', 'data-v-66f3b0af']]);
wx.createComponent(t);
