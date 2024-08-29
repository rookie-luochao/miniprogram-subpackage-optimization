'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const o = require('../../base/util/classNames.js');
require('../../base/util/checkEnv.js');
const r = require('../../../../TUICallService/CallService/index.js'),
  n = require('../../../../TUICallService/const/index.js'),
  t = require('../../../../TUICallService/const/call.js'),
  a = {
    show: { type: Boolean, default: !0 },
    domId: { type: String },
    loading: { type: Boolean },
    showStreamInfo: { type: Boolean },
    showAudioStream: { type: Boolean },
  };
Math || s();
const s = () => './weChatPusher/weChatPusher.js',
  l = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Pusher',
    props: a,
    setup(a) {
      const s = e.ref(r.TUIStore.getData(t.StoreName.CALL, n.NAME.PUSHER_ID)),
        l = o.classNames([
          'stream-info-container',
          { mobile: !r.TUIGlobal.isPC },
        ]),
        i = {
          [n.NAME.PUSHER_ID]: (e) => {
            s.value = e;
          },
        };
      return (
        e.onMounted(() => {
          r.TUIStore.watch(t.StoreName.CALL, i, {
            notifyRangeWhenWatch: n.NAME.MYSELF,
          });
        }),
        e.onUnmounted(() => {
          r.TUIStore.unwatch(t.StoreName.CALL, i);
        }),
        (o, r) =>
          e.e(
            {
              a: o.showAudioStream,
              b: e.n(e.unref(l)),
              c: e.unref(s) === e.unref(n.NAME).INITIAL_PUSHER,
            },
            e.unref(s) === e.unref(n.NAME).INITIAL_PUSHER
              ? { d: e.p({ localClass: 'large-view' }) }
              : {},
            { e: e.unref(s) === e.unref(n.NAME).NEW_PUSHER },
            e.unref(s) === e.unref(n.NAME).NEW_PUSHER
              ? { f: e.p({ localClass: 'large-view' }) }
              : {},
            { g: o.show, h: o.domId }
          )
      );
    },
  }),
  i = e._export_sfc(l, [['__scopeId', 'data-v-1f870bbb']]);
wx.createComponent(i);
