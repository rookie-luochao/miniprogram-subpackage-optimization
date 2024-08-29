'use strict';
const e = require('../../../../../../../common/vendor.js'),
  i = require('../constant.js'),
  t = require('../../util/classNames.js'),
  n = require('../../util/checkEnv.js'),
  o = require('../../constants/index.js'),
  l = { value: { type: String } },
  s = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'ToggleWindowItem',
    props: l,
    setup(l) {
      const s = l,
        {
          bigWindow: u,
          toggleWindow: a,
          smallWindowWidth: r,
          smallWindowHeight: d,
          showSmallWindow: m,
        } = e.inject(i.ToggleWindowContextKey),
        c = e.computed(() =>
          t.classNames([
            `${o.PREFIX}-toggle-window-item`,
            `${o.PREFIX}-toggle-window-item--${u.value === s.value ? 'big' : 'small'}`,
            { pc: n.IS_PC, mobile: !n.IS_PC },
          ])
        ),
        g = e.computed(() => {
          let e = {};
          return (
            u.value !== s.value &&
              ((e = { width: r.value, height: d.value }),
              m.value ? (e.visibility = '') : (e.visibility = 'hidden')),
            e
          );
        });
      return (i, t) => ({
        a: e.n(e.unref(c)),
        b: e.s(e.unref(g)),
        c: e.o(() => e.unref(a)(i.value)),
      });
    },
  });
wx.createComponent(s);
