'use strict';
const e = require('../../../../../common/vendor.js');
require('../../../TUICallService/index.js'),
  require('../../../TUICallService/const/index.js');
const n = require('../../hooks/useCallInfoContext.js');
require('../../util/stringToPath.js');
const t = require('../../../TUICallService/const/call.js');
Math || (o + s + a + r + i)();
const o = () => '../common/TopBar/TopBar.js',
  s = () => '../common/Waiting/Waiting.js',
  a = () => './MediaContainer/MediaContainer.js',
  r = () => '../common/Tip/Tip.js',
  i = () => '../common/ButtonPanel/ButtonPanel.js',
  l = e.defineComponent({
    __name: 'SingleCall',
    setup(o) {
      const { callStatus: s } = e.toRefs(n.useCallInfoContext());
      return (n, o) =>
        e.e(
          { a: e.unref(s) === e.unref(t.CallStatus).CALLING },
          (e.unref(s), e.unref(t.CallStatus).CALLING, {})
        );
    },
  }),
  c = e._export_sfc(l, [['__scopeId', 'data-v-3b0b22e3']]);
wx.createComponent(c);
