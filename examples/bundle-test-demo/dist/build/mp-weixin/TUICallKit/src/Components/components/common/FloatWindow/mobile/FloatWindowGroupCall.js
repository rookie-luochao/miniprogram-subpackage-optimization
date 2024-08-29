'use strict';
const e = require('../../../../../../../common/vendor.js'),
  o = require('../../../../../TUICallService/index.js');
require('../../../../../TUICallService/const/index.js');
const r = require('../../../../hooks/useCallInfoContext.js');
require('../../../../util/stringToPath.js');
const t = require('../../../../hooks/useUserInfoContextExcludeVolume.js'),
  l = require('../../../../hooks/useCallDuration.js'),
  s = require('../../../../hooks/useFloatWindowContext.js'),
  a = require('../../../base/util/classNames.js'),
  u = require('../../../../../../../common/assets.js'),
  n = require('../../../../../TUICallService/locales/index.js'),
  i = require('../../../../../TUICallService/const/call.js');
Math || (c + f + C)();
const c = () => '../../../base/TKImage/TKImage.js',
  f = () => '../../Timer/Timer.js',
  C = () => '../../../base/TKText/TKText.js',
  p = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'FloatWindowGroupCall',
    setup(c) {
      const { isFloatWindow: f } = e.toRefs(s.useFloatWindowContext()),
        { callDuration: C } = l.useCallDuration(),
        { localUserInfoExcludeVolume: p } = e.toRefs(
          t.useUserInfoExcludeVolumeContext()
        ),
        { callStatus: d } = e.toRefs(r.useCallInfoContext()),
        m = e.computed(() =>
          p.value.isAudioAvailable ? u.microphoneOpenSrc : u.microphoneCloseSrc
        ),
        x = e.computed(() =>
          p.value.isVideoAvailable ? u.cameraOpenSrc : u.cameraCloseSrc
        ),
        h = e.computed(() =>
          a.classNames([
            'groupcall-video-float',
            { 'not-float': !f.value, float: f.value },
          ])
        );
      function j() {
        f.value && o.TUICallKitServer.toggleMinimize();
      }
      return (o, r) =>
        e.e(
          { a: e.unref(f) },
          e.unref(f) ? { b: e.o(j) } : {},
          {
            c: e.p({
              width: '36px',
              height: '36px',
              src: e.unref(u.earphoneSrc),
            }),
            d: e.unref(d) === e.unref(i.CallStatus).CONNECTED,
          },
          e.unref(d) === e.unref(i.CallStatus).CONNECTED
            ? {
                e: e.p({
                  fontSize: '12px',
                  callDuration: e.unref(C),
                  color: '#12b969',
                }),
              }
            : {},
          { f: e.unref(d) === e.unref(i.CallStatus).CALLING },
          e.unref(d) === e.unref(i.CallStatus).CALLING
            ? {
                g: e.t(e.unref(n.t)('wait to be called')),
                h: e.p({ size: '12px', color: '#12b969' }),
              }
            : {},
          {
            i: e.unref(f),
            j: e.p({ width: '16px', height: '16px', src: e.unref(m) }),
            k: e.p({ width: '16px', height: '16px', src: e.unref(x) }),
            l: e.unref(f),
            m: e.n(e.unref(h)),
          }
        );
    },
  }),
  d = e._export_sfc(p, [['__scopeId', 'data-v-6753ead5']]);
wx.createComponent(d);
