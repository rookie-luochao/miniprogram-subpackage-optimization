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
    t +
    (() => '../../../node-modules/nutui-uniapp/components/radio/radio.js') +
    (() =>
      '../../../node-modules/nutui-uniapp/components/radiogroup/radiogroup.js') +
    (() =>
      '../../../node-modules/nutui-uniapp/components/checkbox/checkbox.js') +
    a +
    o +
    i
  )();
const a = () => '../../components/Modal/index.js',
  l = () => '../../components/Navbar/index.js',
  t = () => '../health-records-edit/index.js',
  o = () => './components/DrugLimitModal/index.js',
  i = () => './components/PendingOrderModal/index.js',
  n = e.defineComponent({
    __name: 'index',
    props: {
      isPrescriptionAuth: { type: Boolean, default: !0 },
      isFollowUpInfoRequired: { type: Boolean, default: !0 },
      isOpenDrugConfirm: { type: Boolean, default: !0 },
      isPayment: { type: Boolean, default: !0 },
    },
    setup(a, { expose: l }) {
      const t = e.ref([
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
        o = e.useAppConfigStore(),
        { ORG_ID: i, ORG_CODE: n } = o.CONFIG,
        u = e.useUserInfoStore(),
        { userInfo: r } = e.storeToRefs(u),
        s = e.useMedicalInsuranceAuthStore(),
        {
          medicalAuthStatus: c,
          medicalAuthType: d,
          userAuthInfo: p,
          prescriptionAuthInfo: v,
        } = e.storeToRefs(s),
        { scanCodeAuth: m, scanCodeData: h } = e.useScanCodeAuth(),
        {
          medicalInfo: g,
          fetchMedicalUserInfo: y,
          fetchMedicalPrescription: f,
        } = e.useMedicalInfo(),
        I = e.ref(null),
        D = e.ref(null),
        C = e.ref(null),
        w = e.ref(null),
        A = e.ref(null),
        N = a,
        O = e.ref(null),
        b = e.ref(!1),
        k = async () => {
          var a, l;
          if (O.value === e.AutoJumpEnum.AddPatient) {
            if (!p.value.authNo) return;
            await y(),
              (null == (a = g.value) ? void 0 : a.user_name) &&
                g.value.user_card_no &&
                ((O.value = null),
                e.appNavigator.navigateTo(
                  e.appNavigator.pagesMap['patient-detail'],
                  {
                    query: {
                      familyName: g.value.user_name,
                      idNumber: g.value.user_card_no,
                    },
                  }
                ));
          }
          if (O.value === e.AutoJumpEnum.CreateOrder) {
            if (!v.value.authNo) return;
            await f(),
              (null == (l = g.value) ? void 0 : l.auth_no)
                ? ((b.value = !0), (O.value = null), await Q())
                : (b.value = !1);
          }
        },
        M = e.ref(null),
        S = e.ref(null),
        q = e.ref(),
        T = () => {
          t.value.forEach((e) => {
            e.checkCondition(M.value) && (e.show = !1);
          });
          const a = t.value.filter((e) => e.show);
          1 === a.length && (q.value = a[0].value),
            2 === a.length && (q.value = e.InquiryMode.TextAndVideo);
        },
        P = e.ref(''),
        x = async () => {
          var a, l;
          const { data: t } =
            await e.requestQueryAllClientAppServiceAndClientApp({
              appType: e.APP_TYPE,
              orgID: null == (a = M.value) ? void 0 : a.orgID,
            });
          P.value =
            (null ==
            (l =
              null == t
                ? void 0
                : t.find((a) => a.serviceCode === e.SERVICE_CODE))
              ? void 0
              : l.keyID) || '';
        },
        U = e.ref(null),
        _ = async () => {
          var a, l, t, o, n;
          const { data: u } = await e.requestSelectOrgPersonFamily({
            orgID: i,
            orgPersonUserID: null == (a = r.value) ? void 0 : a.keyID,
          });
          c.value === e.AuthStatus.NO_AUTH &&
            (U.value = null != (l = u[0]) ? l : {}),
            c.value === e.AuthStatus.NEED_AUTH &&
              (U.value =
                null !=
                (t = u.filter(
                  (a) => a.isInsuranceUser === e.IsMedicalAuthPatient.YES
                )[0])
                  ? t
                  : {}),
            (null == (o = U.value) ? void 0 : o.keyID) &&
              (null == (n = A.value) ||
                n.pageOnLoad({
                  isEdit: JSON.stringify(!1),
                  patientInfo: JSON.stringify(U.value),
                }),
              await L());
        },
        E = e.ref([]),
        L = async () => {
          var a, l, t, o;
          const { data: i } = await e.requestGetListByOrgPersonUserID({
            orgID: null == (a = r.value) ? void 0 : a.orgID,
            orgCode: null == (l = r.value) ? void 0 : l.orgCode,
            orgPersonUserID: null == (t = r.value) ? void 0 : t.keyID,
            orgPersonFamilyID: null == (o = U.value) ? void 0 : o.keyID,
          });
          E.value = i;
        },
        H = e.ref(!1),
        R = e.ref(''),
        F = async (a) => {
          var l, t;
          const { orgPatientFilesMedicineList: o, keyID: i } = a;
          if (R.value !== a.keyID) {
            if (
              ((R.value = i), (H.value = !1), null == o ? void 0 : o.length)
            ) {
              const t =
                  null == o
                    ? void 0
                    : o.map(async (a) => {
                        var l, t;
                        const o = {
                            phone: null == (l = U.value) ? void 0 : l.phone,
                            drugCommonName: a.drugCommonName,
                            patientID: null == (t = r.value) ? void 0 : t.keyID,
                          },
                          { data: i } = await e.requestCheckH5MedicineSwitch(
                            o,
                            !1
                          );
                        try {
                          if (!i.closecheckH5Medicine) {
                            const { success: l } =
                              await e.requestCheckH5Medicine(o, !1);
                            a.isLimit = !l;
                          }
                        } catch (n) {
                          console.log(n);
                        }
                        return a;
                      }),
                i = await Promise.all(t),
                n = i.filter((e) => e.isLimit);
              n.length &&
                (null == (l = C.value) || l.openModal({ drugList: n })),
                (a.orgPatientFilesMedicineList = i.filter((e) => !e.isLimit));
            }
            null == (t = A.value) || t.setHealInfo(a),
              setTimeout(() => {
                e.index.pageScrollTo({ scrollTop: 9999, duration: 200 });
              }, 200);
          }
        },
        G = () => {
          var a;
          (null == (a = U.value) ? void 0 : a.keyID)
            ? e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['health-records-edit'],
                { query: { isEdit: !1, patientInfo: JSON.stringify(U.value) } }
              )
            : e.index.showToast({ title: '请先添加就诊人', icon: 'none' });
        },
        j = e.ref(!0),
        J = e.ref(!1),
        V = e.ref(!1),
        W = (e) => {
          V.value = e;
        },
        B = async () => {
          var a, l;
          const { data: t } = await e.requestGetPatientNoFinishOrder({
              patientID: null == (a = r.value) ? void 0 : a.keyID,
              orgID: i,
              orgCode: n,
            }),
            { inquiryOrderList: o, maxOrderSize: u } = t;
          Number(u) < 1 ||
            (o.length > 0 &&
              (null == (l = w.value) ||
                l.openModal({
                  inquiryOrderList: o,
                  canCreateOrder: o.length < Number(u),
                })));
        },
        z = () => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['web-view'], {
            query: { url: 'https://polymermgmt-cs.100cbc.com/youai/informed' },
          });
        },
        Y = async () => {
          c.value === e.AuthStatus.NO_AUTH &&
            e.appNavigator.navigateTo(
              e.appNavigator.pagesMap['patient-detail']
            ),
            c.value === e.AuthStatus.NEED_AUTH &&
              ((O.value = e.AutoJumpEnum.AddPatient),
              d.value === e.AuthType.MINI_PROGRAM && e.wxUserInfoAuth(),
              d.value === e.AuthType.SCAN_CODE &&
                (await m(),
                h.value &&
                  e.appNavigator.navigateTo(
                    e.appNavigator.pagesMap['patient-detail'],
                    {
                      query: {
                        familyName: h.value.userName,
                        idNumber: h.value.idNo,
                      },
                    }
                  )));
        },
        K = e.ref(!1),
        Q = async () => {
          var a, l, t, o, u, s, c, p, v, y, f, D, C, w, k;
          if (K.value)
            if (null == (a = U.value) ? void 0 : a.keyID) {
              if (null == (l = A.value) ? void 0 : l.validateHealthInfo())
                if (j.value)
                  if (J.value)
                    null == (o = I.value) ||
                      o.openModal({
                        content: '若存在不良反应，请到线下医院就诊开药',
                        showCancel: !1,
                      });
                  else if (q.value)
                    if (b.value)
                      try {
                        e.index.showLoading({ title: '创建中…', mask: !0 });
                        const a = A.value.getHealInfo(),
                          { data: l } = await e.requestGeneralBasicOCR({
                            orgID: i,
                            orgCode: n,
                            certificateUrls: a.treatedFileUrls.split(','),
                          });
                        if (l.show)
                          return void (
                            null == (u = I.value) ||
                            u.openModal({
                              content: '此凭证不可用于申请统筹处方',
                              showCancel: !1,
                            })
                          );
                        let t = {
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
                        const { data: o } =
                          await e.requestGetOrgPersonFamilyInfo({
                            orgID: i,
                            keyID: U.value.keyID,
                          });
                        t = e.processPatientHealthInfo(t, o.orgPersonHealths);
                        const { formSource: d, payWay: m } =
                            e.getFormSourceAndPayWay(),
                          O = {
                            ...t,
                            ...a,
                            inquiryOrderMedicineList:
                              (null == (s = a.orgPatientFilesMedicineList)
                                ? void 0
                                : s.map((e) => ({
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
                            clientAppServiceID: P.value,
                            clientOrgCode:
                              null == (c = M.value) ? void 0 : c.orgCode,
                            clientOrgID:
                              null == (p = M.value) ? void 0 : p.orgID,
                            inquiryMoney: 0,
                            inquiryWay: q.value,
                            patientAge: U.value.ageYear,
                            patientMonth: U.value.ageMonth,
                            patientID: U.value.keyID,
                            relationName: U.value.relationName,
                            patientWeight: U.value.weight,
                            orgID: i,
                            orgCode: n,
                            serviceCode: e.SERVICE_CODE,
                            patientImID:
                              null == (v = r.value) ? void 0 : v.keyID,
                            doctorImID: '',
                            cityId: null == (y = g.value) ? void 0 : y.city_id,
                            authno: null == (f = g.value) ? void 0 : f.auth_no,
                            ecToken: null == (D = h.value) ? void 0 : D.ecToken,
                            payWay: null != m ? m : e.PaymentWay.Wechatpay,
                            formSource: null != d ? d : e.OrderChannel.Wechat,
                            inquiryOrderId:
                              null == (C = S.value)
                                ? void 0
                                : C.inquiryOrderKeyID,
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
                          b = N.isPayment
                            ? e.requestSaveHlpH5ConvenientInquiryOrder
                            : e.requestSaveConvenientInquiryOrder,
                          { success: k, message: T, data: x } = await b(O);
                        k
                          ? e.appNavigator.redirectTo(
                              e.appNavigator.pagesMap['dispatch-wait'],
                              { query: { orderID: x.keyID } }
                            )
                          : null == (w = I.value) ||
                            w.openModal({
                              content: T || '创建问诊订单失败，请重试',
                              showCancel: !1,
                            });
                      } catch (T) {
                        null == (k = I.value) ||
                          k.openModal({
                            content: '创建问诊订单失败，请重试',
                            showCancel: !1,
                          });
                      } finally {
                        e.index.hideLoading();
                      }
                    else
                      (async () => {
                        var a;
                        (O.value = e.AutoJumpEnum.CreateOrder),
                          d.value === e.AuthType.MINI_PROGRAM &&
                            e.wxPrescriptionAuth(),
                          d.value === e.AuthType.SCAN_CODE &&
                            (await m(),
                            (null == (a = h.value) ? void 0 : a.ecToken)
                              ? ((b.value = !0), await Q())
                              : (b.value = !1));
                      })();
                  else
                    e.index.showToast({
                      title: '请选择问诊方式',
                      icon: 'none',
                    });
                else
                  null == (t = I.value) ||
                    t.openModal({
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
            (N.isPrescriptionAuth && c.value !== e.AuthStatus.NO_AUTH) ||
              (b.value = !0);
            try {
              e.index.showLoading({ title: '加载中…', mask: !0 }),
                await _(),
                await x(),
                await B(),
                await k();
            } finally {
              e.index.hideLoading();
            }
          },
          pageOnLoad: (e) => {
            var a, l, t;
            T(),
              null == (a = I.value) ||
                a.openModal({
                  title: '用户须知',
                  content:
                    '1、门诊统筹仅限参保人员本人使用，不能冒用他人的信息进行门诊统筹。\n              2、互联网医院只能复诊开方，请您上传您本人在实体医疗机构的就诊记录作为复诊开方的凭证。\n              3、对于“大处方”、“套餐处方”以及“超量用药”、“超限用药”医生将拒绝为您开方。\n              请您悉知！\n            ',
                  contentAlign: 'left',
                  showCancel: !1,
                  confirmText: '知道了',
                }),
              (M.value = JSON.parse(e.subOrgInfo));
            const o = JSON.parse(
              null != (l = null == e ? void 0 : e.orderDetail) ? l : '{}'
            );
            if (o) {
              S.value = o;
              const {
                illDesc: e,
                treatedHospital: a,
                treatedSection: l,
                clinicTime: i,
                diagnosis: n,
                treatedFileUrlString: u,
                inquiryOrderMedicineListOut: r,
              } = o;
              null == (t = A.value) ||
                t.setHealInfo({
                  keyID: '',
                  orgID: '',
                  orgCode: '',
                  orgPersonUserID: '',
                  orgPersonFamilyID: '',
                  illDesc: e,
                  treatedHospital: a,
                  treatedSection: l,
                  clinicTime: i,
                  diagnosis: n,
                  treatedFileUrls: u,
                  orgPatientFilesMedicineList:
                    null == r
                      ? void 0
                      : r.map((e) => ({ ...e, keyID: e.inquiryItemID })),
                });
            }
          },
          pageOnScroll: (e) => {
            var a;
            null == (a = D.value) || a.pageOnScroll(e);
          },
        }),
        (a, l) => {
          var o, i, n, u;
          return e.e(
            {
              a: e.sr(D, 'd06a1879-0', { k: 'navbarRef' }),
              b: e.p({ title: '问诊信息' }),
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717453240839090201233.png',
              d: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071814010427014940201240.png',
              e: e.t(null == (o = M.value) ? void 0 : o.orgName),
              f: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071815411723750750201240.png',
              g: null == (i = U.value) ? void 0 : i.familyName,
            },
            (null == (n = U.value) ? void 0 : n.familyName)
              ? {
                  h: e.t(null == (u = U.value) ? void 0 : u.familyName),
                  i: e.t(e.unref(e.GenderDesc)[U.value.sex]),
                  j: e.t(
                    e.unref(e.formatPatientAge)(
                      U.value.ageYear,
                      U.value.ageMonth
                    )
                  ),
                }
              : {
                  k: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071815445366666680201240.png',
                  l: e.o(Y),
                },
            {
              m: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071815573498850600201240.png',
              n: e.o(G),
              o: E.value.length > 3,
            },
            E.value.length > 3
              ? {
                  p: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071816013653351600201233.png',
                  q: e.o((e) => (H.value = !0)),
                }
              : {},
            { r: E.value.length },
            E.value.length
              ? {
                  s: e.f(E.value.slice(0, 3), (a, l, t) => ({
                    a: e.t(a.illDesc),
                    b: a.keyID,
                    c: e.n(R.value === a.keyID ? 'health-active' : ''),
                    d: e.o((e) => F(a), a.keyID),
                  })),
                }
              : {
                  t: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071816022771758130201233.png',
                },
            {
              v: e.f(E.value, (a, l, t) =>
                e.e(
                  { a: e.t(a.illDesc), b: a.treatedFileUrls },
                  (a.treatedFileUrls, {}),
                  {
                    c: a.keyID,
                    d: e.n(R.value === a.keyID ? 'health-more-active' : ''),
                    e: e.o((e) => F(a), a.keyID),
                  }
                )
              ),
              w: e.o((e) => (H.value = e)),
              x: e.p({
                round: !0,
                closeable: !0,
                position: 'bottom',
                'pop-class': 'health-more-pop',
                visible: H.value,
              }),
              y: e.sr(A, 'd06a1879-2', { k: 'healthRecordsEditRef' }),
              z: e.o(W),
              A: e.p({
                'is-component-usage': !0,
                'is-drug-limit': !0,
                'is-follow-up-info-required': a.isFollowUpInfoRequired,
              }),
              B: a.isOpenDrugConfirm && V.value,
            },
            a.isOpenDrugConfirm && V.value
              ? {
                  C: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24080811445894207140201240.png',
                  D: e.p({ label: !1 }),
                  E: e.p({ label: !0 }),
                  F: e.o((e) => (j.value = e)),
                  G: e.p({ direction: 'horizontal', modelValue: j.value }),
                  H: e.p({ label: !1 }),
                  I: e.p({ label: !0 }),
                  J: e.o((e) => (J.value = e)),
                  K: e.p({ direction: 'horizontal', modelValue: J.value }),
                }
              : {},
            {
              L: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071816234454153560201240.png',
              M: e.f(t.value, (a, l, t) =>
                e.e(
                  { a: a.show },
                  a.show
                    ? {
                        b: q.value === a.value ? a.activeUrl : a.iconUrl,
                        c: e.t(a.label),
                        d: e.n(q.value === a.value && 'mode-active'),
                        e: e.o((e) => {
                          return (l = a.value), void (q.value = l);
                          var l;
                        }, a.value),
                      }
                    : {},
                  { f: a.value }
                )
              ),
              N: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717460053411610201240.png',
              O: e.o((e) => (K.value = e)),
              P: e.p({ modelValue: K.value }),
              Q: e.o(z),
              R: e.o((e) => (K.value = !K.value)),
              S: e.t(b.value ? '创建问诊' : '医保授权'),
              T: e.n(K.value ? 'cerate-btn-active' : ''),
              U: e.o((e) => Q()),
              V: e.sr(I, 'd06a1879-10', { k: 'modalRef' }),
              W: e.sr(C, 'd06a1879-11', { k: 'drugLimitModalRef' }),
              X: e.sr(w, 'd06a1879-12', { k: 'pendingOrderModalRef' }),
            }
          );
        }
      );
    },
  }),
  u = e._export_sfc(n, [['__scopeId', 'data-v-d06a1879']]);
wx.createComponent(u);
