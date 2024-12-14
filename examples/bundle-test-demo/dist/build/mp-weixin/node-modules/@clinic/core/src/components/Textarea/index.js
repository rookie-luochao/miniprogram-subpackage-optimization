'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = e.defineComponent({
    __name: 'index',
    props: {
      modelValue: { default: '' },
      height: { default: 90 },
      maxlength: { default: 200 },
      placeholder: { default: '请输入内容' },
      background: { default: '#f3f3f3' },
      adjustPosition: { type: Boolean, default: !0 },
    },
    emits: ['update:modelValue', 'onTopChange'],
    setup(t, { emit: a }) {
      const { isSmallScreen: l } = e.useNavSize(),
        n = e.getCurrentInstance(),
        o = t,
        u = a,
        r = e.ref(o.modelValue);
      e.watch(
        () => o.modelValue,
        (e) => {
          r.value = e;
        }
      );
      let i = null;
      const d = (e) => {
          var t, a;
          const l =
            null != (a = null == (t = e.target) ? void 0 : t.value) ? a : '';
          (r.value = l.slice(0, o.maxlength)),
            i && clearTimeout(i),
            (i = setTimeout(() => {
              u('update:modelValue', r.value);
            }, 300));
        },
        c = (t) => {
          const a = e.index
            .createSelectorQuery()
            .in(null == n ? void 0 : n.proxy);
          let o = 0;
          a.select('.textarea-container')
            .boundingClientRect((e) => {
              var a;
              o =
                null != (a = Array.isArray(e) ? e[0].height : e.height) ? a : 0;
              let { height: n = 0 + o } = t.detail;
              l.value && (n += 250), u('onTopChange', n + o);
            })
            .exec();
        },
        h = () => {
          u('onTopChange', 0);
        };
      return (t, a) => ({
        a: 2 * Number(t.height) + 'rpx',
        b: 2 * Number(t.height) + 'rpx',
        c: t.maxlength,
        d: t.placeholder,
        e: t.adjustPosition,
        f: e.o([e.m((e) => (r.value = e.detail.value), { trim: !0 }), d]),
        g: e.o(c),
        h: e.o(h),
        i: r.value,
        j: e.t(r.value.length),
        k: e.t(t.maxlength),
        l: t.background,
      });
    },
  }),
  a = e._export_sfc(t, [['__scopeId', 'data-v-3a604e72']]);
wx.createComponent(a);
