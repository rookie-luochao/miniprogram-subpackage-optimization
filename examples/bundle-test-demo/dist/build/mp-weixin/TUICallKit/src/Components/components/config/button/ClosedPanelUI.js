'use strict';
const o = require('../../../../../../common/assets.js'),
  c = require('./DefaultUI.js'),
  e = {
    width: '40px',
    height: '40px',
    shape: 'circle',
    iconSize: 20,
    textColor: '#D5E0F2',
  },
  i = {
    microphone: {
      basicConfig: { ...e, color: '#FFFFFF', iconSrc: o.MicrophoneOpenSrc },
      closedConfig: { ...e, color: '#6b758a4d', iconSrc: o.MicrophoneCloseSrc },
    },
    speaker: {
      basicConfig: { ...e, color: '#FFFFFF', iconSrc: o.SpeakerOpenSrc },
      closedConfig: { ...e, color: '#6b758a4d', iconSrc: o.SpeakerCloseSrc },
    },
    camera: {
      basicConfig: { ...e, color: '#FFFFFF', iconSrc: o.CameraOpenSrc },
      closedConfig: { ...e, color: '#6b758a4d', iconSrc: o.CameraCloseSrc },
    },
    hangup: {
      basicConfig: { ...e, color: '#ED4651', iconSrc: o.HangupSrc },
      loadingConfig: {
        ...e,
        color: '#ED4651',
        loadingWidth: '20px',
        loadingHeight: '20px',
      },
    },
    toggleButtonPanel: {
      basicConfig: {
        color: 'transparent',
        width: '40px',
        height: '40px',
        shape: 'circle',
        iconSize: 40,
        iconSrc: o.UpSrc,
      },
    },
  },
  l = {
    mobile: {
      ...c.MobileUI,
      groupCall: {
        video: {
          ...c.MobileUI.groupCall.video,
          calling: { ...c.MobileUI.groupCall.video.calling, ...i },
          connected: { ...c.MobileUI.groupCall.video.connected, ...i },
        },
        audio: {
          ...c.MobileUI.groupCall.audio,
          calling: { ...c.MobileUI.groupCall.audio.calling, ...i },
          connected: { ...c.MobileUI.groupCall.audio.connected, ...i },
        },
      },
    },
  };
exports.closedPanelUI = l;
