'use strict';
const e = require('../../../../../common/vendor.js');
require('../../../TUICallService/index.js'),
  require('../../../TUICallService/const/index.js');
const n = require('../../hooks/useCallInfoContext.js');
require('../../util/stringToPath.js'),
  require('../../../TUICallService/utils/env.js');
const t = require('../../../TUICallService/const/call.js');
Math || (o + a + r + s + i)();
const o = () => '../common/TopBar/TopBar.js',
  a = () => '../common/Waiting/Waiting.js',
  r = () => './MediaContainer/MediaContainer.js',
  s = () => '../common/Tip/Tip.js',
  i = () => '../common/ButtonPanel/ButtonPanel.js',
  l = e.defineComponent({
    __name: 'SingleCall',
    setup(o) {
      const { callStatus: a } = e.toRefs(n.useCallInfoContext());
      return (n, o) =>
        e.e(
          { a: e.unref(a) === e.unref(t.CallStatus).CALLING },
          (e.unref(a), e.unref(t.CallStatus).CALLING, {})
        );
    },
  }),
  u = e._export_sfc(l, [['__scopeId', 'data-v-87ae0fa6']]);
wx.createComponent(u);
