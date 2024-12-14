'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../../../../TUICallService/index.js');
require('../../../../TUICallService/const/index.js');
const t = require('./hooks/useConfig.js'),
  s = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const r = require('../../../hooks/usePopover.js'),
  n = require('../../../hooks/useTranslate.js'),
  i = require('./props/Button.js'),
  u = require('../../../../TUICallService/CallService/index.js');
Math || (a + l)();
const a = () => '../../base/Button/Button.js',
  l = () => '../../base/TKText/TKText.js',
  c = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Speaker',
    props: i.ButtonProps,
    setup(i) {
      const a = u.TUIGlobal.isWeChat;
      u.TUIGlobal.isPC;
      const l = i,
        { isEarPhone: c, isMuteSpeaker: p } = e.toRefs(s.useCallInfoContext());
      r.usePopover();
      const d = n.useTranslate(),
        f = e.computed(() => (c.value ? 'closedConfig' : 'basicConfig')),
        h = e.computed(() => (p.value ? 'closedConfig' : 'basicConfig')),
        C = a ? t.useBtnConfig('speaker', f) : t.useBtnConfig('speaker', h),
        v = e.computed(() =>
          c.value ? d.value('speaker disabled') : d.value('speaker enabled')
        ),
        x = async () => {
          o.TUICallKitServer.setSoundMode();
        };
      return (o, t) =>
        e.e(
          {
            a: e.o(x),
            b: e.p({
              iconSrc: e.unref(C).iconSrc,
              color: e.unref(C).color,
              iconSize: l.iconSize || e.unref(C).iconSize,
              width: l.width || e.unref(C).width,
              height: l.height || e.unref(C).height,
              shape: e.unref(C).shape,
            }),
            c: e.unref(C).showText,
          },
          e.unref(C).showText
            ? {
                d: e.t(v.value),
                e: e.p({
                  width: '60px',
                  truncated: !0,
                  textStyle: e.unref(C).textStyle,
                  color: e.unref(C).textColor,
                  size: e.unref(C).textSize,
                  lineClamp: 2,
                }),
              }
            : {}
        );
    },
  }),
  p = e._export_sfc(c, [['__scopeId', 'data-v-e87e7b88']]);
wx.createComponent(p);
