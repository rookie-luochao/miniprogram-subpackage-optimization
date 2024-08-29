'use strict';
const e = require('../../../../../../../common/vendor.js'),
  r = require('../../../../../TUICallService/index.js'),
  a = require('../../../../../TUICallService/CallService/index.js'),
  n = require('../../../../../TUICallService/const/index.js'),
  t = require('../../../../../TUICallService/const/call.js'),
  u = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'weChatPlayer',
    props: {
      remoteClass: { type: String, required: !0 },
      domId: { type: String },
    },
    setup(u) {
      const o = e.ref(a.TUIStore.getData(t.StoreName.CALL, n.NAME.PLAYER)),
        i = e.ref(a.TUIStore.getData(t.StoreName.CALL, n.NAME.CALL_STATUS)),
        l = e.ref(
          a.TUIStore.getData(t.StoreName.CALL, n.NAME.IS_EAR_PHONE)
            ? t.AudioPlayBackDevice.EAR
            : t.AudioPlayBackDevice.SPEAKER
        ),
        f = u,
        c = e.computed(() => {
          var e;
          return null == (e = o.value)
            ? void 0
            : e.find((e) => (null == e ? void 0 : e.userID) === f.domId);
        }),
        s = {
          [n.NAME.PLAYER]: (e) => {
            o.value = JSON.parse(JSON.stringify(e));
          },
          [n.NAME.CALL_STATUS]: (e) => {
            i.value = e;
          },
          [n.NAME.IS_EAR_PHONE]: (e) => {
            l.value = e
              ? t.AudioPlayBackDevice.EAR
              : t.AudioPlayBackDevice.SPEAKER;
          },
        };
      function d(e) {
        r.TUICallKitServer._tuiCallEngine._playerStateChange(e);
      }
      function S(e) {}
      function A(e) {
        r.TUICallKitServer._tuiCallEngine._playNetStatus(e);
      }
      function v(e) {
        r.TUICallKitServer._tuiCallEngine._playerAudioVolumeNotify(e);
      }
      return (
        e.onMounted(() => {
          a.TUIStore.watch(t.StoreName.CALL, s, {
            notifyRangeWhenWatch: n.NAME.MYSELF,
          });
        }),
        e.onUnmounted(() => {
          a.TUIStore.unwatch(t.StoreName.CALL, s);
        }),
        (r, a) =>
          e.e(
            { a: e.unref(c) && (e.unref(c).hasAudio || e.unref(c).hasVideo) },
            e.unref(c) && (e.unref(c).hasAudio || e.unref(c).hasVideo)
              ? {
                  b: e.unref(c).id,
                  c: e.unref(c).userID,
                  d: e.unref(c).streamID,
                  e: e.unref(c).streamType,
                  f: e.unref(c).src,
                  g: e.unref(c).autoplay,
                  h: e.unref(c).muteAudio,
                  i: e.unref(c).muteVideo,
                  j: e.unref(c).orientation,
                  k: e.unref(c).objectFit,
                  l: e.unref(c).enableBackgroundMute,
                  m: e.unref(c).minCache,
                  n: e.unref(c).maxCache,
                  o: e.unref(l),
                  p: e.unref(c).enableRecvMessage,
                  q: e.unref(c).autoPauseIfNavigate,
                  r: e.unref(c).autoPauseIfOpenNative,
                  s: e.o(d),
                  t: e.o(S),
                  v: e.o(A),
                  w: e.o(v),
                }
              : {},
            { x: e.n(u.remoteClass) }
          )
      );
    },
  }),
  o = e._export_sfc(u, [['__scopeId', 'data-v-553d2a5d']]);
wx.createComponent(o);
