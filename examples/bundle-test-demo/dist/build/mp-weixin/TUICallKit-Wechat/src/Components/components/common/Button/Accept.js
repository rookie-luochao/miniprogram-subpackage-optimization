'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../../../../TUICallService/index.js'),
  n = require('./props/Button.js'),
  o = require('./hooks/useConfig.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const r = require('../../../hooks/useTranslate.js');
Math || (i + s)();
const i = () => '../../base/Button/Button.js',
  s = () => '../../base/TKText/TKText.js',
  u = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Accept',
    props: n.ButtonProps,
    setup(n) {
      const i = e.ref(!0),
        s = n,
        u = e.computed(() => (i.value ? 'basicConfig' : 'loadingConfig')),
        a = o.useBtnConfig('accept', u),
        c = r.useTranslate(),
        l = async () => {
          (i.value = !1), await t.TUICallKitServer.accept(), (i.value = !0);
        };
      return (t, n) =>
        e.e(
          {
            a: e.o(l),
            b: e.p({
              iconSrc: e.unref(a).iconSrc,
              color: e.unref(a).color,
              iconSize: s.iconSize || e.unref(a).iconSize,
              width: s.width || e.unref(a).width,
              height: s.height || e.unref(a).height,
              shape: e.unref(a).shape,
              loading: !e.unref(i),
              loadingWidth: e.unref(a).loadingWidth,
              loadingHeight: e.unref(a).loadingHeight,
            }),
            c: e.unref(a).showText,
          },
          e.unref(a).showText
            ? {
                d: e.t(e.unref(c)('accept')),
                e: e.p({
                  textStyle: e.unref(a).textStyle,
                  color: e.unref(a).textColor,
                  size: e.unref(a).textSize,
                }),
              }
            : {}
        );
    },
  }),
  a = e._export_sfc(u, [['__scopeId', 'data-v-01523548']]);
wx.createComponent(a);
