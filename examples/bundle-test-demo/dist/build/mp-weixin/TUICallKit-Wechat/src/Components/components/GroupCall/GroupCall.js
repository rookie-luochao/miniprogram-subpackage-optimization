'use strict';
const e = require('../../../../../common/vendor.js'),
  t = require('../../../TUICallService/index.js'),
  o = require('../../../TUICallService/const/index.js'),
  r = require('../../context/FocusItemContext.js'),
  a = require('../../context/ButtonPanelContext.js'),
  n = require('../../hooks/useCallInfoContext.js');
require('../../util/stringToPath.js');
const u = require('../../hooks/useUserInfoContextExcludeVolume.js'),
  l = require('../../hooks/useFloatWindowContext.js');
require('../../../TUICallService/utils/env.js');
const s = require('../../../TUICallService/CallService/index.js'),
  i = require('../../../TUICallService/const/call.js');
Math || (c + C + f + v + d + m + S)();
const c = () => '../common/TopBar/TopBar.js',
  C = () => '../common/Waiting/Waiting.js',
  f = () => './MediaContainer/MediaContainer.js',
  v = () => '../common/Tip/Tip.js',
  d = () => '../common/ButtonPanel/ButtonPanel.js',
  S = () => '../common/SelectUser/SelectUser.js',
  m = () => './BackGround/BackGround.js',
  I = e.defineComponent({
    __name: 'GroupCall',
    setup(c) {
      const C = e.ref(null),
        f = e.ref('open'),
        v = e.ref(!1),
        d = e.ref(0),
        S = e.ref([]),
        m = e.ref([]),
        I = e.ref(0),
        L = C,
        U = { status: f },
        { callRole: p, callStatus: E } = e.toRefs(n.useCallInfoContext()),
        { isFloatWindow: x } = e.toRefs(l.useFloatWindowContext()),
        { localUserInfoExcludeVolume: T, remoteUserListExcludeVolume: j } =
          e.toRefs(u.useUserInfoExcludeVolumeContext()),
        h = () => {
          (v.value = !1),
            s.TUIStore.update(i.StoreName.CALL, o.NAME.SHOW_SELECT_USER, !1),
            (I.value = 0),
            (S.value = []);
        },
        q = async () => {
          (I.value += 30), await A();
        },
        A = async () => {
          const e = await t.TUICallKitServer.getGroupMemberList(30, I.value),
            o = [...j.value, T.value].map((e) => e.userId);
          S.value.push(...e),
            (S.value = S.value.map(
              (e) => (o.includes(e.userID) && (e = { ...e, isDisabled: !0 }), e)
            )),
            (m.value = S.value);
        },
        _ = async (e) => {
          try {
            if (e.length <= 0) return;
            (v.value = !1),
              s.TUIStore.update(i.StoreName.CALL, o.NAME.SHOW_SELECT_USER, !1),
              (I.value = 0);
            const r = e.map((e) => e.userID);
            await t.TUICallKitServer.inviteUser({ userIDList: r }),
              (S.value = []);
          } catch (r) {
            console.debug(r);
          }
        },
        w = (e) => {
          S.value = e
            ? S.value.filter((t) => t.userID.includes(e) || t.nick.includes(e))
            : m.value;
        },
        N = {
          [o.NAME.SHOW_SELECT_USER]: async (e) => {
            if (((v.value = e), v.value)) {
              await A();
              const e = await t.TUICallKitServer.getGroupProfile();
              d.value = e.memberCount;
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
        (U.status = e.ref('open')),
        (L.value = null),
        e.provide(a.ButtonPanelContextKey, U),
        e.provide(r.FocusContextKey, L),
        (t, o) =>
          e.e(
            {
              a:
                e.unref(E) === e.unref(i.CallStatus).CALLING &&
                e.unref(p) === e.unref(i.CallRole).CALLEE &&
                !e.unref(x),
            },
            (e.unref(E) !== e.unref(i.CallStatus).CALLING ||
              e.unref(p) !== e.unref(i.CallRole).CALLEE ||
              e.unref(x),
            {}),
            { b: e.unref(v) },
            e.unref(v)
              ? {
                  c: e.o(_),
                  d: e.o(h),
                  e: e.o(q),
                  f: e.o(w),
                  g: e.p({
                    isNeedSearch: !0,
                    userList: e.unref(S),
                    isPC: e.unref(s.TUIGlobal).isPC,
                    total: e.unref(d),
                  }),
                }
              : {}
          )
      );
    },
  }),
  L = e._export_sfc(I, [['__scopeId', 'data-v-da69a25a']]);
wx.createComponent(L);
