'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js');
const l = require('../../TUICallService/const/index.js'),
  a = require('../util/isEqual.js');
require('../util/stringToPath.js');
const o = require('../../TUICallService/CallService/index.js'),
  t = require('../../TUICallService/const/call.js');
exports.useGetVolumeMap = function () {
  const i = e.ref(),
    r = e.ref(
      o.TUIStore.getData(t.StoreName.CALL, l.NAME.REMOTE_USER_INFO_LIST)
    ),
    u = (e) => {
      (o.TUIGlobal.isWeChat ? e.enableMic : e.isAudioAvailable) &&
        (i.value = { ...i.value, localVideo: e.volume });
    },
    n = (e) => {
      const l = {};
      (e.length === r.value.length && a.isEqual(e, r.value)) ||
        ((r.value = e),
        r.value.forEach((e) => {
          if (o.TUIGlobal.isWeChat ? e.hasAudio : e.isAudioAvailable) {
            const a = o.TUIGlobal.isWeChat ? e.userID : e.domId;
            l[a] = e.volume;
          }
        }),
        (i.value = { ...i.value, ...l }));
    };
  let s = { [l.NAME.LOCAL_USER_INFO]: u, [l.NAME.REMOTE_USER_INFO_LIST]: n };
  return (
    o.TUIGlobal.isUniPlatform &&
      (s = { [l.NAME.PUSHER]: u, [l.NAME.PLAYER]: n }),
    e.onMounted(() => {
      o.TUIStore.watch(t.StoreName.CALL, s, {
        notifyRangeWhenWatch: l.NAME.MYSELF,
      });
    }),
    e.onUnmounted(() => {
      o.TUIStore.unwatch(t.StoreName.CALL, s);
    }),
    i
  );
};
