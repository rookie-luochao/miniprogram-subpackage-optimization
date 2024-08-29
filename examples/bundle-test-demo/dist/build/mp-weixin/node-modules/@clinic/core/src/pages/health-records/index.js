'use strict';
const e = require('../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    setup(a, { expose: l }) {
      const o = e.useUserInfoStore(),
        { userInfo: n } = e.storeToRefs(o),
        t = e.ref(null),
        r = async () => {
          var a, l, o;
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: r } = await e.requestGetOrgPersonFamily({
              orgID: null == (a = n.value) ? void 0 : a.orgID,
              orgPersonUserID: null == (l = n.value) ? void 0 : l.keyID,
            });
            (t.value = r),
              (null == (o = t.value) ? void 0 : o.keyID) && (await u());
          } finally {
            e.index.hideLoading();
          }
        },
        i = e.ref([]),
        u = async () => {
          var a, l, o, r;
          const { data: u } = await e.requestGetListByOrgPersonUserID({
            orgID: null == (a = n.value) ? void 0 : a.orgID,
            orgCode: null == (l = n.value) ? void 0 : l.orgCode,
            orgPersonUserID: null == (o = n.value) ? void 0 : o.keyID,
            orgPersonFamilyID: null == (r = t.value) ? void 0 : r.keyID,
          });
          i.value = u;
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
            r();
          },
        }),
        (a, l) => {
          var o, n, r, u, g, d, p;
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
                    e: i.value.length,
                  },
                  i.value.length
                    ? {
                        f: e.f(i.value, (a, l, o) => ({
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
              h: !(null == (r = t.value) ? void 0 : r.keyID) || !i.value.length,
            },
            (null == (u = t.value) ? void 0 : u.keyID) && i.value.length
              ? {}
              : e.e(
                  {
                    i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717393171685640201233.png',
                    j: !(null == (g = t.value) ? void 0 : g.keyID),
                  },
                  (null == (d = t.value) ? void 0 : d.keyID)
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
  l = e._export_sfc(a, [['__scopeId', 'data-v-8ec465ce']]);
wx.createComponent(l);
