'use strict';
const e = require('../../../../../../../common/vendor.js'),
  r = require('../../../../../TUICallService/index.js'),
  n = require('../../../../../TUICallService/CallService/index.js'),
  t = require('../../../../../TUICallService/const/index.js'),
  a = require('../../../../../TUICallService/const/call.js'),
  o = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'weChatPusher',
    props: { localClass: { type: String, required: !0 } },
    emits: ['toggleViewSize'],
    setup(o, { emit: i }) {
      const u = e.ref(n.TUIStore.getData(a.StoreName.CALL, t.NAME.PUSHER)),
        l = e.ref(n.TUIStore.getData(a.StoreName.CALL, t.NAME.CALL_STATUS)),
        f = {
          [t.NAME.PUSHER]: (e) => {
            u.value = Object.assign({}, u.value, e);
          },
          [t.NAME.CALL_STATUS]: (e) => {
            l.value = e;
          },
        };
      function s(e) {
        r.TUICallKitServer._tuiCallEngine._pusherStateChangeHandler(e);
      }
      function c(e) {
        r.TUICallKitServer._tuiCallEngine._pusherNetStatus(e);
      }
      function S(e) {
        r.TUICallKitServer.handlePusherError(e);
      }
      function C(e) {
        r.TUICallKitServer._tuiCallEngine._pusherAudioVolumeNotify(e);
      }
      return (
        e.onMounted(() => {
          n.TUIStore.watch(a.StoreName.CALL, f, {
            notifyRangeWhenWatch: t.NAME.MYSELF,
          });
        }),
        e.onUnmounted(() => {
          n.TUIStore.unwatch(a.StoreName.CALL, f);
        }),
        (r, n) => ({
          a: e.unref(u).url,
          b: e.unref(u).mode,
          c: e.unref(u).enableCamera,
          d: !e.unref(u).enableMic,
          e: e.unref(u).enableEarMonitor,
          f: e.unref(u).enableZoom,
          g: e.unref(u).minBitrate,
          h: e.unref(u).maxBitrate,
          i: e.unref(u).videoWidth,
          j: e.unref(u).videoHeight,
          k: e.unref(u).beautyLevel,
          l: e.unref(u).whitenessLevel,
          m: e.unref(u).videoOrientation,
          n: e.unref(u).videoAspect,
          o: e.unref(u).frontCamera,
          p: e.unref(u).enableRemoteMirror,
          q: e.unref(u).localMirror,
          r: e.unref(u).enableBackgroundMute,
          s: e.unref(u).audioQuality,
          t: e.unref(u).audioVolumeType,
          v: e.unref(u).audioReverbType,
          w: e.unref(u).waitingImage,
          x: e.unref(u).beautyStyle,
          y: e.unref(u).filter,
          z: e.o(s),
          A: e.o(c),
          B: e.o(S),
          C: e.o(C),
          D: e.n(o.localClass),
        })
      );
    },
  }),
  i = e._export_sfc(o, [['__scopeId', 'data-v-a3516102']]);
wx.createComponent(i);
