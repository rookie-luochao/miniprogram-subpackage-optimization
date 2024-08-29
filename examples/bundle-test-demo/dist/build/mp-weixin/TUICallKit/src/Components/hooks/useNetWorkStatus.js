'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js');
const t = require('../../TUICallService/const/index.js'),
  r = require('../../TUICallService/CallService/index.js'),
  n = require('../../TUICallService/const/call.js');
exports.useNetWorkStatus = function () {
  const o = e.ref(r.TUIStore.getData(n.StoreName.CALL, t.NAME.NETWORK_STATUS)),
    S = (e) => {
      o.value = e;
    };
  return (
    e.onMounted(() => {
      r.TUIStore.watch(
        n.StoreName.CALL,
        { [t.NAME.NETWORK_STATUS]: S },
        { notifyRangeWhenWatch: t.NAME.MYSELF }
      );
    }),
    e.onUnmounted(() => {
      r.TUIStore.unwatch(n.StoreName.CALL, { [t.NAME.NETWORK_STATUS]: S });
    }),
    { netWorkQualityList: o }
  );
};
