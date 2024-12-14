'use strict';
const e = require('../../../../../../../../common/vendor.js'),
  t = e.defineComponent({
    __name: 'index',
    props: {
      value: { default: '' },
      title: { default: '' },
      columns: { default: () => [] },
    },
    emits: ['update:value'],
    setup(t, { emit: a }) {
      const u = t,
        l = e.ref(new Set(u.value ? u.value.split(',') : [])),
        o = a;
      return (t, a) => ({
        a: e.t(t.title),
        b: e.f(t.columns, (t, a, u) => ({
          a: e.t(t),
          b: t,
          c: l.value.has(t) ? 1 : '',
          d: e.o((e) => {
            return (
              (a = t),
              l.value.has(a) ? l.value.delete(a) : l.value.add(a),
              void o('update:value', Array.from(l.value).join(','))
            );
            var a;
          }, t),
        })),
      });
    },
  }),
  a = e._export_sfc(t, [['__scopeId', 'data-v-602fe3b1']]);
wx.createComponent(a);
