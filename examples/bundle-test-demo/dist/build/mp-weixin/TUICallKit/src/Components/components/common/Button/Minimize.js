'use strict';
const e = require('../../../../../../common/vendor.js'),
  n = require('../../../../TUICallService/index.js'),
  o = require('./hooks/useConfig.js');
Math || i();
const i = () => '../../base/Button/Button.js',
  t = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Minimize',
    setup(i) {
      const t = o.useBtnConfig('minimize', e.ref('basicConfig')),
        c = async () => {
          if (null == document ? void 0 : document.fullscreenElement)
            try {
              null == document || document.exitFullscreen();
            } catch (e) {
              console.debug(e);
            }
          await n.TUICallKitServer.toggleMinimize();
        };
      return (n, o) => ({
        a: e.o(c),
        b: e.p({ iconSrc: e.unref(t).iconSrc, iconSize: e.unref(t).iconSize }),
      });
    },
  }),
  c = e._export_sfc(t, [['__scopeId', 'data-v-fa5c8aaf']]);
wx.createComponent(c);
