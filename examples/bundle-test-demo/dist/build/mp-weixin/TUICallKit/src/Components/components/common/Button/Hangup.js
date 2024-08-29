'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../../../../TUICallService/index.js'),
  n = require('./props/Button.js'),
  o = require('./hooks/useConfig.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const i = require('../../../hooks/useIsClickableContext.js'),
  r = require('../../../../TUICallService/locales/index.js');
Math || (s + u)();
const s = () => '../../base/Button/Button.js',
  u = () => '../../base/TKText/TKText.js',
  a = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Hangup',
    props: n.ButtonProps,
    setup(n) {
      const s = n,
        u = i.useIsClickableContext(),
        a = e.computed(() => (u.value ? 'basicConfig' : 'loadingConfig')),
        c = o.useBtnConfig('hangup', a),
        l = async () => {
          await t.TUICallKitServer.hangup();
        };
      return (t, n) =>
        e.e(
          {
            a: e.o(l),
            b: e.p({
              loading: !e.unref(u),
              loadingWidth: e.unref(c).loadingWidth,
              loadingHeight: e.unref(c).loadingHeight,
              iconSrc: e.unref(c).iconSrc,
              color: e.unref(c).color,
              iconSize: s.iconSize || e.unref(c).iconSize,
              width: s.width || e.unref(c).width,
              height: s.height || e.unref(c).height,
              shape: e.unref(c).shape,
            }),
            c: e.unref(c).showText,
          },
          e.unref(c).showText
            ? {
                d: e.t(e.unref(r.t)('hangup')),
                e: e.p({
                  textStyle: e.unref(c).textStyle,
                  color: e.unref(c).textColor,
                  size: e.unref(c).textSize,
                }),
              }
            : {}
        );
    },
  }),
  c = e._export_sfc(a, [['__scopeId', 'data-v-202d477d']]);
wx.createComponent(c);
