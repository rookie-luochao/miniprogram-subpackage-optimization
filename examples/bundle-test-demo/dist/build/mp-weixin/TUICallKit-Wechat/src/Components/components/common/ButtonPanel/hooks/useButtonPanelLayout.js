'use strict';
const e = require('../../../../../../../common/vendor.js');
require('../../../../../TUICallService/index.js'),
  require('../../../../../TUICallService/const/index.js');
const l = require('../../../../hooks/useCallInfoContext.js');
require('../../../../util/stringToPath.js');
const t = require('../../../../hooks/useButtonPanelStatus.js'),
  o = require('../../../../hooks/useCustomUIButtonConfig.js');
require('../../../../../TUICallService/utils/env.js');
const u = require('../../../../../TUICallService/CallService/index.js'),
  s = require('../../../../../TUICallService/const/call.js');
exports.useButtonPanelLayout = function () {
  const n = e.ref([]),
    a = e.ref([]),
    {
      callStatus: i,
      isGroupCall: r,
      callType: c,
      callRole: v,
    } = e.toRefs(l.useCallInfoContext()),
    { status: C } = t.useButtonPanelStatus() || {},
    d = o.useCustomUIButtonConfig();
  return (
    e.watch(
      [i, r, c, v, C, d],
      () => {
        var e, l, t;
        let o = d.value;
        const f = u.TUIGlobal.isPC ? 'pc' : 'mobile',
          p = r.value ? 'groupCall' : 'singleCall',
          I = c.value === s.CallMediaType.AUDIO ? 'audio' : 'video';
        let S =
          i.value === s.CallStatus.CALLING
            ? v.value === s.CallRole.CALLER
              ? 'calling'
              : 'accept'
            : i.value;
        r && 'close' === (null == C ? void 0 : C.value) && (S = 'close_' + S);
        const g =
          (null ==
          (t =
            null ==
            (l = null == (e = null == o ? void 0 : o[f]) ? void 0 : e[p])
              ? void 0
              : l[I])
            ? void 0
            : t[S]) || [];
        a.value = g;
        const h = [];
        let m = 0;
        for (let u = 0; u < g.length; u++) {
          const e =
            0 === u
              ? g[u].filter((e) => {
                  var l;
                  return (
                    !1 !==
                    (null == (l = null == e ? void 0 : e.props)
                      ? void 0
                      : l.show)
                  );
                })
              : g[u];
          g[u] = e;
          const l = 12 / e.length,
            t = 3;
          for (let o = 0; o < e.length; o++)
            h[m++] = {
              i: e[o].name,
              x: o * l,
              y: u * l,
              w: l,
              h: t,
              customStyle: e[o].customStyle,
              customProps: e[o].props,
            };
        }
        m = 0;
        let j = [];
        for (let u = 0; u < g.flat().length; u++) j[u] = h[m++];
        (j = j.filter((e) => e.i)), (n.value = j);
      },
      { immediate: !0 }
    ),
    { layout: n, config: a }
  );
};
