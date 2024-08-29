'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../../../../TUICallService/index.js'),
  t = require('./props/Button.js'),
  n = require('./hooks/useConfig.js');
require('../../../../TUICallService/const/index.js');
const r = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const u = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  i = require('../../../../TUICallService/locales/index.js');
Math || (l + s)();
const l = () => '../../base/Button/Button.js',
  s = () => '../../base/TKText/TKText.js',
  a = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'VirtualBackground',
    props: t.ButtonProps,
    setup(t) {
      const l = t,
        s = e.ref(!0),
        { localUserInfoExcludeVolume: a } = e.toRefs(
          u.useUserInfoExcludeVolumeContext()
        ),
        c = e.computed(() => (null == a ? void 0 : a.value.isVideoAvailable)),
        { enableVirtualBackground: d } = e.toRefs(r.useCallInfoContext()),
        f = e.computed(() =>
          s.value
            ? d.value
              ? 'closedConfig'
              : c.value
                ? 'basicConfig'
                : 'disableConfig'
            : 'loadingConfig'
        ),
        g = n.useBtnConfig('virtualBackground', f),
        h = async () => {
          c.value &&
            ((s.value = !1),
            await o.TUICallKitServer.setBlurBackground(!d.value),
            (s.value = !0));
        };
      return (o, t) =>
        e.e(
          {
            a: e.o(h),
            b: e.p({
              loading: !e.unref(s),
              iconSrc: e.unref(g).iconSrc,
              color: e.unref(g).color,
              iconSize: l.iconSize || e.unref(g).iconSize,
              width: l.width || e.unref(g).width,
              height: l.height || e.unref(g).height,
              shape: e.unref(g).shape,
              loadingWidth: e.unref(g).loadingWidth,
              loadingHeight: e.unref(g).loadingHeight,
              buttonStyle: e.unref(g).buttonStyle,
            }),
            c: e.unref(g).showText,
          },
          e.unref(g).showText
            ? {
                d: e.t(e.unref(i.t)('virtual-background')),
                e: e.p({
                  width: '70px',
                  lineClamp: 2,
                  textStyle: e.unref(g).textStyle,
                  color: e.unref(g).textColor,
                  size: e.unref(g).textSize,
                }),
              }
            : {}
        );
    },
  }),
  c = e._export_sfc(a, [['__scopeId', 'data-v-ed7c3368']]);
wx.createComponent(c);
