'use strict';
const e = require('../../../../../../../common/vendor.js');
require('../../../../../TUICallService/index.js'),
  require('../../../../../TUICallService/const/index.js');
const o = require('../../../../hooks/useCallInfoContext.js');
require('../../../../util/stringToPath.js'), Math || (n + t)();
const n = () => './FloatWindowSingleCall.js',
  t = () => './FloatWindowGroupCall.js',
  r = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'FloatWindow',
    setup(n) {
      const { isGroupCall: t } = e.toRefs(o.useCallInfoContext());
      return (o, n) => e.e({ a: !e.unref(t) }, (e.unref(t), {}));
    },
  });
wx.createComponent(r);
