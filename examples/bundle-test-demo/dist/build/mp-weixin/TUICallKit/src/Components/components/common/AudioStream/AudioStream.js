'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js'),
  require('../../../../TUICallService/const/index.js');
const a = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const o = require('../../../hooks/useFloatWindowContext.js'),
  l = require('../../../hooks/useViewBackgroundConfig.js'),
  r = require('../../../../TUICallService/CallService/index.js'),
  u = require('../../../../TUICallService/const/call.js'),
  t = {
    avatar: { type: String },
    username: { type: String },
    isVideoAvailable: { type: Boolean },
    showStreamInfo: { type: Boolean },
    isSmallWindow: { type: Boolean, default: !1 },
    isMuted: { type: Boolean, default: !0 },
    volume: { type: Number, default: 0 },
    userId: { type: String },
  };
Math || s();
const s = () => '../OverlayStream/OverlayStream.js',
  n = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'AudioStream',
    props: t,
    setup(t) {
      const s = t,
        n = l.useViewBackgroundConfig(),
        { callType: i, isGroupCall: v } = e.toRefs(a.useCallInfoContext()),
        { isFloatWindow: d } = e.toRefs(o.useFloatWindowContext()),
        m = e.computed(() => !v.value && !r.TUIGlobal.isPC),
        c = e.computed(() =>
          v.value ? r.TUIGlobal.isPC : i.value === u.CallMediaType.AUDIO
        ),
        f = e.computed(
          () =>
            !v.value && r.TUIGlobal.isPC && i.value === u.CallMediaType.AUDIO
        ),
        p = e.computed(() => ({ zIndex: 1 })),
        C = e.computed(() => n.value[s.userId] || s.avatar),
        I = e.ref(!n.value[s.userId]),
        w = e.ref(n.value[s.userId] ? 'fill' : 'cover');
      e.watch(
        [() => s.userId, n],
        () => {
          n.value[s.userId]
            ? ((w.value = 'fill'), (I.value = !1))
            : ((w.value = 'cover'), (I.value = !0));
        },
        { immediate: !0 }
      );
      const y = () => {
        (I.value = !0), (w.value = 'cover');
      };
      return (a, o) => ({
        a: e.o(y),
        b: e.p({
          avatar: a.avatar,
          'bg-image': e.unref(C),
          'show-avatar': e.unref(m),
          username: a.username,
          'show-user-name': e.unref(c),
          'show-mask': !e.unref(v) && e.unref(I),
          fit: e.unref(w),
          blur: !e.unref(v),
          'show-mic-volume': e.unref(f),
          'show-tip': !e.unref(v) && !e.unref(d),
          'custom-style': e.unref(p),
          'is-small-window': a.isSmallWindow,
          'is-muted': a.isMuted,
          volume: a.volume,
          'bg-color': 'rgba(0, 0, 0, 0.5)',
        }),
      });
    },
  });
wx.createComponent(n);
