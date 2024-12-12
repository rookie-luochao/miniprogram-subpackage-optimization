'use strict';
const e = require('../../../../../../../common/vendor.js'),
  t = require('../../../../../../../Grid.js'),
  n = require('../../constants/index.js'),
  i = require('../../util/index.js'),
  u = require('../../util/checkEnv.js'),
  o = require('../../util/classNames.js'),
  s = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'GridItem',
    props: ['index', 'height', 'customStyle'],
    setup(s) {
      const r = s,
        {
          layout: l,
          enableFocus: a,
          handleFocusChange: c,
          focus: d,
          unit: m,
        } = e.inject(t.GridContextKey),
        v = 100 / 12,
        h = v,
        f = e.ref({}),
        g = o.classNames([
          `${n.PREFIX}-grid-item`,
          { pc: u.IS_PC, mobile: !u.IS_PC, h5: u.IS_H5 },
        ]),
        p = () => {
          const e = String(r.index) === String(d.value) ? null : r.index;
          a && c(e);
        },
        x = e.computed(
          () => !!i.findTarget(l.value, { key: 'i', value: r.index })
        );
      return (
        e.watchEffect(() => {
          const e = i.findTarget(l.value, { key: 'i', value: r.index });
          if (!e) return;
          const { x: t, y: n, w: u, h: o, customStyle: s, customProps: a } = e;
          f.value = {
            width: u * v + m.value,
            height: r.height || o * h + m.value,
            left: t * v + m.value,
            top: n * h + m.value,
            position: 'absolute',
            visibility: !1 === (null == a ? void 0 : a.show) ? 'hidden' : '',
            ...r.customStyle,
            ...s,
          };
        }),
        e.onUnmounted(() => {
          String(r.index) === String(d.value) && a && c(null);
        }),
        (t, n) =>
          e.e(
            { a: e.unref(x) },
            e.unref(x)
              ? { b: e.n(e.unref(g)), c: e.s(e.unref(f)), d: e.o(p) }
              : {}
          )
      );
    },
  });
wx.createComponent(s);
