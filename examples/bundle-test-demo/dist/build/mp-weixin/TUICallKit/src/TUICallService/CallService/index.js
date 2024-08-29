'use strict';
var e,
  t = Object.defineProperty,
  a = (e, a, i) => (
    ((e, a, i) => {
      a in e
        ? t(e, a, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[a] = i);
    })(e, 'symbol' != typeof a ? a + '' : a, i),
    i
  );
const i = require('../const/index.js'),
  l = require('../../../../common/vendor.js'),
  o = require('./miniProgram.js'),
  r = require('../locales/index.js'),
  n = require('./bellContext.js'),
  s = require('../utils/validate/avoidRepeatedCall.js'),
  C = require('../utils/validate/validateParams.js'),
  A = require('../utils/validate/validateConfig.js'),
  E = require('../utils/validate/validateStatus.js'),
  u = require('../utils/common-utils.js'),
  L = require('./utils.js'),
  c = require('../utils/timer.js'),
  d = require('../TUIGlobal/tuiGlobal.js'),
  _ = require('../TUIStore/tuiStore.js'),
  h = require('./UIDesign.js'),
  S = require('./chatCombine.js'),
  N = require('./engineEventHandler.js'),
  I = require('../const/call.js');
var p = Object.defineProperty,
  M = Object.getOwnPropertyDescriptor,
  m = (e, t, a, i) => {
    for (var l, o = M(t, a), r = e.length - 1; r >= 0; r--)
      (l = e[r]) && (o = l(t, a, o) || o);
    return o && p(t, a, o), o;
  };
const g = d.TUIGlobal.getInstance(),
  T = _.TUIStore.getInstance(),
  D = h.UIDesign.getInstance();
D.setTUIStore(T);
const O = '3.3.3',
  U =
    ((e = class {
      constructor() {
        a(this, '_tuiCallEngine'),
          a(this, '_tim', null),
          a(this, '_TUICore', null),
          a(this, '_timerId', -1),
          a(this, '_startTimeStamp', u.performanceNow()),
          a(this, '_bellContext', null),
          a(this, '_isFromChat', !1),
          a(this, '_currentGroupId', ''),
          a(this, '_preDevicePermission', !1),
          a(this, '_defaultOfflinePushInfo', {
            title: '',
            description: r.t('you have a new call'),
          }),
          a(this, '_permissionCheckTimer', null),
          a(this, '_chatCombine', null),
          a(this, '_engineEventHandler', null),
          a(this, 'beforeCalling'),
          a(this, 'afterCalling'),
          a(this, 'onMinimized'),
          a(this, 'onMessageSentByMe'),
          a(this, 'kickedOut'),
          a(this, 'statusChanged'),
          a(this, '_handleCallStatusChange', async (e) => {
            var t, a, l, o;
            try {
              const r = {
                callRole: T.getData(I.StoreName.CALL, i.NAME.CALL_ROLE),
                callStatus: T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS),
              };
              if (
                (this._bellContext.setBellProperties(r),
                e === I.CallStatus.CALLING)
              )
                await (null == (t = null == this ? void 0 : this._bellContext)
                  ? void 0
                  : t.play());
              else {
                if (e === I.CallStatus.CONNECTED) {
                  const e = T.getData(I.StoreName.CALL, i.NAME.IS_GROUP),
                    t = T.getData(I.StoreName.CALL, i.NAME.CALL_MEDIA_TYPE),
                    a = T.getData(
                      I.StoreName.CALL,
                      i.NAME.REMOTE_USER_INFO_LIST
                    ),
                    l = e
                      ? I.StatusChange.DIALING_GROUP
                      : I.StatusChange.DIALING_C2C;
                  T.update(I.StoreName.CALL, i.NAME.CALL_TIPS, ''),
                    this.statusChanged &&
                      this.statusChanged({
                        oldStatus: l,
                        newStatus: L.generateStatusChangeText(),
                      }),
                    e ||
                      t !== I.CallMediaType.VIDEO ||
                      this.switchScreen(a[0].domId);
                }
                if (e === I.CallStatus.IDLE && this._isFromChat) {
                  const e = this._currentGroupId
                    ? await (null == (a = this._chatCombine)
                        ? void 0
                        : a.getGroupAttributes(this._tim, this._currentGroupId))
                    : {};
                  await (null == (l = this._chatCombine)
                    ? void 0
                    : l.updateStoreBasedOnGroupAttributes(e, T, this));
                }
                await (null == (o = null == this ? void 0 : this._bellContext)
                  ? void 0
                  : o.stop());
              }
            } catch (r) {
              console.warn(`${i.NAME.PREFIX}handleCallStatusChange, ${r}.`);
            }
          }),
          console.log(`${i.NAME.PREFIX}version: ${O}`),
          this._watchTUIStore(),
          (this._chatCombine = S.ChatCombine.getInstance({
            callService: this,
          })),
          (this._engineEventHandler = N.EngineEventHandler.getInstance({
            callService: this,
          }));
      }
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance;
      }
      async init(e) {
        var t, a;
        try {
          if (this._tuiCallEngine) return;
          let {
            userID: o,
            tim: r,
            userSig: s,
            sdkAppID: C,
            SDKAppID: A,
            isFromChat: E,
            component: u = i.COMPONENT.TUI_CALL_KIT,
          } = e;
          this._TUICore &&
            ((C = this._TUICore.SDKAppID), (r = this._TUICore.tim)),
            (this._tim = r),
            console.log(
              `${i.NAME.PREFIX}init sdkAppId: ${C || A}, userId: ${o}`
            ),
            (this._tuiCallEngine = l.QS.createInstance({
              tim: r,
              sdkAppID: C || A,
              callkitVersion: O,
              chat: E || !1,
              component: u,
            })),
            D.setEngineInstance(this._tuiCallEngine),
            this._addListenTuiCallEngineEvent(),
            (this._bellContext = new n.BellContext()),
            T.update(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO, { userId: o }),
            T.update(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, {
              userId: o,
            }),
            D.updateViewBackgroundUserId('local'),
            await this._tuiCallEngine.login({
              userID: o,
              userSig: s,
              assetsPath: '',
            });
          const L = T.getData(I.StoreName.CALL, i.NAME.CUSTOM_UI_CONFIG);
          null ==
            (a = null == (t = this._tuiCallEngine) ? void 0 : t.reportLog) ||
            a.call(t, { name: 'TUICallkit.init', data: { uiConfig: L } });
        } catch (o) {
          throw (console.error(`${i.NAME.PREFIX}init failed, error: ${o}.`), o);
        }
      }
      async destroyed() {
        var e;
        try {
          const t = T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS);
          if (t !== I.CallStatus.IDLE)
            throw new Error(
              `please destroyed when status is idle, current status: ${t}`
            );
          this._tuiCallEngine &&
            (this._removeListenTuiCallEngineEvent(),
            await this._tuiCallEngine.destroyInstance(),
            (this._tuiCallEngine = null)),
            null == (e = this._bellContext) || e.destroy(),
            (this._bellContext = null);
        } catch (t) {
          throw (
            (console.error(`${i.NAME.PREFIX}destroyed failed, error: ${t}.`), t)
          );
        }
      }
      async call(e) {
        if (
          T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS) === I.CallStatus.IDLE
        )
          try {
            const { type: t, userID: a, offlinePushInfo: l } = e;
            if (
              T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS) !==
              I.CallStatus.IDLE
            )
              return;
            await this._updateCallStoreBeforeCall(t, [{ userId: a }]),
              this.executeExternalBeforeCalling(),
              (e.offlinePushInfo = { ...this._defaultOfflinePushInfo, ...l });
            const o = await this._tuiCallEngine.call(e);
            await this._updateCallStoreAfterCall([a], o);
          } catch (t) {
            this._handleCallError(t, 'call');
          }
      }
      async groupCall(e) {
        if (
          T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS) === I.CallStatus.IDLE
        )
          try {
            const {
              userIDList: t,
              type: a,
              groupID: l,
              offlinePushInfo: o,
            } = e;
            if (
              T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS) !==
              I.CallStatus.IDLE
            )
              return;
            const r = t.map((e) => ({ userId: e }));
            await this._updateCallStoreBeforeCall(a, r, l),
              this.executeExternalBeforeCalling(),
              (e.offlinePushInfo = { ...this._defaultOfflinePushInfo, ...o });
            const n = await this._tuiCallEngine.groupCall(e);
            await this._updateCallStoreAfterCall(t, n);
          } catch (t) {
            this._handleCallError(t, 'groupCall');
          }
      }
      async inviteUser(e) {
        if (
          T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS) !== I.CallStatus.IDLE
        )
          try {
            const { userIDList: t } = e;
            let a = await L.getRemoteUserProfile(t, this.getTim());
            const l = T.getData(I.StoreName.CALL, i.NAME.REMOTE_USER_INFO_LIST);
            T.update(I.StoreName.CALL, i.NAME.REMOTE_USER_INFO_LIST, [
              ...l,
              ...a,
            ]),
              T.update(
                I.StoreName.CALL,
                i.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST,
                [...l, ...a]
              ),
              this._tuiCallEngine && (await this._tuiCallEngine.inviteUser(e));
          } catch (t) {
            throw (
              (console.error(`${i.NAME.PREFIX}inviteUser failed, error: ${t}.`),
              this._resetCallStore(),
              t)
            );
          }
      }
      async joinInGroupCall(e) {
        if (
          T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS) !==
          I.CallStatus.CONNECTED
        )
          try {
            const t = {
              [i.NAME.CALL_ROLE]: I.CallRole.CALLEE,
              [i.NAME.IS_GROUP]: !0,
              [i.NAME.CALL_STATUS]: I.CallStatus.CONNECTED,
              [i.NAME.CALL_MEDIA_TYPE]: e.type,
              [i.NAME.GROUP_ID]: e.groupID,
              [i.NAME.ROOM_ID]: e.roomID,
            };
            T.updateStore(t, I.StoreName.CALL);
            const a = await this._tuiCallEngine.joinInGroupCall(e),
              l =
                this._getFeatureButtonDefaultState(I.FeatureButton.Camera) ===
                I.ButtonState.Close;
            e.type === I.CallMediaType.VIDEO &&
              !l &&
              (await this.openCamera(i.NAME.LOCAL_VIDEO)),
              T.update(I.StoreName.CALL, i.NAME.IS_CLICKABLE, !0),
              this.startTimer(),
              T.update(I.StoreName.CALL, i.NAME.PUSHER, a),
              this.setSoundMode(
                e.type === I.CallMediaType.AUDIO
                  ? I.AudioPlayBackDevice.EAR
                  : I.AudioPlayBackDevice.SPEAKER
              );
            const o = T.getData(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO);
            T.update(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO, {
              ...o,
              isEnter: !0,
            }),
              T.update(
                I.StoreName.CALL,
                i.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN,
                { ...o, isEnter: !0 }
              ),
              L.setLocalUserInfoAudioVideoAvailable(!0, i.NAME.AUDIO);
          } catch (t) {
            this._handleCallError(t, 'joinInGroupCall');
          }
      }
      getTUICallEngineInstance() {
        return (null == this ? void 0 : this._tuiCallEngine) || null;
      }
      setLogLevel(e) {
        var t;
        null == (t = null == this ? void 0 : this._tuiCallEngine) ||
          t.setLogLevel(e);
      }
      setLanguage(e) {
        e &&
          Object.values(I.LanguageType).includes(e) &&
          T.update(I.StoreName.CALL, i.NAME.LANGUAGE, e);
      }
      enableFloatWindow(e) {
        T.update(I.StoreName.CALL, i.NAME.ENABLE_FLOAT_WINDOW, e);
      }
      async setSelfInfo(e) {
        const { nickName: t, avatar: a } = e;
        try {
          await this._tuiCallEngine.setSelfInfo(t, a);
        } catch (l) {
          console.error(`${i.NAME.PREFIX}setSelfInfo failed, error: ${l}.`);
        }
      }
      async enableVirtualBackground(e) {
        T.update(I.StoreName.CALL, i.NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND, e);
      }
      async setCallingBell(e) {
        const t = { calleeBellFilePath: e };
        this._bellContext.setBellProperties(t);
      }
      async enableMuteMode(e) {
        try {
          const t = { isMuteBell: e };
          this._bellContext.setBellProperties(t),
            await this._bellContext.setBellMute(e);
        } catch (t) {
          console.warn(`${i.NAME.PREFIX}enableMuteMode failed, error: ${t}.`);
        }
      }
      hideFeatureButton(e) {
        D.hideFeatureButton(e);
      }
      setLocalViewBackgroundImage(e) {
        D.setLocalViewBackgroundImage(e);
      }
      setRemoteViewBackgroundImage(e, t) {
        D.setRemoteViewBackgroundImage(e, t);
      }
      setLayoutMode(e) {
        D.setLayoutMode(e);
      }
      setCameraDefaultState(e) {
        D.setCameraDefaultState(e);
      }
      async accept() {
        var e, t, a, l, o, r;
        const n = T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS);
        if (
          (null ==
            (t = null == (e = this._tuiCallEngine) ? void 0 : e.reportLog) ||
            t.call(e, {
              name: 'TUICallKit.accept.start',
              data: { callStatus: n },
            }),
          n !== I.CallStatus.CONNECTED)
        )
          try {
            const e = {
                microphone: !0,
                camera:
                  T.getData(I.StoreName.CALL, i.NAME.CALL_MEDIA_TYPE) ===
                  I.CallMediaType.VIDEO,
              },
              t = await this._tuiCallEngine.deviceCheck(e);
            t &&
              !this._preDevicePermission &&
              (T.update(I.StoreName.CALL, i.NAME.PUSHER_ID, i.NAME.NEW_PUSHER),
              (this._preDevicePermission = t));
            const o = await this._tuiCallEngine.accept();
            if (o) {
              T.update(
                I.StoreName.CALL,
                i.NAME.CALL_STATUS,
                I.CallStatus.CONNECTED
              ),
                null == (l = this._chatCombine) ||
                  l.callTUIService({
                    message:
                      null == (a = null == o ? void 0 : o.data)
                        ? void 0
                        : a.message,
                  }),
                T.update(I.StoreName.CALL, i.NAME.IS_CLICKABLE, !0),
                this.startTimer();
              const e = T.getData(I.StoreName.CALL, i.NAME.CALL_MEDIA_TYPE),
                t =
                  this._getFeatureButtonDefaultState(I.FeatureButton.Camera) ===
                  I.ButtonState.Close;
              e === I.CallMediaType.VIDEO &&
                !t &&
                (await this.openCamera(i.NAME.LOCAL_VIDEO)),
                o.pusher && T.update(I.StoreName.CALL, i.NAME.PUSHER, o.pusher),
                this.setSoundMode(
                  e === I.CallMediaType.AUDIO
                    ? I.AudioPlayBackDevice.EAR
                    : I.AudioPlayBackDevice.SPEAKER
                );
              const r = T.getData(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO);
              T.update(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO, {
                ...r,
                isEnter: !0,
              }),
                T.update(
                  I.StoreName.CALL,
                  i.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN,
                  { ...r, isEnter: !0 }
                ),
                L.setLocalUserInfoAudioVideoAvailable(!0, i.NAME.AUDIO);
            }
          } catch (s) {
            if (
              (null ==
                (r =
                  null == (o = this._tuiCallEngine) ? void 0 : o.reportLog) ||
                r.call(o, {
                  name: 'TUICallKit.accept.fail',
                  level: 'error',
                  error: s,
                }),
              u.handleRepeatedCallError(s))
            )
              return;
            L.noDevicePermissionToast(
              s,
              I.CallMediaType.AUDIO,
              this._tuiCallEngine
            ),
              this._resetCallStore();
          }
      }
      async hangup() {
        if (
          T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS) !== I.CallStatus.IDLE
        ) {
          try {
            const e = await this._tuiCallEngine.hangup();
            null == e ||
              e.forEach((e) => {
                var t, a;
                0 === (null == e ? void 0 : e.code) &&
                  (null == (a = this._chatCombine) ||
                    a.callTUIService({
                      message:
                        null == (t = null == e ? void 0 : e.data)
                          ? void 0
                          : t.message,
                    }));
              });
          } catch (e) {
            console.debug(e);
          }
          this._resetCallStore();
        }
      }
      async reject() {
        var e, t;
        if (
          T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS) !== I.CallStatus.IDLE
        ) {
          try {
            const a = await this._tuiCallEngine.reject();
            0 === (null == a ? void 0 : a.code) &&
              (null == (t = this._chatCombine) ||
                t.callTUIService({
                  message:
                    null == (e = null == a ? void 0 : a.data)
                      ? void 0
                      : e.message,
                }));
          } catch (a) {
            console.debug(a);
          }
          this._resetCallStore();
        }
      }
      async openCamera(e) {
        try {
          await this._tuiCallEngine.openCamera(),
            L.setLocalUserInfoAudioVideoAvailable(!0, i.NAME.VIDEO);
        } catch (t) {
          L.noDevicePermissionToast(
            t,
            I.CallMediaType.VIDEO,
            this._tuiCallEngine
          ),
            console.error(`${i.NAME.PREFIX}openCamera error: ${t}.`);
        }
      }
      async closeCamera() {
        try {
          await this._tuiCallEngine.closeCamera(),
            L.setLocalUserInfoAudioVideoAvailable(!1, i.NAME.VIDEO);
        } catch (e) {
          console.error(`${i.NAME.PREFIX}closeCamera error: ${e}.`);
        }
      }
      async openMicrophone() {
        try {
          await this._tuiCallEngine.openMicrophone(),
            L.setLocalUserInfoAudioVideoAvailable(!0, i.NAME.AUDIO);
        } catch (e) {
          console.error(`${i.NAME.PREFIX}openMicrophone failed, error: ${e}.`);
        }
      }
      async closeMicrophone() {
        try {
          await this._tuiCallEngine.closeMicrophone(),
            L.setLocalUserInfoAudioVideoAvailable(!1, i.NAME.AUDIO);
        } catch (e) {
          console.error(`${i.NAME.PREFIX}closeMicrophone failed, error: ${e}.`);
        }
      }
      switchScreen(e) {
        e && T.update(I.StoreName.CALL, i.NAME.BIG_SCREEN_USER_ID, e);
      }
      async switchCallMediaType() {
        var e, t;
        try {
          const a = T.getData(I.StoreName.CALL, i.NAME.CALL_MEDIA_TYPE);
          if (a === I.CallMediaType.AUDIO)
            return void console.warn(
              `${i.NAME.PREFIX}switchCallMediaType failed, ${a} not support.`
            );
          const l = await this._tuiCallEngine.switchCallMediaType(
            I.CallMediaType.AUDIO
          );
          0 === (null == l ? void 0 : l.code) &&
            (null == (t = this._chatCombine) ||
              t.callTUIService({
                message:
                  null == (e = null == l ? void 0 : l.data)
                    ? void 0
                    : e.message,
              })),
            T.update(
              I.StoreName.CALL,
              i.NAME.CALL_MEDIA_TYPE,
              I.CallMediaType.AUDIO
            );
          const o = T.getData(I.StoreName.CALL, i.NAME.IS_GROUP)
              ? I.StatusChange.CALLING_GROUP_VIDEO
              : I.StatusChange.CALLING_C2C_VIDEO,
            r = L.generateStatusChangeText();
          this.statusChanged &&
            this.statusChanged({ oldStatus: o, newStatus: r }),
            this.setSoundMode(I.AudioPlayBackDevice.EAR);
        } catch (a) {
          console.error(
            `${i.NAME.PREFIX}switchCallMediaType failed, error: ${a}.`
          );
        }
      }
      async switchCamera() {
        const e =
          T.getData(I.StoreName.CALL, i.NAME.CAMERA_POSITION) ===
          I.CameraPosition.BACK
            ? I.CameraPosition.FRONT
            : I.CameraPosition.BACK;
        try {
          await this._tuiCallEngine.switchCamera(e),
            T.update(I.StoreName.CALL, i.NAME.CAMERA_POSITION, e);
        } catch (t) {
          console.error(`${i.NAME.PREFIX}_switchCamera failed, error: ${t}.`);
        }
      }
      setSoundMode(e) {
        var t;
        try {
          let a = T.getData(I.StoreName.CALL, i.NAME.IS_EAR_PHONE);
          const l =
            e ||
            (a ? I.AudioPlayBackDevice.SPEAKER : I.AudioPlayBackDevice.EAR);
          null == (t = this._tuiCallEngine) || t.selectAudioPlaybackDevice(l),
            (a = e ? e === I.AudioPlayBackDevice.EAR : !a),
            T.update(I.StoreName.CALL, i.NAME.IS_EAR_PHONE, a);
        } catch (a) {
          console.error(`${i.NAME.PREFIX}setSoundMode failed, error: ${a}.`);
        }
      }
      async setBlurBackground(e) {
        try {
          T.update(I.StoreName.CALL, i.NAME.ENABLE_VIRTUAL_BACKGROUND, e);
        } catch (t) {
          console.error(
            `${i.NAME.PREFIX}_setBlurBackground failed, error: ${t}.`
          );
        }
      }
      _addListenTuiCallEngineEvent() {
        this._engineEventHandler.addListenTuiCallEngineEvent();
      }
      _removeListenTuiCallEngineEvent() {
        this._engineEventHandler.removeListenTuiCallEngineEvent();
      }
      setCallback(e) {
        const {
          beforeCalling: t,
          afterCalling: a,
          onMinimized: i,
          onMessageSentByMe: l,
          kickedOut: o,
          statusChanged: r,
        } = e;
        t && (this.beforeCalling = t),
          a && (this.afterCalling = a),
          i && (this.onMinimized = i),
          l && (this.onMessageSentByMe = l),
          o && (this.kickedOut = o),
          r && (this.statusChanged = r);
      }
      toggleMinimize() {
        const e = T.getData(I.StoreName.CALL, i.NAME.IS_MINIMIZED);
        T.update(I.StoreName.CALL, i.NAME.IS_MINIMIZED, !e),
          console.log(`${i.NAME.PREFIX}toggleMinimize: ${e} -> ${!e}.`),
          this.onMinimized && this.onMinimized(e, !e);
      }
      executeExternalBeforeCalling() {
        this.beforeCalling && this.beforeCalling();
      }
      executeExternalAfterCalling() {
        this.afterCalling && this.afterCalling();
      }
      async handleExceptionExit() {
        try {
          if (
            T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS) ===
            I.CallStatus.IDLE
          )
            return;
          this._resetCallStore(),
            await this._tuiCallEngine.handleExceptionExit();
        } catch (e) {
          console.error(
            `${i.NAME.PREFIX} handleExceptionExit failed, error: ${e}.`
          );
        }
      }
      handlePusherError(e) {
        var t;
        'fail:access denied' ===
          (null == (t = null == e ? void 0 : e.detail) ? void 0 : t.errMsg) &&
          o.handleNoPusherCapabilityError();
      }
      setVideoDisplayMode(e) {
        T.update(I.StoreName.CALL, i.NAME.DISPLAY_MODE, e);
      }
      async setVideoResolution(e) {
        var t;
        try {
          if (!e) return;
          T.update(I.StoreName.CALL, i.NAME.VIDEO_RESOLUTION, e),
            await (null == (t = this._tuiCallEngine)
              ? void 0
              : t.setVideoQuality(e));
        } catch (a) {
          console.warn(
            `${i.NAME.PREFIX}setVideoResolution failed, error: ${a}.`
          );
        }
      }
      startTimer() {
        -1 === this._timerId &&
          ((this._startTimeStamp = u.performanceNow()),
          (this._timerId = c.Timer.run(
            i.NAME.TIMEOUT,
            this._updateCallDuration.bind(this),
            { delay: 1e3 }
          )));
      }
      _handleCallError(e, t) {
        if (
          (this._permissionCheckTimer &&
            clearInterval(this._permissionCheckTimer),
          !u.handleRepeatedCallError(e))
        )
          throw (
            (o.handlePackageError(e),
            L.noDevicePermissionToast(
              e,
              I.CallMediaType.AUDIO,
              this._tuiCallEngine
            ),
            console.error(`${i.NAME.PREFIX}${t} failed, error: ${e}.`),
            this._resetCallStore(),
            e)
          );
      }
      async _updateCallStoreBeforeCall(e, t, a) {
        const l =
          a || T.getData(I.StoreName.CALL, i.NAME.IS_MINIMIZED)
            ? r.CallTips.CALLER_GROUP_CALLING_MSG
            : r.CallTips.CALLER_CALLING_MSG;
        let n = {
          [i.NAME.CALL_MEDIA_TYPE]: e,
          [i.NAME.CALL_ROLE]: I.CallRole.CALLER,
          [i.NAME.REMOTE_USER_INFO_LIST]: t,
          [i.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST]: t,
          [i.NAME.IS_GROUP]: !!a,
          [i.NAME.CALL_TIPS]: r.t(l),
          [i.NAME.GROUP_ID]: a,
        };
        const s = { enableCamera: e === I.CallMediaType.VIDEO, enableMic: !0 };
        (n = { ...n, [i.NAME.PUSHER]: s }), T.updateStore(n, I.StoreName.CALL);
        const C = await o.beforeCall(e, this);
        console.log(`${i.NAME.PREFIX}mini beforeCall return callStatus: ${C}.`),
          T.update(I.StoreName.CALL, i.NAME.CALL_STATUS, C);
        const A = await L.getRemoteUserProfile(
          t.map((e) => e.userId),
          this.getTim()
        );
        A.length > 0 &&
          (T.update(I.StoreName.CALL, i.NAME.REMOTE_USER_INFO_LIST, A),
          T.update(
            I.StoreName.CALL,
            i.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST,
            A
          ));
        const E = { microphone: !0, camera: e === I.CallMediaType.VIDEO };
        let u = await this._tuiCallEngine.deviceCheck(E);
        u ||
          (this._permissionCheckTimer &&
            clearInterval(this._permissionCheckTimer),
          (this._permissionCheckTimer = setInterval(async () => {
            (u = await this._tuiCallEngine.deviceCheck(E)),
              u &&
                this._permissionCheckTimer &&
                (clearInterval(this._permissionCheckTimer),
                T.update(
                  I.StoreName.CALL,
                  i.NAME.CALL_STATUS,
                  I.CallStatus.CALLING
                ));
          }, 500)));
      }
      async _updateCallStoreAfterCall(e, t) {
        var a, l;
        if (t) {
          T.update(I.StoreName.CALL, i.NAME.IS_CLICKABLE, !0),
            L.updateRoomIdAndRoomIdType(
              null == t ? void 0 : t.roomID,
              null == t ? void 0 : t.strRoomID
            );
          const e = T.getData(I.StoreName.CALL, i.NAME.CALL_MEDIA_TYPE);
          null == (l = this._chatCombine) ||
            l.callTUIService({
              message:
                null == (a = null == t ? void 0 : t.data) ? void 0 : a.message,
            }),
            t.pusher && T.update(I.StoreName.CALL, i.NAME.PUSHER, t.pusher),
            this.setSoundMode(
              e === I.CallMediaType.AUDIO
                ? I.AudioPlayBackDevice.EAR
                : I.AudioPlayBackDevice.SPEAKER
            ),
            T.update(
              I.StoreName.CALL,
              i.NAME.CALL_STATUS,
              I.CallStatus.CALLING
            );
          const o =
            this._getFeatureButtonDefaultState(I.FeatureButton.Camera) ===
            I.ButtonState.Close;
          e === I.CallMediaType.VIDEO &&
            !o &&
            (await this.openCamera(i.NAME.LOCAL_VIDEO));
          const r = T.getData(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO);
          T.update(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO, {
            ...r,
            isEnter: !0,
          }),
            T.update(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, {
              ...r,
              isEnter: !0,
            }),
            L.setLocalUserInfoAudioVideoAvailable(!0, i.NAME.AUDIO);
        } else
          this._permissionCheckTimer &&
            clearInterval(this._permissionCheckTimer),
            (this._permissionCheckTimer = null),
            this._resetCallStore();
      }
      _getFeatureButtonDefaultState(e) {
        var t;
        const { button: a } = T.getData(
          I.StoreName.CALL,
          i.NAME.CUSTOM_UI_CONFIG
        );
        return null == (t = null == a ? void 0 : a[e]) ? void 0 : t.state;
      }
      _updateCallDuration() {
        const e = Math.round((u.performanceNow() - this._startTimeStamp) / 1e3),
          t = u.formatTime(e);
        T.update(I.StoreName.CALL, i.NAME.CALL_DURATION, t);
      }
      _stopTimer() {
        -1 !== this._timerId &&
          (c.Timer.clearTask(this._timerId), (this._timerId = -1));
      }
      _resetCallStore() {
        const e = L.generateStatusChangeText();
        this._stopTimer();
        let t = Object.keys(i.CALL_DATA_KEY).filter((e) => {
          switch (i.CALL_DATA_KEY[e]) {
            case i.NAME.CALL_STATUS:
            case i.NAME.LANGUAGE:
            case i.NAME.IS_GROUP:
            case i.NAME.DISPLAY_MODE:
            case i.NAME.VIDEO_RESOLUTION:
            case i.NAME.ENABLE_FLOAT_WINDOW:
            case i.NAME.LOCAL_USER_INFO:
            case i.NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND:
            case i.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN:
              return !1;
            default:
              return !0;
          }
        });
        (t = t.map((e) => i.CALL_DATA_KEY[e])), T.reset(I.StoreName.CALL, t);
        T.getData(I.StoreName.CALL, i.NAME.CALL_STATUS) !== I.CallStatus.IDLE &&
          T.reset(I.StoreName.CALL, [i.NAME.CALL_STATUS], !0),
          T.reset(I.StoreName.CALL, [i.NAME.IS_MINIMIZED], !0),
          T.reset(I.StoreName.CALL, [i.NAME.IS_EAR_PHONE], !0),
          T.reset(I.StoreName.CALL, [i.NAME.ENABLE_VIRTUAL_BACKGROUND], !0),
          T.update(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO, {
            ...T.getData(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO),
            isVideoAvailable: !1,
            isAudioAvailable: !1,
          }),
          T.update(I.StoreName.CALL, i.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, {
            ...T.getData(
              I.StoreName.CALL,
              i.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN
            ),
            isVideoAvailable: !1,
            isAudioAvailable: !1,
          }),
          T.update(I.StoreName.CALL, i.NAME.REMOTE_USER_INFO_LIST, []),
          T.update(
            I.StoreName.CALL,
            i.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST,
            []
          );
        const a = L.generateStatusChangeText();
        e !== a &&
          this.statusChanged &&
          this.statusChanged({ oldStatus: e, newStatus: a });
      }
      async getGroupMemberList(e, t) {
        const a = T.getData(I.StoreName.CALL, i.NAME.GROUP_ID);
        return await L.getGroupMemberList(a, this.getTim(), e, t);
      }
      async getGroupProfile() {
        const e = T.getData(I.StoreName.CALL, i.NAME.GROUP_ID);
        return await L.getGroupProfile(e, this.getTim());
      }
      _watchTUIStore() {
        null == T ||
          T.watch(I.StoreName.CALL, {
            [i.NAME.CALL_STATUS]: this._handleCallStatusChange,
          });
      }
      _unwatchTUIStore() {
        null == T ||
          T.unwatch(I.StoreName.CALL, {
            [i.NAME.CALL_STATUS]: this._handleCallStatusChange,
          });
      }
      bindTUICore(e) {
        this._TUICore = e;
      }
      async onNotifyEvent(e, t, a) {
        var i;
        await (null == (i = this._chatCombine)
          ? void 0
          : i.onTUICoreNotifyEvent(e, t, a));
      }
      async onCall(e, t) {
        var a;
        await (null == (a = this._chatCombine) ? void 0 : a.onCall(e, t));
      }
      onGetExtension(e, t) {
        var a;
        return null == (a = this._chatCombine)
          ? void 0
          : a.onGetExtensionTUICore(e, t);
      }
      getTim() {
        var e, t;
        return this._tim
          ? this._tim
          : this._tuiCallEngine
            ? (null == (e = this._tuiCallEngine) ? void 0 : e.tim) ||
              (null == (t = this._tuiCallEngine) ? void 0 : t.getTim())
            : (console.warn(
                `${i.NAME.PREFIX}getTim warning: _tuiCallEngine Instance is not available.`
              ),
              null);
      }
      setIsFromChat(e) {
        this._isFromChat = e;
      }
      setCurrentGroupId(e) {
        this._currentGroupId = e;
      }
      getCurrentGroupId() {
        return this._currentGroupId;
      }
      setDefaultOfflinePushInfo(e) {
        this._defaultOfflinePushInfo = e;
      }
      getDefaultOfflinePushInfo() {
        return this._defaultOfflinePushInfo;
      }
    }),
    a(e, 'instance'),
    e);
m(
  [s.avoidRepeatedCall(), C.paramValidate(A.VALIDATE_PARAMS.init)],
  U.prototype,
  'init'
),
  m(
    [
      s.avoidRepeatedCall(),
      C.paramValidate(A.VALIDATE_PARAMS.call),
      E.statusValidate({ engineInstance: !0 }),
    ],
    U.prototype,
    'call'
  ),
  m(
    [
      s.avoidRepeatedCall(),
      C.paramValidate(A.VALIDATE_PARAMS.groupCall),
      E.statusValidate({ engineInstance: !0 }),
    ],
    U.prototype,
    'groupCall'
  ),
  m(
    [
      s.avoidRepeatedCall(),
      C.paramValidate(A.VALIDATE_PARAMS.inviteUser),
      E.statusValidate({ engineInstance: !0 }),
    ],
    U.prototype,
    'inviteUser'
  ),
  m(
    [
      s.avoidRepeatedCall(),
      C.paramValidate(A.VALIDATE_PARAMS.joinInGroupCall),
      E.statusValidate({ engineInstance: !0 }),
    ],
    U.prototype,
    'joinInGroupCall'
  ),
  m(
    [C.paramValidate(A.VALIDATE_PARAMS.setLanguage)],
    U.prototype,
    'setLanguage'
  ),
  m(
    [C.paramValidate(A.VALIDATE_PARAMS.enableFloatWindow)],
    U.prototype,
    'enableFloatWindow'
  ),
  m(
    [C.paramValidate(A.VALIDATE_PARAMS.setSelfInfo)],
    U.prototype,
    'setSelfInfo'
  ),
  m(
    [C.paramValidate(A.VALIDATE_PARAMS.setCallingBell)],
    U.prototype,
    'setCallingBell'
  ),
  m(
    [C.paramValidate(A.VALIDATE_PARAMS.enableMuteMode)],
    U.prototype,
    'enableMuteMode'
  ),
  m([s.avoidRepeatedCall()], U.prototype, 'accept'),
  m([s.avoidRepeatedCall()], U.prototype, 'hangup'),
  m([s.avoidRepeatedCall()], U.prototype, 'reject'),
  m([s.avoidRepeatedCall()], U.prototype, 'openCamera'),
  m([s.avoidRepeatedCall()], U.prototype, 'closeCamera'),
  m([s.avoidRepeatedCall()], U.prototype, 'openMicrophone'),
  m([s.avoidRepeatedCall()], U.prototype, 'closeMicrophone'),
  m([s.avoidRepeatedCall()], U.prototype, 'switchScreen'),
  m([s.avoidRepeatedCall()], U.prototype, 'switchCallMediaType'),
  m([s.avoidRepeatedCall()], U.prototype, 'switchCamera'),
  m([s.avoidRepeatedCall()], U.prototype, 'setSoundMode'),
  m([s.avoidRepeatedCall()], U.prototype, 'setBlurBackground'),
  m(
    [C.paramValidate(A.VALIDATE_PARAMS.setVideoDisplayMode)],
    U.prototype,
    'setVideoDisplayMode'
  ),
  m(
    [C.paramValidate(A.VALIDATE_PARAMS.setVideoResolution)],
    U.prototype,
    'setVideoResolution'
  );
let R = U;
(exports.TUICallService = R), (exports.TUIGlobal = g), (exports.TUIStore = T);
