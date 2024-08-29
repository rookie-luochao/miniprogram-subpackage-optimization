'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js');
const o = require('../../base/util/classNames.js');
require('../../base/util/checkEnv.js'),
  require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const s = require('../../../hooks/useFloatWindowContext.js'),
  t = require('../../../../TUICallService/CallService/index.js');
Math || i();
const i = () => './mobile/FloatWindow.js',
  n = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'FloatWindow',
    setup(i) {
      const { isFloatWindow: n } = e.toRefs(s.useFloatWindowContext()),
        a = e.computed(() =>
          o.classNames([
            'float-window-container',
            {
              float: n.value,
              'not-float': !n.value,
              pc: t.TUIGlobal.isPC,
              mobile: !t.TUIGlobal.isPC,
            },
          ])
        );
      return (o, s) =>
        e.e(
          { a: !e.unref(t.TUIGlobal).isPC },
          (e.unref(t.TUIGlobal).isPC, {}),
          { b: e.n(e.unref(a)) }
        );
    },
  }),
  a = e._export_sfc(n, [['__scopeId', 'data-v-89a66582']]);
wx.createComponent(a);
