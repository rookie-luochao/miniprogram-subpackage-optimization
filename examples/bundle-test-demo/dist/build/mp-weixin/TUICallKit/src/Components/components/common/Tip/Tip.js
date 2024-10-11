'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js'),
  require('../../../../TUICallService/const/index.js');
const o = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const t = require('../../../hooks/useTip.js'),
  s = require('../../../hooks/useFloatWindowContext.js');
require('../../base/util/checkEnv.js');
const n = require('../../base/util/filterObject.js'),
  i = require('../../../../TUICallService/CallService/index.js'),
  r = { customClass: { type: String } };
Math || a();
const a = () => '../../base/Message/Message.js',
  l = e.defineComponent({
    options: { virtualHost: !0, styleIsolation: 'shared' },
    __name: 'Tip',
    props: r,
    setup(r) {
      const { isFloatWindow: a } = e.toRefs(s.useFloatWindowContext()),
        { tip: l, duration: u } = t.useTip(),
        { isGroupCall: c } = e.toRefs(o.useCallInfoContext()),
        p = e.ref(null),
        d = r,
        f = i.TUIGlobal.isPC,
        v = e.computed(() => [d.customClass]),
        m = e.computed(() =>
          n.filterObject({
            color: 'white',
            background: 'none',
            position: 'absolute',
            'z-index': 4,
            'align-items': 'center',
            left: '50%',
            top: '' + (f ? '60%' : '70%'),
            transform: 'translate(-50%, -50%)',
            'font-size': a.value ? '12px' : void 0,
          })
        ),
        C = e.computed(() =>
          n.filterObject({
            color: 'white',
            background: 'none',
            position: 'static',
            transform: 'none',
            'font-size': a.value ? '12px' : void 0,
          })
        ),
        j = e.computed(() => (c.value ? C.value : m.value));
      return (
        e.watch(l, () => {
          var e;
          null == (e = p.value) ||
            e.show({ message: l.value, duration: u.value, offset: 0 });
        }),
        (o, t) => ({
          a: e.sr(p, '76ecb1cc-0', { k: 'message' }),
          b: e.n(e.unref(v)),
          c: e.p({ showIcon: !1, customStyle: e.unref(j) }),
        })
      );
    },
  });
wx.createComponent(l);
