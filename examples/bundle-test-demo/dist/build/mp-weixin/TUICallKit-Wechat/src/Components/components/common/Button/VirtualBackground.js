'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../../../../TUICallService/index.js'),
  t = require('./props/Button.js'),
  n = require('./hooks/useConfig.js');
require('../../../../TUICallService/const/index.js');
const r = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const u = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  i = require('../../../hooks/useTranslate.js');
Math || (s + l)();
const s = () => '../../base/Button/Button.js',
  l = () => '../../base/TKText/TKText.js',
  a = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'VirtualBackground',
    props: t.ButtonProps,
    setup(t) {
      const s = t,
        l = e.ref(!0),
        { localUserInfoExcludeVolume: a } = e.toRefs(
          u.useUserInfoExcludeVolumeContext()
        ),
        c = e.computed(() => (null == a ? void 0 : a.value.isVideoAvailable)),
        { enableVirtualBackground: d } = e.toRefs(r.useCallInfoContext()),
        f = e.computed(() =>
          l.value
            ? d.value
              ? 'closedConfig'
              : c.value
                ? 'basicConfig'
                : 'disableConfig'
            : 'loadingConfig'
        ),
        h = n.useBtnConfig('virtualBackground', f),
        g = i.useTranslate(),
        x = async () => {
          c.value &&
            ((l.value = !1),
            await o.TUICallKitServer.setBlurBackground(!d.value),
            (l.value = !0));
        };
      return (o, t) =>
        e.e(
          {
            a: e.o(x),
            b: e.p({
              loading: !e.unref(l),
              iconSrc: e.unref(h).iconSrc,
              color: e.unref(h).color,
              iconSize: s.iconSize || e.unref(h).iconSize,
              width: s.width || e.unref(h).width,
              height: s.height || e.unref(h).height,
              shape: e.unref(h).shape,
              loadingWidth: e.unref(h).loadingWidth,
              loadingHeight: e.unref(h).loadingHeight,
              buttonStyle: e.unref(h).buttonStyle,
            }),
            c: e.unref(h).showText,
          },
          e.unref(h).showText
            ? {
                d: e.t(e.unref(g)('virtual-background')),
                e: e.p({
                  width: '70px',
                  lineClamp: 2,
                  textStyle: e.unref(h).textStyle,
                  color: e.unref(h).textColor,
                  size: e.unref(h).textSize,
                }),
              }
            : {}
        );
    },
  }),
  c = e._export_sfc(a, [['__scopeId', 'data-v-7a7a13cf']]);
wx.createComponent(c);
