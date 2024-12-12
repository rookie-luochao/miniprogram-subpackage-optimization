'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js');
const r = require('../../TUICallService/const/index.js'),
  t = require('../../TUICallService/CallService/index.js'),
  n = require('../../TUICallService/const/call.js');
exports.useTip = function () {
  const o = e.ref(''),
    i = e.ref(!0),
    c = e.ref(0),
    a = (e) => {
      'object' == typeof e
        ? ((o.value = e.text), (c.value = e.duration || 0))
        : (o.value = e);
    };
  return (
    e.onMounted(() => {
      t.TUIStore.watch(
        n.StoreName.CALL,
        { [r.NAME.CALL_TIPS]: a },
        { notifyRangeWhenWatch: r.NAME.MYSELF }
      );
    }),
    e.onUnmounted(() => {
      t.TUIStore.unwatch(n.StoreName.CALL, { [r.NAME.CALL_TIPS]: a });
    }),
    { tip: o, show: i, duration: c }
  );
};
