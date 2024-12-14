'use strict';
const e = require('../../../../../../common/vendor.js');
require('../../../../TUICallService/index.js'),
  require('../../../../TUICallService/const/index.js');
const s = require('../../../hooks/useCallInfoContext.js');
require('../../../util/stringToPath.js');
const o = require('../../../hooks/useTip.js'),
  t = require('../../../hooks/useFloatWindowContext.js'),
  n = require('../../../hooks/useTranslate.js');
require('../../base/util/checkEnv.js');
const r = require('../../base/util/filterObject.js'),
  i = require('../../../../TUICallService/CallService/index.js'),
  a = { customClass: { type: String } };
Math || l();
const l = () => '../../base/Message/Message.js',
  u = e.defineComponent({
    options: { virtualHost: !0, styleIsolation: 'shared' },
    __name: 'Tip',
    props: a,
    setup(a) {
      const { isFloatWindow: l } = e.toRefs(t.useFloatWindowContext()),
        { tip: u, duration: c } = o.useTip(),
        p = n.useTranslate(),
        { isGroupCall: d } = e.toRefs(s.useCallInfoContext()),
        v = e.ref(null),
        f = a,
        m = i.TUIGlobal.isPC,
        C = e.computed(() => [f.customClass]),
        j = e.computed(() =>
          r.filterObject({
            color: 'white',
            background: 'none',
            position: 'absolute',
            'z-index': 4,
            'align-items': 'center',
            left: '50%',
            top: '' + (m ? '60%' : '70%'),
            transform: 'translate(-50%, -50%)',
            'font-size': l.value ? '12px' : void 0,
          })
        ),
        h = e.computed(() =>
          r.filterObject({
            color: 'white',
            background: 'none',
            position: 'static',
            transform: 'none',
            'font-size': l.value ? '12px' : void 0,
          })
        ),
        b = e.computed(() => (d.value ? h.value : j.value));
      return (
        e.watch([u, p, c], () => {
          var e;
          null == (e = v.value) ||
            e.show({ message: p.value(u.value), duration: c.value, offset: 0 });
        }),
        (s, o) => ({
          a: e.sr(v, '03da10a6-0', { k: 'message' }),
          b: e.n(e.unref(C)),
          c: e.p({ showIcon: !1, customStyle: e.unref(b) }),
        })
      );
    },
  });
wx.createComponent(u);
