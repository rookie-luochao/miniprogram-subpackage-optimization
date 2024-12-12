'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('../../../../TUICallService/index.js'),
  o = require('./hooks/useConfig.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const r = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  n = require('../../../hooks/useTranslate.js');
Math || (s + i)();
const s = () => '../../base/Button/Button.js',
  i = () => '../../base/TKText/TKText.js',
  u = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'SwitchCamera',
    setup(s) {
      const { localUserInfoExcludeVolume: i } = e.toRefs(
          r.useUserInfoExcludeVolumeContext()
        ),
        u = e.computed(() => (null == i ? void 0 : i.value.isVideoAvailable)),
        a = e.computed(() => (u.value ? 'basicConfig' : 'disableConfig')),
        c = o.useBtnConfig('switchCamera', a),
        l = n.useTranslate(),
        f = async () => {
          u.value && (await t.TUICallKitServer.switchCamera());
        };
      return (t, o) =>
        e.e(
          {
            a: e.o(f),
            b: e.p({
              iconSrc: e.unref(c).iconSrc,
              iconSize: e.unref(c).iconSize,
              color: e.unref(c).color,
              width: e.unref(c).width,
              height: e.unref(c).height,
              buttonStyle: e.unref(c).buttonStyle,
              shape: 'circle',
            }),
            c: e.unref(c).showText,
          },
          e.unref(c).showText
            ? {
                d: e.t(e.unref(l)('switch camera')),
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
  a = e._export_sfc(u, [['__scopeId', 'data-v-e59c8aea']]);
wx.createComponent(a);
