'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = e.defineComponent({
    __name: 'index',
    setup(o, { expose: n }) {
      const s = e.ref('');
      return (
        n({
          pageOnLoad: async (e) => {
            console.log(e), (s.value = e.url);
          },
        }),
        (e, o) => ({ a: s.value })
      );
    },
  }),
  n = e._export_sfc(o, [['__scopeId', 'data-v-4f1b0b0d']]);
wx.createComponent(n);
