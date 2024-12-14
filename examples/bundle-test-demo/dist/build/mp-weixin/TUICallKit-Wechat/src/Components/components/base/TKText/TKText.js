'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../constants/index.js'),
  i = require('../util/classNames.js');
require('../util/checkEnv.js');
const n = require('../util/filterObject.js'),
  r = {
    width: { type: String },
    color: { type: String },
    size: { type: String },
    weight: { type: Number },
    truncated: { type: Boolean, default: !1 },
    lineClamp: { type: Number },
    textStyle: { type: Object },
  },
  l = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'TKText',
    props: r,
    emits: ['click'],
    setup(r, { emit: l }) {
      const o = r,
        s = l,
        c = i.classNames([
          `${t.PREFIX}-text`,
          { [`${t.PREFIX}-text--line-clamp`]: o.lineClamp },
        ]),
        u = e.computed(() =>
          n.filterObject({
            maxWidth: o.width,
            fontSize: o.size,
            fontWeight: o.weight,
            color: o.color,
            textOverflow: o.truncated ? 'ellipsis' : 'auto',
            '-webkit-line-clamp': o.lineClamp,
            ...o.textStyle,
          })
        ),
        a = () => {
          s('click');
        };
      return (t, i) => ({ a: e.n(e.unref(c)), b: e.s(e.unref(u)), c: e.o(a) });
    },
  });
wx.createComponent(l);
