'use strict';
const e = require('../../../../../../common/vendor.js'),
  c = e.defineComponent({
    __name: 'index',
    setup: (e, { expose: c }) => (
      c({
        pageOnLoad: (e) => {
          console.log(e);
        },
        pageOnShow: () => {
          console.log('pageOnShow');
        },
      }),
      (e, c) => ({
        a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082715050678127620201233.png',
        b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082714303357865670201233.png',
        c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24061416540101970590201233.png',
      })
    ),
  }),
  o = e._export_sfc(c, [['__scopeId', 'data-v-736f41da']]);
wx.createComponent(o);
