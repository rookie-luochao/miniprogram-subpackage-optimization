'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = e.defineComponent({
    __name: 'index',
    props: { emptyIcon: {}, title: {}, subTitle: {}, top: { default: 102 } },
    setup: (t) => (t, o) => ({
      a: t.emptyIcon,
      b: e.t(t.title),
      c: e.t(t.subTitle),
      d: 2 * Number(t.top) + 'rpx',
    }),
  }),
  o = e._export_sfc(t, [['__scopeId', 'data-v-27d8b021']]);
wx.createComponent(o);
