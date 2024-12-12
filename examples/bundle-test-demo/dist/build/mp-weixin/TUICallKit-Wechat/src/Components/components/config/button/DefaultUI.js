'use strict';
require('../../../../TUICallService/index.js');
const o = require('../../../../../../common/assets.js'),
  c = !require('../../../../TUICallService/CallService/index.js').TUIGlobal
    .isPC;
let i = o.MinimizeMobileSrc,
  a = o.InviteUserMobileSrc;
const n = {
    width: c ? '60px' : '40px',
    height: c ? '60px' : '40px',
    shape: 'circle',
    iconSize: c ? 30 : 20,
    showText: !0,
    textColor: '#D5E0F2',
    textSize: '12px',
    textStyle: { marginTop: '5px' },
  },
  e = {
    accept: {
      basicConfig: { ...n, color: '#51C271', iconSrc: o.AcceptSrc },
      loadingConfig: {
        ...n,
        color: '#51C271',
        loadingWidth: c ? '30px' : '20px',
        loadingHeight: c ? '30px' : '20px',
      },
    },
    hangup: {
      basicConfig: { ...n, color: '#ED4651', iconSrc: o.HangupSrc },
      loadingConfig: {
        ...n,
        color: '#ED4651',
        loadingWidth: c ? '30px' : '20px',
        loadingHeight: c ? '30px' : '20px',
      },
    },
    reject: { basicConfig: { ...n, color: '#ED4651', iconSrc: o.HangupSrc } },
    camera: {
      basicConfig: {
        ...n,
        color: '#FFFFFF',
        iconSrc: o.CameraOpenSrc,
        shape: 'circle',
      },
      closedConfig: { ...n, color: '#6b758a4d', iconSrc: o.CameraCloseSrc },
      loadingConfig: {
        ...n,
        color: '#6b758a4d',
        loadingWidth: c ? '30px' : '20px',
        loadingHeight: c ? '30px' : '20px',
      },
    },
    microphone: {
      basicConfig: { ...n, color: '#FFFFFF', iconSrc: o.MicrophoneOpenSrc },
      closedConfig: { ...n, color: '#6b758a4d', iconSrc: o.MicrophoneCloseSrc },
    },
    speaker: {
      basicConfig: { ...n, color: '#FFFFFF', iconSrc: o.SpeakerOpenSrc },
      closedConfig: { ...n, color: '#6b758a4d', iconSrc: o.SpeakerCloseSrc },
    },
    minimize: { basicConfig: { iconSize: c ? 24 : 20, iconSrc: i } },
    switchCamera: {
      basicConfig: {
        ...n,
        color: 'transparent',
        iconSrc: o.SwitchCameraSrc,
        shape: 'circle',
      },
    },
    inviteUser: {
      basicConfig: {
        ...n,
        color: c ? '' : '#6b758a4d',
        width: c ? '24px' : '40px',
        height: c ? '24px' : '40px',
        shape: c ? '' : 'circle',
        iconSize: c ? 24 : 20,
        iconSrc: a,
      },
    },
    toggleButtonPanel: {
      basicConfig: {
        color: 'transparent',
        width: '40px',
        height: '40px',
        shape: 'circle',
        iconSize: 40,
        iconSrc: o.DownSrc,
      },
    },
    virtualBackground: {
      basicConfig: {
        ...n,
        color: '#6b758a4d',
        iconSrc: o.VirtualBackgroundOpenSrc,
        shape: 'circle',
      },
      closedConfig: {
        ...n,
        color: '#FFFFFF',
        iconSrc: o.VirtualBackgroundCloseSrc,
      },
      loadingConfig: {
        ...n,
        color: '#6b758a4d',
        loadingWidth: c ? '30px' : '20px',
        loadingHeight: c ? '30px' : '20px',
      },
      disableConfig: {
        ...n,
        color: '#6b758a4d',
        iconSrc: o.VirtualBackgroundOpenSrc,
        buttonStyle: { opacity: 0.6 },
      },
    },
  },
  r = {
    singleCall: {
      video: {
        calling: {
          ...e,
          switchCamera: {
            basicConfig: {
              ...n,
              color: '#6b758a4d',
              iconSrc: o.SwitchCameraSrc,
              shape: 'circle',
              showText: !0,
            },
            disableConfig: {
              ...n,
              color: '#6b758a4d',
              iconSrc: o.SwitchCameraSrc,
              shape: 'circle',
              showText: !0,
              buttonStyle: { opacity: 0.6 },
            },
          },
          hangup: {
            basicConfig: { ...e.hangup.basicConfig },
            loadingConfig: { ...e.hangup.loadingConfig },
          },
          reject: { basicConfig: { ...e.reject.basicConfig, showText: !1 } },
        },
        accept: {
          ...e,
          switchCamera: {
            basicConfig: {
              ...n,
              color: '#6b758a4d',
              iconSrc: o.SwitchCameraSrc,
              shape: 'circle',
            },
            disableConfig: {
              ...n,
              color: '#6b758a4d',
              iconSrc: o.SwitchCameraSrc,
              shape: 'circle',
              showText: !0,
              buttonStyle: { opacity: 0.6 },
            },
          },
          accept: {
            basicConfig: { ...e.accept.basicConfig, showText: !1 },
            loadingConfig: { ...e.accept.loadingConfig, showText: !1 },
          },
          reject: { basicConfig: { ...e.reject.basicConfig, showText: !1 } },
        },
        connected: {
          ...e,
          virtualBackground: {
            basicConfig: {
              ...n,
              color: 'transparent',
              iconSrc: o.VirtualBackgroundOpenSrc,
              shape: 'circle',
              showText: !1,
            },
            closedConfig: {
              ...n,
              color: 'transparent',
              iconSrc: o.VirtualBackgroundOpenSrc,
              showText: !1,
            },
            disableConfig: {
              ...n,
              color: 'transparent',
              iconSrc: o.VirtualBackgroundOpenSrc,
              showText: !1,
              buttonStyle: { opacity: 0.6 },
            },
          },
          hangup: {
            basicConfig: { ...e.hangup.basicConfig, showText: !1 },
            loadingConfig: { ...e.hangup.loadingConfig, showText: !1 },
          },
          switchCamera: {
            basicConfig: { ...e.switchCamera.basicConfig, showText: !1 },
            disableConfig: {
              ...e.switchCamera.basicConfig,
              showText: !1,
              buttonStyle: { opacity: 0.6 },
            },
          },
        },
      },
      audio: { calling: e, accept: e, connected: e },
    },
    groupCall: {
      video: {
        calling: {
          ...e,
          switchCamera: {
            basicConfig: {
              ...n,
              color: '#6b758a4d',
              iconSrc: o.SwitchCameraSrc,
              shape: 'circle',
            },
          },
          hangup: {
            basicConfig: { ...e.hangup.basicConfig, showText: !1 },
            loadingConfig: { ...e.hangup.loadingConfig, showText: !1 },
          },
          accept: {
            basicConfig: { ...e.accept.basicConfig, showText: !1 },
            loadingConfig: { ...e.accept.loadingConfig, showText: !1 },
          },
          reject: { basicConfig: { ...e.reject.basicConfig, showText: !1 } },
        },
        accept: {
          ...e,
          hangup: {
            basicConfig: { ...e.hangup.basicConfig, showText: !1 },
            loadingConfig: { ...e.hangup.loadingConfig, showText: !1 },
          },
          accept: {
            basicConfig: { ...e.accept.basicConfig, showText: !1 },
            loadingConfig: { ...e.accept.loadingConfig, showText: !1 },
          },
          reject: { basicConfig: { ...e.reject.basicConfig, showText: !1 } },
        },
        connected: {
          ...e,
          virtualBackground: {
            basicConfig: {
              ...n,
              color: 'transparent',
              iconSrc: o.VirtualBackgroundOpenSrc,
              shape: 'circle',
              showText: !1,
            },
            closedConfig: {
              ...n,
              color: 'transparent',
              iconSrc: o.VirtualBackgroundCloseSrc,
              showText: !1,
            },
          },
          hangup: {
            basicConfig: { ...e.hangup.basicConfig, showText: !1 },
            loadingConfig: { ...e.hangup.loadingConfig, showText: !1 },
          },
        },
      },
      audio: {
        calling: {
          ...e,
          switchCamera: {
            basicConfig: {
              ...n,
              color: '#6b758a4d',
              iconSrc: o.SwitchCameraSrc,
              shape: 'circle',
            },
          },
          hangup: {
            basicConfig: { ...e.hangup.basicConfig, showText: !1 },
            loadingConfig: { ...e.hangup.loadingConfig, showText: !1 },
          },
          accept: {
            basicConfig: { ...e.accept.basicConfig, showText: !1 },
            loadingConfig: { ...e.accept.loadingConfig, showText: !1 },
          },
          reject: { basicConfig: { ...e.reject.basicConfig, showText: !1 } },
        },
        accept: {
          ...e,
          hangup: {
            basicConfig: { ...e.hangup.basicConfig, showText: !1 },
            loadingConfig: { ...e.hangup.loadingConfig, showText: !1 },
          },
          accept: {
            basicConfig: { ...e.accept.basicConfig, showText: !1 },
            loadingConfig: { ...e.accept.loadingConfig, showText: !1 },
          },
          reject: { basicConfig: { ...e.reject.basicConfig, showText: !1 } },
        },
        connected: {
          ...e,
          hangup: {
            basicConfig: { ...e.hangup.basicConfig, showText: !1 },
            loadingConfig: { ...e.hangup.loadingConfig, showText: !1 },
          },
          virtualBackground: {
            basicConfig: {
              ...n,
              color: 'transparent',
              iconSrc: o.VirtualBackgroundOpenSrc,
              shape: 'circle',
            },
            closedConfig: {
              ...n,
              color: 'transparent',
              iconSrc: o.VirtualBackgroundCloseSrc,
            },
          },
        },
      },
    },
  },
  g = {
    pc: {
      singleCall: {
        video: { calling: e, accept: e, connected: e },
        audio: { calling: e, accept: e, connected: e },
      },
      groupCall: {
        video: { calling: e, accept: e, connected: e },
        audio: { calling: e, accept: e, connected: e },
      },
    },
    mobile: r,
  };
(exports.InitialUI = g), (exports.MobileUI = r), (exports.defaultButtonUI = e);
