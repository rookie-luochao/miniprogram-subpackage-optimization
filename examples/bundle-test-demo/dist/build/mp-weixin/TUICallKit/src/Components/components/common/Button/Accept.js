'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../../../../TUICallService/index.js'),
  o = require('./props/Button.js'),
  n = require('./hooks/useConfig.js'),
  i = require('../../../../TUICallService/locales/index.js');
Math || (r + u)();
const r = () => '../../base/Button/Button.js',
  u = () => '../../base/TKText/TKText.js',
  c = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Accept',
    props: o.ButtonProps,
    setup(o) {
      const r = e.ref(!0),
        u = o,
        c = e.computed(() => (r.value ? 'basicConfig' : 'loadingConfig')),
        s = n.useBtnConfig('accept', c),
        a = async () => {
          (r.value = !1), await t.TUICallKitServer.accept(), (r.value = !0);
        };
      return (t, o) =>
        e.e(
          {
            a: e.o(a),
            b: e.p({
              iconSrc: e.unref(s).iconSrc,
              color: e.unref(s).color,
              iconSize: u.iconSize || e.unref(s).iconSize,
              width: u.width || e.unref(s).width,
              height: u.height || e.unref(s).height,
              shape: e.unref(s).shape,
              loading: !e.unref(r),
              loadingWidth: e.unref(s).loadingWidth,
              loadingHeight: e.unref(s).loadingHeight,
            }),
            c: e.unref(s).showText,
          },
          e.unref(s).showText
            ? {
                d: e.t(e.unref(i.t)('accept')),
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
  s = e._export_sfc(c, [['__scopeId', 'data-v-ee0612fe']]);
wx.createComponent(s);
