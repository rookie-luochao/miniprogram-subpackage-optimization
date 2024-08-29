'use strict';
const e = require('../../../../../../../common/vendor.js'),
  t = require('../../util/classNames.js');
require('../../util/checkEnv.js');
const s = require('../constant.js'),
  n = require('../../constants/index.js'),
  o = {
    gutter: { type: Number, default: 0 },
    justify: {
      type: String,
      values: [
        'start',
        'center',
        'end',
        'space-around',
        'space-between',
        'space-evenly',
      ],
      default: 'start',
    },
    align: {
      type: String,
      values: ['top', 'middle', 'bottom'],
      default: 'top',
    },
    customStyle: { type: Object, default: () => {} },
  },
  r = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Row',
    props: o,
    setup(o) {
      const r = o,
        u = e.computed(() => r.gutter);
      e.provide(s.RowContextKey, { gutter: u });
      const a = t.classNames([
        `${n.PREFIX}-row`,
        `${n.PREFIX}-justify-${r.justify}`,
        `${n.PREFIX}-align-${r.align}`,
      ]);
      return (t, s) => ({ a: e.n(e.unref(a)), b: e.s(t.customStyle) });
    },
  });
wx.createComponent(r);
