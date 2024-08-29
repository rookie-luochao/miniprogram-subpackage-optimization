'use strict';
const e = require('../../../../../../../../common/vendor.js'),
  t = e.defineComponent({
    __name: 'index',
    props: { message: {}, isPatient: { type: Boolean } },
    setup(t) {
      const s = t,
        a = e.ref([]);
      return (
        e.watch(
          () => s.message,
          () => {
            a.value = e.parseText(s.message);
          },
          { deep: !0, immediate: !0 }
        ),
        (t, s) => ({
          a: e.f(a.value, (t, s, a) =>
            e.e(
              { a: 'text' === t.type },
              'text' === t.type ? { b: e.t(t.text) } : {},
              { c: t.type && ['finishVideo', 'cancelVideo'].includes(t.type) },
              t.type && ['finishVideo', 'cancelVideo'].includes(t.type)
                ? {
                    d: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692822001/22102717325133060980201240.png',
                    e: e.t(t.text),
                  }
                : {},
              { f: 'emoji' === t.type },
              (t.type, {}),
              { g: s }
            )
          ),
          b: e.n(t.isPatient ? 'message-text-patient' : ''),
        })
      );
    },
  }),
  s = e._export_sfc(t, [['__scopeId', 'data-v-c2bbf302']]);
wx.createComponent(s);
