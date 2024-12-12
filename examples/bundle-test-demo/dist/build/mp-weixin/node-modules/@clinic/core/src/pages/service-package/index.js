'use strict';
const e = require('../../../../../../common/vendor.js');
Math || o();
const o = () => '../../components/Navbar/index.js',
  n = e.defineComponent({
    __name: 'index',
    setup: (o, { expose: n }) => (
      n({
        pageOnShow: () => {
          console.log('pageOnShow');
        },
        pageOnLoad: (e) => {
          console.log('pageOnload', e);
        },
        pageOnHide: () => {
          console.log('pageOnHide');
        },
      }),
      (o, n) => ({
        a: e.sr('navbarRef', '0fb2daca-0'),
        b: e.p({ title: '服务包' }),
      })
    ),
  }),
  a = e._export_sfc(n, [['__scopeId', 'data-v-0fb2daca']]);
wx.createComponent(a);
