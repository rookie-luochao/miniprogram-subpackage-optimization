'use strict';
var e = Object.defineProperty,
  t = (t, o, r) => (
    ((t, o, r) => {
      o in t
        ? e(t, o, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[o] = r);
    })(t, 'symbol' != typeof o ? o + '' : o, r),
    r
  );
const o = require('../const/index.js'),
  r = require('../utils/common-utils.js'),
  s = require('../utils/index.js'),
  i = require('../const/call.js');
exports.CallStore = class {
  constructor() {
    t(this, 'defaultStore', {
      callStatus: i.CallStatus.IDLE,
      callRole: i.CallRole.UNKNOWN,
      callMediaType: i.CallMediaType.UNKNOWN,
      localUserInfo: { userId: '' },
      localUserInfoExcludeVolume: { userId: '' },
      remoteUserInfoList: [],
      remoteUserInfoExcludeVolumeList: [],
      callerUserInfo: { userId: '' },
      isGroup: !1,
      callDuration: '00:00:00',
      callTips: '',
      toastInfo: { text: '' },
      isMinimized: !1,
      enableFloatWindow: !1,
      bigScreenUserId: '',
      language: r.getLanguage(),
      isClickable: !1,
      deviceList: {
        cameraList: [],
        microphoneList: [],
        currentCamera: {},
        currentMicrophone: {},
      },
      showPermissionTip: !1,
      netWorkQualityList: [],
      isMuteSpeaker: !1,
      groupID: '',
      roomID: 0,
      roomIdType: 0,
      cameraPosition: i.CameraPosition.FRONT,
      groupCallMembers: [],
      displayMode: i.VideoDisplayMode.COVER,
      videoResolution: i.VideoResolution.RESOLUTION_480P,
      showSelectUser: !1,
      pusher: {},
      player: [],
      isEarPhone: !1,
      pusherId: o.NAME.INITIAL_PUSHER,
      isShowEnableVirtualBackground: !1,
      enableVirtualBackground: !1,
      customUIConfig: {
        button: {},
        viewBackground: {},
        layoutMode: i.LayoutMode.RemoteInLargeView,
      },
    }),
      t(this, 'store', s.deepClone(this.defaultStore)),
      t(this, 'prevStore', s.deepClone(this.defaultStore));
  }
  update(e, t) {
    if (e === o.NAME.CALL_TIPS) {
      const t = this.getData(e);
      this.prevStore[e] = t;
    }
    this.store[e] = t;
  }
  getPrevData(e) {
    return e ? this.prevStore[e] : this.prevStore;
  }
  getData(e) {
    return e ? this.store[e] : this.store;
  }
  reset(e = []) {
    0 === e.length && (e = Object.keys(this.store));
    const t = e.reduce((e, t) => ({ ...e, [t]: this.defaultStore[t] }), {});
    this.store = { ...this.defaultStore, ...this.store, ...t };
  }
};
