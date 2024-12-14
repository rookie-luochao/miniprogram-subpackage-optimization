'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js');
const r = require('../../TUICallService/const/index.js'),
  o = require('../../TUICallService/CallService/index.js'),
  t = require('../../TUICallService/const/call.js');
exports.usePlayer = function () {
  const n = e.ref(o.TUIStore.getData(t.StoreName.CALL, r.NAME.PLAYER)),
    a = {
      [r.NAME.PLAYER]: (e) => {
        n.value =
          null == e
            ? void 0
            : e.map((e) => {
                const { userID: r, hasVideo: o, hasAudio: t } = e;
                return { userID: r, hasVideo: o, hasAudio: t };
              });
      },
    };
  return (
    e.onMounted(() => {
      o.TUIStore.watch(t.StoreName.CALL, a, {
        notifyRangeWhenWatch: r.NAME.MYSELF,
      });
    }),
    e.onUnmounted(() => {
      o.TUIStore.unwatch(t.StoreName.CALL, a);
    }),
    n
  );
};
