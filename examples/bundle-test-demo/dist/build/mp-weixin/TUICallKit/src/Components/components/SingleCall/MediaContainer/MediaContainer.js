'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js'),
  require('../../../../TUICallService/const/index.js');
const u = require('../../../hooks/useCallInfoContext.js'),
  o = require('../../../hooks/useGetVolumeMap.js'),
  l = require('../../../hooks/usePlayer.js'),
  r = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  a = require('../../../hooks/useFloatWindowContext.js');
require('../../../util/stringToPath.js');
const n = require('../hooks/useGetLargeViewName.js'),
  i = require('../../base/util/classNames.js');
require('../../base/util/checkEnv.js');
const s = require('../../../../TUICallService/CallService/index.js'),
  d = require('../../../../TUICallService/const/call.js');
Math || (p + v + c + m + I + t + w + f)();
const t = () => '../../base/ToggleWindow/ToggleWindow.js',
  f = () => '../../base/Portal/Portal.js',
  m = () => '../../base/ToggleWindow/ToggleWindowItem/ToggleWindowItem.js',
  v = () => '../../common/TKStreamInfo/TKStreamInfo.js',
  c = () => '../../common/Pusher/Pusher.js',
  I = () => '../../common/Player/Player.js',
  p = () => '../../common/AudioStream/AudioStream.js',
  w = () => '../../common/FloatWindow/FloatWindow.js',
  C = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'MediaContainer',
    setup(t) {
      const f = n.useGetLargeViewName(),
        m = e.ref(!0),
        { isFloatWindow: v } = e.toRefs(a.useFloatWindowContext()),
        { localUserInfoExcludeVolume: c, remoteUserListExcludeVolume: I } =
          e.toRefs(r.useUserInfoExcludeVolumeContext()),
        p = o.useGetVolumeMap(),
        { callType: w, callStatus: C } = e.toRefs(u.useCallInfoContext()),
        T = l.usePlayer(),
        b = e.computed(() => {
          var e, u, o, l;
          return s.TUIGlobal.isWeChat
            ? null ==
              (u =
                null == (e = T.value)
                  ? void 0
                  : e.find((e) => {
                      var u, o;
                      return (
                        (null == e ? void 0 : e.userID) ===
                        (null == (o = null == (u = I.value) ? void 0 : u[0])
                          ? void 0
                          : o.userId)
                      );
                    }))
              ? void 0
              : u.hasVideo
            : null == (l = null == (o = I.value) ? void 0 : o[0])
              ? void 0
              : l.isVideoAvailable;
        }),
        j = e.computed(() => {
          var e, u;
          return null == (u = null == (e = I.value) ? void 0 : e[0])
            ? void 0
            : u.domId;
        }),
        V = e.computed(() => {
          var e, u, o;
          return null == (o = p.value)
            ? void 0
            : o[
                null == (u = null == (e = I.value) ? void 0 : e[0])
                  ? void 0
                  : u.domId
              ];
        });
      e.watch(
        [w, C],
        () => {
          w.value === d.CallMediaType.AUDIO || C.value === d.CallStatus.CALLING
            ? (m.value = !1)
            : (m.value = !0);
        },
        { immediate: !0 }
      );
      const h = e.computed(() =>
        i.classNames([
          'singlecall-media-container',
          { mobile: !s.TUIGlobal.isPC, pc: s.TUIGlobal.isPC, float: v.value },
        ])
      );
      function A(e) {
        f.value = e;
      }
      return (u, o) =>
        e.e(
          {
            a: e.p({
              userId: e.unref(c).userId,
              username: e.unref(c).displayUserInfo,
              avatar: e.unref(c).avatar,
              'is-video-available': e.unref(c).isVideoAvailable,
              'is-small-window': !(e.unref(f) === e.unref(d.ViewName).LOCAL),
              'is-muted': !e.unref(c).isAudioAvailable,
              volume: e.unref(p) && e.unref(p)[e.unref(c).domId],
            }),
            b: e.unref(w) === e.unref(d.CallMediaType).VIDEO,
          },
          e.unref(w) === e.unref(d.CallMediaType).VIDEO
            ? {
                c: e.p({
                  'nick-name': e.unref(c).displayUserInfo,
                  'is-self': !0,
                  'is-muted': !e.unref(c).isAudioAvailable,
                  volume: e.unref(p) && e.unref(p)[e.unref(c).domId],
                }),
              }
            : {},
          {
            d: e.p({
              domId: e.unref(c).domId,
              'show-audio-stream': !e.unref(c).isVideoAvailable,
            }),
            e: e.unref(d.ViewName).LOCAL,
            f: e.p({ value: e.unref(d.ViewName).LOCAL }),
            g: e.p({
              userId: e.unref(I)[0] && e.unref(I)[0].userId,
              username: e.unref(I)[0] && e.unref(I)[0].displayUserInfo,
              avatar: e.unref(I)[0] && e.unref(I)[0].avatar,
              'is-video-available': e.unref(b),
              'is-small-window': !(e.unref(f) === e.unref(d.ViewName).REMOTE),
              'is-muted': e.unref(I)[0] && !e.unref(I)[0].isAudioAvailable,
              volume: e.unref(V),
            }),
            h: e.unref(w) === e.unref(d.CallMediaType).VIDEO,
          },
          e.unref(w) === e.unref(d.CallMediaType).VIDEO
            ? {
                i: e.p({
                  'nick-name': e.unref(I)[0] && e.unref(I)[0].displayUserInfo,
                  'is-muted': e.unref(I)[0] && !e.unref(I)[0].isAudioAvailable,
                  volume: e.unref(V),
                }),
              }
            : {},
          {
            j: e.p({ 'dom-id': e.unref(j), 'show-audio-stream': !e.unref(b) }),
            k: e.unref(d.ViewName).REMOTE,
            l: e.p({ value: e.unref(d.ViewName).REMOTE }),
            m: e.o(A),
            n: e.p({
              'big-window': e.unref(f),
              'show-small-window': e.unref(m),
            }),
            o: e.n(e.unref(h)),
            p: e.p({
              id: 'source',
              disabled: !e.unref(v),
              source: '#source',
              to: 'body',
            }),
          }
        );
    },
  }),
  T = e._export_sfc(C, [['__scopeId', 'data-v-54bf3e81']]);
wx.createComponent(T);
