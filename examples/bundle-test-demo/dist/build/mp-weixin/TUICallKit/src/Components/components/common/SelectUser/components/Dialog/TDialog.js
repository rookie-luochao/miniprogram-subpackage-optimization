'use strict';
const e = require('../../../../../../../../common/vendor.js');
require('../../../../../../TUICallService/index.js');
const o = require('../../../../../../TUICallService/locales/index.js'),
  t = e.defineComponent({
    __name: 'TDialog',
    props: {
      moduleValue: { type: Boolean, default: !1 },
      isHeaderShow: { type: Boolean, default: !0 },
      isFooterShow: { type: Boolean, default: !0 },
      background: { type: Boolean, default: !0 },
      title: { type: String, default: '' },
      center: { type: Boolean, default: !1 },
      isH5: { type: Boolean, default: !1 },
    },
    emits: ['update:moduleValue', 'submit'],
    setup(t, { emit: n }) {
      const a = 'outside',
        u = 'inside',
        l = t,
        r = e.ref(!0),
        i = e.ref(!0),
        d = e.ref(!0),
        s = e.ref('');
      e.watchEffect(() => {
        (s.value = l.title),
          (r.value = l.isHeaderShow),
          (i.value = l.isFooterShow),
          (d.value = l.background);
      });
      const f = n,
        c = (e) => {
          e === a && p();
        },
        p = () => {
          f('update:moduleValue', !1);
        },
        m = () => {
          f('submit'), p();
        };
      return (n, f) =>
        e.e(
          { a: t.moduleValue },
          t.moduleValue
            ? e.e(
                { b: e.unref(r) },
                e.unref(r) ? { c: e.t(e.unref(s)), d: e.o(p) } : {},
                {
                  e: e.n(l.isH5 ? 'dialog-main-content-uniapp' : ''),
                  f: e.unref(i),
                },
                e.unref(i)
                  ? {
                      g: e.t(e.unref(o.t)('Cancel')),
                      h: e.o(p),
                      i: e.t(e.unref(o.t)('Done')),
                      j: e.o(m),
                    }
                  : {},
                {
                  k: e.n(e.unref(d) ? '' : 'dialog-main-back'),
                  l: e.o((e) => c(u)),
                  m: e.n(l.isH5 ? 'dialog-h5' : ''),
                  n: e.n(t.center ? 'center' : ''),
                  o: e.o((e) => c(a)),
                }
              )
            : {}
        );
    },
  }),
  n = e._export_sfc(t, [['__scopeId', 'data-v-92a2e48f']]);
wx.createComponent(n);
