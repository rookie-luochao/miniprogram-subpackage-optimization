'use strict';
const e = require('../../../../../../../common/vendor.js'),
  l = require('../../../../../TUICallService/index.js');
require('../../../../../TUICallService/const/index.js');
const a = require('../../../../hooks/useCallInfoContext.js');
require('../../../../util/stringToPath.js');
const t = require('../../../../hooks/useCallDuration.js'),
  n = require('../../../../hooks/useFloatWindowContext.js'),
  r = require('../../../base/util/classNames.js'),
  o = require('../../../../../../../common/assets.js'),
  u = require('../../../../../TUICallService/locales/index.js'),
  s = require('../../../../../TUICallService/const/call.js');
Math || (c + i + f)();
const i = () => '../../../base/TKImage/TKImage.js',
  f = () => '../../Timer/Timer.js',
  c = () => '../../../base/TKText/TKText.js',
  C = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'FloatWindowSingleCall',
    setup(i) {
      const { callType: f, callStatus: c } = e.toRefs(a.useCallInfoContext()),
        { isFloatWindow: C } = e.toRefs(n.useFloatWindowContext()),
        { callDuration: d } = t.useCallDuration(),
        p = e.computed(() =>
          r.classNames([
            'float-window-container',
            {
              'singlecall-video-float':
                f.value === s.CallMediaType.VIDEO && C.value,
              'singlecall-audio-float':
                f.value === s.CallMediaType.AUDIO && C.value,
            },
          ])
        );
      function T() {
        C.value && l.TUICallKitServer.toggleMinimize();
      }
      return (l, a) =>
        e.e(
          { a: e.unref(c) === e.unref(s.CallStatus).CALLING && e.unref(C) },
          e.unref(c) === e.unref(s.CallStatus).CALLING && e.unref(C)
            ? {
                b: e.t(e.unref(u.t)('wait to be called')),
                c: e.p({ color: '#FFF', size: '12px' }),
              }
            : {},
          {
            d: !(e.unref(C) && e.unref(f) === e.unref(s.CallMediaType).AUDIO),
            e: e.o(T),
            f: e.p({
              width: '36px',
              height: '36px',
              src: e.unref(o.earphoneSrc),
            }),
            g: e.unref(c) === e.unref(s.CallStatus).CONNECTED,
          },
          e.unref(c) === e.unref(s.CallStatus).CONNECTED
            ? {
                h: e.p({
                  fontSize: '12px',
                  callDuration: e.unref(d),
                  color: '#12b969',
                }),
              }
            : {},
          { i: e.unref(c) === e.unref(s.CallStatus).CALLING && e.unref(C) },
          e.unref(c) === e.unref(s.CallStatus).CALLING && e.unref(C)
            ? {
                j: e.t(e.unref(u.t)('wait to be called')),
                k: e.p({ color: '#12b969', size: '12px' }),
              }
            : {},
          {
            l: e.unref(C) && e.unref(f) === e.unref(s.CallMediaType).AUDIO,
            m: e.o(T),
            n: e.n(e.unref(p)),
          }
        );
    },
  }),
  d = e._export_sfc(C, [['__scopeId', 'data-v-5f24185a']]);
wx.createComponent(d);
