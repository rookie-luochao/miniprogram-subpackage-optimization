'use strict';
const e = require('../CallService/index.js'),
  r = require('../const/index.js'),
  n = require('./en.js'),
  o = require('./zh-cn.js'),
  c = require('./ja_JP.js'),
  t = require('../const/call.js'),
  s = { en: n.en, 'zh-cn': o.zh, ja_JP: c.ja_JP };
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
  (exports.t = function (n) {
    var o;
    const c = e.TUIStore.getData(t.StoreName.CALL, r.NAME.LANGUAGE);
    for (const e in s)
      if (e === c) {
        const r = s[e];
        for (const e in r) if (e === n) return r[e];
      }
    const l = null == (o = n.en) ? void 0 : o.key;
    return console.error(`${r.NAME.PREFIX}translation is not found: ${n}.`), l;
  });
