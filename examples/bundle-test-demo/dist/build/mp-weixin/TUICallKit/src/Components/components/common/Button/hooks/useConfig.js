'use strict';
require('../../../../../TUICallService/index.js');
const l = require('../../../../../../../common/vendor.js');
require('../../../../../TUICallService/const/index.js');
const e = require('../../../../hooks/useCallInfoContext.js');
require('../../../../util/stringToPath.js');
const t = require('../../../../hooks/useButtonPanelStatus.js'),
  u = require('../../../config/button/ClosedPanelUI.js'),
  a = require('../../../config/button/DefaultUI.js'),
  o = require('../../../../../TUICallService/CallService/index.js'),
  i = require('../../../../../TUICallService/const/call.js');
exports.useBtnConfig = (n, s) => {
  var r, c;
  const v = o.TUIGlobal.isPC ? 'pc' : 'mobile',
    { status: C } = t.useButtonPanelStatus(),
    {
      callStatus: d,
      callRole: I,
      isGroupCall: U,
      callType: j,
    } = l.toRefs(e.useCallInfoContext()),
    q = l.ref(
      null == (c = null == (r = a.defaultButtonUI) ? void 0 : r[n])
        ? void 0
        : c[s.value]
    );
  return (
    l.watch(
      [s, C, d, U, j],
      () => {
        var l, e, t, o, r;
        const c = U.value ? 'groupCall' : 'singleCall',
          S = j.value === i.CallMediaType.AUDIO ? 'audio' : 'video';
        let f = '';
        d.value === i.CallStatus.CALLING
          ? (f = I.value === i.CallRole.CALLER ? 'calling' : 'accept')
          : d.value === i.CallStatus.CONNECTED && (f = 'connected');
        let T = a.InitialUI;
        'close' === C.value && (T = u.closedPanelUI),
          (q.value =
            (null ==
            (r =
              null ==
              (o =
                null ==
                (t =
                  null ==
                  (e = null == (l = null == T ? void 0 : T[v]) ? void 0 : l[c])
                    ? void 0
                    : e[S])
                  ? void 0
                  : t[f])
                ? void 0
                : o[n])
              ? void 0
              : r[s.value]) || {});
      },
      { immediate: !0 }
    ),
    q
  );
};
