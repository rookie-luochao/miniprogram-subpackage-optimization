'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const t = require('../../../../TUICallService/const/index.js'),
  n = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const o = require('../../../hooks/useCallDuration.js'),
  r = require('../../../hooks/useCustomUI.js'),
  u = require('../../../../TUICallService/CallService/index.js'),
  s = require('../../../../TUICallService/const/call.js'),
  a = { customStyle: { type: Object }, customClass: { type: String } };
Math || (c + i + l + C + p)();
const l = () => '../../base/Layout/Row/Row.js',
  i = () => '../../base/Layout/Col/Col.js',
  c = () => '../Button/Minimize.js',
  p = () => '../Button/InviteUser.js',
  C = () => '../Timer/Timer.js',
  f = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'TopBar',
    props: a,
    setup(a) {
      const l = u.TUIGlobal.isPC,
        {
          callStatus: i,
          isGroupCall: c,
          callRole: p,
          allowedFullScreen: C,
        } = e.toRefs(n.useCallInfoContext()),
        { callDuration: f } = o.useCallDuration(),
        j = r.useCustomUI(),
        m = e.computed(() => i.value === s.CallStatus.CONNECTED),
        v = e.ref(
          u.TUIStore.getData(s.StoreName.CALL, t.NAME.ENABLE_FLOAT_WINDOW)
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
                    : e[s.FeatureButton.InviteUser])
                  ? void 0
                  : t.show)
            ) &&
            (i.value !== s.CallStatus.CALLING || p.value === s.CallRole.CALLER)
          );
        });
      const I = {
        [t.NAME.ENABLE_FLOAT_WINDOW]: function (e) {
          v.value = e;
        },
      };
      return (
        e.onMounted(() => {
          u.TUIStore.watch(s.StoreName.CALL, I, {
            notifyRangeWhenWatch: t.NAME.MYSELF,
          });
        }),
        e.onUnmounted(() => {
          u.TUIStore.unwatch(s.StoreName.CALL, { ...I });
        }),
        (t, n) =>
          e.e(
            { a: !e.unref(l) },
            e.unref(l)
              ? {}
              : e.e(
                  { b: !e.unref(l) && e.unref(v) },
                  (!e.unref(l) && e.unref(v), {}),
                  {
                    c: e.p({ span: 8, justify: 'center' }),
                    d: e.p({ span: 16 }),
                    e: e.p({ span: 8, align: 'center' }),
                    f: e.unref(m),
                  },
                  e.unref(m) ? { g: e.p({ 'call-duration': e.unref(f) }) } : {},
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
  j = e._export_sfc(f, [['__scopeId', 'data-v-b36c1c77']]);
wx.createComponent(j);
