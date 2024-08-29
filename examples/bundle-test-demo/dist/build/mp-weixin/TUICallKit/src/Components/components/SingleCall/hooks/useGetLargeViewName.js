'use strict';
require('../../../../TUICallService/const/index.js');
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const o = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const u = require('../../../hooks/useUserInfoContextExcludeVolume.js'),
  t = require('../../../hooks/useCustomUI.js'),
  l = require('../../../../TUICallService/const/call.js');
exports.useGetLargeViewName = function () {
  const s = t.useCustomUI(),
    { callStatus: r } = e.toRefs(o.useCallInfoContext()),
    i = e.ref(l.ViewName.LOCAL),
    { remoteUserListExcludeVolume: n } = e.toRefs(
      u.useUserInfoExcludeVolumeContext()
    );
  return (
    e.watch(
      [n, s, r],
      () => {
        var e, o, u, t;
        if (r.value === l.CallStatus.CALLING) return;
        const a = [
            l.LayoutMode.RemoteInLargeView,
            l.LayoutMode.LocalInLargeView,
          ],
          c = null == (e = s.value) ? void 0 : e.layoutMode;
        a.includes(c)
          ? (i.value = null == (o = s.value) ? void 0 : o.layoutMode)
          : (null == (t = null == (u = n.value) ? void 0 : u[0])
              ? void 0
              : t.isEnter) && (i.value = l.ViewName.REMOTE);
      },
      { immediate: !0 }
    ),
    i
  );
};
