'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (
    e.resolveComponent('nut-popup') +
    e.resolveComponent('nut-radio') +
    e.resolveComponent('nut-radio-group') +
    e.resolveComponent('nut-checkbox')
  )();
}
Math ||
  (
    l +
    (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js') +
    o +
    (() => '../../../node-modules/nutui-uniapp/components/radio/radio.js') +
    (() =>
      '../../../node-modules/nutui-uniapp/components/radiogroup/radiogroup.js') +
    (() =>
      '../../../node-modules/nutui-uniapp/components/checkbox/checkbox.js') +
    a +
    i +
    t
  )();
const a = () => '../../components/Modal/index.js',
  l = () => '../../components/Navbar/index.js',
  o = () => '../health-records-edit/index.js',
  i = () => './components/DrugLimitModal/index.js',
  t = () => './components/PendingOrderModal/index.js',
  n = e.defineComponent({
    __name: 'index',
    props: { isFollowUpInfoRequired: { type: Boolean, default: !0 } },
    setup(a, { expose: l }) {
      const o = e.ref([
          {
            show: !0,
            value: e.InquiryMode.TextAndVideo,
            label: '视频问诊',
            iconUrl:
              'http://th-img-test-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24011010044518388390201067.png',
            activeUrl:
              'http://th-img-test-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24011010053758569760201067.png',
            checkCondition: (e) =>
              0 === (null == e ? void 0 : e.hasTextAndVideo),
          },
          {
            show: !0,
            value: e.InquiryMode.Text,
            label: '图文问诊',
            iconUrl:
              'http://th-img-test-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24011010062965703580201067.png',
            activeUrl:
              'http://th-img-test-1308953979.cos.ap-chengdu.myqcloud.com/img/111/24011010065915092980201067.png',
            checkCondition: (e) => 0 === (null == e ? void 0 : e.hasText),
          },
        ]),
        i = e.inject(e.globalDataSymbol),
        t = e.useAppConfigStore(),
        { ORG_ID: n, ORG_CODE: r } = t.CONFIG,
        u = e.useUserInfoStore(),
        { userInfo: s } = e.storeToRefs(u),
        c = e.useMedicalInsuranceAuthStore(),
        {
          medicalAuthStatus: d,
          medicalAuthType: p,
          prescriptionAuthInfo: v,
        } = e.storeToRefs(c),
        { scanCodeAuth: h, scanCodeData: m } = e.useScanCodeAuth(),
        { medicalInfo: g, fetchMedicalInfo: y } = e.useMedicalInfo(),
        f = e.ref(null),
        I = e.ref(null),
        D = e.ref(null),
        b = e.ref(null),
        C = e.ref(null),
        w = e.ref(),
        N = e.ref(!1),
        k = async ({ userName: a, idCard: l }) => {
          '1' === w.value &&
            e.appNavigator.navigateTo(
              e.appNavigator.pagesMap['patient-detail'],
              { query: { familyName: a, idNumber: l } }
            ),
            '2' === w.value && (await K());
        },
        O = e.ref(null),
        S = e.ref(null),
        M = e.ref(),
        q = () => {
          o.value.forEach((e) => {
            e.checkCondition(O.value) && (e.show = !1);
          });
          const a = o.value.filter((e) => e.show);
          1 === a.length && (M.value = a[0].value),
            2 === a.length && (M.value = e.InquiryMode.TextAndVideo);
        },
        A = e.ref(''),
        T = async () => {
          var a, l;
          const { data: o } =
            await e.requestQueryAllClientAppServiceAndClientApp({
              appType: e.APP_TYPE,
              orgID: null == (a = O.value) ? void 0 : a.orgID,
            });
          A.value =
            (null ==
            (l =
              null == o
                ? void 0
                : o.find((a) => a.serviceCode === e.SERVICE_CODE))
              ? void 0
              : l.keyID) || '';
        },
        x = e.ref(null),
        U = async () => {
          var a, l, o, i, t;
          const { data: r } = await e.requestSelectOrgPersonFamily({
            orgID: n,
            orgPersonUserID: null == (a = s.value) ? void 0 : a.keyID,
          });
          d.value === e.AuthStatus.NO_AUTH &&
            (x.value = null != (l = r[0]) ? l : {}),
            d.value === e.AuthStatus.NEED_AUTH &&
              (x.value =
                null != (o = r.filter((e) => 1 === e.isInsuranceUser)[0])
                  ? o
                  : {}),
            (null == (i = x.value) ? void 0 : i.keyID) &&
              (null == (t = C.value) ||
                t.pageOnLoad({
                  isEdit: JSON.stringify(!1),
                  patientInfo: JSON.stringify(x.value),
                }),
              await _());
        },
        P = e.ref([]),
        _ = async () => {
          var a, l, o, i;
          const { data: t } = await e.requestGetListByOrgPersonUserID({
            orgID: null == (a = s.value) ? void 0 : a.orgID,
            orgCode: null == (l = s.value) ? void 0 : l.orgCode,
            orgPersonUserID: null == (o = s.value) ? void 0 : o.keyID,
            orgPersonFamilyID: null == (i = x.value) ? void 0 : i.keyID,
          });
          P.value = t;
        },
        L = e.ref(!1),
        F = e.ref(''),
        R = async (a) => {
          var l, o;
          const { orgPatientFilesMedicineList: i, keyID: t } = a;
          if (F.value !== a.keyID) {
            if (
              ((F.value = t), (L.value = !1), null == i ? void 0 : i.length)
            ) {
              const o =
                  null == i
                    ? void 0
                    : i.map(async (a) => {
                        var l, o;
                        const i = {
                            phone: null == (l = x.value) ? void 0 : l.phone,
                            drugCommonName: a.drugCommonName,
                            patientID: null == (o = s.value) ? void 0 : o.keyID,
                          },
                          { data: t } = await e.requestCheckH5MedicineSwitch(
                            i,
                            !1
                          );
                        try {
                          t.closecheckH5Medicine ||
                            (await e.requestCheckH5Medicine(i, !1));
                        } catch (n) {
                          const { success: e } = n;
                          a.isLimit = !e;
                        }
                        return a;
                      }),
                t = await Promise.all(o),
                n = t.filter((e) => e.isLimit);
              n.length &&
                (null == (l = D.value) || l.openModal({ drugList: n })),
                (a.orgPatientFilesMedicineList = t.filter((e) => !e.isLimit));
            }
            null == (o = C.value) || o.setHealInfo(a),
              setTimeout(() => {
                e.index.pageScrollTo({ scrollTop: 9999, duration: 200 });
              }, 200);
          }
        },
        H = () => {
          var a;
          (null == (a = x.value) ? void 0 : a.keyID)
            ? e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['health-records-edit'],
                { query: { isEdit: !1, patientInfo: JSON.stringify(x.value) } }
              )
            : e.index.showToast({ title: '请先添加就诊人', icon: 'none' });
        },
        E = e.ref(!1),
        G = e.ref(!0),
        j = e.ref(!1),
        V = (e) => {
          E.value = e;
        },
        J = async () => {
          var a, l;
          const { data: o } = await e.requestGetPatientNoFinishOrder({
              patientID: null == (a = s.value) ? void 0 : a.keyID,
              orgID: n,
              orgCode: r,
            }),
            { inquiryOrderList: i, maxOrderSize: t } = o;
          Number(t) < 1 ||
            (i.length > 0 &&
              (null == (l = b.value) ||
                l.openModal({
                  inquiryOrderList: i,
                  canCreateOrder: i.length < Number(t),
                })));
        },
        z = () => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['web-view'], {
            query: { url: 'https://polymermgmt-cs.100cbc.com/youai/informed' },
          });
        },
        B = () => {
          d.value !== e.AuthStatus.NO_AUTH
            ? ((w.value = '1'), W())
            : e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['patient-detail']
              );
        },
        W = async () => {
          p.value === e.AuthType.MINI_PROGRAM && e.wxPrescriptionTransferAuth(),
            p.value === e.AuthType.SCAN_CODE &&
              (await h(),
              m.value &&
                ((N.value = !0),
                k({ userName: m.value.userName, idCard: m.value.idNo })));
        },
        Y = e.ref(!1),
        K = async () => {
          var a, l, o, i, t, u, c, d, p, v, h, y, I, D, b;
          if (Y.value)
            if (null == (a = x.value) ? void 0 : a.keyID) {
              if (null == (l = C.value) ? void 0 : l.validateHealthInfo())
                if (G.value)
                  if (j.value)
                    null == (i = f.value) ||
                      i.openModal({
                        content: '若存在不良反应，请到线下医院就诊开药',
                        showCancel: !1,
                      });
                  else if (M.value) {
                    if (!N.value) return (w.value = '2'), void W();
                    try {
                      e.index.showLoading({ title: '创建中…', mask: !0 });
                      const a = C.value.getHealInfo(),
                        { data: l } = await e.requestGeneralBasicOCR({
                          orgID: n,
                          orgCode: r,
                          certificateUrls: a.treatedFileUrls.split(','),
                        });
                      if (l.show)
                        return void (
                          null == (t = f.value) ||
                          t.openModal({
                            content:
                              '复诊凭证为互联网医院相关，不可用于申请统筹处方',
                            showCancel: !1,
                          })
                        );
                      let o = {
                        familyGeneticHistory: '0',
                        familyGeneticHistoryDetail: '',
                        historyOfAllergy: '0',
                        allergyDetail: '',
                        historyOfSickness: '0',
                        sicknessDetail: '',
                        liver: '0',
                        renal: '0',
                        pregnancy: '0',
                      };
                      const { data: i } = await e.requestGetOrgPersonFamilyInfo(
                        { orgID: n, keyID: x.value.keyID }
                      );
                      o = e.processPatientHealthInfo(o, i.orgPersonHealths);
                      const b = {
                          ...o,
                          ...a,
                          inquiryOrderMedicineList:
                            (null == (u = a.orgPatientFilesMedicineList)
                              ? void 0
                              : u.map((e) => ({
                                  ...e,
                                  inquiryItemID: e.keyID,
                                  supplyItemID:
                                    e.supplyitemId || e.supplyItemID,
                                  itemName: e.goodsName,
                                  unit: e.minPackageUnit,
                                  classCode: e.goodsType,
                                  drugSpec: e.drugSpecification,
                                  medicineAmount: e.itemCount,
                                  originalParam: e,
                                }))) || [],
                          certificateUrls: a.treatedFileUrls.split(','),
                          clientAppServiceID: A.value,
                          clientOrgCode:
                            null == (c = O.value) ? void 0 : c.orgCode,
                          clientOrgID: null == (d = O.value) ? void 0 : d.orgID,
                          inquiryMoney: 0,
                          inquiryWay: M.value,
                          orgCode: r,
                          orgID: n,
                          patientAge: x.value.ageYear,
                          patientMonth: x.value.ageMonth,
                          patientID: x.value.keyID,
                          relationName: x.value.relationName,
                          patientWeight: x.value.weight,
                          serviceCode: e.SERVICE_CODE,
                          patientImID: null == (p = s.value) ? void 0 : p.keyID,
                          doctorImID: '',
                          city_id: null == (v = g.value) ? void 0 : v.city_id,
                          authno: null == (h = g.value) ? void 0 : h.auth_no,
                          ecToken: null == (y = m.value) ? void 0 : y.ecToken,
                          inquiryOrderId:
                            null == (I = S.value)
                              ? void 0
                              : I.inquiryOrderKeyID,
                          formSource:
                            null == (D = S.value) ? void 0 : D.formSource,
                          busCode: 'inquiry',
                          hospitalDiagnosis: '',
                          hasReviewInquiry: 1,
                          doctorStaffID: '',
                          doctorStaffName: '',
                          sectionCode: '',
                          sectionName: '',
                          channelCode: '',
                          fullChannelName: '',
                          uldlatint: '',
                          truth: 1,
                        },
                        { data: w } =
                          await e.requestSaveConvenientInquiryOrder(b);
                      e.appNavigator.redirectTo(
                        e.appNavigator.pagesMap['dispatch-wait'],
                        { query: { orderID: w.keyID } }
                      );
                    } catch (k) {
                      const { message: e } = k;
                      null == (b = f.value) ||
                        b.openModal({ content: e, showCancel: !1 });
                    } finally {
                      e.index.hideLoading();
                    }
                  } else
                    e.index.showToast({
                      title: '请选择问诊方式',
                      icon: 'none',
                    });
                else
                  null == (o = f.value) ||
                    o.openModal({
                      content: '若未使用过本药，请先到线下医院开药',
                      showCancel: !1,
                    });
            } else e.index.showToast({ title: '请选择就诊人', icon: 'none' });
          else
            e.index.showToast({ title: '请勾选《知情同意书》', icon: 'none' });
        };
      return (
        l({
          pageOnshow: async () => {
            var a;
            if (
              (d.value === e.AuthStatus.NO_AUTH && (N.value = !0),
              null == i ? void 0 : i.globalData.value.onShowFlag)
            )
              try {
                if (
                  (e.index.showLoading({ title: '加载中…', mask: !0 }),
                  await U(),
                  await T(),
                  await J(),
                  !v.value.authNo)
                )
                  return;
                await y(),
                  (N.value = !0),
                  (null == (a = g.value) ? void 0 : a.auth_no) &&
                    (c.resetPrescriptionAuthInfo(),
                    k({
                      userName: g.value.user_name,
                      idCard: g.value.user_card_no,
                    }));
              } finally {
                e.index.hideLoading();
              }
            else null == i || i.updateGlobalData({ onShowFlag: !0 });
          },
          pageOnLoad: (e) => {
            var a, l;
            O.value = JSON.parse(e.subOrgInfo);
            const o = JSON.parse(
              null != (a = null == e ? void 0 : e.orderDetail) ? a : '{}'
            );
            if (o) {
              S.value = o;
              const {
                illDesc: e,
                treatedHospital: a,
                treatedSection: i,
                clinicTime: t,
                diagnosis: n,
                treatedFileUrlString: r,
                inquiryOrderMedicineListOut: u,
              } = o;
              null == (l = C.value) ||
                l.setHealInfo({
                  keyID: '',
                  orgID: '',
                  orgCode: '',
                  orgPersonUserID: '',
                  orgPersonFamilyID: '',
                  illDesc: e,
                  treatedHospital: a,
                  treatedSection: i,
                  clinicTime: t,
                  diagnosis: n,
                  treatedFileUrls: r,
                  orgPatientFilesMedicineList: u,
                });
            }
            q();
          },
          pageOnScroll: (e) => {
            var a;
            null == (a = I.value) || a.pageOnScroll(e);
          },
        }),
        (a, l) => {
          var i, t, n, r;
          return e.e(
            {
              a: e.sr(I, 'ba9616bc-0', { k: 'navbarRef' }),
              b: e.p({ title: '问诊信息' }),
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717453240839090201233.png',
              d: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071814010427014940201240.png',
              e: e.t(null == (i = O.value) ? void 0 : i.orgName),
              f: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071815411723750750201240.png',
              g: null == (t = x.value) ? void 0 : t.familyName,
            },
            (null == (n = x.value) ? void 0 : n.familyName)
              ? {
                  h: e.t(null == (r = x.value) ? void 0 : r.familyName),
                  i: e.t(e.unref(e.GenderDesc)[x.value.sex]),
                  j: e.t(
                    e.unref(e.formatPatientAge)(
                      x.value.ageYear,
                      x.value.ageMonth
                    )
                  ),
                }
              : {
                  k: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071815445366666680201240.png',
                  l: e.o(B),
                },
            {
              m: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071815573498850600201240.png',
              n: e.o(H),
              o: P.value.length > 3,
            },
            P.value.length > 3
              ? {
                  p: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071816013653351600201233.png',
                  q: e.o((e) => (L.value = !0)),
                }
              : {},
            { r: P.value.length },
            P.value.length
              ? {
                  s: e.f(P.value.slice(0, 3), (a, l, o) => ({
                    a: e.t(a.illDesc),
                    b: a.keyID,
                    c: e.n(F.value === a.keyID ? 'health-active' : ''),
                    d: e.o((e) => R(a), a.keyID),
                  })),
                }
              : {
                  t: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071816022771758130201233.png',
                },
            {
              v: e.f(P.value, (a, l, o) =>
                e.e(
                  { a: e.t(a.illDesc), b: a.treatedFileUrls },
                  (a.treatedFileUrls, {}),
                  {
                    c: a.keyID,
                    d: e.n(F.value === a.keyID ? 'health-more-active' : ''),
                    e: e.o((e) => R(a), a.keyID),
                  }
                )
              ),
              w: e.o((e) => (L.value = e)),
              x: e.p({
                round: !0,
                closeable: !0,
                position: 'bottom',
                'pop-class': 'health-more-pop',
                visible: L.value,
              }),
              y: e.sr(C, 'ba9616bc-2', { k: 'healthRecordsEditRef' }),
              z: e.o(V),
              A: e.p({
                'is-component-usage': !0,
                'is-drug-limit': !0,
                'is-follow-up-info-required': a.isFollowUpInfoRequired,
              }),
              B: E.value,
            },
            E.value
              ? {
                  C: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24080811445894207140201240.png',
                  D: e.p({ label: !1 }),
                  E: e.p({ label: !0 }),
                  F: e.o((e) => (G.value = e)),
                  G: e.p({ direction: 'horizontal', modelValue: G.value }),
                  H: e.p({ label: !1 }),
                  I: e.p({ label: !0 }),
                  J: e.o((e) => (j.value = e)),
                  K: e.p({ direction: 'horizontal', modelValue: j.value }),
                }
              : {},
            {
              L: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071816234454153560201240.png',
              M: e.f(o.value, (a, l, o) =>
                e.e(
                  { a: a.show },
                  a.show
                    ? {
                        b: M.value === a.value ? a.activeUrl : a.iconUrl,
                        c: e.t(a.label),
                        d: e.n(M.value === a.value && 'mode-active'),
                        e: e.o((e) => {
                          return (l = a.value), void (M.value = l);
                          var l;
                        }, a.value),
                      }
                    : {},
                  { f: a.value }
                )
              ),
              N: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717460053411610201240.png',
              O: e.o((e) => (Y.value = e)),
              P: e.p({ modelValue: Y.value }),
              Q: e.o(z),
              R: e.o((e) => (Y.value = !Y.value)),
              S: e.t(N.value ? '创建问诊' : '医保授权'),
              T: e.n(Y.value ? 'cerate-btn-active' : ''),
              U: e.o((e) => K()),
              V: e.sr(f, 'ba9616bc-10', { k: 'modalRef' }),
              W: e.sr(D, 'ba9616bc-11', { k: 'drugLimitModalRef' }),
              X: e.sr(b, 'ba9616bc-12', { k: 'pendingOrderModalRef' }),
            }
          );
        }
      );
    },
  }),
  r = e._export_sfc(n, [['__scopeId', 'data-v-ba9616bc']]);
wx.createComponent(r);
