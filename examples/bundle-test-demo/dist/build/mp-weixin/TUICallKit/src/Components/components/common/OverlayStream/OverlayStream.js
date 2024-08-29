'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const t = require('../../base/util/classNames.js');
require('../../base/util/checkEnv.js'),
  require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const a = require('../../../hooks/useFloatWindowContext.js'),
  o = require('../../../../../../common/assets.js'),
  r = require('../../../../TUICallService/CallService/index.js'),
  s = {
    showOverlayStream: { type: Boolean, default: !0 },
    customClass: { type: String },
    customStyle: { type: Object },
    isSmallWindow: { type: Boolean, default: !1 },
    tip: { type: String, default: null },
    showOverlay: { type: Boolean, default: !0 },
    showMask: { type: Boolean, default: !0 },
    showBackgroundImage: { type: Boolean, default: !0 },
    blur: { type: Boolean, default: !0 },
    bgColor: { type: String },
    bgImage: { type: String, default: o.defaultAvatarSrc },
    overlayZIndex: { type: Number },
    customOverlayClass: { type: String },
    fit: { type: String },
    showLoading: { type: Boolean, default: !1 },
    showAvatar: { type: Boolean, default: !0 },
    avatar: { type: String, default: o.defaultAvatarSrc },
    showUserName: { type: Boolean, default: !0 },
    username: { type: String },
    color: { type: String, default: '#FFF' },
    showMicVolume: { type: Boolean, default: !1 },
    isMuted: { type: Boolean, default: !1 },
    volume: { type: Number, default: 0 },
    showTip: { type: Boolean, default: !0 },
  };
if (!Array) {
  e.resolveComponent('MicrophoneVolume')();
}
Math || (i + n + u + l)();
const l = () => '../../base/Overlay/Overlay.js',
  i = () => '../../base/Loading/Loading.js',
  u = () => '../../base/TKText/TKText.js',
  n = () => '../../base/Avatar/Avatar.js',
  d = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'OverlayStream',
    props: s,
    emits: ['error'],
    setup(s, { emit: l }) {
      const i = l,
        u = s,
        n = e.ref(100),
        { isFloatWindow: d } = e.toRefs(a.useFloatWindowContext()),
        m = r.TUIGlobal.isPC ? '40px' : '20px';
      e.watch(
        [() => u.isSmallWindow, d],
        () => {
          d.value
            ? (n.value = u.isSmallWindow ? 20 : 40)
            : (n.value = u.isSmallWindow ? 40 : 100);
        },
        { immediate: !0 }
      );
      const p = e.computed(() =>
          t.classNames([
            'overlay-stream-container',
            { pc: r.TUIGlobal.isPC, mobile: !r.TUIGlobal.isPC, float: d.value },
          ])
        ),
        c = (e) => {
          i('error', e);
        };
      return (t, a) =>
        e.e(
          { a: t.showOverlayStream },
          t.showOverlayStream
            ? e.e(
                { b: t.showLoading },
                t.showLoading ? { c: e.p({ mode: 'dot' }) } : {},
                { d: t.showAvatar },
                t.showAvatar
                  ? {
                      e: e.p({
                        src: t.avatar || e.unref(o.defaultAvatarSrc),
                        size: e.unref(n),
                      }),
                    }
                  : {},
                { f: t.showUserName },
                t.showUserName
                  ? {
                      g: e.t(t.username),
                      h: e.p({
                        truncated: !0,
                        size: e.unref(m),
                        color: t.color,
                        width: '200px',
                        weight: 500,
                      }),
                    }
                  : {},
                { i: t.showMicVolume },
                t.showMicVolume
                  ? { j: e.p({ isMuted: t.isMuted, volume: t.volume }) }
                  : {},
                { k: t.showTip && t.tip },
                t.showTip && t.tip ? { l: e.t(t.tip) } : {},
                {
                  m: e.o(c),
                  n: e.p({
                    show: t.showOverlay,
                    'show-background-image': t.showBackgroundImage,
                    'show-mask': t.showMask,
                    blur: t.blur,
                    zIndex: t.overlayZIndex,
                    bgColor: t.bgColor,
                    bgImage: t.bgImage || e.unref(o.defaultAvatarSrc),
                    fit: t.fit,
                    defaultSrc: e.unref(o.defaultAvatarSrc),
                    customStyle: {
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    },
                    'custom-mask-style': {
                      'backdrop-filter': 'blur(12px)',
                      '-webkit-backdrop-filter': 'blur(12px)',
                    },
                    customClass: t.customOverlayClass,
                  }),
                  o: e.n(e.unref(p)),
                  p: e.s(t.customStyle),
                }
              )
            : {}
        );
    },
  }),
  m = e._export_sfc(d, [['__scopeId', 'data-v-2a1526fc']]);
wx.createComponent(m);
