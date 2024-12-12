'use strict';
var e = Object.defineProperty,
  t = (t, i, l) => (
    ((t, i, l) => {
      i in t
        ? e(t, i, { enumerable: !0, configurable: !0, writable: !0, value: l })
        : (t[i] = l);
    })(t, 'symbol' != typeof i ? i + '' : i, l),
    l
  );
const i = require('../../../../common/vendor.js'),
  l = require('../const/index.js'),
  a = require('../utils/common-utils.js'),
  n = require('./utils.js'),
  r = require('../TUIStore/tuiStore.js'),
  o = require('../locales/index.js'),
  s = require('../const/log.js'),
  c = require('../const/call.js'),
  E = r.TUIStore.getInstance(),
  u = {
    audioCall: () => 'Voice call',
    videoCall: () => 'Video call',
    switchToAudio: () => 'Switch audio call',
    switchToVideo: () => 'Switch video call',
    hangup: ({ callDuration: e }) => `${o.t('Call duration')}：${e}`,
  },
  T = class e {
    constructor(e) {
      var l, a, n;
      t(this, '_callService'),
        (this._callService = e.callService),
        i.R.registerEvent(
          i.E.TUILogin.EVENT.LOGIN_STATE_CHANGED,
          i.E.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS,
          this
        ),
        (null == (l = i.E.TUIChat) ? void 0 : l.EVENT) &&
          i.R.registerEvent(
            null == (a = i.E.TUIChat.EVENT) ? void 0 : a.CHAT_STATE_CHANGED,
            null == (n = i.E.TUIChat.EVENT_SUB_KEY) ? void 0 : n.CHAT_OPENED,
            this
          ),
        i.R.registerService(i.E.TUICalling.SERVICE.NAME, this),
        i.R.registerExtension(i.E.TUIChat.EXTENSION.INPUT_MORE.EXT_ID, this);
    }
    static getInstance(t) {
      return e.instance || (e.instance = new e(t)), e.instance;
    }
    callTUIService(e) {
      const { message: t } = e || {};
      i.R.callService({
        serviceName: i.E.TUIChat.SERVICE.NAME,
        method: i.E.TUIChat.SERVICE.METHOD.UPDATE_MESSAGE_LIST,
        params: { message: t },
      });
    }
    onGetExtension(e, t) {
      var n, r;
      if (e === i.E.TUIChat.EXTENSION.INPUT_MORE.EXT_ID) {
        if (
          (null ==
            (r =
              null == (n = this._callService.getTUICallEngineInstance())
                ? void 0
                : n.reportLog) ||
            r.call(n, {
              name: 'TUICallKit.onGetExtension',
              data: { extensionID: e, params: t },
            }),
          a.isUndefined(t))
        )
          return [];
        if (
          [i.E.TUIChat.TYPE.ROOM, i.E.TUIChat.TYPE.CUSTOMER_SERVICE].includes(
            t.chatType
          )
        )
          return [];
        let o = [];
        const s = {
            weight: 1e3,
            text: '语音通话',
            icon: l.AudioCallIcon,
            data: { name: 'voiceCall' },
            listener: {
              onClicked: async (e) =>
                await this._handleTUICoreOnClick(
                  e,
                  e.type || c.CallMediaType.AUDIO
                ),
            },
          },
          E = {
            weight: 900,
            text: '视频通话',
            icon: l.VideoCallIcon,
            data: { name: 'videoCall' },
            listener: {
              onClicked: async (e) =>
                await this._handleTUICoreOnClick(
                  e,
                  e.type || c.CallMediaType.VIDEO
                ),
            },
          };
        return (
          (null == t ? void 0 : t.chatType)
            ? (o = [s, E])
            : (!(null == t ? void 0 : t.filterVoice) && o.push(s),
              !(null == t ? void 0 : t.filterVideo) && o.push(E)),
          o
        );
      }
    }
    async onCall(e, t) {
      e === i.E.TUICalling.SERVICE.METHOD.START_CALL &&
        (await this._handleTUICoreOnClick(t, t.type));
    }
    async onNotifyEvent(e, t, a) {
      var n, r, o, u, T, d, I, _;
      try {
        if (e === i.E.TUILogin.EVENT.LOGIN_STATE_CHANGED)
          if (t === i.E.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS) {
            const {
              chat: e,
              userID: t,
              userSig: a,
              SDKAppID: c,
            } = i.A.getContext();
            await (null == (n = this._callService)
              ? void 0
              : n.init({
                  tim: e,
                  userID: t,
                  userSig: a,
                  sdkAppID: c,
                  isFromChat: !0,
                  component: l.COMPONENT.TIM_CALL_KIT,
                })),
              null == (r = this._callService) || r.setIsFromChat(!0),
              null == (o = this._callService) ||
                o.setLogLevel(s.LOG_LEVEL.NORMAL),
              this._addListenChatEvent();
          } else
            t === i.E.TUILogin.EVENT_SUB_KEY.USER_LOGOUT_SUCCESS &&
              (this._removeListenChatEvent(),
              await (null == (u = this._callService) ? void 0 : u.destroyed()));
        if (
          (null == (T = i.E.TUIChat) ? void 0 : T.EVENT) &&
          e === i.E.TUIChat.EVENT.CHAT_STATE_CHANGED &&
          t === i.E.TUIChat.EVENT_SUB_KEY.CHAT_OPENED
        ) {
          if (
            (null == (d = this._callService) ||
              d.setCurrentGroupId((null == a ? void 0 : a.groupID) || ''),
            E.getData(c.StoreName.CALL, l.NAME.CALL_STATUS) !==
              c.CallStatus.IDLE)
          )
            return;
          const e =
              null == (I = this._callService) ? void 0 : I.getCurrentGroupId(),
            t = e
              ? await this.getGroupAttributes(
                  null == (_ = this._callService) ? void 0 : _.getTim(),
                  e
                )
              : {};
          await this.updateStoreBasedOnGroupAttributes(t);
        }
      } catch (C) {
        console.error(
          `${l.NAME.PREFIX}TUICore onNotifyEvent failed, error: ${C}.`
        );
      }
    }
    async updateStoreBasedOnGroupAttributes(e) {
      var t, i, a, r;
      null ==
        (a =
          null ==
          (i =
            null == (t = this._callService)
              ? void 0
              : t.getTUICallEngineInstance())
            ? void 0
            : i.reportLog) ||
        a.call(i, {
          name: 'TUICallKit.getJoinGroupCallInfo.success',
          data: { groupAttributes: e },
        });
      try {
        const {
          group_id: t = '',
          room_id: i = 0,
          room_id_type: a = 0,
          call_media_type: o = l.NAME.UNKNOWN,
          user_list: s,
        } = e[l.NAME.INNER_ATTR_KIT_INFO]
          ? JSON.parse(e[l.NAME.INNER_ATTR_KIT_INFO])
          : {};
        let u = (s || []).map((e) => e.userid);
        u =
          u.length &&
          (await n.getRemoteUserProfile(
            u,
            null == (r = this._callService) ? void 0 : r.getTim()
          ));
        const T = {
          [l.NAME.GROUP_ID]: t,
          [l.NAME.GROUP_CALL_MEMBERS]: u,
          [l.NAME.ROOM_ID]: i,
          [l.NAME.CALL_MEDIA_TYPE]: c.CallType[o],
          [l.NAME.ROOM_ID_TYPE]: a,
        };
        E.updateStore(T, c.StoreName.CALL);
      } catch (o) {
        console.warn(
          `${l.NAME.PREFIX}updateStoreBasedOnGroupAttributes fail, error: ${o}`
        );
      }
    }
    async getGroupAttributes(e, t) {
      if (!t) return {};
      try {
        const { data: i } = await e.getGroupAttributes({
          groupID: t,
          keyList: [],
        });
        return (null == i ? void 0 : i.groupAttributes) || {};
      } catch (i) {
        return (
          console.warn(`${l.NAME.PREFIX}getGroupAttributes fail: ${i}`), {}
        );
      }
    }
    isLineBusy(e) {
      var t;
      const i = a.JSONToObject(e.payload.data),
        l = a.JSONToObject(null == i ? void 0 : i.data);
      return (
        'line_busy' === (null == l ? void 0 : l.line_busy) ||
        '' === (null == l ? void 0 : l.line_busy) ||
        'lineBusy' ===
          (null == (t = null == l ? void 0 : l.data) ? void 0 : t.message)
      );
    }
    async getCallKitMessage(e, t) {
      var i, n, r, s;
      const T = a.JSONToObject(e.payload.data);
      if (1 !== (null == T ? void 0 : T.businessID)) return {};
      let d = '';
      const I = a.JSONToObject(null == T ? void 0 : T.data),
        _ = I.call_type,
        C = T.inviteeList,
        v =
          (null == (i = null == I ? void 0 : I.data) ? void 0 : i.inviter) ===
          E.getData(c.StoreName.CALL, l.NAME.LOCAL_USER_INFO).userId,
        S = null == (n = null == I ? void 0 : I.data) ? void 0 : n.cmd;
      switch (null == T ? void 0 : T.actionType) {
        case c.ACTION_TYPE.INVITE:
          d = u[S]({
            callDuration: a.formatTime(null == I ? void 0 : I.call_end),
          });
          break;
        case c.ACTION_TYPE.CANCEL_INVITE:
          d = v ? 'Call Cancel' : 'Other Side Cancel';
          break;
        case c.ACTION_TYPE.ACCEPT_INVITE:
          d = ['switchToAudio', 'switchToVideo'].includes(S)
            ? null == (r = null == u ? void 0 : u[S])
              ? void 0
              : r.call(u)
            : o.t('Answered');
          break;
        case c.ACTION_TYPE.REJECT_INVITE:
          d = this.isLineBusy(e)
            ? v
              ? 'Line Busy'
              : 'Other Side Line Busy'
            : v
              ? 'Other Side Decline'
              : 'Decline';
          break;
        case c.ACTION_TYPE.INVITE_TIMEOUT:
          d = ['switchToAudio', 'switchToVideo'].includes(S)
            ? null == (s = null == u ? void 0 : u[S])
              ? void 0
              : s.call(u)
            : v
              ? 'Other Side No Answer'
              : 'No answer';
      }
      return { messageCardContent: d, callMediaType: _, inviteeList: C };
    }
    _addListenChatEvent() {
      var e, t;
      (null == (e = this._callService) ? void 0 : e.getTim())
        ? null == (t = this._callService) ||
          t
            .getTim()
            .on(
              i.TIM.EVENT.GROUP_ATTRIBUTES_UPDATED,
              this._handleGroupAttributesUpdated,
              this
            )
        : console.warn(
            `${l.NAME.PREFIX}add tim event listener failed, tim is empty.`
          );
    }
    _removeListenChatEvent() {
      var e, t;
      (null == (e = this._callService) ? void 0 : e.getTim())
        ? null == (t = this._callService) ||
          t
            .getTim()
            .off(
              i.TIM.EVENT.GROUP_ATTRIBUTES_UPDATED,
              this._handleGroupAttributesUpdated,
              this
            )
        : console.warn(
            `${l.NAME.PREFIX}remove tim event listener failed, tim is empty.`
          );
    }
    async _handleTUICoreOnClick(e, t) {
      var i, l;
      try {
        const { groupID: a, userIDList: n = [], ...r } = e;
        a
          ? await (null == (i = this._callService)
              ? void 0
              : i.groupCall({ groupID: a, userIDList: n, type: t, ...r }))
          : 1 === n.length &&
            (await (null == (l = this._callService)
              ? void 0
              : l.call({ userID: n[0], type: t, ...r })));
      } catch (a) {
        console.debug(a);
      }
    }
    async _handleGroupAttributesUpdated(e) {
      var t;
      if (E.getData(c.StoreName.CALL, l.NAME.CALL_STATUS) !== c.CallStatus.IDLE)
        return;
      const i = (null == e ? void 0 : e.data) || {},
        { groupID: a = '', groupAttributes: n = {} } = i;
      a ===
        (null == (t = this._callService) ? void 0 : t.getCurrentGroupId()) &&
        (await this.updateStoreBasedOnGroupAttributes(n));
    }
  };
t(T, 'instance');
let d = T;
exports.ChatCombine = d;
