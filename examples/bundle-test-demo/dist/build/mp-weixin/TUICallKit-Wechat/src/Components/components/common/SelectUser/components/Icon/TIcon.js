'use strict';
const e = require('../../../../../../../../common/vendor.js'),
  t = e.defineComponent({
    __name: 'TIcon',
    props: {
      file: { type: String, default: '' },
      width: { type: String, default: '20px' },
      height: { type: String, default: '20px' },
      isApp: { type: Boolean, default: !1 },
    },
    emits: ['click'],
    setup(t, { emit: i }) {
      const p = i,
        c = t,
        n = () => {
          p('click');
        };
      return (t, i) =>
        e.e(
          { a: c.isApp },
          c.isApp
            ? { b: c.file, c: c.width, d: c.height }
            : { e: c.file, f: c.width, g: c.height },
          { h: e.o(n) }
        );
    },
  }),
  i = e._export_sfc(t, [['__scopeId', 'data-v-f1211ccc']]);
wx.createComponent(i);
