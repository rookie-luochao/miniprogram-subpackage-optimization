'use strict';
const e = require('../../../../common/vendor.js');
require('../const/index.js');
const o = require('../const/call.js');
function n() {
  e.wx$1.hideKeyboard && e.wx$1.hideKeyboard({ complete: () => {} }),
    'devtools' === e.wx$1.getSystemInfoSync().platform &&
      e.wx$1.showModal({
        icon: 'none',
        title: '运行环境提醒',
        content:
          '微信开发者工具不支持原生推拉流组件(即 <live-pusher> 和 <live-player> 标签)，请使用真机调试或者扫码预览。',
        showCancel: !1,
      });
}
(exports.beforeCall = async function (e, t) {
  try {
    n();
    const l = { microphone: !0, camera: e === o.CallMediaType.VIDEO };
    return (await t._tuiCallEngine.deviceCheck(l))
      ? o.CallStatus.CALLING
      : o.CallStatus.IDLE;
  } catch (l) {
    return console.debug(l), o.CallStatus.IDLE;
  }
}),
  (exports.handleNoPusherCapabilityError = function () {
    e.wx$1.showModal({
      icon: 'none',
      title: '权限提示',
      content:
        '当前小程序 appid 不具备 <live-pusher> 和 <live-player> 的使用权限，您将无法正常使用实时通话能力，请使用企业小程序账号申请权限后再进行开发体验',
      showCancel: !1,
    });
  }),
  (exports.handlePackageError = function (o) {
    -1002 === (null == o ? void 0 : o.code) &&
      e.wx$1.showModal({
        icon: 'none',
        title: 'error',
        content: (null == o ? void 0 : o.message) || '',
        showCancel: !1,
      });
  }),
  (exports.initAndCheckRunEnv = n);
