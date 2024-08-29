'use strict';
const e = require('../../../common/vendor.js'),
  t = require('../TUICallService/index.js'),
  a = require('./context/CallInfoContext.js'),
  l = require('./context/CallerUserInfoContext.js'),
  o = require('./context/UserInfoContextExcludeVolume.js'),
  r = require('./context/FloatWindowContext.js'),
  i = require('./context/CustomUIConfigContext.js'),
  n = require('../TUICallService/CallService/index.js'),
  u = require('../TUICallService/const/index.js'),
  E = require('../TUICallService/const/call.js');
Math || (S + C)();
const S = () => './components/SingleCall/SingleCall.js',
  C = () => './components/GroupCall/GroupCall.js',
  s = e.defineComponent({
    __name: 'TUICallKit',
    props: {
      beforeCalling: {},
      afterCalling: {},
      onMinimized: {},
      onMessageSentByMe: {},
      kickedOut: {},
      statusChanged: {},
      allowedMinimized: { type: Boolean, default: !1 },
      allowedFullScreen: { type: Boolean, default: !0 },
      videoDisplayMode: { default: 'cover' },
      videoResolution: { default: '480p' },
    },
    setup(S) {
      const C = !n.TUIGlobal.isPC,
        s = C ? 'TUICallKit-mobile transition-animation' : 'TUICallKit-desktop',
        I = e.ref(''),
        A = e.ref(''),
        L = e.ref(''),
        U = e.ref(!1),
        d = S,
        N = e.ref(n.TUIStore.getData(E.StoreName.CALL, u.NAME.CALL_STATUS)),
        M = e.ref(n.TUIStore.getData(E.StoreName.CALL, u.NAME.CALL_ROLE)),
        c = e.ref(n.TUIStore.getData(E.StoreName.CALL, u.NAME.CALL_MEDIA_TYPE)),
        _ = e.ref(n.TUIStore.getData(E.StoreName.CALL, u.NAME.IS_GROUP)),
        f = e.ref(n.TUIStore.getData(E.StoreName.CALL, u.NAME.IS_EAR_PHONE)),
        T = e.ref(null),
        m = e.ref(
          n.TUIStore.getData(
            E.StoreName.CALL,
            u.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN
          )
        ),
        v = e.ref(
          n.TUIStore.getData(
            E.StoreName.CALL,
            u.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST
          )
        ),
        O = e.ref(
          n.TUIStore.getData(E.StoreName.CALL, u.NAME.CALLER_USER_INFO)
        ),
        g = e.ref(n.TUIStore.getData(E.StoreName.CALL, u.NAME.IS_MINIMIZED)),
        R = e.ref(
          n.TUIStore.getData(E.StoreName.CALL, u.NAME.ENABLE_VIRTUAL_BACKGROUND)
        ),
        D = e.ref(
          n.TUIStore.getData(
            E.StoreName.CALL,
            u.NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND
          )
        ),
        p = e.ref(
          n.TUIStore.getData(E.StoreName.CALL, u.NAME.CUSTOM_UI_CONFIG)
        ),
        x = e.ref(n.TUIStore.getData(E.StoreName.CALL, u.NAME.IS_MUTE_SPEAKER)),
        y = e.reactive({
          callStatus: N,
          callRole: M,
          callType: c,
          isGroupCall: _,
          isEarPhone: f,
          focusElement: T,
          allowedFullScreen: d.allowedFullScreen,
          enableVirtualBackground: R,
          isShowEnableVirtualBackground: D,
          isMuteSpeaker: x,
        }),
        w = e.reactive({ callerUserInfo: O }),
        V = e.reactive({
          localUserInfoExcludeVolume: m,
          remoteUserListExcludeVolume: v,
        }),
        F = e.reactive({ isFloatWindow: g }),
        {
          beforeCalling: K,
          afterCalling: b,
          onMinimized: h,
          onMessageSentByMe: B,
          videoDisplayMode: G,
          videoResolution: P,
          kickedOut: k,
          statusChanged: j,
          allowedMinimized: W,
        } = e.toRefs(d),
        q = (e) => {
          (F.isFloatWindow = e),
            e
              ? C
                ? y.callType === E.CallMediaType.AUDIO
                  ? (A.value = 'miniMized-mobile-audio')
                  : (L.value = 'miniMized-mobile-video')
                : (I.value = 'miniMized')
              : ((A.value = 'mobile-audio'), (I.value = ''), (L.value = ''));
        };
      e.watchEffect(() => {
        t.TUICallKitServer.setCallback({
          beforeCalling: K && K.value,
          afterCalling: b && b.value,
          onMinimized: h && h.value,
          onMessageSentByMe: B && B.value,
          kickedOut: k && k.value,
          statusChanged: j && j.value,
        });
      });
      const z = {
        [u.NAME.CALL_STATUS]: (e) => {
          y.callStatus = e;
        },
        [u.NAME.IS_GROUP]: (e) => {
          y.isGroupCall = e;
        },
        [u.NAME.TOAST_INFO]: (t) => {
          t.text &&
            (function (t, a) {
              if ('info' === a) e.index.showToast({ title: t, icon: 'none' });
            })(t.text, t.type || 'info');
        },
        [u.NAME.CALL_MEDIA_TYPE]: (e) => {
          (y.callType = e),
            C &&
              U.value &&
              ((L.value = 'miniMized-mobile-audio'), (A.value = '')),
            C && !U.value && (A.value = 'mobile-audio');
        },
        [u.NAME.SHOW_PERMISSION_TIP]: (e) => {},
        [u.NAME.CALL_ROLE]: (e) => {
          y.callRole = e;
        },
        [u.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN]: (e) => {
          V.localUserInfoExcludeVolume = e;
        },
        [u.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST]: (e) => {
          V.remoteUserListExcludeVolume = e;
        },
        [u.NAME.CALLER_USER_INFO]: (e) => {
          w.callerUserInfo = e;
        },
        [u.NAME.IS_EAR_PHONE]: (e) => {
          y.isEarPhone = e;
        },
        [u.NAME.ENABLE_VIRTUAL_BACKGROUND]: (e) => {
          y.enableVirtualBackground = e;
        },
        [u.NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND]: (e) => {
          y.isShowEnableVirtualBackground = e;
        },
        [u.NAME.CUSTOM_UI_CONFIG]: (e) => {
          p.value = e;
        },
        [u.NAME.IS_MUTE_SPEAKER]: (e) => {
          x.value = e;
        },
      };
      return (
        e.onMounted(() => {
          W.value && t.TUICallKitServer.enableFloatWindow(W.value),
            t.TUICallKitServer.setVideoDisplayMode(G.value),
            t.TUICallKitServer.setVideoResolution(P.value),
            n.TUIStore.watch(E.StoreName.CALL, z, {
              notifyRangeWhenWatch: u.NAME.MYSELF,
            }),
            n.TUIStore.watch(E.StoreName.CALL, { [u.NAME.IS_MINIMIZED]: q });
        }),
        e.onUnmounted(async () => {
          n.TUIStore.unwatch(E.StoreName.CALL, {
            ...z,
            [u.NAME.IS_MINIMIZED]: q,
          }),
            await t.TUICallKitServer.handleExceptionExit();
        }),
        e.provide(a.CallInfoContextKey, y),
        e.provide(l.CallerUserInfoContextKey, w),
        e.provide(o.UserInfoExcludeVolumeContextKey, V),
        e.provide(r.FloatWindowContextKey, F),
        e.provide(i.CustomUIConfigContextKey, p),
        (t, a) =>
          e.e(
            { a: e.unref(y).callStatus !== e.unref(E.CallStatus).IDLE },
            e.unref(y).callStatus !== e.unref(E.CallStatus).IDLE
              ? e.e(
                  { b: !e.unref(y).isGroupCall },
                  (e.unref(y).isGroupCall, {}),
                  {
                    c: e.s({
                      visibility: e.unref(F).isFloatWindow ? 'hidden' : '',
                    }),
                    d: e.n(e.unref(s)),
                    e: e.n(e.unref(I)),
                    f: e.n(e.unref(L)),
                    g: e.n(e.unref(A)),
                  }
                )
              : {}
          )
      );
    },
  });
wx.createPage(s);
