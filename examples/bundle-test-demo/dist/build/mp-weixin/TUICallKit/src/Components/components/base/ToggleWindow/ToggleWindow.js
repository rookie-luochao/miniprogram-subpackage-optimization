'use strict';
const o = require('../../../../../../common/vendor.js'),
  e = require('./constant.js'),
  t = require('../constants/index.js'),
  i = {
    bigWindow: { type: String },
    showSmallWindow: { type: Boolean, default: !0 },
    smallWindowWidth: { type: String, default: '30%' },
    smallWindowHeight: { type: String, default: '30%' },
  },
  n = o.defineComponent({
    options: { virtualHost: !0 },
    __name: 'ToggleWindow',
    props: i,
    emits: ['toggle'],
    setup(i, { emit: n }) {
      const l = i,
        d = n,
        s = o.ref(l.bigWindow),
        w = `${t.PREFIX}-toggle-window`;
      return (
        o.watch(
          () => l.bigWindow,
          () => {
            s.value = l.bigWindow;
          }
        ),
        o.provide(e.ToggleWindowContextKey, {
          bigWindow: s,
          toggleWindow: (o) => {
            (s.value = o), d('toggle', o);
          },
          smallWindowWidth: o.toRef(l, 'smallWindowWidth'),
          smallWindowHeight: o.toRef(l, 'smallWindowHeight'),
          showSmallWindow: o.toRef(l, 'showSmallWindow'),
        }),
        (e, t) => ({ a: o.n(w) })
      );
    },
  });
wx.createComponent(n);
