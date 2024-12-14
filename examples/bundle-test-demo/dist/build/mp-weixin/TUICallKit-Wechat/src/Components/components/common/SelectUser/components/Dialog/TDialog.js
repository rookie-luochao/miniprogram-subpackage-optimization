'use strict';
const e = require('../../../../../../../../common/vendor.js');
require('../../../../../../TUICallService/index.js'),
  require('../../../../../../TUICallService/const/index.js'),
  require('../../../../../util/stringToPath.js');
const n = require('../../../../../hooks/useTranslate.js'),
  t = e.defineComponent({
    __name: 'TDialog',
    props: {
      isHeaderShow: { type: Boolean, default: !0 },
      isFooterShow: { type: Boolean, default: !0 },
      background: { type: Boolean, default: !0 },
      title: { type: String, default: '' },
      center: { type: Boolean, default: !1 },
      isH5: { type: Boolean, default: !1 },
    },
    emits: ['cancel', 'submit'],
    setup(t, { emit: o }) {
      const a = 'outside',
        r = 'inside',
        i = t,
        u = e.ref(!0),
        s = e.ref(!0),
        l = e.ref(!0),
        c = e.ref(''),
        f = n.useTranslate();
      e.watchEffect(() => {
        (c.value = i.title),
          (u.value = i.isHeaderShow),
          (s.value = i.isFooterShow),
          (l.value = i.background);
      });
      const d = o,
        p = (e) => {
          e === a && m();
        },
        m = () => {
          d('cancel');
        },
        g = () => {
          d('submit');
        };
      return (n, o) =>
        e.e(
          { a: e.unref(u) },
          e.unref(u) ? { b: e.t(e.unref(c)), c: e.o(m) } : {},
          { d: e.n(i.isH5 ? 'dialog-main-content-uniapp' : ''), e: e.unref(s) },
          e.unref(s)
            ? {
                f: e.t(e.unref(f)('Cancel')),
                g: e.o(m),
                h: e.t(e.unref(f)('Done')),
                i: e.o(g),
              }
            : {},
          {
            j: e.n(e.unref(l) ? '' : 'dialog-main-back'),
            k: e.o((e) => p(r)),
            l: e.n(i.isH5 ? 'dialog-h5' : ''),
            m: e.n(t.center ? 'center' : ''),
            n: e.o((e) => p(a)),
          }
        );
    },
  }),
  o = e._export_sfc(t, [['__scopeId', 'data-v-45a61c53']]);
wx.createComponent(o);
