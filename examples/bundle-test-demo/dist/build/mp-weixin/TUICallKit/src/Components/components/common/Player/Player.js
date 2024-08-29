'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const o = require('../../base/util/classNames.js');
require('../../base/util/checkEnv.js');
const a = require('../../../../TUICallService/CallService/index.js'),
  s = {
    show: { type: Boolean, default: !0 },
    domId: { type: String },
    loading: { type: Boolean },
    showStreamInfo: { type: Boolean },
    showAudioStream: { type: Boolean },
  };
Math || t();
const t = () => './weChatPlayer/weChatPlayer.js',
  r = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Player',
    props: s,
    setup(s) {
      const t = o.classNames([
        'stream-info-container',
        { mobile: !a.TUIGlobal.isPC },
      ]);
      return (o, s) =>
        e.e(
          {
            a: o.showAudioStream,
            b: e.n(e.unref(t)),
            c: e.unref(a.TUIGlobal).isWeChat,
          },
          e.unref(a.TUIGlobal).isWeChat
            ? { d: e.p({ 'dom-id': o.domId, remoteClass: 'small-view' }) }
            : {},
          { e: o.show, f: o.domId }
        );
    },
  }),
  n = e._export_sfc(r, [['__scopeId', 'data-v-9e8318dd']]);
wx.createComponent(n);
