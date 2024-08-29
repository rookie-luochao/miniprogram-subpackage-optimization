'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = e.defineComponent({
    __name: 'index',
    setup: (e, { expose: o }) => (
      o({
        pageOnShow: () => {
          console.log('pageOnShow');
        },
      }),
      (e, o) => ({
        a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717333982154340201240.png',
        b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717343840950020201233.png',
      })
    ),
  }),
  c = e._export_sfc(o, [['__scopeId', 'data-v-76d95baf']]);
wx.createComponent(c);
