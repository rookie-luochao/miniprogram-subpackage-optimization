'use strict';
const e = require('../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    setup(a, { expose: l }) {
      const o = e.useUserInfoStore(),
        { userInfo: n } = e.storeToRefs(o),
        t = e.ref(null),
        i = async () => {
          var a, l, o;
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: i } = await e.requestGetOrgPersonFamily({
              orgID: null == (a = n.value) ? void 0 : a.orgID,
              orgPersonUserID: null == (l = n.value) ? void 0 : l.keyID,
            });
            (t.value = i),
              (null == (o = t.value) ? void 0 : o.keyID) && (await u());
          } finally {
            e.index.hideLoading();
          }
        },
        r = e.ref([]),
        u = async () => {
          var a, l, o, i;
          const { data: u } = await e.requestGetListByOrgPersonUserID({
            orgID: null == (a = n.value) ? void 0 : a.orgID,
            orgCode: null == (l = n.value) ? void 0 : l.orgCode,
            orgPersonUserID: null == (o = n.value) ? void 0 : o.keyID,
            orgPersonFamilyID: null == (i = t.value) ? void 0 : i.keyID,
          });
          r.value =
            null == u
              ? void 0
              : u.map((e) => {
                  var a;
                  return {
                    ...e,
                    orgPatientFilesMedicineList:
                      null == (a = e.orgPatientFilesMedicineList)
                        ? void 0
                        : a.map((e) => ({ ...e, ...e.originalParam })),
                  };
                });
        },
        v = () => {
          e.appNavigator.navigateTo(
            e.appNavigator.pagesMap['health-records-edit'],
            { query: { isEdit: !1, patientInfo: JSON.stringify(t.value) } }
          );
        },
        s = () => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap.patient);
        };
      return (
        l({
          pageOnShow: () => {
            i();
          },
        }),
        (a, l) => {
          var o, n, i, u, d, g, p;
          return e.e(
            { a: null == (o = t.value) ? void 0 : o.keyID },
            (null == (n = t.value) ? void 0 : n.keyID)
              ? e.e(
                  {
                    b: e.t(t.value.familyName),
                    c: e.t(e.unref(e.GenderDesc)[t.value.sex]),
                    d: e.t(
                      e.unref(e.formatPatientAge)(
                        t.value.ageYear,
                        t.value.ageMonth
                      )
                    ),
                    e: r.value.length,
                  },
                  r.value.length
                    ? {
                        f: e.f(r.value, (a, l, o) => ({
                          a: e.t(e.unref(e.formatValue)(a.illDesc)),
                          b: e.t(e.unref(e.formatValue)(a.diagnosis)),
                          c: e.o(
                            (l) =>
                              ((a) => {
                                e.appNavigator.navigateTo(
                                  e.appNavigator.pagesMap[
                                    'health-records-detail'
                                  ],
                                  {
                                    query: {
                                      healthInfo: JSON.stringify(a),
                                      patientInfo: JSON.stringify(t.value),
                                    },
                                  }
                                );
                              })(a),
                            a.keyID
                          ),
                          d: a.keyID,
                        })),
                      }
                    : {},
                  { g: e.o(v) }
                )
              : {},
            {
              h: !(null == (i = t.value) ? void 0 : i.keyID) || !r.value.length,
            },
            (null == (u = t.value) ? void 0 : u.keyID) && r.value.length
              ? {}
              : e.e(
                  {
                    i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717393171685640201233.png',
                    j: !(null == (d = t.value) ? void 0 : d.keyID),
                  },
                  (null == (g = t.value) ? void 0 : g.keyID)
                    ? {}
                    : { k: e.o(s) }
                ),
            {
              l: e.n(
                (null == (p = t.value) ? void 0 : p.keyID)
                  ? 'health-padding'
                  : ''
              ),
            }
          );
        }
      );
    },
  }),
  l = e._export_sfc(a, [['__scopeId', 'data-v-3eacc72b']]);
wx.createComponent(l);
