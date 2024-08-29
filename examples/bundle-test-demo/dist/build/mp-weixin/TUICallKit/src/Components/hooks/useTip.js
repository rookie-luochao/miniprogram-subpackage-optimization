'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js');
const r = require('../../TUICallService/const/index.js'),
  t = require('../../TUICallService/CallService/index.js'),
  o = require('../../TUICallService/const/call.js');
exports.useTip = function () {
  const n = e.ref(''),
    i = e.ref(!0),
    a = e.ref(0),
    c = (e) => {
      (a.value = 0), (n.value = e);
    },
    l = (e) => {
      let r = e;
      'object' == typeof r && (r = null == e ? void 0 : e.text),
        r && ((a.value = 2e3), (n.value = r));
    };
  return (
    e.onMounted(() => {
      t.TUIStore.watch(
        o.StoreName.CALL,
        { [r.NAME.CALL_TIPS]: c },
        { notifyRangeWhenWatch: r.NAME.MYSELF }
      ),
        t.TUIStore.watch(o.StoreName.CALL, { [r.NAME.TOAST_INFO]: l });
    }),
    e.onUnmounted(() => {
      t.TUIStore.unwatch(o.StoreName.CALL, {
        [r.NAME.CALL_TIPS]: c,
        [r.NAME.TOAST_INFO]: l,
      });
    }),
    { tip: n, show: i, duration: a }
  );
};
