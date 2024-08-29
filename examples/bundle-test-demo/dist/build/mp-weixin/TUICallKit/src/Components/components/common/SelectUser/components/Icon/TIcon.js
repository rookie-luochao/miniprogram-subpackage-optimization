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
        n = t,
        o = () => {
          p('click');
        };
      return (t, i) =>
        e.e(
          { a: n.isApp },
          n.isApp
            ? { b: n.file, c: n.width, d: n.height }
            : { e: n.file, f: n.width, g: n.height },
          { h: e.o(o) }
        );
    },
  }),
  i = e._export_sfc(t, [['__scopeId', 'data-v-ce5f868e']]);
wx.createComponent(i);
