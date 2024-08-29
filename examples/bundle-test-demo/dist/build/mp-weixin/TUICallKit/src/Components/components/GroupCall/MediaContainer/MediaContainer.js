'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js'),
  require('../../../../TUICallService/const/index.js');
const u = require('../../../hooks/useCallInfoContext.js'),
  o = require('../../../hooks/useGetVolumeMap.js'),
  a = require('../../../hooks/useNetWorkStatus.js'),
  l = require('../../../hooks/usePlayer.js'),
  s = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  r = require('../../../hooks/useButtonPanelStatus.js'),
  t = require('../../../hooks/useFocusContext.js'),
  n = require('../../../hooks/useFloatWindowContext.js'),
  i = require('../../../hooks/useGroupCallLayout.js'),
  d = require('../../../hooks/useCustomUI.js');
require('../../../util/stringToPath.js');
const f = require('../../base/util/classNames.js');
require('../../base/util/checkEnv.js');
const c = require('../../../../TUICallService/CallService/index.js'),
  v = require('../../../../TUICallService/const/call.js');
Math || (h + S + b + m + p + I + C + j + U)();
const m = () => '../../common/Pusher/Pusher.js',
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
    setup(m) {
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
        { netWorkQualityList: G } = a.useNetWorkStatus(),
        w = e.computed(() => b.value.length + 1),
        T = l.usePlayer(),
        A = i.useGroupCallLayout(C, w),
        y = o.useGetVolumeMap(),
        { isFloatWindow: q } = e.toRefs(n.useFloatWindowContext()),
        x = t.useFocusContext(),
        { status: P } = r.useButtonPanelStatus() || {},
        L = !c.TUIGlobal.isPC,
        V = e.computed(() => '0' === String(C.value)),
        E = e.computed(
          () => !c.TUIGlobal.isPC && V.value && h.value.isVideoAvailable
        ),
        W = e.computed(() => E.value),
        g = e.computed(() => E.value && S.value && c.TUIGlobal.isWeChat),
        N = e.computed(() => c.TUIGlobal.isPC || V.value),
        M = e.computed(() => (c.TUIGlobal.isPC || q.value ? '%' : 'vw')),
        F = e.computed(() =>
          [h.value, ...b.value].map((e) => {
            var u;
            return q.value
              ? (null == (u = y.value) ? void 0 : u[e.domId]) >= 10
                ? e.domId
                : void 0
              : e.domId;
          })
        ),
        B = e.computed(
          () =>
            !(
              k.value === v.CallRole.CALLEE &&
              j.value === v.CallStatus.CALLING &&
              !q.value
            )
        ),
        R = e.computed(() => {
          let e = '';
          return (
            k.value !== v.CallRole.CALLEE ||
              j.value !== v.CallStatus.CALLING ||
              q.value ||
              (e = 'hidden'),
            { visibility: e }
          );
        });
      function _(e) {
        (C.value = e), (x.value = e), (P.value = null !== e ? 'close' : 'open');
      }
      function D(e) {
        var u, o;
        return c.TUIGlobal.isWeChat
          ? !(null ==
            (o =
              null == (u = T.value)
                ? void 0
                : u.find((u) => u.userID === e.userId))
              ? void 0
              : o.hasVideo)
          : !e.isVideoAvailable;
      }
      function O(e) {
        if (!G.value) return;
        const u = e !== h.value.userId;
        if (!c.TUIGlobal.isWeChat && u) return;
        const o = G.value.find((u) => u.userId === e);
        return o && (null == o ? void 0 : o.quality) >= 4;
      }
      e.watch([b, U], () => {
        var e, u;
        (null == (u = null == (e = b.value) ? void 0 : e[0])
          ? void 0
          : u.isEnter) && (I.value = 'remote'),
          U.value === v.CallMediaType.AUDIO ? (p.value = !1) : (p.value = !0);
      });
      const K = e.computed(() =>
          f.classNames([
            'groupcall-media-container',
            {
              mobile: !c.TUIGlobal.isPC,
              pc: c.TUIGlobal.isPC,
              'two-layout': 2 === w.value && null === C.value,
              float: q.value,
            },
          ])
        ),
        H = e.computed(
          () =>
            j.value === v.CallStatus.CALLING &&
            ((U.value === v.CallMediaType.AUDIO && !h.value.isAudioAvailable) ||
              (U.value === v.CallMediaType.VIDEO && !h.value.isVideoAvailable))
        );
      return (u, o) =>
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
          { c: !e.unref(q) },
          e.unref(q)
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
                  volume: e.unref(y) && e.unref(y)[e.unref(h).domId],
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
            h: e.f(e.unref(b), (u, o, a) => {
              return e.e(
                {
                  a: '9a5864fe-10-' + a + ',9a5864fe-9-' + a,
                  b: e.p({
                    'user-id': u.userId,
                    username: u.displayUserInfo,
                    avatar: u.avatar,
                  }),
                  c: !u.isEnter,
                },
                u.isEnter ? {} : { d: '9a5864fe-11-' + a + ',9a5864fe-9-' + a },
                e.unref(q)
                  ? {}
                  : {
                      e: '9a5864fe-12-' + a + ',9a5864fe-9-' + a,
                      f: e.p({
                        'show-nick-name':
                          e.unref(c.TUIGlobal).isPC ||
                          String(e.unref(C)) === String(o + 1),
                        'show-control-button': !1,
                        showNetWorkStatus: O(u.userId),
                        nickName: u.displayUserInfo,
                        'is-muted':
                          ((l = u),
                          c.TUIGlobal.isWeChat
                            ? !(null ==
                              (r =
                                null == (s = T.value)
                                  ? void 0
                                  : s.find((e) => e.userID === l.userId))
                                ? void 0
                                : r.hasAudio)
                            : !l.isAudioAvailable),
                        volume: e.unref(y) && e.unref(y)[u.domId],
                      }),
                    },
                {
                  g: '9a5864fe-9-' + a + ',9a5864fe-8-' + a,
                  h: e.p({
                    domId: u.domId,
                    'show-audio-stream': D(u),
                    show: e.unref(F).includes(u.domId) && e.unref(B),
                  }),
                  i: u.userId,
                  j: '9a5864fe-8-' + a + ',9a5864fe-2',
                  k: e.p({ index: o + 1 }),
                }
              );
              var l, s, r;
            }),
            i: !e.unref(q),
            j: e.o(_),
            k: e.p({
              unit: e.unref(M),
              'enable-focus': L,
              focus: e.unref(C),
              length: e.unref(w),
              layout: e.unref(A),
            }),
            l: e.n(e.unref(K)),
            m: e.s(e.unref(R)),
            n: e.p({
              id: 'source',
              disabled: !e.unref(q),
              source: '#source',
              to: 'body',
            }),
          }
        );
    },
  }),
  G = e._export_sfc(k, [['__scopeId', 'data-v-9a5864fe']]);
wx.createComponent(G);
