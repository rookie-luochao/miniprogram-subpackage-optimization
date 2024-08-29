'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../../../../../../common/assets.js');
Math || t();
const t = () => '../../base/Overlay/Overlay.js',
  s = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'BackGround',
    setup: (t) => (t, s) => ({
      a: e.p({
        bgColor: '#22262ed9',
        bgImage: e.unref(o.defaultAvatarSrc),
        customStyle: { position: 'absolute', zIndex: 0 },
      }),
    }),
  });
wx.createComponent(s);
