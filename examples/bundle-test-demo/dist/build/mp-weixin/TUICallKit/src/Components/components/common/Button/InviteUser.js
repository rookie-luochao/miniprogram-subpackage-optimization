'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const t = require('./props/Button.js'),
  r = require('./hooks/useConfig.js'),
  o = require('../../../../TUICallService/locales/index.js'),
  n = require('../../../../TUICallService/CallService/index.js'),
  i = require('../../../../TUICallService/const/index.js'),
  s = require('../../../../TUICallService/const/call.js');
Math || (c + u)();
const c = () => '../../base/Button/Button.js',
  u = () => '../../base/TKText/TKText.js',
  a = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'InviteUser',
    props: t.ButtonProps,
    setup(t) {
      const c = t,
        u = r.useBtnConfig('inviteUser', e.ref('basicConfig')),
        a = async () => {
          n.TUIStore.update(s.StoreName.CALL, i.NAME.SHOW_SELECT_USER, !0);
        };
      return (t, r) =>
        e.e(
          {
            a: e.o(a),
            b: e.p({
              iconSrc: e.unref(u).iconSrc,
              color: e.unref(u).color,
              iconSize: e.unref(u).iconSize,
              width: c.width || e.unref(u).width,
              height: c.height || e.unref(u).height,
              shape: e.unref(u).shape,
            }),
            c: t.showText,
          },
          t.showText
            ? {
                d: e.t(e.unref(o.t)('invite member')),
                e: e.p({
                  textStyle: e.unref(u).textStyle,
                  color: e.unref(u).textColor,
                  size: e.unref(u).textSize,
                }),
              }
            : {}
        );
    },
  }),
  l = e._export_sfc(a, [['__scopeId', 'data-v-55901ace']]);
wx.createComponent(l);
