'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (a + t)();
const t = () => '../../components/Empty/index.js',
  a = () => '../../components/Navbar/index.js',
  n =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102515562443956060201240.png',
  o = e.defineComponent({
    __name: 'index',
    setup(t, { expose: a }) {
      const o = e.ref([]),
        i = async () => {
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: t } = await e.requestPatientList();
            o.value = t;
          } finally {
            e.index.hideLoading();
          }
        },
        p = (t) => {
          const { age: a, month: n } = e.calculateAge(t);
          return e.formatPatientAge(a, n);
        },
        c = () => {
          o.value.length >= 20
            ? e.index.showToast({
                title: '您的就诊人数量已满，建议清理不常用就诊人',
                icon: 'none',
              })
            : e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['patient-detail'],
                { query: { navigationBarTitle: '添加就诊人' } }
              );
        };
      return (
        a({
          pageOnShow: () => {
            console.log('pageOnShow'), i();
          },
          pageOnLoad: (e) => {
            console.log('pageOnload', e);
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (t, a) =>
          e.e(
            {
              a: e.sr('navbarRef', '759d0437-0'),
              b: e.p({ title: '就诊人管理' }),
              c: o.value.length,
            },
            o.value.length
              ? {
                  d: n,
                  e: n,
                  f: e.t(o.value.length),
                  g: e.t(20),
                  h: e.f(o.value, (t, a, n) => ({
                    a: e.t(t.patientName),
                    b: e.t(e.unref(e.RealStatusDesc)[t.isRealName]),
                    c: t.isRealName === e.unref(e.RealStatus).NotReal ? 1 : '',
                    d: e.t(t.relation),
                    e: e.t(e.unref(e.GenderDesc)[t.gender]),
                    f: e.t(p(t.birth)),
                    g: e.t(e.unref(e.encryptPhone)(t.phone)),
                    h: t.patientInfoId,
                    i: e.o((a) => {
                      return (
                        (n = t),
                        void e.appNavigator.navigateTo(
                          e.appNavigator.pagesMap['patient-detail'],
                          {
                            query: {
                              navigationBarTitle: '编辑就诊人',
                              patientInfo: encodeURIComponent(
                                JSON.stringify(n)
                              ),
                            },
                          }
                        )
                      );
                      var n;
                    }, t.patientInfoId),
                  })),
                  i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24103115533451712730201233.png',
                }
              : {
                  j: e.p({
                    top: 118,
                    'empty-icon':
                      'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110516003909491680201240.png',
                    title: '暂无就诊人',
                    'sub-title': '点击下方按钮添加就诊人',
                  }),
                },
            { k: e.o(c) }
          )
      );
    },
  }),
  i = e._export_sfc(o, [['__scopeId', 'data-v-759d0437']]);
wx.createComponent(i);
