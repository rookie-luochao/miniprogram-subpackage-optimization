'use strict';
const e = require('../../../../../../../common/vendor.js'),
  t = require('../../util/classNames.js');
require('../../util/checkEnv.js');
const n = require('../constant.js'),
  s = require('../../constants/index.js'),
  u = {
    span: { type: Number, default: 24 },
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
      default: 'middle',
    },
    offset: { type: Number, default: 0 },
  },
  r = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Col',
    props: u,
    setup(u) {
      const r = u,
        { gutter: o } = e.inject(n.RowContextKey, {
          gutter: e.computed(() => 0),
        }),
        a = t.classNames([
          `${s.PREFIX}-col`,
          `${s.PREFIX}-justify-${r.justify}`,
          `${s.PREFIX}-align-${r.align}`,
        ]),
        c = e.computed(() => (r.span / 24) * 100 + '%'),
        i = e.computed(() => (r.offset / 24) * 100 + '%'),
        p = e.computed(() => o.value / 2 + 'px'),
        l = p;
      return (t, n) => ({
        a: e.n(e.unref(a)),
        b: e.unref(c),
        c: e.unref(i),
        d: e.unref(p),
        e: e.unref(l),
      });
    },
  });
wx.createComponent(r);
