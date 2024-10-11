'use strict';
const e = require('../../../../../../common/vendor.js'),
  n = e.defineComponent({
    __name: 'index',
    setup(n, { expose: o }) {
      const t = e.ref('');
      return (
        o({
          pageOnLoad: async (e) => {
            t.value = e.url;
          },
        }),
        (e, n) => ({ a: t.value })
      );
    },
  }),
  o = e._export_sfc(n, [['__scopeId', 'data-v-427139bf']]);
wx.createComponent(o);
