'use strict';
var e = ((e) => ((e.CALL = 'call'), (e.CUSTOM = 'custom'), e))(e || {}),
  o = ((e) => (
    (e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
    (e[(e.AUDIO = 1)] = 'AUDIO'),
    (e[(e.VIDEO = 2)] = 'VIDEO'),
    e
  ))(o || {}),
  I = ((e) => (
    (e.UNKNOWN = 'unknown'), (e.CALLEE = 'callee'), (e.CALLER = 'caller'), e
  ))(I || {}),
  a = ((e) => (
    (e.IDLE = 'idle'), (e.CALLING = 'calling'), (e.CONNECTED = 'connected'), e
  ))(a || {}),
  t = ((e) => (
    (e.CONTAIN = 'contain'), (e.COVER = 'cover'), (e.FILL = 'fill'), e
  ))(t || {}),
  C = ((e) => (
    (e.RESOLUTION_480P = '480p'),
    (e.RESOLUTION_720P = '720p'),
    (e.RESOLUTION_1080P = '1080p'),
    e
  ))(C || {});
var E = ((e) => ((e.EAR = 'ear'), (e.SPEAKER = 'speaker'), e))(E || {}),
  i = ((e) => ((e[(e.FRONT = 0)] = 'FRONT'), (e[(e.BACK = 1)] = 'BACK'), e))(
    i || {}
  ),
  l = ((e) => (
    (e.Camera = 'camera'),
    (e.Microphone = 'microphone'),
    (e.SwitchCamera = 'switchCamera'),
    (e.InviteUser = 'inviteUser'),
    e
  ))(l || {}),
  N = ((e) => ((e.Open = 'open'), (e.Close = 'close'), e))(N || {}),
  r = ((e) => ((e.LOCAL = 'local'), (e.REMOTE = 'remote'), e))(r || {}),
  L = ((e) => (
    (e.LocalInLargeView = 'local'), (e.RemoteInLargeView = 'remote'), e
  ))(L || {}),
  O = ((e) => (
    (e[(e.INVITE = 1)] = 'INVITE'),
    (e[(e.CANCEL_INVITE = 2)] = 'CANCEL_INVITE'),
    (e[(e.ACCEPT_INVITE = 3)] = 'ACCEPT_INVITE'),
    (e[(e.REJECT_INVITE = 4)] = 'REJECT_INVITE'),
    (e[(e.INVITE_TIMEOUT = 5)] = 'INVITE_TIMEOUT'),
    e
  ))(O || {});
(exports.ACTION_TYPE = O),
  (exports.AudioPlayBackDevice = E),
  (exports.ButtonState = N),
  (exports.CallMediaType = o),
  (exports.CallRole = I),
  (exports.CallStatus = a),
  (exports.CallType = { unknown: 0, audio: 1, video: 2 }),
  (exports.CameraPosition = i),
  (exports.FeatureButton = l),
  (exports.LayoutMode = L),
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
  (exports.VideoDisplayMode = t),
  (exports.VideoResolution = C),
  (exports.ViewName = r);
