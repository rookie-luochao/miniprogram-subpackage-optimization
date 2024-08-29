'use strict';
const e = require('../const/index.js'),
  t = require('../utils/common-utils.js'),
  r = require('../locales/index.js'),
  a = require('../TUIStore/tuiStore.js'),
  o = require('../const/call.js'),
  n = a.TUIStore.getInstance();
function i(e, t) {
  const r = {
    userId: e,
    nick: '',
    avatar: '',
    remark: '',
    displayUserInfo: '',
    isAudioAvailable: !1,
    isVideoAvailable: !1,
    isEnter: !1,
    domId: t || e,
  };
  return t ? r : { ...r, isEnter: !1 };
}
function l(t, a, i) {
  const l = n.getData(o.StoreName.CALL, e.NAME.IS_GROUP);
  let u = `${r.t(t)}`;
  return l && (u = a ? `${a} ${u}` : u), u;
}
(exports.analyzeEventData = function (e) {
  return (null == e ? void 0 : e.data) || {};
}),
  (exports.deleteRemoteUser = function (t) {
    if (0 === t.length) return;
    let r = n.getData(o.StoreName.CALL, e.NAME.REMOTE_USER_INFO_LIST);
    t.forEach((e) => {
      r = r.filter((t) => t.userId !== e);
    }),
      n.update(o.StoreName.CALL, e.NAME.REMOTE_USER_INFO_LIST, r),
      n.update(
        o.StoreName.CALL,
        e.NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST,
        r
      );
  }),
  (exports.generateStatusChangeText = function () {
    const t = n.getData(o.StoreName.CALL, e.NAME.CALL_STATUS);
    if (t === o.CallStatus.IDLE) return o.StatusChange.IDLE;
    const r = n.getData(o.StoreName.CALL, e.NAME.IS_GROUP);
    if (t === o.CallStatus.CALLING)
      return r ? o.StatusChange.DIALING_GROUP : o.StatusChange.DIALING_C2C;
    const a = n.getData(o.StoreName.CALL, e.NAME.CALL_MEDIA_TYPE);
    return r
      ? a === o.CallMediaType.AUDIO
        ? o.StatusChange.CALLING_GROUP_AUDIO
        : o.StatusChange.CALLING_GROUP_VIDEO
      : a === o.CallMediaType.AUDIO
        ? o.StatusChange.CALLING_C2C_AUDIO
        : o.StatusChange.CALLING_C2C_VIDEO;
  }),
  (exports.generateText = l),
  (exports.getGroupMemberList = async function (t, r, a, o) {
    let n = [];
    try {
      const e = await r.getGroupMemberList({ groupID: t, count: a, offset: o });
      if (0 === e.code) return e.data.memberList || n;
    } catch (i) {
      return (
        console.error(`${e.NAME.PREFIX}getGroupMember failed, error: ${i}.`), n
      );
    }
  }),
  (exports.getGroupProfile = async function (t, r) {
    let a = {};
    try {
      return (await r.getGroupProfile({ groupID: t })).data.group || a;
    } catch (o) {
      return (
        console.warn(`${e.NAME.PREFIX}getGroupProfile failed, error: ${o}.`), a
      );
    }
  }),
  (exports.getMyProfile = async function (t, r) {
    var a, l, u, s, I;
    let d = i(t, e.NAME.LOCAL_VIDEO);
    try {
      if (!r) return d;
      const t = await r.getMyProfile(),
        i =
          null == n
            ? void 0
            : n.getData(o.StoreName.CALL, e.NAME.LOCAL_USER_INFO);
      return (
        0 === (null == t ? void 0 : t.code) &&
          (d = {
            ...d,
            ...i,
            userId:
              null == (a = null == t ? void 0 : t.data) ? void 0 : a.userID,
            nick: null == (l = null == t ? void 0 : t.data) ? void 0 : l.nick,
            avatar:
              null == (u = null == t ? void 0 : t.data) ? void 0 : u.avatar,
            displayUserInfo:
              (null == (s = null == t ? void 0 : t.data) ? void 0 : s.nick) ||
              (null == (I = null == t ? void 0 : t.data) ? void 0 : I.userID),
          }),
        d
      );
    } catch (E) {
      return (
        console.error(`${e.NAME.PREFIX}getMyProfile failed, error: ${E}.`), d
      );
    }
  }),
  (exports.getRemoteUserProfile = async function (t, r) {
    let a = t.map((e) => i(e));
    try {
      if (!r) return a;
      const l = await r.getFriendProfile({ userIDList: t });
      if (0 === l.code) {
        const { friendList: u = [], failureUserIDList: s = [] } = l.data;
        let I = s.map((e) => e.userID);
        if (s.length > 0) {
          const e = await r.getUserProfile({
            userIDList: s.map((e) => e.userID),
          });
          0 === (null == e ? void 0 : e.code) &&
            (I = (null == e ? void 0 : e.data) || []);
        }
        const d =
            null == n
              ? void 0
              : n.getData(o.StoreName.CALL, e.NAME.REMOTE_USER_INFO_LIST),
          E = u.map((e) => e.userID),
          L = I.map((e) => e.userID);
        a = t.map((e) => {
          var t, r, a, o, n, l, s;
          const A = i(e),
            N = E.indexOf(e),
            c = L.indexOf(e);
          let O = '',
            _ = '',
            C = '',
            M = '';
          -1 !== N &&
            ((O = (null == (t = u[N]) ? void 0 : t.remark) || ''),
            (_ =
              (null == (a = null == (r = u[N]) ? void 0 : r.profile)
                ? void 0
                : a.nick) || ''),
            (C = O || _ || A.userId || ''),
            (M =
              (null == (n = null == (o = u[N]) ? void 0 : o.profile)
                ? void 0
                : n.avatar) || '')),
            -1 !== c &&
              ((_ = (null == (l = I[c]) ? void 0 : l.nick) || ''),
              (C = _ || A.userId || ''),
              (M = (null == (s = I[c]) ? void 0 : s.avatar) || ''));
          const S = d.find((t) => t.userId === e) || {};
          return {
            ...A,
            ...S,
            remark: O,
            nick: _,
            displayUserInfo: C,
            avatar: M,
          };
        });
      }
      return a;
    } catch (l) {
      return (
        console.error(
          `${e.NAME.PREFIX}getRemoteUserProfile failed, error: ${l}.`
        ),
        a
      );
    }
  }),
  (exports.noDevicePermissionToast = function (a, i, u) {
    if (t.handleNoDevicePermissionError(a)) {
      let t = '';
      i === o.CallMediaType.AUDIO &&
        (t = l(r.CallTips.NO_MICROPHONE_DEVICE_PERMISSION)),
        i === o.CallMediaType.VIDEO &&
          (t = l(r.CallTips.NO_CAMERA_DEVICE_PERMISSION)),
        t &&
          n.update(o.StoreName.CALL, e.NAME.TOAST_INFO, {
            text: t,
            type: e.NAME.ERROR,
          }),
        console.error(`${e.NAME.PREFIX}call failed, error: ${a.message}.`);
    }
  }),
  (exports.setLocalUserInfoAudioVideoAvailable = function (t, r) {
    let a = n.getData(o.StoreName.CALL, e.NAME.LOCAL_USER_INFO);
    r === e.NAME.AUDIO && (a = { ...a, isAudioAvailable: t }),
      r === e.NAME.VIDEO && (a = { ...a, isVideoAvailable: t }),
      n.update(o.StoreName.CALL, e.NAME.LOCAL_USER_INFO, a),
      n.update(o.StoreName.CALL, e.NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, a);
  }),
  (exports.updateRoomIdAndRoomIdType = function (t, r) {
    0 === t && r
      ? (n.update(o.StoreName.CALL, e.NAME.ROOM_ID, r),
        n.update(
          o.StoreName.CALL,
          e.NAME.ROOM_ID_TYPE,
          e.ROOM_ID_TYPE.STRING_ROOM_ID
        ))
      : (n.update(o.StoreName.CALL, e.NAME.ROOM_ID, t),
        n.update(
          o.StoreName.CALL,
          e.NAME.ROOM_ID_TYPE,
          e.ROOM_ID_TYPE.NUMBER_ROOM_ID
        ));
  });
