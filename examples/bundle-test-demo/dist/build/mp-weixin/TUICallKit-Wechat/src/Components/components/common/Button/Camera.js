'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../../../../TUICallService/index.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const r = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  i = require('../../../hooks/usePopover.js'),
  n = require('../../../hooks/useTranslate.js'),
  t = require('./props/Button.js'),
  l = require('./hooks/useConfig.js'),
  a = require('../../../../TUICallService/CallService/index.js');
Math || (u + s)();
const u = () => '../../base/Button/Button.js',
  s = () => '../../base/TKText/TKText.js',
  c = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Camera',
    props: t.ButtonProps,
    setup(t) {
      const u = n.useTranslate(),
        s = t,
        c = e.ref(!0),
        d = a.TUIGlobal.isPC,
        { localUserInfoExcludeVolume: f } = e.toRefs(
          r.useUserInfoExcludeVolumeContext()
        ),
        v = e.ref(null == f ? void 0 : f.value.isVideoAvailable),
        h = e.computed(() => (null == f ? void 0 : f.value.isVideoAvailable));
      i.usePopover();
      const p = e.computed(() =>
          c.value ? (h.value ? 'basicConfig' : 'closedConfig') : 'loadingConfig'
        ),
        C = e.computed(() =>
          (null == f ? void 0 : f.value.isVideoAvailable)
            ? u.value('camera enabled')
            : u.value('camera disabled')
        ),
        x = l.useBtnConfig('camera', p),
        g = async () => {
          (c.value = !1),
            (v.value = !h.value),
            h.value
              ? await o.TUICallKitServer.closeCamera()
              : await o.TUICallKitServer.openCamera('localVideo'),
            (c.value = !0);
        };
      return (o, r) =>
        e.e(
          { a: !e.unref(d) },
          e.unref(d)
            ? {}
            : {
                b: e.o(g),
                c: e.p({
                  loading: !e.unref(c),
                  iconSrc: e.unref(x).iconSrc,
                  color: e.unref(x).color,
                  iconSize: s.iconSize || e.unref(x).iconSize,
                  width: s.width || e.unref(x).width,
                  height: s.height || e.unref(x).height,
                  loadingWidth: e.unref(x).loadingWidth,
                  loadingHeight: e.unref(x).loadingHeight,
                  shape: 'circle',
                }),
              },
          { d: e.unref(x).showText },
          e.unref(x).showText
            ? {
                e: e.t(e.unref(C)),
                f: e.p({
                  textStyle: e.unref(x).textStyle,
                  color: e.unref(x).textColor,
                  size: e.unref(x).textSize,
                }),
              }
            : {}
        );
    },
  }),
  d = e._export_sfc(c, [['__scopeId', 'data-v-62555538']]);
wx.createComponent(d);
