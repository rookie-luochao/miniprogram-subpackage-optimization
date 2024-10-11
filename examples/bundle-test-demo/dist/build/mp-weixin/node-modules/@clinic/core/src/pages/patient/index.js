'use strict';
const e = require('../../../../../../common/vendor.js');
Math || a();
const a = () => '../../components/Modal/index.js',
  t = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const n = e.useMedicalInsuranceAuthStore(),
        {
          medicalAuthStatus: o,
          medicalAuthType: i,
          userAuthInfo: u,
        } = e.storeToRefs(n),
        r = e.useAppConfigStore(),
        { ORG_ID: s } = r.CONFIG,
        l = e.useUserInfoStore(),
        { userInfo: c } = e.storeToRefs(l),
        { scanCodeData: p, scanCodeAuth: d } = e.useScanCodeAuth(),
        { medicalInfo: m, fetchMedicalUserInfo: v } = e.useMedicalInfo(),
        g = e.ref(null),
        h = e.ref([]),
        f = async () => {
          var a;
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: t } = await e.requestSelectOrgPersonFamily({
              orgID: s,
              orgPersonUserID: null == (a = c.value) ? void 0 : a.keyID,
            });
            h.value = t;
          } finally {
            e.index.hideLoading();
          }
        },
        I = (a) => {
          const { age: t, month: n } = e.calculateAge(a);
          return e.formatPatientAge(t, n);
        },
        y = e.ref(null);
      return (
        t({
          pageOnShow: async () => {
            var a;
            if ((await f(), g.value === e.AutoJumpEnum.AddPatient)) {
              if (!u.value.authNo) return;
              try {
                await v(),
                  (null == (a = m.value) ? void 0 : a.user_name) &&
                    m.value.user_card_no &&
                    ((g.value = null),
                    e.appNavigator.navigateTo(
                      e.appNavigator.pagesMap['patient-detail'],
                      {
                        query: {
                          familyName: m.value.user_name,
                          idNumber: m.value.user_card_no,
                        },
                      }
                    ));
              } catch (t) {}
            }
          },
        }),
        (a, t) =>
          e.e(
            { a: h.value.length },
            h.value.length
              ? {
                  b: e.f(h.value, (a, t, n) =>
                    e.e(
                      {
                        a: e.t(a.familyName),
                        b:
                          a.isInsuranceUser ===
                          e.unref(e.IsMedicalAuthPatient).YES,
                      },
                      (a.isInsuranceUser,
                      e.unref(e.IsMedicalAuthPatient).YES,
                      {}),
                      {
                        c: e.t(a.relationName),
                        d: e.t(e.unref(e.GenderDesc)[a.sex]),
                        e: e.t(I(a.birthDay)),
                        f: e.t(a.phone),
                        g: e.o(
                          (t) =>
                            ((a) => {
                              const { keyID: t, orgID: n } = a;
                              e.appNavigator.navigateTo(
                                e.appNavigator.pagesMap['patient-detail'],
                                { query: { keyID: t, orgID: n } }
                              );
                            })(a),
                          a.keyID
                        ),
                        h: e.o(
                          (t) =>
                            ((a) => {
                              var t;
                              const { familyName: n, keyID: o, orgID: i } = a;
                              null == (t = y.value) ||
                                t.openModal({
                                  content: `是否删除就诊人【${n}】?`,
                                  confirmText: '删除',
                                  onConfirm: async () => {
                                    try {
                                      e.index.showLoading({
                                        title: '删除中…',
                                        mask: !0,
                                      }),
                                        await e.requestDelPersonFamilyInfo({
                                          keyID: o,
                                          orgID: i,
                                        }),
                                        f();
                                    } finally {
                                      e.index.hideLoading();
                                    }
                                  },
                                });
                            })(a),
                          a.keyID
                        ),
                        i: a.keyID,
                      }
                    )
                  ),
                  c: 'https://com-shuibei-peach-tmc-cs.100cbc.com/content/0/23083010554013403430201253.png',
                  d: 'https://com-shuibei-peach-tmc-cs.100cbc.com/content/0/23083010560468517010201253.png',
                }
              : {
                  e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717521284868440201240.png',
                  f: e.o((a) =>
                    (async () => {
                      h.value.length >= 10
                        ? e.index.showToast({
                            title: '您的就诊人数量已满，建议清理不常用就诊人',
                            icon: 'none',
                          })
                        : (o.value === e.AuthStatus.NO_AUTH &&
                            e.appNavigator.navigateTo(
                              e.appNavigator.pagesMap['patient-detail']
                            ),
                          o.value === e.AuthStatus.NEED_AUTH &&
                            ((g.value = e.AutoJumpEnum.AddPatient),
                            i.value === e.AuthType.MINI_PROGRAM &&
                              e.wxUserInfoAuth(),
                            i.value === e.AuthType.SCAN_CODE &&
                              (await d(),
                              p.value &&
                                e.appNavigator.navigateTo(
                                  e.appNavigator.pagesMap['patient-detail'],
                                  {
                                    query: {
                                      familyName: p.value.userName,
                                      idNumber: p.value.idNo,
                                    },
                                  }
                                ))));
                    })()
                  ),
                },
            { g: e.sr(y, '771b34f3-0', { k: 'modalRef' }) }
          )
      );
    },
  }),
  n = e._export_sfc(t, [['__scopeId', 'data-v-771b34f3']]);
wx.createComponent(n);
