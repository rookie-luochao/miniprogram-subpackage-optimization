'use strict';
const e = {
  nickName: { type: String, default: '' },
  isSelf: { type: Boolean, default: !1 },
  isMuted: { type: Boolean, default: !1 },
  volume: { type: Number, default: 0 },
  showNickName: { type: Boolean, default: !1 },
  showSwitchCameraButton: { type: Boolean, default: !1 },
  showVirtualBackgroundButton: { type: Boolean, default: !1 },
  showNetWorkStatus: { type: Boolean, default: !1 },
};
exports.StreamInfoProps = e;
