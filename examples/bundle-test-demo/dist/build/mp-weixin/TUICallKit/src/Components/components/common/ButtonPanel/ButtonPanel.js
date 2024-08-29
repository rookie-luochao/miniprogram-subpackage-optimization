'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const t = require('./hooks/useButtonPanelLayout.js'),
  o = require('../../../../TUICallService/const/index.js'),
  n = require('../../../context/IsClickableContext.js'),
  u = require('../../../context/PopoverContext.js'),
  s = require('../../base/util/classNames.js');
require('../../base/util/checkEnv.js');
const a = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const r = require('../../../hooks/useButtonPanelStatus.js'),
  i = require('../../../hooks/useFocusContext.js'),
  l = require('../../../../TUICallService/CallService/index.js'),
  c = require('../../../../TUICallService/const/call.js');
Math || (m + p + C + v + d + j + f + g + x + I + h + S)();
const h = () => '../../base/Grid/Grid.js',
  p = () => '../../base/Grid/GridItem/GridItem.js',
  f = () => '../Button/Camera.js',
  d = () => '../Button/Hangup.js',
  m = () => '../Button/Accept.js',
  v = () => '../Button/Microphone.js',
  C = () => '../Button/Reject.js',
  j = () => '../Button/Speaker.js',
  x = () => '../Button/SwitchCamera.js',
  g = () => '../Button/VirtualBackground.js',
  S = () => '../Button/ToggleButtonPanel.js',
  I = () => '../Button/InviteUser.js',
  B = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'ButtonPanel',
    setup(h) {
      const p = e.ref(null),
        f = e.ref({}),
        { isGroupCall: d } = e.toRefs(a.useCallInfoContext()),
        { status: m } = r.useButtonPanelStatus() || {},
        v = e.ref(!1),
        C = e.ref(!1),
        j = e.ref(''),
        x = i.useFocusContext();
      e.watchEffect(() => {
        v.value ||
          (d.value && !l.TUIGlobal.isPC && null !== x.value
            ? (v.value = !0)
            : (v.value = !1));
      });
      const g = e.computed(() =>
          s.classNames([
            'button-panel-container',
            {
              pc: l.TUIGlobal.isPC,
              mobile: !l.TUIGlobal.isPC,
              h5: l.TUIGlobal.isH5,
              groupCall: d.value,
              singleCall: !d.value,
              close: 'close' === (null == m ? void 0 : m.value),
              open: 'open' === (null == m ? void 0 : m.value),
              showBackGround: v.value,
            },
          ])
        ),
        S = s.classNames(['toggle-button-container', { h5: l.TUIGlobal.isH5 }]),
        I = l.TUIGlobal.isH5
          ? {
              transitionProperty: 'width,height,left,top',
              transitionDuration: '0.3s',
              transitionTimingFunction: 'ease-in',
            }
          : {};
      function B(e) {
        p.value = e;
      }
      const { layout: b, config: y } = t.useButtonPanelLayout();
      e.watch(
        y,
        () => {
          const e = {},
            t = y.value.flat();
          for (let o of t) {
            const { name: t, props: n = {} } = o;
            !1 !== n.showText && (n.showText = !0), (e[t] = n);
          }
          f.value = e;
        },
        { immediate: !0 }
      );
      const T = {
        [o.NAME.IS_CLICKABLE]: function (e) {
          C.value = e;
        },
      };
      return (
        e.onMounted(() => {
          l.TUIStore.watch(c.StoreName.CALL, T, {
            notifyRangeWhenWatch: o.NAME.MYSELF,
          });
        }),
        e.onUnmounted(() => {
          l.TUIStore.unwatch(c.StoreName.CALL, T);
        }),
        e.provide(n.IsClickableContextKey, C),
        e.provide(u.PopoverContextKey, j),
        (t, o) =>
          e.e(
            {
              a: e.p({
                index: 'accept',
                height: 'auto',
                customStyle: e.unref(I),
              }),
              b: e.p({
                index: 'reject',
                height: 'auto',
                customStyle: e.unref(I),
              }),
              c: e.p({
                index: 'microphone',
                height: 'auto',
                customStyle: e.unref(I),
              }),
              d: e.p({
                index: 'hangup',
                height: 'auto',
                customStyle: e.unref(I),
              }),
              e: e.p({
                index: 'speaker',
                height: 'auto',
                customStyle: e.unref(I),
              }),
              f: e.p({
                index: 'camera',
                height: 'auto',
                customStyle: e.unref(I),
              }),
              g: e.p({
                index: 'virtualBackground',
                height: 'auto',
                customStyle: e.unref(I),
              }),
              h: e.p({
                index: 'switchCamera',
                height: 'auto',
                customStyle: e.unref(I),
              }),
              i: e.p({
                index: 'inviteUser',
                height: 'auto',
                customStyle: e.unref(I),
              }),
              j: e.o(B),
              k: e.p({ unit: '%', layout: e.unref(b), focus: e.unref(p) }),
              l: e.unref(v),
            },
            e.unref(v) ? { m: e.n(e.unref(S)) } : {},
            { n: e.n(e.unref(g)) }
          )
      );
    },
  }),
  b = e._export_sfc(B, [['__scopeId', 'data-v-768a41eb']]);
wx.createComponent(b);
