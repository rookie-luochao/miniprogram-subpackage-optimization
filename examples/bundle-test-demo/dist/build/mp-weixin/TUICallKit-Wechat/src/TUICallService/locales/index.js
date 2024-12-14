'use strict';
const e = require('../CallService/index.js'),
  l = require('../const/index.js'),
  i = require('./zh-cn.js'),
  r = require('../utils/common-utils.js'),
  t = require('../const/call.js'),
  o = { 'zh-cn': i.zh };
(exports.CallTips = {
  OTHER_SIDE: 'other side',
  CANCEL: 'cancel',
  OTHER_SIDE_REJECT_CALL: 'other side reject call',
  REJECT_CALL: 'reject call',
  OTHER_SIDE_LINE_BUSY: 'other side line busy',
  IN_BUSY: 'in busy',
  CALL_TIMEOUT: 'call timeout',
  END_CALL: 'end call',
  TIMEOUT: 'timeout',
  KICK_OUT: 'kick out',
  CALLER_CALLING_MSG: 'caller calling message',
  CALLER_GROUP_CALLING_MSG: 'wait to be called',
  CALLEE_CALLING_VIDEO_MSG: 'callee calling video message',
  CALLEE_CALLING_AUDIO_MSG: 'callee calling audio message',
  NO_MICROPHONE_DEVICE_PERMISSION: 'no microphone access',
  NO_CAMERA_DEVICE_PERMISSION: 'no camera access',
  EXIST_GROUP_CALL: 'exist group call',
  LOCAL_NETWORK_IS_POOR: 'The network is poor during your current call',
  REMOTE_NETWORK_IS_POOR:
    'The other user network is poor during the current call',
}),
  (exports.t = function (i) {
    var c, s;
    const n = e.TUIStore.getData(t.StoreName.CALL, l.NAME.LANGUAGE);
    let E = '';
    if (r.isString(i))
      E = (null == (c = null == o ? void 0 : o[n]) ? void 0 : c[i]) || '';
    else if (r.isPlainObject(i)) {
      const { key: e, options: l } = i;
      (E = (null == (s = null == o ? void 0 : o[n]) ? void 0 : s[e]) || ''),
        (E = r.interpolate(E, l));
    }
    return E;
  });
