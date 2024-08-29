'use strict';
var e = Object.defineProperty,
  t = (t, i, r) => (
    ((t, i, r) => {
      i in t
        ? e(t, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[i] = r);
    })(t, 'symbol' != typeof i ? i + '' : i, r),
    r
  );
const i = require('../../../../common/vendor.js'),
  r = require('../const/index.js'),
  l = require('../utils/common-utils.js'),
  a = require('./utils.js'),
  n = require('../TUIStore/tuiStore.js'),
  s = require('../const/log.js'),
  o = require('../const/call.js'),
  c = n.TUIStore.getInstance(),
  E = class e {
    constructor(e) {
      var r, l, a;
      t(this, '_callService'),
        (this._callService = e.callService),
        i.R.registerEvent(
          i.r.TUILogin.EVENT.LOGIN_STATE_CHANGED,
          i.r.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS,
          this._callService
        ),
        (null == (r = i.r.TUIChat) ? void 0 : r.EVENT) &&
          i.R.registerEvent(
            null == (l = i.r.TUIChat.EVENT) ? void 0 : l.CHAT_STATE_CHANGED,
            null == (a = i.r.TUIChat.EVENT_SUB_KEY) ? void 0 : a.CHAT_OPENED,
            this._callService
          ),
        i.R.registerService(i.r.TUICalling.SERVICE.NAME, this._callService),
        i.R.registerExtension(
          i.r.TUIChat.EXTENSION.INPUT_MORE.EXT_ID,
          this._callService
        );
    }
    static getInstance(t) {
      return e.instance || (e.instance = new e(t)), e.instance;
    }
    callTUIService(e) {
      const { message: t } = e || {};
      i.R.callService({
        serviceName: i.r.TUIChat.SERVICE.NAME,
        method: i.r.TUIChat.SERVICE.METHOD.UPDATE_MESSAGE_LIST,
        params: { message: t },
      });
    }
    onGetExtensionTUICore(e, t) {
      var a, n;
      if (e === i.r.TUIChat.EXTENSION.INPUT_MORE.EXT_ID) {
        if (
          (null ==
            (n =
              null == (a = this._callService.getTUICallEngineInstance())
                ? void 0
                : a.reportLog) ||
            n.call(a, {
              name: 'TUICallKit.onGetExtension',
              data: { extensionID: e, params: t },
            }),
          l.isUndefined(t))
        )
          return [];
        if (
          [i.r.TUIChat.TYPE.ROOM, i.r.TUIChat.TYPE.CUSTOMER_SERVICE].includes(
            t.chatType
          )
        )
          return [];
        let s = [];
        const c = {
            weight: 1e3,
            text: '语音通话',
            icon: r.AudioCallIcon,
            data: { name: 'voiceCall' },
            listener: {
              onClicked: async (e) =>
                await this._handleTUICoreOnClick(
                  e,
                  e.type || o.CallMediaType.AUDIO
                ),
            },
          },
          E = {
            weight: 900,
            text: '视频通话',
            icon: r.VideoCallIcon,
            data: { name: 'videoCall' },
            listener: {
              onClicked: async (e) =>
                await this._handleTUICoreOnClick(
                  e,
                  e.type || o.CallMediaType.VIDEO
                ),
            },
          };
        return (
          (null == t ? void 0 : t.chatType)
            ? (s = [c, E])
            : (!(null == t ? void 0 : t.filterVoice) && s.push(c),
              !(null == t ? void 0 : t.filterVideo) && s.push(E)),
          s
        );
      }
    }
    async onCall(e, t) {
      e === i.r.TUICalling.SERVICE.METHOD.START_CALL &&
        (await this._handleTUICoreOnClick(t, t.type));
    }
    async onTUICoreNotifyEvent(e, t, l) {
      var a, n, E, u, T, I, _, d;
      try {
        if (e === i.r.TUILogin.EVENT.LOGIN_STATE_CHANGED)
          if (t === i.r.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS) {
            const {
              chat: e,
              userID: t,
              userSig: l,
              SDKAppID: o,
            } = i.O.getContext();
            await (null == (a = this._callService)
              ? void 0
              : a.init({
                  tim: e,
                  userID: t,
                  userSig: l,
                  sdkAppID: o,
                  isFromChat: !0,
                  component: r.COMPONENT.TIM_CALL_KIT,
                })),
              null == (n = this._callService) || n.setIsFromChat(!0),
              null == (E = this._callService) ||
                E.setLogLevel(s.LOG_LEVEL.NORMAL),
              this._addListenChatEvent();
          } else
            t === i.r.TUILogin.EVENT_SUB_KEY.USER_LOGOUT_SUCCESS &&
              (this._removeListenChatEvent(),
              await (null == (u = this._callService) ? void 0 : u.destroyed()));
        if (
          (null == (T = i.r.TUIChat) ? void 0 : T.EVENT) &&
          e === i.r.TUIChat.EVENT.CHAT_STATE_CHANGED &&
          t === i.r.TUIChat.EVENT_SUB_KEY.CHAT_OPENED
        ) {
          if (
            (null == (I = this._callService) ||
              I.setCurrentGroupId((null == l ? void 0 : l.groupID) || ''),
            c.getData(o.StoreName.CALL, r.NAME.CALL_STATUS) !==
              o.CallStatus.IDLE)
          )
            return;
          const e =
              null == (_ = this._callService) ? void 0 : _.getCurrentGroupId(),
            t = e
              ? await this.getGroupAttributes(
                  null == (d = this._callService) ? void 0 : d.getTim(),
                  e
                )
              : {};
          await this.updateStoreBasedOnGroupAttributes(t);
        }
      } catch (C) {
        console.error(
          `${r.NAME.PREFIX}TUICore onNotifyEvent failed, error: ${C}.`
        );
      }
    }
    async updateStoreBasedOnGroupAttributes(e) {
      var t, i, l, n;
      null ==
        (l =
          null ==
          (i =
            null == (t = this._callService)
              ? void 0
              : t.getTUICallEngineInstance())
            ? void 0
            : i.reportLog) ||
        l.call(i, {
          name: 'TUICallKit.getJoinGroupCallInfo.success',
          data: { groupAttributes: e },
        });
      try {
        const {
          group_id: t = '',
          room_id: i = 0,
          room_id_type: l = 0,
          call_media_type: s = r.NAME.UNKNOWN,
          user_list: E,
        } = e[r.NAME.INNER_ATTR_KIT_INFO]
          ? JSON.parse(e[r.NAME.INNER_ATTR_KIT_INFO])
          : {};
        let u = (E || []).map((e) => e.userid);
        u =
          u.length &&
          (await a.getRemoteUserProfile(
            u,
            null == (n = this._callService) ? void 0 : n.getTim()
          ));
        const T = {
          [r.NAME.GROUP_ID]: t,
          [r.NAME.GROUP_CALL_MEMBERS]: u,
          [r.NAME.ROOM_ID]: i,
          [r.NAME.CALL_MEDIA_TYPE]: o.CallType[s],
          [r.NAME.ROOM_ID_TYPE]: l,
        };
        c.updateStore(T, o.StoreName.CALL);
      } catch (s) {
        console.warn(
          `${r.NAME.PREFIX}updateStoreBasedOnGroupAttributes fail, error: ${s}`
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
          console.warn(`${r.NAME.PREFIX}getGroupAttributes fail: ${i}`), {}
        );
      }
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
            `${r.NAME.PREFIX}add tim event listener failed, tim is empty.`
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
            `${r.NAME.PREFIX}remove tim event listener failed, tim is empty.`
          );
    }
    async _handleTUICoreOnClick(e, t) {
      var i, r;
      try {
        const { groupID: l, userIDList: a = [], ...n } = e;
        l
          ? await (null == (i = this._callService)
              ? void 0
              : i.groupCall({ groupID: l, userIDList: a, type: t, ...n }))
          : 1 === a.length &&
            (await (null == (r = this._callService)
              ? void 0
              : r.call({ userID: a[0], type: t, ...n })));
      } catch (l) {
        console.debug(l);
      }
    }
    async _handleGroupAttributesUpdated(e) {
      var t;
      if (c.getData(o.StoreName.CALL, r.NAME.CALL_STATUS) !== o.CallStatus.IDLE)
        return;
      const i = (null == e ? void 0 : e.data) || {},
        { groupID: l = '', groupAttributes: a = {} } = i;
      l ===
        (null == (t = this._callService) ? void 0 : t.getCurrentGroupId()) &&
        (await this.updateStoreBasedOnGroupAttributes(a));
    }
  };
t(E, 'instance');
let u = E;
exports.ChatCombine = u;
