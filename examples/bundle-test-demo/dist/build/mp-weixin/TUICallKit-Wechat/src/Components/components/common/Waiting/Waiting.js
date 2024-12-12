'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const l = require('../../../hooks/useCallerUserInfoContext.js'),
  a = require('../../../hooks/useCallInfoContext.js');
require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const u = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  r = require('../../../hooks/useViewBackgroundConfig.js'),
  o = require('../../../hooks/useTranslate.js'),
  s = require('../../../../../../common/assets.js'),
  n = require('../../../../TUICallService/CallService/index.js');
Math || (i + t + v)();
const v = () => '../OverlayStream/OverlayStream.js',
  t = () => '../../base/Avatar/Avatar.js',
  i = () => '../../base/TKText/TKText.js',
  c = e.defineComponent({
    __name: 'Waiting',
    setup(v) {
      const { localUserInfoExcludeVolume: t, remoteUserListExcludeVolume: i } =
          e.toRefs(u.useUserInfoExcludeVolumeContext()),
        { callerUserInfo: c } = e.toRefs(l.useCallerUserInfoContext()),
        { isGroupCall: d } = e.toRefs(a.useCallInfoContext()),
        f = r.useViewBackgroundConfig(),
        I = o.useTranslate(),
        m = e.computed(() => {
          var e, l;
          return d.value
            ? c.value.displayUserInfo
            : null == (l = null == (e = i.value) ? void 0 : e[0])
              ? void 0
              : l.displayUserInfo;
        }),
        C = e.computed(() => {
          var e, l;
          return d.value
            ? c.value.avatar
            : null == (l = null == (e = i.value) ? void 0 : e[0])
              ? void 0
              : l.avatar;
        }),
        p = e.computed(() => !!d.value || !t.value.isVideoAvailable),
        x = e.computed(() => (d.value ? I.value('Invited group call') : null)),
        g = e.computed(() => {
          var e, l;
          return d.value
            ? f.value[c.value.userId] || C.value
            : f.value[
                null == (l = null == (e = i.value) ? void 0 : e[0])
                  ? void 0
                  : l.userId
              ] || C.value;
        }),
        U = e.ref(!1),
        h = e.ref('fill');
      let j = e.ref(!1);
      e.watchEffect(() => {
        var e, l, a, u;
        if (j.value)
          return (
            (U.value = !!d.value || !t.value.isVideoAvailable),
            void (h.value = 'cover')
          );
        d.value
          ? ((U.value = !f.value[c.value.userId]),
            (h.value = f.value[c.value.userId] ? 'fill' : 'cover'))
          : ((U.value =
              !t.value.isVideoAvailable &&
              !f.value[
                null == (l = null == (e = i.value) ? void 0 : e[0])
                  ? void 0
                  : l.userId
              ]),
            (h.value = f.value[
              null == (u = null == (a = i.value) ? void 0 : a[0])
                ? void 0
                : u.userId
            ]
              ? 'fill'
              : 'cover'));
      });
      const b = () => {
        j.value = !0;
      };
      return (l, a) =>
        e.e(
          { a: !e.unref(n.TUIGlobal).isPC && e.unref(d) },
          !e.unref(n.TUIGlobal).isPC && e.unref(d)
            ? {
                b: e.t(e.unref(i).length),
                c: e.t(e.unref(I)('people in the call')),
                d: e.p({ color: '#FFF' }),
                e: e.f(e.unref(i), (l, a, u) => ({
                  a: 'cae1c1c1-2-' + u + ',cae1c1c1-0',
                  b: e.p({
                    size: '100%',
                    src: l.avatar || e.unref(s.defaultAvatarSrc),
                  }),
                })),
              }
            : {},
          {
            f: e.o(b),
            g: e.p({
              username: e.unref(m),
              avatar: e.unref(C),
              'bg-image': e.unref(g),
              'show-avatar': !e.unref(n.TUIGlobal).isPC,
              'show-loading': !1,
              'bg-color': '#22262ed9',
              'show-mask': e.unref(U),
              'show-background-image': e.unref(p),
              tip: e.unref(x),
              fit: e.unref(h),
            }),
          }
        );
    },
  }),
  d = e._export_sfc(c, [['__scopeId', 'data-v-cae1c1c1']]);
wx.createComponent(d);
