'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../util/checkEnv.js'),
  t = require('../util/checkVueVersion.js'),
  r = {
    disabled: { type: Boolean, default: !1 },
    to: { type: String, default: 'body' },
    source: { type: String, default: 'body' },
  };
Math || n();
const n = () => './miniprogram/Portal.js',
  s = e.defineComponent({
    __name: 'Portal',
    props: r,
    setup(r) {
      const { majorVersion: n } = t.checkVueVersion();
      return (
        e.computed(() => '3' === n),
        e.computed(() => '2' === n),
        (t, r) =>
          e.e(
            { a: e.unref(o.IN_MINI_APP) },
            e.unref(o.IN_MINI_APP) ? { b: e.p({ disabled: t.disabled }) } : {}
          )
      );
    },
  });
wx.createComponent(s);
