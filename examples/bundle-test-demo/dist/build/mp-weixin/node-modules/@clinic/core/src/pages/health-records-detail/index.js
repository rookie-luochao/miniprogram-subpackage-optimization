'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (o + i + a)();
const a = () => '../../components/Modal/index.js',
  o = () => '../../components/Upload/index.js',
  i = () => '../add-drug/components/DrugItem/index.js',
  l = e.defineComponent({
    __name: 'index',
    props: { isFollowUpInfoRequired: { type: Boolean, default: !0 } },
    setup(a, { expose: o }) {
      const i = e.ref(null),
        l = e.ref(null),
        n = e.ref(!1),
        t = e.computed(() =>
          n.value
            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711283553622860201240.png'
            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711293495065640201233.png'
        ),
        u = () => {
          e.appNavigator.navigateTo(
            e.appNavigator.pagesMap['health-records-edit'],
            {
              query: {
                isEdit: !0,
                healthInfo: JSON.stringify(i.value),
                patientInfo: JSON.stringify(l.value),
              },
            }
          );
        },
        r = e.ref(null),
        s = () => {
          var a;
          null == (a = r.value) ||
            a.openModal({
              content: '是否删除该档案？',
              onConfirm: async () => {
                var a;
                try {
                  e.index.showLoading({ title: '删除中…', mask: !0 }),
                    await e.requestDeleteOrgPatientFiles({
                      keyID: (null == (a = i.value) ? void 0 : a.keyID) || '',
                    }),
                    e.index.showToast({
                      title: '删除成功',
                      icon: 'none',
                      mask: !0,
                    }),
                    setTimeout(() => {
                      e.index.hideToast(), e.appNavigator.navigateBack();
                    }, 1500);
                } catch (o) {
                  e.index.hideLoading();
                }
              },
            });
        };
      return (
        o({
          pageOnLoad: (e) => {
            (i.value = JSON.parse(e.healthInfo)),
              (l.value = JSON.parse(e.patientInfo));
          },
        }),
        (a, o) => {
          var l, p, c, d, v, m, f, h, g, I, y;
          return e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710562797921040201240.png',
              b: e.t(
                e.unref(e.formatValue)(
                  null == (l = i.value) ? void 0 : l.illDesc
                )
              ),
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711011944832930201240.png',
              d: e.p({
                'file-list': null == (p = i.value) ? void 0 : p.treatedFileUrls,
                disabled: !0,
              }),
              e: !a.isFollowUpInfoRequired,
            },
            a.isFollowUpInfoRequired
              ? {}
              : {
                  f: e.t(n.value ? '收起更多内容' : '展开查看更多'),
                  g: t.value,
                  h: e.o((e) => (n.value = !n.value)),
                },
            { i: a.isFollowUpInfoRequired || n.value },
            a.isFollowUpInfoRequired || n.value
              ? {
                  j: a.isFollowUpInfoRequired ? '18px' : '16px',
                  k: e.t(
                    e.unref(e.formatValue)(
                      null == (c = i.value) ? void 0 : c.treatedHospital
                    )
                  ),
                  l: e.t(
                    e.unref(e.formatValue)(
                      null == (d = i.value) ? void 0 : d.treatedSection
                    )
                  ),
                  m: e.t(
                    e.unref(e.formatValue)(
                      (null == (v = i.value) ? void 0 : v.clinicTime) !==
                        e.unref(e.DEFAULT_TIME)
                        ? e
                            .unref(e.dayjs)(
                              null == (m = i.value) ? void 0 : m.clinicTime
                            )
                            .format('YYYY-MM-DD')
                        : ''
                    )
                  ),
                  n: e.t(
                    e.unref(e.formatValue)(
                      null == (f = i.value) ? void 0 : f.diagnosis
                    )
                  ),
                }
              : {},
            {
              o:
                null ==
                (g =
                  null == (h = i.value)
                    ? void 0
                    : h.orgPatientFilesMedicineList)
                  ? void 0
                  : g.length,
            },
            (
              null ==
              (y =
                null == (I = i.value) ? void 0 : I.orgPatientFilesMedicineList)
                ? void 0
                : y.length
            )
              ? {
                  p: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711020588223670201233.png',
                  q: e.f(i.value.orgPatientFilesMedicineList, (a, o, i) => ({
                    a: '936549aa-1-' + i,
                    b: e.p({
                      'drug-info': a,
                      'is-show-operate': !1,
                      'is-show-drug-count': !0,
                    }),
                    c: a.keyID,
                  })),
                }
              : {},
            {
              r: e.o(s),
              s: e.o(u),
              t: e.sr(r, '936549aa-2', { k: 'modalRef' }),
            }
          );
        }
      );
    },
  }),
  n = e._export_sfc(l, [['__scopeId', 'data-v-936549aa']]);
wx.createComponent(n);
