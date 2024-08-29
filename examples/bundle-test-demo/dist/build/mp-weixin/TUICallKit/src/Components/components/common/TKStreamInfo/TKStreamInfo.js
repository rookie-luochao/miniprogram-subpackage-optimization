'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const o = require('./StreamInfo.js');
require('../../../../TUICallService/const/index.js');
const t = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const r = require('../../../../TUICallService/CallService/index.js');
Math || s();
const s = () => './StreamInfoMobile.js',
  n = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'TKStreamInfo',
    props: o.StreamInfoProps,
    setup(o) {
      const { isGroupCall: s } = t.useCallInfoContext(),
        n = r.TUIGlobal.isPC;
      return (o, t) =>
        e.e(
          { a: e.unref(s) && !e.unref(n) },
          e.unref(s) && !e.unref(n)
            ? {
                b: e.p({
                  showSwitchCameraButton: o.showSwitchCameraButton,
                  showVirtualBackgroundButton: o.showVirtualBackgroundButton,
                  showNetWorkStatus: o.showNetWorkStatus,
                  nickName: o.nickName,
                  showNickName: o.showNickName,
                  isSelf: o.isSelf,
                  isMuted: o.isMuted,
                  volume: o.volume,
                }),
              }
            : {}
        );
    },
  });
wx.createComponent(n);
