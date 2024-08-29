'use strict';
require('../../TUICallService/index.js');
const e = require('../../../../common/vendor.js'),
  r = require('../../TUICallService/CallService/index.js'),
  t = require('../../TUICallService/const/index.js'),
  n = require('../../TUICallService/const/call.js');
exports.useCallDuration = function () {
  const o = e.ref(r.TUIStore.getData(n.StoreName.CALL, t.NAME.CALL_DURATION)),
    a = (e) => {
      o.value = e;
    };
  return (
    e.onMounted(() => {
      r.TUIStore.watch(
        n.StoreName.CALL,
        { [t.NAME.CALL_DURATION]: a },
        { notifyRangeWhenWatch: t.NAME.MYSELF }
      );
    }),
    e.onUnmounted(() => {
      r.TUIStore.unwatch(n.StoreName.CALL, { [t.NAME.CALL_DURATION]: a });
    }),
    { callDuration: o }
  );
};
