'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../../../../TUICallService/index.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const i = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  r = require('../../../hooks/usePopover.js'),
  t = require('./props/Button.js'),
  l = require('./hooks/useConfig.js'),
  n = require('../../../../TUICallService/CallService/index.js'),
  a = require('../../../../TUICallService/locales/index.js');
Math || (u + s)();
const u = () => '../../base/Button/Button.js',
  s = () => '../../base/TKText/TKText.js',
  c = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Camera',
    props: t.ButtonProps,
    setup(t) {
      const u = t,
        s = e.ref(!0),
        c = n.TUIGlobal.isPC,
        { localUserInfoExcludeVolume: d } = e.toRefs(
          i.useUserInfoExcludeVolumeContext()
        ),
        f = e.ref(null == d ? void 0 : d.value.isVideoAvailable),
        v = e.computed(() => (null == d ? void 0 : d.value.isVideoAvailable));
      r.usePopover();
      const h = e.computed(() =>
          s.value ? (v.value ? 'basicConfig' : 'closedConfig') : 'loadingConfig'
        ),
        C = e.computed(() =>
          (null == d ? void 0 : d.value.isVideoAvailable)
            ? a.t('camera enabled')
            : a.t('camera disabled')
        ),
        p = l.useBtnConfig('camera', h),
        x = async () => {
          (s.value = !1),
            (f.value = !v.value),
            v.value
              ? await o.TUICallKitServer.closeCamera()
              : await o.TUICallKitServer.openCamera('localVideo'),
            (s.value = !0);
        };
      return (o, i) =>
        e.e(
          { a: !e.unref(c) },
          e.unref(c)
            ? {}
            : {
                b: e.o(x),
                c: e.p({
                  loading: !e.unref(s),
                  iconSrc: e.unref(p).iconSrc,
                  color: e.unref(p).color,
                  iconSize: u.iconSize || e.unref(p).iconSize,
                  width: u.width || e.unref(p).width,
                  height: u.height || e.unref(p).height,
                  loadingWidth: e.unref(p).loadingWidth,
                  loadingHeight: e.unref(p).loadingHeight,
                  shape: 'circle',
                }),
              },
          { d: e.unref(p).showText },
          e.unref(p).showText
            ? {
                e: e.t(e.unref(C)),
                f: e.p({
                  textStyle: e.unref(p).textStyle,
                  color: e.unref(p).textColor,
                  size: e.unref(p).textSize,
                }),
              }
            : {}
        );
    },
  }),
  d = e._export_sfc(c, [['__scopeId', 'data-v-52c34218']]);
wx.createComponent(d);
