'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../../../../TUICallService/index.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const i = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  n = require('../../../hooks/usePopover.js'),
  r = require('./props/Button.js'),
  t = require('./hooks/useConfig.js'),
  l = require('../../../../TUICallService/CallService/index.js'),
  u = require('../../../../TUICallService/locales/index.js');
Math || (s + a)();
const s = () => '../../base/Button/Button.js',
  a = () => '../../base/TKText/TKText.js',
  c = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Microphone',
    props: r.ButtonProps,
    setup(r) {
      const s = l.TUIGlobal.isPC,
        a = e.ref(!0),
        { localUserInfoExcludeVolume: c } = e.toRefs(
          i.useUserInfoExcludeVolumeContext()
        );
      n.usePopover();
      const d = e.computed(() =>
          a.value
            ? (null == c ? void 0 : c.value.isAudioAvailable)
              ? 'basicConfig'
              : 'closedConfig'
            : 'loadingConfig'
        ),
        f = t.useBtnConfig('microphone', d),
        p = e.computed(() =>
          (null == c ? void 0 : c.value.isAudioAvailable)
            ? u.t('microphone enabled')
            : u.t('microphone disabled')
        ),
        h = async () => {
          (null == c ? void 0 : c.value.isAudioAvailable)
            ? await o.TUICallKitServer.closeMicrophone()
            : await o.TUICallKitServer.openMicrophone();
        };
      return (o, i) =>
        e.e(
          { a: !e.unref(s) },
          e.unref(s)
            ? {}
            : {
                b: e.o(h),
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
  d = e._export_sfc(c, [['__scopeId', 'data-v-ffcd0792']]);
wx.createComponent(d);
