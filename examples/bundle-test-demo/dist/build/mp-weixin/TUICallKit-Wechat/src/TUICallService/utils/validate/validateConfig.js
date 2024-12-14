'use strict';
const e = require('../../const/index.js'),
  r = require('../../const/call.js'),
  l = {
    init: {
      SDKAppID: { required: !0, rules: [e.NAME.NUMBER], allowEmpty: !1 },
      userID: { required: !0, rules: [e.NAME.STRING], allowEmpty: !1 },
      userSig: { required: !0, rules: [e.NAME.STRING], allowEmpty: !1 },
      tim: { required: !1, rules: [e.NAME.OBJECT] },
    },
    call: {
      userID: { required: !0, rules: [e.NAME.STRING], allowEmpty: !1 },
      type: {
        required: !0,
        rules: [e.NAME.NUMBER],
        range: [1, 2],
        allowEmpty: !1,
      },
      roomID: {
        required: !1,
        rules: [e.NAME.NUMBER],
        range: `0~${e.MAX_NUMBER_ROOM_ID}`,
        allowEmpty: !1,
      },
      strRoomID: { required: !1, rules: [e.NAME.STRING], allowEmpty: !0 },
      userData: { required: !1, rules: [e.NAME.STRING], allowEmpty: !1 },
      timeout: { required: !1, rules: [e.NAME.NUMBER], allowEmpty: !1 },
    },
    groupCall: {
      userIDList: { required: !0, rules: [e.NAME.ARRAY], allowEmpty: !1 },
      type: {
        required: !0,
        rules: [e.NAME.NUMBER],
        range: [1, 2],
        allowEmpty: !1,
      },
      groupID: { required: !0, rules: [e.NAME.STRING], allowEmpty: !1 },
      roomID: {
        required: !1,
        rules: [e.NAME.NUMBER],
        range: `0~${e.MAX_NUMBER_ROOM_ID}`,
        allowEmpty: !1,
      },
      strRoomID: { required: !1, rules: [e.NAME.STRING], allowEmpty: !0 },
      timeout: { required: !1, rules: [e.NAME.NUMBER], allowEmpty: !1 },
      userData: { required: !1, rules: [e.NAME.STRING], allowEmpty: !1 },
      offlinePushInfo: { required: !1, rules: [e.NAME.OBJECT], allowEmpty: !1 },
    },
    joinInGroupCall: {
      type: {
        required: !0,
        rules: [e.NAME.NUMBER],
        range: [1, 2],
        allowEmpty: !1,
      },
      groupID: { required: !0, rules: [e.NAME.STRING], allowEmpty: !1 },
      roomID: { required: !0, rules: [e.NAME.NUMBER], allowEmpty: !1 },
      strRoomID: { required: !1, rules: [e.NAME.STRING], allowEmpty: !0 },
    },
    inviteUser: {
      userIDList: { required: !0, rules: [e.NAME.ARRAY], allowEmpty: !1 },
    },
    setSelfInfo: {
      nickName: { required: !1, rules: [e.NAME.STRING], allowEmpty: !1 },
      avatar: { required: !1, rules: [e.NAME.STRING], allowEmpty: !1 },
    },
    enableFloatWindow: [
      { key: 'enable', required: !1, rules: [e.NAME.BOOLEAN], allowEmpty: !1 },
    ],
    enableAIVoice: [
      { key: 'enable', required: !0, rules: [e.NAME.BOOLEAN], allowEmpty: !1 },
    ],
    enableMuteMode: [
      { key: 'enable', required: !0, rules: [e.NAME.BOOLEAN], allowEmpty: !1 },
    ],
    setCallingBell: [
      { key: 'filePath', required: !1, rules: [e.NAME.STRING], allowEmpty: !0 },
    ],
    setLanguage: [
      { key: 'language', required: !0, rules: [e.NAME.STRING], allowEmpty: !1 },
    ],
    setVideoDisplayMode: [
      {
        key: 'displayMode',
        required: !0,
        rules: [e.NAME.STRING],
        range: [
          r.VideoDisplayMode.CONTAIN,
          r.VideoDisplayMode.COVER,
          r.VideoDisplayMode.FILL,
        ],
        allowEmpty: !1,
      },
    ],
    setVideoResolution: [
      {
        key: 'resolution',
        required: !0,
        rules: [e.NAME.STRING],
        range: [
          r.VideoResolution.RESOLUTION_1080P,
          r.VideoResolution.RESOLUTION_480P,
          r.VideoResolution.RESOLUTION_720P,
        ],
        allowEmpty: !1,
      },
    ],
  };
exports.VALIDATE_PARAMS = l;
