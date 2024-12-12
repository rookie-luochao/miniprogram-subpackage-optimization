'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../../../../TUICallService/index.js'),
  r = require('./hooks/useConfig.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const o = require('../../../hooks/useTranslate.js'),
  n = require('./props/Button.js');
Math || (s + i)();
const s = () => '../../base/Button/Button.js',
  i = () => '../../base/TKText/TKText.js',
  u = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Reject',
    props: n.ButtonProps,
    setup(n) {
      const s = n,
        i = r.useBtnConfig('reject', e.ref('basicConfig')),
        u = o.useTranslate(),
        c = async () => {
          await t.TUICallKitServer.reject();
        };
      return (t, r) =>
        e.e(
          {
            a: e.o(c),
            b: e.p({
              iconSrc: e.unref(i).iconSrc,
              color: e.unref(i).color,
              iconSize: e.unref(i).iconSize,
              width: s.width || e.unref(i).width,
              height: s.height || e.unref(i).height,
              shape: e.unref(i).shape,
            }),
            c: e.unref(i).showText,
          },
          e.unref(i).showText
            ? {
                d: e.t(e.unref(u)('reject')),
                e: e.p({
                  textStyle: e.unref(i).textStyle,
                  color: e.unref(i).textColor,
                  size: e.unref(i).textSize,
                }),
              }
            : {}
        );
    },
  }),
  c = e._export_sfc(u, [['__scopeId', 'data-v-01790459']]);
wx.createComponent(c);
