'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../../../../TUICallService/index.js'),
  r = require('./hooks/useConfig.js'),
  o = require('./props/Button.js'),
  n = require('../../../../TUICallService/locales/index.js');
Math || (i + s)();
const i = () => '../../base/Button/Button.js',
  s = () => '../../base/TKText/TKText.js',
  c = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Reject',
    props: o.ButtonProps,
    setup(o) {
      const i = o,
        s = r.useBtnConfig('reject', e.ref('basicConfig')),
        c = async () => {
          await t.TUICallKitServer.reject();
        };
      return (t, r) =>
        e.e(
          {
            a: e.o(c),
            b: e.p({
              iconSrc: e.unref(s).iconSrc,
              color: e.unref(s).color,
              iconSize: e.unref(s).iconSize,
              width: i.width || e.unref(s).width,
              height: i.height || e.unref(s).height,
              shape: e.unref(s).shape,
            }),
            c: e.unref(s).showText,
          },
          e.unref(s).showText
            ? {
                d: e.t(e.unref(n.t)('reject')),
                e: e.p({
                  textStyle: e.unref(s).textStyle,
                  color: e.unref(s).textColor,
                  size: e.unref(s).textSize,
                }),
              }
            : {}
        );
    },
  }),
  u = e._export_sfc(c, [['__scopeId', 'data-v-f64269a7']]);
wx.createComponent(u);
