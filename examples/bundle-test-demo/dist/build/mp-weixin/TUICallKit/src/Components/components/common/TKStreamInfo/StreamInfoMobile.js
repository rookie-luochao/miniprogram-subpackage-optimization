'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('./StreamInfo.js'),
  r = require('../../../../TUICallService/index.js'),
  s = require('../../../../../../common/assets.js');
require('../../../../TUICallService/const/index.js');
const o = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js'), Math || (u + i + n + c + a)();
const a = () => '../../base/Layout/Row/Row.js',
  n = () => '../../base/Layout/Col/Col.js',
  i = () => '../../base/Icon/Icon.js',
  c = () => '../../base/TKImage/TKImage.js',
  u = () => '../../base/TKText/TKText.js',
  p = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'StreamInfoMobile',
    props: t.StreamInfoProps,
    setup(t) {
      const { enableVirtualBackground: a } = e.toRefs(o.useCallInfoContext()),
        n = async () => {
          await r.TUICallKitServer.switchCamera();
        },
        i = async () => {
          await r.TUICallKitServer.setBlurBackground(!a.value);
        };
      return (t, r) =>
        e.e(
          { a: t.showNickName },
          t.showNickName
            ? {
                b: e.t(t.nickName),
                c: e.p({ width: '100px', truncated: !0, color: '#FFF' }),
              }
            : {},
          {
            d: e.p({ size: 24, src: e.unref(s.MicOnH5) }),
            e: !t.isMuted && t.volume,
            f: e.p({ size: 24, src: e.unref(s.MicOffH5) }),
            g: t.isMuted,
            h: e.p({ span: 12, justify: 'start', align: 'center' }),
            i: t.showNetWorkStatus,
          },
          t.showNetWorkStatus
            ? {
                j: e.p({
                  width: '24px',
                  height: '24px',
                  src: e.unref(s.networkSrc),
                }),
              }
            : {},
          { k: t.showSwitchCameraButton },
          t.showSwitchCameraButton
            ? {
                l: e.p({
                  width: '15px',
                  height: '15px',
                  src: e.unref(s.SwitchCameraSrc),
                }),
                m: e.o(n),
              }
            : {},
          { n: t.showVirtualBackgroundButton },
          t.showVirtualBackgroundButton
            ? {
                o: e.p({
                  width: '15px',
                  height: '15px',
                  src: e.unref(s.VirtualBackgroundOpenSrc),
                }),
                p: e.o(i),
              }
            : {},
          {
            q: e.p({ span: 12, justify: 'end', align: 'center' }),
            r: e.p({ 'custom-style': { padding: '2px 5px' } }),
          }
        );
    },
  }),
  l = e._export_sfc(p, [['__scopeId', 'data-v-f6c90bba']]);
wx.createComponent(l);
