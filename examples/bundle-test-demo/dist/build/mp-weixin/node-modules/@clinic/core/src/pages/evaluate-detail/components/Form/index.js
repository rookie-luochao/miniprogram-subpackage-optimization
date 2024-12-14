'use strict';
const o = require('../../../../../../../../common/vendor.js');
Math || (n + e)();
const n = () => '../../../../components/Textarea/index.js',
  e = () => '../../../../components/Upload/index.js',
  t =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111215234480478670201240.png',
  a = o.defineComponent({
    __name: 'index',
    props: { form: {} },
    emits: ['submit', 'onTopChange'],
    setup(n, { emit: e }) {
      const a = n,
        s = e,
        u = o.ref(''),
        { content: c, anonymity: p } = o.toRefs(a.form),
        m = () => {
          p.value =
            p.value === o.AnonymousStatus.Anonymous
              ? o.AnonymousStatus.Real
              : o.AnonymousStatus.Anonymous;
        },
        i = () => {
          s('submit', {
            content: null == c ? void 0 : c.value,
            picUrl: u.value.split(','),
            anonymity: p.value,
          });
        },
        r = (o) => {
          s('onTopChange', o);
        };
      return (n, e) => ({
        a: t,
        b: t,
        c: o.o(i),
        d:
          o.unref(p) === o.unref(o.AnonymousStatus).Anonymous
            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111215380773481750201233.png'
            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110215012423223020201233.png',
        e: o.o(m),
        f: o.o(r),
        g: o.o((n) => (o.isRef(c) ? (c.value = n) : null)),
        h: o.p({
          background: '#FBFAF8',
          height: 80,
          'adjust-position': !1,
          placeholder: '真实客观的评论，更容易帮助其他患友',
          modelValue: o.unref(c),
        }),
        i: o.o((o) => (u.value = o)),
        j: o.p({
          background: '#FBFAF8',
          gap: '8px',
          columns: 4,
          'file-list': u.value,
        }),
      });
    },
  }),
  s = o._export_sfc(a, [['__scopeId', 'data-v-44ac6f72']]);
wx.createComponent(s);
