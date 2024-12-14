'use strict';
const e = require('../../../common/vendor.js'),
  t = require('../TUICallService/index.js'),
  a = require('./context/CallInfoContext.js'),
  l = require('./context/CallerUserInfoContext.js'),
  o = require('./context/UserInfoContextExcludeVolume.js'),
  r = require('./context/FloatWindowContext.js'),
  i = require('./context/CustomUIConfigContext.js'),
  n = require('./context/TranslateContext.js'),
  u = require('./util/isEmpty.js'),
  E = require('../TUICallService/CallService/index.js'),
  S = require('../TUICallService/const/index.js'),
  s = require('../TUICallService/const/call.js');
Math || (C + I)();
const C = () => './components/SingleCall/SingleCall.js',
  I = () => './components/GroupCall/GroupCall.js',
  A = e.defineComponent({
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
    setup(C) {
      const I = !E.TUIGlobal.isPC,
        A = I ? 'TUICallKit-mobile transition-animation' : 'TUICallKit-desktop',
        L = e.ref(''),
        N = e.ref(''),
        U = e.ref(''),
        M = e.ref(!1),
        d = C,
        c = e.ref(E.TUIStore.getData(s.StoreName.CALL, S.NAME.CALL_STATUS)),
        f = e.ref(E.TUIStore.getData(s.StoreName.CALL, S.NAME.CALL_ROLE)),
        _ = e.ref(E.TUIStore.getData(s.StoreName.CALL, S.NAME.CALL_MEDIA_TYPE)),
        T = e.ref(E.TUIStore.getData(s.StoreName.CALL, S.NAME.IS_GROUP)),
        m = e.ref(E.TUIStore.getData(s.StoreName.CALL, S.NAME.IS_EAR_PHONE)),
        v = e.ref(null),
        O = e.ref(
          E.TUIStore.getData(
            s.StoreName.CALL,
            S.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN
          )
        ),
        g = e.ref(
          E.TUIStore.getData(
            s.StoreName.CALL,
            S.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST
          )
        ),
        p = e.ref(
          E.TUIStore.getData(s.StoreName.CALL, S.NAME.CALLER_USER_INFO)
        ),
        R = e.ref(E.TUIStore.getData(s.StoreName.CALL, S.NAME.IS_MINIMIZED)),
        D = e.ref(
          E.TUIStore.getData(s.StoreName.CALL, S.NAME.ENABLE_VIRTUAL_BACKGROUND)
        ),
        x = e.ref(
          E.TUIStore.getData(
            s.StoreName.CALL,
            S.NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND
          )
        ),
        y = e.ref(
          E.TUIStore.getData(s.StoreName.CALL, S.NAME.CUSTOM_UI_CONFIG)
        ),
        w = e.ref(E.TUIStore.getData(s.StoreName.CALL, S.NAME.IS_MUTE_SPEAKER)),
        K = e.ref(E.TUIStore.getData(s.StoreName.CALL, S.NAME.TRANSLATE)),
        V = e.reactive({
          callStatus: c,
          callRole: f,
          callType: _,
          isGroupCall: T,
          isEarPhone: m,
          focusElement: v,
          allowedFullScreen: d.allowedFullScreen,
          enableVirtualBackground: D,
          isShowEnableVirtualBackground: x,
          isMuteSpeaker: w,
        }),
        b = e.reactive({ callerUserInfo: p }),
        F = e.reactive({
          localUserInfoExcludeVolume: O,
          remoteUserListExcludeVolume: g,
        }),
        h = e.reactive({ isFloatWindow: R }),
        B = e.ref(K),
        {
          beforeCalling: j,
          afterCalling: G,
          onMinimized: k,
          onMessageSentByMe: P,
          videoDisplayMode: q,
          videoResolution: W,
          kickedOut: z,
          statusChanged: H,
          allowedMinimized: X,
        } = e.toRefs(d),
        Y = (e) => {
          (h.isFloatWindow = e),
            e
              ? I
                ? V.callType === s.CallMediaType.AUDIO
                  ? (N.value = 'miniMized-mobile-audio')
                  : (U.value = 'miniMized-mobile-video')
                : (L.value = 'miniMized')
              : ((N.value = 'mobile-audio'), (L.value = ''), (U.value = ''));
        };
      e.watchEffect(() => {
        t.TUICallKitServer.setCallback({
          beforeCalling: j && j.value,
          afterCalling: G && G.value,
          onMinimized: k && k.value,
          onMessageSentByMe: P && P.value,
          kickedOut: z && z.value,
          statusChanged: H && H.value,
        });
      });
      const Z = {
        [S.NAME.CALL_STATUS]: (e) => {
          V.callStatus = e;
        },
        [S.NAME.IS_GROUP]: (e) => {
          V.isGroupCall = e;
        },
        [S.NAME.TOAST_INFO]: (t) => {
          if ('object' == typeof t) {
            const { content: a, type: l = 'info' } = t;
            !u.isEmpty(a) &&
              (function (t, a) {
                if ('info' === a) e.index.showToast({ title: t, icon: 'none' });
              })(K.value(a), l);
          }
        },
        [S.NAME.CALL_MEDIA_TYPE]: (e) => {
          (V.callType = e),
            I &&
              M.value &&
              ((U.value = 'miniMized-mobile-audio'), (N.value = '')),
            I && !M.value && (N.value = 'mobile-audio');
        },
        [S.NAME.SHOW_PERMISSION_TIP]: (e) => {},
        [S.NAME.CALL_ROLE]: (e) => {
          V.callRole = e;
        },
        [S.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN]: (e) => {
          F.localUserInfoExcludeVolume = e;
        },
        [S.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST]: (e) => {
          F.remoteUserListExcludeVolume = e;
        },
        [S.NAME.CALLER_USER_INFO]: (e) => {
          b.callerUserInfo = e;
        },
        [S.NAME.IS_EAR_PHONE]: (e) => {
          V.isEarPhone = e;
        },
        [S.NAME.ENABLE_VIRTUAL_BACKGROUND]: (e) => {
          V.enableVirtualBackground = e;
        },
        [S.NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND]: (e) => {
          V.isShowEnableVirtualBackground = e;
        },
        [S.NAME.CUSTOM_UI_CONFIG]: (e) => {
          y.value = e;
        },
        [S.NAME.IS_MUTE_SPEAKER]: (e) => {
          V.isMuteSpeaker = e;
        },
        [S.NAME.TRANSLATE]: (e) => {
          K.value = e;
        },
      };
      return (
        e.onMounted(() => {
          X.value && t.TUICallKitServer.enableFloatWindow(X.value),
            t.TUICallKitServer.setVideoDisplayMode(q.value),
            t.TUICallKitServer.setVideoResolution(W.value),
            E.TUIStore.watch(s.StoreName.CALL, Z, {
              notifyRangeWhenWatch: S.NAME.MYSELF,
            }),
            E.TUIStore.watch(s.StoreName.CALL, { [S.NAME.IS_MINIMIZED]: Y });
        }),
        e.onUnmounted(async () => {
          E.TUIStore.unwatch(s.StoreName.CALL, {
            ...Z,
            [S.NAME.IS_MINIMIZED]: Y,
          }),
            await t.TUICallKitServer.handleExceptionExit();
        }),
        e.provide(a.CallInfoContextKey, V),
        e.provide(l.CallerUserInfoContextKey, b),
        e.provide(o.UserInfoExcludeVolumeContextKey, F),
        e.provide(r.FloatWindowContextKey, h),
        e.provide(i.CustomUIConfigContextKey, y),
        e.provide(n.translateContextKey, B),
        (t, a) =>
          e.e(
            { a: e.unref(V).callStatus !== e.unref(s.CallStatus).IDLE },
            e.unref(V).callStatus !== e.unref(s.CallStatus).IDLE
              ? e.e(
                  { b: !e.unref(V).isGroupCall },
                  (e.unref(V).isGroupCall, {}),
                  {
                    c: e.s({
                      visibility: e.unref(h).isFloatWindow ? 'hidden' : '',
                    }),
                    d: e.n(e.unref(A)),
                    e: e.n(e.unref(L)),
                    f: e.n(e.unref(U)),
                    g: e.n(e.unref(N)),
                  }
                )
              : {}
          )
      );
    },
  });
wx.createPage(A);
