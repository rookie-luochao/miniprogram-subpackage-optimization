'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('../../../../../../Grid.js'),
  t = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Grid',
    props: o.GridProps,
    emits: o.ChangeFocusEmits,
    setup(t, { emit: u }) {
      const n = t,
        s = e.ref(n.focus),
        r = e.ref(n.layout),
        i = e.ref(n.unit),
        a = u;
      return (
        e.watch(
          () => n.focus,
          () => (s.value = n.focus)
        ),
        e.watch(
          () => n.layout,
          () => (r.value = n.layout)
        ),
        e.watch(
          () => n.unit,
          () => (i.value = n.unit)
        ),
        e.provide(o.GridContextKey, {
          layout: r,
          enableFocus: n.enableFocus,
          handleFocusChange: function (e) {
            a('toggle', e);
          },
          focus: s,
          unit: i,
        }),
        (e, o) => ({})
      );
    },
  });
wx.createComponent(t);
