'use strict';
const t = require('../../../../../../common/vendor.js'),
  e = {
    color: { type: String, default: '#FFF' },
    callDuration: { type: String, default: '' },
    fontSize: { type: String, default: '16px' },
  },
  o = t.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Timer',
    props: e,
    setup(e) {
      const o = e,
        n = t.computed(() => ({ color: o.color, fontSize: o.fontSize }));
      return (e, o) => ({ a: t.t(e.callDuration), b: t.s(t.unref(n)) });
    },
  });
wx.createComponent(o);
