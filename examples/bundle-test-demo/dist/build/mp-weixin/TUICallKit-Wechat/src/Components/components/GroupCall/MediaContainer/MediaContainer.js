'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js'),
  require('../../../../TUICallService/const/index.js');
const u = require('../../../hooks/useCallInfoContext.js'),
  a = require('../../../hooks/useGetVolumeMap.js'),
  o = require('../../../hooks/useNetWorkStatus.js'),
  l = require('../../../hooks/usePlayer.js'),
  s = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  r = require('../../../hooks/useButtonPanelStatus.js'),
  t = require('../../../hooks/useFocusContext.js'),
  n = require('../../../hooks/useFloatWindowContext.js'),
  i = require('../../../hooks/useGroupCallLayout.js'),
  d = require('../../../hooks/useCustomUI.js');
require('../../../util/stringToPath.js'),
  require('../../../../TUICallService/utils/env.js');
const c = require('../../base/util/classNames.js');
require('../../base/util/checkEnv.js');
const v = require('../../../../TUICallService/CallService/index.js'),
  m = require('../../../../TUICallService/const/call.js');
Math || (h + S + b + f + p + I + C + j + U)();
const f = () => '../../common/Pusher/Pusher.js',
  I = () => '../../common/Player/Player.js',
  C = () => '../../base/Grid/Grid.js',
  p = () => '../../base/Grid/GridItem/GridItem.js',
  h = () => '../../common/AudioStream/AudioStream.js',
  b = () => '../../common/TKStreamInfo/TKStreamInfo.js',
  j = () => '../../common/FloatWindow/FloatWindow.js',
  U = () => '../../base/Portal/Portal.js',
  S = () => './StreamLoading/StreamLoading.js',
  k = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'MediaContainer',
    setup(f) {
      const I = e.ref('local'),
        C = e.ref(null),
        p = e.ref(!1);
      d.useCustomUI();
      const { localUserInfoExcludeVolume: h, remoteUserListExcludeVolume: b } =
          e.toRefs(s.useUserInfoExcludeVolumeContext()),
        {
          callStatus: j,
          callType: U,
          isShowEnableVirtualBackground: S,
          callRole: k,
        } = e.toRefs(u.useCallInfoContext()),
        { netWorkQualityList: G } = o.useNetWorkStatus(),
        T = e.computed(() => b.value.length + 1),
        w = l.usePlayer(),
        A = i.useGroupCallLayout(C, T),
        q = a.useGetVolumeMap(),
        { isFloatWindow: y } = e.toRefs(n.useFloatWindowContext()),
        x = t.useFocusContext(),
        { status: P } = r.useButtonPanelStatus() || {},
        L = !v.TUIGlobal.isPC,
        V = e.computed(() => '0' === String(C.value)),
        E = e.computed(
          () => !v.TUIGlobal.isPC && V.value && h.value.isVideoAvailable
        ),
        W = e.computed(() => E.value),
        g = e.computed(() => E.value && S.value && v.TUIGlobal.isWeChat),
        N = e.computed(() => v.TUIGlobal.isPC || V.value),
        M = e.computed(() => (v.TUIGlobal.isPC || y.value ? '%' : 'vw')),
        F = e.computed(() =>
          [h.value, ...b.value].map((e) => {
            var u;
            return y.value
              ? (null == (u = q.value) ? void 0 : u[e.domId]) >= 10
                ? e.domId
                : void 0
              : e.domId;
          })
        ),
        B = e.computed(
          () =>
            !(
              k.value === m.CallRole.CALLEE &&
              j.value === m.CallStatus.CALLING &&
              !y.value
            )
        ),
        R = e.computed(() => {
          let e = '';
          return (
            k.value !== m.CallRole.CALLEE ||
              j.value !== m.CallStatus.CALLING ||
              y.value ||
              (e = 'hidden'),
            { visibility: e }
          );
        });
      function _(e) {
        (C.value = e), (x.value = e), (P.value = null !== e ? 'close' : 'open');
      }
      function D(e) {
        var u, a;
        return v.TUIGlobal.isWeChat
          ? !(null ==
            (a =
              null == (u = w.value)
                ? void 0
                : u.find((u) => u.userID === e.userId))
              ? void 0
              : a.hasVideo)
          : !e.isVideoAvailable;
      }
      function O(e) {
        if (!G.value) return;
        const u = e !== h.value.userId;
        if (!v.TUIGlobal.isWeChat && u) return;
        const a = G.value.find((u) => u.userId === e);
        return a && (null == a ? void 0 : a.quality) >= 4;
      }
      e.watch([b, U], () => {
        var e, u;
        (null == (u = null == (e = b.value) ? void 0 : e[0])
          ? void 0
          : u.isEnter) && (I.value = 'remote'),
          U.value === m.CallMediaType.AUDIO ? (p.value = !1) : (p.value = !0);
      });
      const K = e.computed(() =>
          c.classNames([
            'groupcall-media-container',
            {
              mobile: !v.TUIGlobal.isPC,
              pc: v.TUIGlobal.isPC,
              'two-layout': 2 === T.value && null === C.value,
              float: y.value,
            },
          ])
        ),
        H = e.computed(
          () =>
            j.value === m.CallStatus.CALLING &&
            ((U.value === m.CallMediaType.AUDIO && !h.value.isAudioAvailable) ||
              (U.value === m.CallMediaType.VIDEO && !h.value.isVideoAvailable))
        );
      return (u, a) =>
        e.e(
          {
            a: e.p({
              'user-id': e.unref(h).userId,
              username: e.unref(h).displayUserInfo,
              avatar: e.unref(h).avatar,
              'is-video-available': e.unref(h).isVideoAvailable,
            }),
            b: e.unref(H),
          },
          (e.unref(H), {}),
          { c: !e.unref(y) },
          e.unref(y)
            ? {}
            : {
                d: e.p({
                  'is-self': !0,
                  'show-nick-name': e.unref(N),
                  showSwitchCameraButton: e.unref(W),
                  showVirtualBackgroundButton: e.unref(g),
                  showNetWorkStatus: O(e.unref(h).userId),
                  nickName: e.unref(h).displayUserInfo,
                  isMuted: !e.unref(h).isAudioAvailable,
                  volume: e.unref(q) && e.unref(q)[e.unref(h).domId],
                }),
              },
          {
            e: e.p({
              domId: e.unref(h).domId,
              'show-audio-stream': !e.unref(h).isVideoAvailable,
              show: e.unref(F).includes(e.unref(h).domId) && e.unref(B),
            }),
            f: e.unref(h).userId,
            g: e.p({ index: 0 }),
            h: e.f(e.unref(b), (u, a, o) => {
              return e.e(
                {
                  a: 'ac7ad80e-10-' + o + ',ac7ad80e-9-' + o,
                  b: e.p({
                    'user-id': u.userId,
                    username: u.displayUserInfo,
                    avatar: u.avatar,
                  }),
                  c: !u.isEnter,
                },
                u.isEnter ? {} : { d: 'ac7ad80e-11-' + o + ',ac7ad80e-9-' + o },
                e.unref(y)
                  ? {}
                  : {
                      e: 'ac7ad80e-12-' + o + ',ac7ad80e-9-' + o,
                      f: e.p({
                        'show-nick-name':
                          e.unref(v.TUIGlobal).isPC ||
                          String(e.unref(C)) === String(a + 1),
                        'show-control-button': !1,
                        showNetWorkStatus: O(u.userId),
                        nickName: u.displayUserInfo,
                        'is-muted':
                          ((l = u),
                          v.TUIGlobal.isWeChat
                            ? !(null ==
                              (r =
                                null == (s = w.value)
                                  ? void 0
                                  : s.find((e) => e.userID === l.userId))
                                ? void 0
                                : r.hasAudio)
                            : !l.isAudioAvailable),
                        volume: e.unref(q) && e.unref(q)[u.domId],
                      }),
                    },
                {
                  g: 'ac7ad80e-9-' + o + ',ac7ad80e-8-' + o,
                  h: e.p({
                    domId: u.domId,
                    'show-audio-stream': D(u),
                    show: e.unref(F).includes(u.domId) && e.unref(B),
                  }),
                  i: u.userId,
                  j: 'ac7ad80e-8-' + o + ',ac7ad80e-2',
                  k: e.p({ index: a + 1 }),
                }
              );
              var l, s, r;
            }),
            i: !e.unref(y),
            j: e.o(_),
            k: e.p({
              unit: e.unref(M),
              'enable-focus': L,
              focus: e.unref(C),
              length: e.unref(T),
              layout: e.unref(A),
            }),
            l: e.n(e.unref(K)),
            m: e.s(e.unref(R)),
            n: e.p({
              id: 'source',
              disabled: !e.unref(y),
              source: '#source',
              to: 'body',
            }),
          }
        );
    },
  }),
  G = e._export_sfc(k, [['__scopeId', 'data-v-ac7ad80e']]);
wx.createComponent(G);
