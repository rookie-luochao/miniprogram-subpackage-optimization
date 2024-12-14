'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const t = require('./props/Button.js'),
  r = require('./hooks/useConfig.js'),
  o = require('../../../../TUICallService/const/index.js');
require('../../../util/stringToPath.js');
const n = require('../../../hooks/useTranslate.js'),
  s = require('../../../../TUICallService/CallService/index.js'),
  i = require('../../../../TUICallService/const/call.js');
Math || (u + c)();
const u = () => '../../base/Button/Button.js',
  c = () => '../../base/TKText/TKText.js',
  a = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'InviteUser',
    props: t.ButtonProps,
    setup(t) {
      const u = t,
        c = r.useBtnConfig('inviteUser', e.ref('basicConfig')),
        a = n.useTranslate(),
        l = async () => {
          s.TUIStore.update(i.StoreName.CALL, o.NAME.SHOW_SELECT_USER, !0);
        };
      return (t, r) =>
        e.e(
          {
            a: e.o(l),
            b: e.p({
              iconSrc: e.unref(c).iconSrc,
              color: e.unref(c).color,
              iconSize: e.unref(c).iconSize,
              width: u.width || e.unref(c).width,
              height: u.height || e.unref(c).height,
              shape: e.unref(c).shape,
            }),
            c: t.showText,
          },
          t.showText
            ? {
                d: e.t(e.unref(a)('invite member')),
                e: e.p({
                  textStyle: e.unref(c).textStyle,
                  color: e.unref(c).textColor,
                  size: e.unref(c).textSize,
                }),
              }
            : {}
        );
    },
  }),
  l = e._export_sfc(a, [['__scopeId', 'data-v-d5511fb9']]);
wx.createComponent(l);
