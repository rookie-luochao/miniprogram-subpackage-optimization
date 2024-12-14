'use strict';
const e = require('../../../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math;
const a = e.defineComponent({
    __name: 'index',
    emits: ['confirmDiagnosis'],
    setup(a, { expose: o, emit: i }) {
      const n = e.ref(!1),
        s = e.ref([]),
        t = e.ref(''),
        u = e.debounce(async () => {
          if (t.value.trim())
            try {
              e.index.showLoading({ title: '搜索中…', mask: !0 });
              const { data: a } = await e.requestSelectBaseDiagnosis({
                diagnosisName: t.value,
              });
              return void (s.value = a);
            } finally {
              e.index.hideLoading();
            }
          else s.value = [];
        }, 300),
        c = () => {
          (t.value = ''), (s.value = []);
        },
        l = e.ref(''),
        r = i,
        p = () => {
          l.value.trim()
            ? (r('confirmDiagnosis', l.value), (n.value = !1))
            : e.index.showToast({
                title: '请选择首诊临床诊断结果',
                icon: 'none',
              });
        };
      return (
        o({
          openPopup: () => {
            n.value = !0;
          },
        }),
        (a, o) =>
          e.e(
            {
              a: e.o((e) => (n.value = !1)),
              b: e.o(p),
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111317211147633150201240.png',
              d: e.o([
                (e) => (t.value = e.detail.value),
                (...a) => e.unref(u) && e.unref(u)(...a),
              ]),
              e: t.value,
              f: t.value,
            },
            t.value
              ? {
                  g: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111317200774402710201240.png',
                  h: e.o(c),
                }
              : {},
            { i: s.value.length },
            s.value.length
              ? {
                  j: e.f(s.value, (a, o, i) => ({
                    a: e.t(a.diagnosisName),
                    b: a.diagnosisName,
                    c: a.diagnosisName === l.value ? 1 : '',
                    d: e.o((e) => {
                      return (o = a.diagnosisName), void (l.value = o);
                      var o;
                    }, a.diagnosisName),
                  })),
                  k: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111317212678132130201240.png',
                  l: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111317214165489040201233.png',
                }
              : {},
            {
              m: e.o((e) => (n.value = !1)),
              n: e.o((e) => (n.value = e)),
              o: e.p({
                position: 'bottom',
                'custom-style': { height: '85vh' },
                round: !0,
                visible: n.value,
              }),
            }
          )
      );
    },
  }),
  o = e._export_sfc(a, [['__scopeId', 'data-v-89226e24']]);
wx.createComponent(o);
