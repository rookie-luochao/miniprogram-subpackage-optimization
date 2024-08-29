'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../../../../TUICallService/index.js'),
  o = require('./hooks/useConfig.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const r = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  n = require('../../../../TUICallService/locales/index.js');
Math || (i + s)();
const i = () => '../../base/Button/Button.js',
  s = () => '../../base/TKText/TKText.js',
  u = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'SwitchCamera',
    setup(i) {
      const { localUserInfoExcludeVolume: s } = e.toRefs(
          r.useUserInfoExcludeVolumeContext()
        ),
        u = e.computed(() => (null == s ? void 0 : s.value.isVideoAvailable)),
        c = e.computed(() => (u.value ? 'basicConfig' : 'disableConfig')),
        l = o.useBtnConfig('switchCamera', c),
        a = async () => {
          u.value && (await t.TUICallKitServer.switchCamera());
        };
      return (t, o) =>
        e.e(
          {
            a: e.o(a),
            b: e.p({
              iconSrc: e.unref(l).iconSrc,
              iconSize: e.unref(l).iconSize,
              color: e.unref(l).color,
              width: e.unref(l).width,
              height: e.unref(l).height,
              buttonStyle: e.unref(l).buttonStyle,
              shape: 'circle',
            }),
            c: e.unref(l).showText,
          },
          e.unref(l).showText
            ? {
                d: e.t(e.unref(n.t)('switch camera')),
                e: e.p({
                  textStyle: e.unref(l).textStyle,
                  color: e.unref(l).textColor,
                  size: e.unref(l).textSize,
                }),
              }
            : {}
        );
    },
  }),
  c = e._export_sfc(u, [['__scopeId', 'data-v-5c4f2515']]);
wx.createComponent(c);
