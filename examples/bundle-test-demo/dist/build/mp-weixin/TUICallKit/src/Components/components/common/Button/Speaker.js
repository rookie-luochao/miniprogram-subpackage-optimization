'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../../../../TUICallService/index.js');
require('../../../../TUICallService/const/index.js');
const t = require('./hooks/useConfig.js'),
  r = require('./props/Button.js'),
  s = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const n = require('../../../hooks/usePopover.js'),
  i = require('../../../../TUICallService/CallService/index.js'),
  u = require('../../../../TUICallService/locales/index.js');
Math || (a + c)();
const a = () => '../../base/Button/Button.js',
  c = () => '../../base/TKText/TKText.js',
  l = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Speaker',
    props: r.ButtonProps,
    setup(r) {
      const a = i.TUIGlobal.isWeChat;
      i.TUIGlobal.isPC;
      const c = r,
        { isEarPhone: l, isMuteSpeaker: p } = e.toRefs(s.useCallInfoContext());
      n.usePopover();
      const f = e.computed(() => (l.value ? 'closedConfig' : 'basicConfig')),
        C = e.computed(() => (p.value ? 'closedConfig' : 'basicConfig')),
        d = a ? t.useBtnConfig('speaker', f) : t.useBtnConfig('speaker', C),
        h = e.computed(() =>
          l.value ? u.t('ear piece') : u.t('speaker phone')
        ),
        x = async () => {
          o.TUICallKitServer.setSoundMode();
        };
      return (o, t) =>
        e.e(
          {
            a: e.o(x),
            b: e.p({
              iconSrc: e.unref(d).iconSrc,
              color: e.unref(d).color,
              iconSize: c.iconSize || e.unref(d).iconSize,
              width: c.width || e.unref(d).width,
              height: c.height || e.unref(d).height,
              shape: e.unref(d).shape,
            }),
            c: e.unref(d).showText,
          },
          e.unref(d).showText
            ? {
                d: e.t(h.value),
                e: e.p({
                  width: '60px',
                  truncated: !0,
                  textStyle: e.unref(d).textStyle,
                  color: e.unref(d).textColor,
                  size: e.unref(d).textSize,
                  lineClamp: 2,
                }),
              }
            : {}
        );
    },
  }),
  p = e._export_sfc(l, [['__scopeId', 'data-v-22695edf']]);
wx.createComponent(p);
