'use strict';
const e = require('../../../../../../../common/vendor.js'),
  o = require('../../../../../TUICallService/index.js');
require('../../../../../TUICallService/const/index.js');
const r = require('../../../../hooks/useCallInfoContext.js');
require('../../../../util/stringToPath.js');
const t = require('../../../../hooks/useUserInfoContextExcludeVolume.js'),
  s = require('../../../../hooks/useCallDuration.js'),
  l = require('../../../../hooks/useFloatWindowContext.js'),
  a = require('../../../../hooks/useTranslate.js'),
  u = require('../../../base/util/classNames.js'),
  n = require('../../../../../../../common/assets.js'),
  i = require('../../../../../TUICallService/const/call.js');
Math || (c + f + p)();
const c = () => '../../../base/TKImage/TKImage.js',
  f = () => '../../Timer/Timer.js',
  p = () => '../../../base/TKText/TKText.js',
  C = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'FloatWindowGroupCall',
    setup(c) {
      const { isFloatWindow: f } = e.toRefs(l.useFloatWindowContext()),
        { callDuration: p } = s.useCallDuration(),
        { localUserInfoExcludeVolume: C } = e.toRefs(
          t.useUserInfoExcludeVolumeContext()
        ),
        { callStatus: d } = e.toRefs(r.useCallInfoContext()),
        m = a.useTranslate(),
        x = e.computed(() =>
          C.value.isAudioAvailable ? n.microphoneOpenSrc : n.microphoneCloseSrc
        ),
        h = e.computed(() =>
          C.value.isVideoAvailable ? n.cameraOpenSrc : n.cameraCloseSrc
        ),
        T = e.computed(() =>
          u.classNames([
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
              src: e.unref(n.earphoneSrc),
            }),
            d: e.unref(d) === e.unref(i.CallStatus).CONNECTED,
          },
          e.unref(d) === e.unref(i.CallStatus).CONNECTED
            ? {
                e: e.p({
                  fontSize: '12px',
                  callDuration: e.unref(p),
                  color: '#12b969',
                }),
              }
            : {},
          { f: e.unref(d) === e.unref(i.CallStatus).CALLING },
          e.unref(d) === e.unref(i.CallStatus).CALLING
            ? {
                g: e.t(e.unref(m)('wait to be called')),
                h: e.p({ size: '12px', color: '#12b969' }),
              }
            : {},
          {
            i: e.unref(f),
            j: e.p({ width: '16px', height: '16px', src: e.unref(x) }),
            k: e.p({ width: '16px', height: '16px', src: e.unref(h) }),
            l: e.unref(f),
            m: e.n(e.unref(T)),
          }
        );
    },
  }),
  d = e._export_sfc(C, [['__scopeId', 'data-v-229b8dac']]);
wx.createComponent(d);
