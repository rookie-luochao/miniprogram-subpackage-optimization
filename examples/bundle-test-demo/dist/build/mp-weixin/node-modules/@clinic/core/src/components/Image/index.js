'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = e.defineComponent({
    __name: 'index',
    props: { src: {}, mode: {}, customStyle: {} },
    setup(o) {
      const c = e.ref(!1),
        s = () => {
          c.value = !0;
        };
      return (o, t) => ({
        a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111918550087693160201233.svg',
        b: c.value ? 'none' : 'flex',
        c: o.src,
        d: o.mode,
        e: e.o(s),
        f: e.s(o.customStyle),
      });
    },
  }),
  c = e._export_sfc(o, [['__scopeId', 'data-v-a40fc6a3']]);
wx.createComponent(c);
