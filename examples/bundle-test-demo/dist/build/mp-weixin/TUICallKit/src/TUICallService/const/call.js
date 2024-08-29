'use strict';
var e = ((e) => ((e.CALL = 'call'), (e.CUSTOM = 'custom'), e))(e || {}),
  o = ((e) => (
    (e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
    (e[(e.AUDIO = 1)] = 'AUDIO'),
    (e[(e.VIDEO = 2)] = 'VIDEO'),
    e
  ))(o || {}),
  a = ((e) => (
    (e.UNKNOWN = 'unknown'), (e.CALLEE = 'callee'), (e.CALLER = 'caller'), e
  ))(a || {}),
  t = ((e) => (
    (e.IDLE = 'idle'), (e.CALLING = 'calling'), (e.CONNECTED = 'connected'), e
  ))(t || {}),
  i = ((e) => (
    (e.CONTAIN = 'contain'), (e.COVER = 'cover'), (e.FILL = 'fill'), e
  ))(i || {}),
  l = ((e) => (
    (e.RESOLUTION_480P = '480p'),
    (e.RESOLUTION_720P = '720p'),
    (e.RESOLUTION_1080P = '1080p'),
    e
  ))(l || {}),
  r = ((e) => ((e.EN = 'en'), (e['ZH-CN'] = 'zh-cn'), (e.JA_JP = 'ja_JP'), e))(
    r || {}
  );
var n = ((e) => ((e.EAR = 'ear'), (e.SPEAKER = 'speaker'), e))(n || {}),
  C = ((e) => ((e[(e.FRONT = 0)] = 'FRONT'), (e[(e.BACK = 1)] = 'BACK'), e))(
    C || {}
  ),
  c = ((e) => (
    (e.Camera = 'camera'),
    (e.Microphone = 'microphone'),
    (e.SwitchCamera = 'switchCamera'),
    (e.InviteUser = 'inviteUser'),
    e
  ))(c || {}),
  L = ((e) => ((e.Open = 'open'), (e.Close = 'close'), e))(L || {}),
  p = ((e) => ((e.LOCAL = 'local'), (e.REMOTE = 'remote'), e))(p || {}),
  N = ((e) => (
    (e.LocalInLargeView = 'local'), (e.RemoteInLargeView = 'remote'), e
  ))(N || {});
(exports.AudioPlayBackDevice = n),
  (exports.ButtonState = L),
  (exports.CallMediaType = o),
  (exports.CallRole = a),
  (exports.CallStatus = t),
  (exports.CallType = { unknown: 0, audio: 1, video: 2 }),
  (exports.CameraPosition = C),
  (exports.FeatureButton = c),
  (exports.LanguageType = r),
  (exports.LayoutMode = N),
  (exports.StatusChange = {
    IDLE: 'idle',
    BE_INVITED: 'be-invited',
    DIALING_C2C: 'dialing-c2c',
    DIALING_GROUP: 'dialing-group',
    CALLING_C2C_AUDIO: 'calling-c2c-audio',
    CALLING_C2C_VIDEO: 'calling-c2c-video',
    CALLING_GROUP_AUDIO: 'calling-group-audio',
    CALLING_GROUP_VIDEO: 'calling-group-video',
  }),
  (exports.StoreName = e),
  (exports.VideoDisplayMode = i),
  (exports.VideoResolution = l),
  (exports.ViewName = p);
