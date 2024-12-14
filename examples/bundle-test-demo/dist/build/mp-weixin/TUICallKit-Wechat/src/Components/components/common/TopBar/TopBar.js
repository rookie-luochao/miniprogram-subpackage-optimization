'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const t = require('../../../../TUICallService/const/index.js'),
  n = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const o = require('../../../hooks/useCallDuration.js'),
  r = require('../../../hooks/useCustomUI.js');
require('../../../../TUICallService/utils/env.js');
const s = require('../../../../TUICallService/CallService/index.js'),
  u = require('../../../../TUICallService/const/call.js'),
  a = { customStyle: { type: Object }, customClass: { type: String } };
Math || (c + i + l + p + C)();
const l = () => '../../base/Layout/Row/Row.js',
  i = () => '../../base/Layout/Col/Col.js',
  c = () => '../Button/Minimize.js',
  C = () => '../Button/InviteUser.js',
  p = () => '../Timer/Timer.js',
  f = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'TopBar',
    props: a,
    setup(a) {
      const l = s.TUIGlobal.isPC,
        {
          callStatus: i,
          isGroupCall: c,
          callRole: C,
          allowedFullScreen: p,
        } = e.toRefs(n.useCallInfoContext()),
        { callDuration: f } = o.useCallDuration(),
        j = r.useCustomUI(),
        v = e.computed(() => i.value === u.CallStatus.CONNECTED),
        m = e.ref(
          s.TUIStore.getData(u.StoreName.CALL, t.NAME.ENABLE_FLOAT_WINDOW)
        ),
        S = e.computed(() => {
          var e, t;
          return (
            !(
              !c.value ||
              !1 ===
                (null ==
                (t =
                  null == (e = j.value.button)
                    ? void 0
                    : e[u.FeatureButton.InviteUser])
                  ? void 0
                  : t.show)
            ) &&
            (i.value !== u.CallStatus.CALLING || C.value === u.CallRole.CALLER)
          );
        });
      const I = {
        [t.NAME.ENABLE_FLOAT_WINDOW]: function (e) {
          m.value = e;
        },
      };
      return (
        e.onMounted(() => {
          s.TUIStore.watch(u.StoreName.CALL, I, {
            notifyRangeWhenWatch: t.NAME.MYSELF,
          });
        }),
        e.onUnmounted(() => {
          s.TUIStore.unwatch(u.StoreName.CALL, { ...I });
        }),
        (t, n) =>
          e.e(
            { a: !e.unref(l) },
            e.unref(l)
              ? {}
              : e.e(
                  { b: !e.unref(l) && e.unref(m) },
                  (!e.unref(l) && e.unref(m), {}),
                  {
                    c: e.p({ span: 8, justify: 'center' }),
                    d: e.p({ span: 16 }),
                    e: e.p({ span: 8, align: 'center' }),
                    f: e.unref(v),
                  },
                  e.unref(v) ? { g: e.p({ 'call-duration': e.unref(f) }) } : {},
                  {
                    h: e.p({ span: 8, justify: 'center', align: 'center' }),
                    i: e.p({ span: 16 }),
                    j: e.unref(S),
                  },
                  e.unref(S) ? { k: e.p({ 'show-text': e.unref(l) }) } : {},
                  {
                    l: e.p({ span: 8, justify: 'center' }),
                    m: e.p({ span: 8, justify: 'end', align: 'center' }),
                  }
                ),
            { n: e.s(t.customStyle) }
          )
      );
    },
  }),
  j = e._export_sfc(f, [['__scopeId', 'data-v-204068ef']]);
wx.createComponent(j);
