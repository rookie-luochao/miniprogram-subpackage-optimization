'use strict';
const e = require('../../../../common/vendor.js'),
  o = require('./useCustomUI.js');
require('../../TUICallService/index.js');
const l = require('../util/deepClone.js'),
  n = require('../util/uiConfig.js'),
  i = require('../util/findValues.js'),
  u = require('../components/common/ButtonPanel/config/VirtualBackgroundMobileConfig.js'),
  t = require('./useCallInfoContext.js'),
  s = require('./useUserInfoContextExcludeVolume.js'),
  a = require('../components/common/ButtonPanel/config/InitConfig.js'),
  r = require('../../TUICallService/CallService/index.js'),
  c = require('../../TUICallService/const/call.js');
function d(e) {
  const o = l.deepClone(e);
  return (
    n.modify(o, 'mobile.singleCall.video', u.VirtualBackgroundMobileConfig),
    n.add(o, 'pc.singleCall.video.calling[0][2]', {
      name: 'virtualBackground',
      props: {},
    }),
    n.add(o, 'pc.singleCall.video.accept[0][1]', {
      name: 'virtualBackground',
      props: {},
    }),
    n.add(o, 'pc.singleCall.video.connected[0][3]', {
      name: 'virtualBackground',
      props: {},
    }),
    n.add(o, 'pc.groupCall.video.calling[0][3]', {
      name: 'virtualBackground',
      props: {},
    }),
    n.add(o, 'pc.groupCall.video.connected[0][4]', {
      name: 'virtualBackground',
      props: {},
    }),
    o
  );
}
exports.useCustomUIButtonConfig = function () {
  const { isShowEnableVirtualBackground: u, callStatus: p } = e.toRefs(
      t.useCallInfoContext()
    ),
    C = o.useCustomUI(),
    { localUserInfoExcludeVolume: v } = e.toRefs(
      s.useUserInfoExcludeVolumeContext()
    ),
    f = e.computed(() => (null == v ? void 0 : v.value.isVideoAvailable) || !1),
    m = e.computed(() => u.value && !r.TUIGlobal.isH5),
    g = e.ref([]);
  return (
    e.watch(
      [C, u, f],
      () => {
        let e = l.deepClone(a.ButtonPanelConfig);
        m.value && (e = d(a.ButtonPanelConfig)),
          p.value === c.CallStatus.CONNECTED &&
            (e = (function (e, o, i) {
              let u = l.deepClone(e);
              return (
                o
                  ? (n.modify(
                      u,
                      'mobile.singleCall.video.connected[1][2].props.show',
                      !0
                    ),
                    i && d(u))
                  : (n.modify(
                      u,
                      'mobile.singleCall.video.connected[1][2].props.show',
                      !1
                    ),
                    i &&
                      (n.modify(
                        u,
                        'mobile.singleCall.video.connected[1][0].props.show',
                        !1
                      ),
                      n.modify(
                        u,
                        'pc.singleCall.video.connected[0][3].props.show',
                        !1
                      ),
                      n.modify(
                        u,
                        'pc.groupCall.video.connected[0][4].props.show',
                        !1
                      ))),
                u
              );
            })(e, f.value, m.value));
        const { button: o } = C.value,
          u = [];
        i.findValues(
          e,
          function (e) {
            return Object.keys(o).includes(e);
          },
          '',
          u,
          function ({ key: e, value: l }) {
            var n;
            const i = l.split('.');
            let t = i.slice(0, i.length - 1);
            const s = i.slice(0, i.length - 2);
            if ('0' === s[s.length - 1])
              for (let o = 0; o < 3; o++) {
                let e = s.slice();
                e.push(o),
                  e.push('customStyle'),
                  e.push('justifyContent'),
                  (e = e.join('.')),
                  u.push({ path: e, value: 'center' });
              }
            return (
              t.push('props'),
              t.push('show'),
              (t = t.join('.')),
              {
                path: t,
                value:
                  null == (n = null == o ? void 0 : o[e]) ? void 0 : n.show,
              }
            );
          }
        ),
          null == u ||
            u.forEach((o) => {
              n.modify(e, o.path, o.value);
            }),
          (g.value = e);
      },
      { immediate: !0 }
    ),
    g
  );
};
