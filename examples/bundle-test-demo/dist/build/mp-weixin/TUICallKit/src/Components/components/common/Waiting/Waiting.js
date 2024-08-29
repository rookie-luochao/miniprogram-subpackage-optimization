'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const l = require('../../../hooks/useCallerUserInfoContext.js'),
  u = require('../../../hooks/useCallInfoContext.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const a = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  r = require('../../../hooks/useViewBackgroundConfig.js'),
  o = require('../../../../../../common/assets.js'),
  s = require('../../../../TUICallService/CallService/index.js'),
  n = require('../../../../TUICallService/locales/index.js');
Math || (i + t + v)();
const v = () => '../OverlayStream/OverlayStream.js',
  t = () => '../../base/Avatar/Avatar.js',
  i = () => '../../base/TKText/TKText.js',
  d = e.defineComponent({
    __name: 'Waiting',
    setup(v) {
      const { localUserInfoExcludeVolume: t, remoteUserListExcludeVolume: i } =
          e.toRefs(a.useUserInfoExcludeVolumeContext()),
        { callerUserInfo: d } = e.toRefs(l.useCallerUserInfoContext()),
        { isGroupCall: c } = e.toRefs(u.useCallInfoContext()),
        f = r.useViewBackgroundConfig(),
        I = e.computed(() => {
          var e, l;
          return c.value
            ? d.value.displayUserInfo
            : null == (l = null == (e = i.value) ? void 0 : e[0])
              ? void 0
              : l.displayUserInfo;
        }),
        m = e.computed(() => {
          var e, l;
          return c.value
            ? d.value.avatar
            : null == (l = null == (e = i.value) ? void 0 : e[0])
              ? void 0
              : l.avatar;
        }),
        C = e.computed(() => !!c.value || !t.value.isVideoAvailable),
        p = e.computed(() => (c.value ? n.t('Invited group call') : null)),
        x = e.computed(() => {
          var e, l;
          return c.value
            ? f.value[d.value.userId] || m.value
            : f.value[
                null == (l = null == (e = i.value) ? void 0 : e[0])
                  ? void 0
                  : l.userId
              ] || m.value;
        }),
        U = e.ref(!1),
        g = e.ref('fill');
      let j = e.ref(!1);
      e.watchEffect(() => {
        var e, l, u, a;
        if (j.value)
          return (
            (U.value = !!c.value || !t.value.isVideoAvailable),
            void (g.value = 'cover')
          );
        c.value
          ? ((U.value = !f.value[d.value.userId]),
            (g.value = f.value[d.value.userId] ? 'fill' : 'cover'))
          : ((U.value =
              !t.value.isVideoAvailable &&
              !f.value[
                null == (l = null == (e = i.value) ? void 0 : e[0])
                  ? void 0
                  : l.userId
              ]),
            (g.value = f.value[
              null == (a = null == (u = i.value) ? void 0 : u[0])
                ? void 0
                : a.userId
            ]
              ? 'fill'
              : 'cover'));
      });
      const b = () => {
        j.value = !0;
      };
      return (l, u) =>
        e.e(
          { a: !e.unref(s.TUIGlobal).isPC && e.unref(c) },
          !e.unref(s.TUIGlobal).isPC && e.unref(c)
            ? {
                b: e.t(e.unref(i).length),
                c: e.t(e.unref(n.t)('people in the call')),
                d: e.p({ color: '#FFF' }),
                e: e.f(e.unref(i), (l, u, a) => ({
                  a: '6d97c93d-2-' + a + ',6d97c93d-0',
                  b: e.p({
                    size: '100%',
                    src: l.avatar || e.unref(o.defaultAvatarSrc),
                  }),
                })),
              }
            : {},
          {
            f: e.o(b),
            g: e.p({
              username: e.unref(I),
              avatar: e.unref(m),
              'bg-image': e.unref(x),
              'show-avatar': !e.unref(s.TUIGlobal).isPC,
              'show-loading': !1,
              'bg-color': '#22262ed9',
              'show-mask': e.unref(U),
              'show-background-image': e.unref(C),
              tip: e.unref(p),
              fit: e.unref(g),
            }),
          }
        );
    },
  }),
  c = e._export_sfc(d, [['__scopeId', 'data-v-6d97c93d']]);
wx.createComponent(c);
