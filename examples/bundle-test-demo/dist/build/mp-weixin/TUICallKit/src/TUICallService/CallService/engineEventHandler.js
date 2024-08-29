'use strict';
var e = Object.defineProperty,
  t = (t, a, l) => (
    ((t, a, l) => {
      a in t
        ? e(t, a, { enumerable: !0, configurable: !0, writable: !0, value: l })
        : (t[a] = l);
    })(t, 'symbol' != typeof a ? a + '' : a, l),
    l
  );
const a = require('../const/index.js'),
  l = require('../../../../common/vendor.js'),
  i = require('../locales/index.js'),
  n = require('./miniProgram.js'),
  s = require('./utils.js');
require('../utils/env.js');
const r = require('./UIDesign.js'),
  E = require('../TUIStore/tuiStore.js'),
  o = require('../const/error.js'),
  _ = require('../const/call.js'),
  L = E.TUIStore.getInstance(),
  d = r.UIDesign.getInstance(),
  N = class e {
    constructor(e) {
      t(this, '_callService'), (this._callService = e.callService);
    }
    static getInstance(t) {
      return e.instance || (e.instance = new e(t)), e.instance;
    }
    addListenTuiCallEngineEvent() {
      var e;
      const t =
        null == (e = this._callService) ? void 0 : e.getTUICallEngineInstance();
      t
        ? (t.on(l.ig.ERROR, this._handleError, this),
          t.on(l.ig.INVITED, this._handleNewInvitationReceived, this),
          t.on(l.ig.USER_ACCEPT, this._handleUserAccept, this),
          t.on(l.ig.USER_ENTER, this._handleUserEnter, this),
          t.on(l.ig.USER_LEAVE, this._handleUserLeave, this),
          t.on(l.ig.REJECT, this._handleInviteeReject, this),
          t.on(l.ig.NO_RESP, this._handleNoResponse, this),
          t.on(l.ig.LINE_BUSY, this._handleLineBusy, this),
          t.on(l.ig.CALLING_CANCEL, this._handleCallingCancel, this),
          t.on(l.ig.SDK_READY, this._handleSDKReady, this),
          t.on(l.ig.KICKED_OUT, this._handleKickedOut, this),
          t.on(l.ig.MESSAGE_SENT_BY_ME, this._messageSentByMe, this),
          l.ig.ON_USER_NETWORK_QUALITY_CHANGED &&
            t.on(
              l.ig.ON_USER_NETWORK_QUALITY_CHANGED,
              this._handleNetworkQuality,
              this
            ),
          t.on(l.ig.CALL_END, this._handleCallingEnd, this),
          t.on(l.ig.CALL_MODE, this._handleCallTypeChange, this),
          t.on(l.ig.USER_UPDATE, this._handleUserUpdate, this))
        : console.warn(
            `${a.NAME.PREFIX}add engine event listener failed, engine is empty.`
          );
    }
    removeListenTuiCallEngineEvent() {
      var e;
      const t =
        null == (e = this._callService) ? void 0 : e.getTUICallEngineInstance();
      t.off(l.ig.ERROR, this._handleError, this),
        t.off(l.ig.INVITED, this._handleNewInvitationReceived, this),
        t.off(l.ig.USER_ACCEPT, this._handleUserAccept, this),
        t.off(l.ig.USER_ENTER, this._handleUserEnter, this),
        t.off(l.ig.USER_LEAVE, this._handleUserLeave, this),
        t.off(l.ig.REJECT, this._handleInviteeReject, this),
        t.off(l.ig.NO_RESP, this._handleNoResponse, this),
        t.off(l.ig.LINE_BUSY, this._handleLineBusy, this),
        t.off(l.ig.CALLING_CANCEL, this._handleCallingCancel, this),
        t.off(l.ig.SDK_READY, this._handleSDKReady, this),
        t.off(l.ig.KICKED_OUT, this._handleKickedOut, this),
        t.off(l.ig.MESSAGE_SENT_BY_ME, this._messageSentByMe, this),
        l.ig.ON_USER_NETWORK_QUALITY_CHANGED &&
          t.off(
            l.ig.ON_USER_NETWORK_QUALITY_CHANGED,
            this._handleNetworkQuality,
            this
          ),
        t.off(l.ig.CALL_END, this._handleCallingEnd, this),
        t.off(l.ig.CALL_MODE, this._handleCallTypeChange, this),
        t.off(l.ig.USER_UPDATE, this._handleUserUpdate, this);
    }
    _callerChangeToConnected() {
      var e;
      const t = L.getData(_.StoreName.CALL, a.NAME.CALL_ROLE);
      L.getData(_.StoreName.CALL, a.NAME.CALL_STATUS) ===
        _.CallStatus.CALLING &&
        t === _.CallRole.CALLER &&
        (L.update(_.StoreName.CALL, a.NAME.CALL_STATUS, _.CallStatus.CONNECTED),
        null == (e = this._callService) || e.startTimer());
    }
    _unNormalEventsManager(e, t) {
      var n;
      console.log(`${a.NAME.PREFIX}${t} event data: ${JSON.stringify(e)}.`);
      const r = L.getData(_.StoreName.CALL, a.NAME.IS_GROUP),
        E = L.getData(_.StoreName.CALL, a.NAME.REMOTE_USER_INFO_LIST);
      switch (t) {
        case l.ig.REJECT:
        case l.ig.LINE_BUSY: {
          const { userID: n } = s.analyzeEventData(e);
          let o =
              t === l.ig.REJECT
                ? i.CallTips.OTHER_SIDE_REJECT_CALL
                : i.CallTips.OTHER_SIDE_LINE_BUSY,
            d = s.generateText(o);
          if (r) {
            const e =
              (E.find((e) => e.userId === n) || {}).displayUserInfo || n;
            (o =
              t === l.ig.REJECT ? i.CallTips.REJECT_CALL : i.CallTips.IN_BUSY),
              (d = s.generateText(o, e));
          }
          L.update(_.StoreName.CALL, a.NAME.TOAST_INFO, { text: d }),
            n && s.deleteRemoteUser([n]);
          break;
        }
        case l.ig.NO_RESP: {
          const { userIDList: t = [] } = s.analyzeEventData(e),
            l = r ? i.CallTips.TIMEOUT : i.CallTips.CALL_TIMEOUT,
            n = t.map(
              (e) => (E.find((t) => t.userId === e) || {}).displayUserInfo || e
            ),
            o = r ? s.generateText(l, n.join()) : s.generateText(l);
          L.update(_.StoreName.CALL, a.NAME.TOAST_INFO, { text: o }),
            t.length > 0 && s.deleteRemoteUser(t);
          break;
        }
        case l.ig.CALLING_CANCEL:
          null == (n = this._callService) || n._resetCallStore();
      }
    }
    _handleError(e) {
      var t;
      const { code: l, message: n } = e || {},
        s = Object.values(o.ErrorCode).indexOf(l);
      let r = '';
      if (-1 !== s) {
        const e = Object.keys(o.ErrorCode)[s];
        (r = i.t(o.ErrorMessage[e])),
          r &&
            L.update(_.StoreName.CALL, a.NAME.TOAST_INFO, {
              text: r,
              type: a.NAME.ERROR,
            });
      }
      null == (t = this._callService) || t.executeExternalAfterCalling(),
        console.error(
          `${a.NAME.PREFIX}_handleError, errorCode: ${l}; errorMessage: ${r || n}.`
        );
    }
    async _handleNewInvitationReceived(e) {
      var t, l, r, E;
      console.log(
        `${a.NAME.PREFIX}onCallReceived event data: ${JSON.stringify(e)}.`
      );
      const {
          sponsor: o = '',
          isFromGroup: d,
          callMediaType: N,
          inviteData: S = {},
          calleeIdList: A = [],
          groupID: c = '',
          roomID: C,
          strRoomID: h,
        } = s.analyzeEventData(e),
        u = L.getData(_.StoreName.CALL, a.NAME.LOCAL_USER_INFO),
        I = [o, ...A.filter((e) => e !== u.userId)],
        g = N || S.callType,
        T =
          g === _.CallMediaType.AUDIO
            ? i.CallTips.CALLEE_CALLING_AUDIO_MSG
            : i.CallTips.CALLEE_CALLING_VIDEO_MSG;
      let R = {
        [a.NAME.CALL_ROLE]: _.CallRole.CALLEE,
        [a.NAME.IS_GROUP]: d,
        [a.NAME.CALL_STATUS]: _.CallStatus.CALLING,
        [a.NAME.CALL_MEDIA_TYPE]: g,
        [a.NAME.CALL_TIPS]: i.t(T),
        [a.NAME.CALLER_USER_INFO]: { userId: o },
        [a.NAME.GROUP_ID]: c,
      };
      n.initAndCheckRunEnv();
      const v = { enableCamera: g === _.CallMediaType.VIDEO, enableMic: !0 };
      R = { ...R, [a.NAME.PUSHER]: v };
      const O = { microphone: !0, camera: g === _.CallMediaType.VIDEO };
      (this._callService._preDevicePermission =
        await this._callService._tuiCallEngine.deviceCheck(O)),
        s.updateRoomIdAndRoomIdType(C, h),
        L.updateStore(R, _.StoreName.CALL),
        null == (t = this._callService) || t.executeExternalBeforeCalling(),
        (null == (l = this._callService) ? void 0 : l.statusChanged) &&
          (null == (r = this._callService) ||
            r.statusChanged({
              oldStatus: _.StatusChange.IDLE,
              newStatus: _.StatusChange.BE_INVITED,
            }));
      const M = await s.getRemoteUserProfile(
          I,
          null == (E = this._callService) ? void 0 : E.getTim()
        ),
        [U] = M.filter((e) => e.userId === o);
      M.length > 0 &&
        L.updateStore(
          {
            [a.NAME.REMOTE_USER_INFO_LIST]: M,
            [a.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST]: M,
            [a.NAME.CALLER_USER_INFO]: {
              userId: o,
              nick: (null == U ? void 0 : U.nick) || '',
              avatar: (null == U ? void 0 : U.avatar) || '',
              displayUserInfo:
                (null == U ? void 0 : U.remark) ||
                (null == U ? void 0 : U.nick) ||
                o,
            },
          },
          _.StoreName.CALL
        );
    }
    _handleUserAccept(e) {
      this._callerChangeToConnected(),
        L.update(_.StoreName.CALL, a.NAME.TOAST_INFO, i.t('answered')),
        console.log(`${a.NAME.PREFIX}accept event data: ${JSON.stringify(e)}.`);
    }
    async _handleUserEnter(e) {
      var t;
      this._callerChangeToConnected();
      const { userID: l, data: i } = s.analyzeEventData(e);
      (null == i ? void 0 : i.playerList) &&
        L.update(_.StoreName.CALL, a.NAME.PLAYER, i.playerList);
      let n = L.getData(_.StoreName.CALL, a.NAME.REMOTE_USER_INFO_LIST);
      if (!n.find((e) => (null == e ? void 0 : e.userId) === l)) {
        n.push({ userId: l }),
          n.length > 0 &&
            (L.update(_.StoreName.CALL, a.NAME.REMOTE_USER_INFO_LIST, n),
            L.update(
              _.StoreName.CALL,
              a.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST,
              n
            ));
        const [e] = await s.getRemoteUserProfile(
          [l],
          null == (t = this._callService) ? void 0 : t.getTim()
        );
        (n = L.getData(_.StoreName.CALL, a.NAME.REMOTE_USER_INFO_LIST)),
          n.forEach((t) => {
            (null == t ? void 0 : t.userId) === l && (t = Object.assign(t, e));
          });
      }
      (n = n.map((e) => (e.userId === l && (e.isEnter = !0), e))),
        n.length > 0 &&
          (L.update(_.StoreName.CALL, a.NAME.REMOTE_USER_INFO_LIST, n),
          L.update(
            _.StoreName.CALL,
            a.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST,
            n
          ),
          d.updateViewBackgroundUserId('remote')),
        console.log(
          `${a.NAME.PREFIX}userEnter event data: ${JSON.stringify(e)}.`
        );
    }
    _handleUserLeave(e) {
      console.log(
        `${a.NAME.PREFIX}userLeave event data: ${JSON.stringify(e)}.`
      );
      const { data: t, userID: l } = s.analyzeEventData(e);
      if (
        ((null == t ? void 0 : t.playerList) &&
          L.update(_.StoreName.CALL, a.NAME.PLAYER, t.playerList),
        L.getData(_.StoreName.CALL, a.NAME.IS_GROUP))
      ) {
        const e =
            (
              L.getData(_.StoreName.CALL, a.NAME.REMOTE_USER_INFO_LIST).find(
                (e) => e.userId === l
              ) || {}
            ).displayUserInfo || l,
          t = s.generateText(i.CallTips.END_CALL, e);
        L.update(_.StoreName.CALL, a.NAME.TOAST_INFO, { text: t });
      }
      l && s.deleteRemoteUser([l]);
    }
    _handleInviteeReject(e) {
      this._unNormalEventsManager(e, l.ig.REJECT);
    }
    _handleNoResponse(e) {
      this._unNormalEventsManager(e, l.ig.NO_RESP);
    }
    _handleLineBusy(e) {
      this._unNormalEventsManager(e, l.ig.LINE_BUSY);
    }
    _handleCallingCancel(e) {
      var t;
      null == (t = this._callService) || t.executeExternalAfterCalling(),
        this._unNormalEventsManager(e, l.ig.CALLING_CANCEL);
    }
    _handleCallingEnd(e) {
      var t, l;
      console.log(`${a.NAME.PREFIX}callEnd event data: ${JSON.stringify(e)}.`),
        null == (t = this._callService) || t.executeExternalAfterCalling(),
        null == (l = this._callService) || l._resetCallStore();
    }
    async _handleSDKReady(e) {
      var t, l, i;
      let n = L.getData(_.StoreName.CALL, a.NAME.LOCAL_USER_INFO);
      (n = await s.getMyProfile(
        n.userId,
        null == (t = this._callService) ? void 0 : t.getTim()
      )),
        null == (i = this._callService) ||
          i.setDefaultOfflinePushInfo({
            ...(null == (l = this._callService)
              ? void 0
              : l.getDefaultOfflinePushInfo()),
            title: null == n ? void 0 : n.displayUserInfo,
          }),
        L.update(_.StoreName.CALL, a.NAME.LOCAL_USER_INFO, n),
        L.update(_.StoreName.CALL, a.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, n);
    }
    _handleKickedOut(e) {
      var t, l, n;
      console.log(`${a.NAME.PREFIX}kickOut event data: ${JSON.stringify(e)}.`),
        (null == (t = this._callService) ? void 0 : t.kickedOut) &&
          (null == (l = this._callService) || l.kickedOut(e)),
        L.update(
          _.StoreName.CALL,
          a.NAME.CALL_TIPS,
          s.generateText(i.CallTips.KICK_OUT)
        ),
        null == (n = this._callService) || n._resetCallStore();
    }
    _messageSentByMe(e) {
      var t, a;
      const l = null == e ? void 0 : e.data;
      (null == (t = this._callService) ? void 0 : t.onMessageSentByMe) &&
        (null == (a = this._callService) || a.onMessageSentByMe(l));
    }
    _handleCallTypeChange(e) {
      var t;
      const { newCallType: l, type: i } = s.analyzeEventData(e);
      L.update(_.StoreName.CALL, a.NAME.CALL_MEDIA_TYPE, l || i),
        null == (t = this._callService) ||
          t.setSoundMode(_.AudioPlayBackDevice.EAR);
    }
    _handleNetworkQuality(e) {
      const { networkQualityList: t = [] } = s.analyzeEventData(e);
      L.update(_.StoreName.CALL, a.NAME.NETWORK_STATUS, t);
      const l = L.getData(_.StoreName.CALL, a.NAME.IS_GROUP),
        n = L.getData(_.StoreName.CALL, a.NAME.LOCAL_USER_INFO),
        r = L.getData(_.StoreName.CALL, a.NAME.REMOTE_USER_INFO_LIST);
      if (!l) {
        if (
          t.find((e) => {
            var t;
            return (
              (null == (t = r[0]) ? void 0 : t.userId) ===
                (null == e ? void 0 : e.userId) &&
              (null == e ? void 0 : e.quality) >= a.NETWORK_QUALITY_THRESHOLD
            );
          })
        )
          return void L.update(
            _.StoreName.CALL,
            a.NAME.CALL_TIPS,
            i.t(i.CallTips.REMOTE_NETWORK_IS_POOR)
          );
        if (
          t.find(
            (e) =>
              (null == n ? void 0 : n.userId) ===
                (null == e ? void 0 : e.userId) &&
              (null == e ? void 0 : e.quality) >= a.NETWORK_QUALITY_THRESHOLD
          )
        )
          return void L.update(
            _.StoreName.CALL,
            a.NAME.CALL_TIPS,
            i.t(i.CallTips.LOCAL_NETWORK_IS_POOR)
          );
      }
    }
    _handleUserUpdate(e) {
      const t = s.analyzeEventData(e);
      (null == t ? void 0 : t.pusher) &&
        L.update(_.StoreName.CALL, a.NAME.PUSHER, t.pusher),
        (null == t ? void 0 : t.playerList) &&
          L.update(_.StoreName.CALL, a.NAME.PLAYER, t.playerList);
    }
  };
t(N, 'instance');
let S = N;
exports.EngineEventHandler = S;
