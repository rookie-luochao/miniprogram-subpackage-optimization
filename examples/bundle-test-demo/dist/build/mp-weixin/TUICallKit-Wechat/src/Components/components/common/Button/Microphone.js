'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../../../../TUICallService/index.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const n = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  r = require('../../../hooks/usePopover.js'),
  i = require('../../../hooks/useTranslate.js'),
  t = require('./props/Button.js'),
  u = require('./hooks/useConfig.js'),
  s = require('../../../../TUICallService/CallService/index.js');
Math || (l + a)();
const l = () => '../../base/Button/Button.js',
  a = () => '../../base/TKText/TKText.js',
  c = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Microphone',
    props: t.ButtonProps,
    setup(t) {
      const l = s.TUIGlobal.isPC,
        a = e.ref(!0),
        { localUserInfoExcludeVolume: c } = e.toRefs(
          n.useUserInfoExcludeVolumeContext()
        );
      r.usePopover();
      const d = e.computed(() =>
          a.value
            ? (null == c ? void 0 : c.value.isAudioAvailable)
              ? 'basicConfig'
              : 'closedConfig'
            : 'loadingConfig'
        ),
        f = u.useBtnConfig('microphone', d),
        h = i.useTranslate(),
        p = e.computed(() =>
          (null == c ? void 0 : c.value.isAudioAvailable)
            ? h.value('microphone enabled')
            : h.value('microphone disabled')
        ),
        v = async () => {
          (null == c ? void 0 : c.value.isAudioAvailable)
            ? await o.TUICallKitServer.closeMicrophone()
            : await o.TUICallKitServer.openMicrophone();
        };
      return (o, n) =>
        e.e(
          { a: !e.unref(l) },
          e.unref(l)
            ? {}
            : {
                b: e.o(v),
                c: e.p({
                  loading: !e.unref(a),
                  iconSrc: e.unref(f).iconSrc,
                  color: e.unref(f).color,
                  iconSize: e.unref(f).iconSize,
                  width: e.unref(f).width,
                  height: e.unref(f).height,
                  loadingWidth: e.unref(f).loadingWidth,
                  loadingHeight: e.unref(f).loadingHeight,
                  shape: e.unref(f).shape,
                }),
              },
          { d: e.unref(f).showText },
          e.unref(f).showText
            ? {
                e: e.t(e.unref(p)),
                f: e.p({
                  textStyle: e.unref(f).textStyle,
                  color: e.unref(f).textColor,
                  size: e.unref(f).textSize,
                }),
              }
            : {}
        );
    },
  }),
  d = e._export_sfc(c, [['__scopeId', 'data-v-e33c8822']]);
wx.createComponent(d);
