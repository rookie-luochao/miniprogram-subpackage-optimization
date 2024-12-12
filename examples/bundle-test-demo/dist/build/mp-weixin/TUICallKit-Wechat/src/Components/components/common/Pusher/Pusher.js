'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const o = require('../../base/util/classNames.js');
require('../../base/util/checkEnv.js');
const r = require('../../../../TUICallService/CallService/index.js'),
  a = require('../../../../TUICallService/const/index.js'),
  n = require('../../../../TUICallService/const/call.js'),
  t = {
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
    props: t,
    setup(t) {
      const s = e.ref(r.TUIStore.getData(n.StoreName.CALL, a.NAME.PUSHER_ID)),
        l = o.classNames([
          'stream-info-container',
          { mobile: !r.TUIGlobal.isPC },
        ]),
        i = {
          [a.NAME.PUSHER_ID]: (e) => {
            s.value = e;
          },
        };
      return (
        e.onMounted(() => {
          r.TUIStore.watch(n.StoreName.CALL, i, {
            notifyRangeWhenWatch: a.NAME.MYSELF,
          });
        }),
        e.onUnmounted(() => {
          r.TUIStore.unwatch(n.StoreName.CALL, i);
        }),
        (o, r) =>
          e.e(
            {
              a: o.showAudioStream,
              b: e.n(e.unref(l)),
              c: e.unref(s) === e.unref(a.NAME).INITIAL_PUSHER,
            },
            e.unref(s) === e.unref(a.NAME).INITIAL_PUSHER
              ? { d: e.p({ localClass: 'large-view' }) }
              : {},
            { e: e.unref(s) === e.unref(a.NAME).NEW_PUSHER },
            e.unref(s) === e.unref(a.NAME).NEW_PUSHER
              ? { f: e.p({ localClass: 'large-view' }) }
              : {},
            { g: o.show, h: o.domId }
          )
      );
    },
  }),
  i = e._export_sfc(l, [['__scopeId', 'data-v-c22cab91']]);
wx.createComponent(i);
