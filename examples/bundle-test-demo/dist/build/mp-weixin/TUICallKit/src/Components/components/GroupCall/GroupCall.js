'use strict';
const e = require('../../../../../common/vendor.js'),
  t = require('../../../TUICallService/index.js'),
  o = require('../../../TUICallService/const/index.js'),
  n = require('../../context/FocusItemContext.js'),
  r = require('../../context/ButtonPanelContext.js'),
  a = require('../../hooks/useCallInfoContext.js');
require('../../util/stringToPath.js');
const u = require('../../hooks/useUserInfoContextExcludeVolume.js'),
  l = require('../../hooks/useFloatWindowContext.js'),
  s = require('../../../TUICallService/CallService/index.js'),
  i = require('../../../TUICallService/const/call.js');
Math || (c + C + f + v + S + m + d)();
const c = () => '../common/TopBar/TopBar.js',
  C = () => '../common/Waiting/Waiting.js',
  f = () => './MediaContainer/MediaContainer.js',
  v = () => '../common/Tip/Tip.js',
  S = () => '../common/ButtonPanel/ButtonPanel.js',
  d = () => '../common/SelectUser/SelectUser.js',
  m = () => './BackGround/BackGround.js',
  I = e.defineComponent({
    __name: 'GroupCall',
    setup(c) {
      const C = e.ref(null),
        f = e.ref('open'),
        v = e.ref(!1),
        S = e.ref(0),
        d = e.ref([]),
        m = e.ref([]),
        I = e.ref(0),
        L = C,
        p = { status: f },
        { callRole: U, callStatus: E } = e.toRefs(a.useCallInfoContext()),
        { isFloatWindow: x } = e.toRefs(l.useFloatWindowContext()),
        { localUserInfoExcludeVolume: T, remoteUserListExcludeVolume: j } =
          e.toRefs(u.useUserInfoExcludeVolumeContext()),
        h = () => {
          (v.value = !1),
            s.TUIStore.update(i.StoreName.CALL, o.NAME.SHOW_SELECT_USER, !1),
            (I.value = 0),
            (d.value = []);
        },
        w = async () => {
          (I.value += 30), await A();
        },
        A = async () => {
          const e = await t.TUICallKitServer.getGroupMemberList(30, I.value),
            o = [...j.value, T.value].map((e) => e.userId);
          d.value.push(...e),
            (d.value = d.value.map(
              (e) => (o.includes(e.userID) && (e = { ...e, isDisabled: !0 }), e)
            )),
            (m.value = d.value);
        },
        _ = async (e) => {
          try {
            if (e.length <= 0) return;
            (v.value = !1),
              s.TUIStore.update(i.StoreName.CALL, o.NAME.SHOW_SELECT_USER, !1),
              (I.value = 0);
            const n = e.map((e) => e.userID);
            await t.TUICallKitServer.inviteUser({ userIDList: n }),
              (d.value = []);
          } catch (n) {
            console.debug(n);
          }
        },
        q = (e) => {
          d.value = e
            ? d.value.filter((t) => t.userID.includes(e) || t.nick.includes(e))
            : m.value;
        },
        N = {
          [o.NAME.SHOW_SELECT_USER]: async (e) => {
            if (((v.value = e), v.value)) {
              await A();
              const e = await t.TUICallKitServer.getGroupProfile();
              S.value = e.memberCount;
            }
          },
        };
      return (
        e.onMounted(() => {
          s.TUIStore.watch(i.StoreName.CALL, N, {
            notifyRangeWhenWatch: o.NAME.MYSELF,
          });
        }),
        e.onUnmounted(() => {
          s.TUIStore.unwatch(i.StoreName.CALL, N);
        }),
        (p.status = e.ref('open')),
        (L.value = null),
        e.provide(r.ButtonPanelContextKey, p),
        e.provide(n.FocusContextKey, L),
        (t, o) =>
          e.e(
            {
              a:
                e.unref(E) === e.unref(i.CallStatus).CALLING &&
                e.unref(U) === e.unref(i.CallRole).CALLEE &&
                !e.unref(x),
            },
            (e.unref(E) !== e.unref(i.CallStatus).CALLING ||
              e.unref(U) !== e.unref(i.CallRole).CALLEE ||
              e.unref(x),
            {}),
            {
              b: e.o(w),
              c: e.o(_),
              d: e.o(q),
              e: e.o(h),
              f: e.p({
                isShow: e.unref(v),
                isNeedSearch: !0,
                userList: e.unref(d),
                isPC: e.unref(s.TUIGlobal).isPC,
                total: e.unref(S),
              }),
            }
          )
      );
    },
  }),
  L = e._export_sfc(I, [['__scopeId', 'data-v-2521eb4f']]);
wx.createComponent(L);
