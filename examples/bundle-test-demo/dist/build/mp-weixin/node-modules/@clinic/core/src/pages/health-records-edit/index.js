'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (
    e.resolveComponent('nut-textarea') +
    e.resolveComponent('nut-date-picker') +
    e.resolveComponent('nut-popup')
  )();
}
Math ||
  (
    (() =>
      '../../../node-modules/nutui-uniapp/components/textarea/textarea.js') +
    o +
    (() =>
      '../../../node-modules/nutui-uniapp/components/datepicker/datepicker.js') +
    (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js') +
    n +
    i
  )();
const i = () => '../../components/Modal/index.js',
  o = () => '../../components/Upload/index.js',
  n = () => './components/DrugItemScan/index.js',
  t = e.defineComponent({
    __name: 'index',
    props: {
      isComponentUsage: { type: Boolean, default: !1 },
      isDrugLimit: { type: Boolean, default: !1 },
      isFollowUpInfoRequired: { type: Boolean, default: !0 },
    },
    emits: ['checkShowDrugConfirm'],
    setup(i, { expose: o, emit: n }) {
      const t = i,
        { scanCode: a } = e.useScanCode(),
        l = e.useUserInfoStore(),
        { userInfo: s } = e.storeToRefs(l),
        r = e.useAppConfigStore(),
        { ORG_ID: u, ORG_CODE: c } = r.CONFIG,
        d = e.ref(null),
        p = e.ref(!1),
        v = e.computed(() =>
          p.value
            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711283553622860201240.png'
            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711293495065640201233.png'
        ),
        g = e.ref(!1),
        m = e.ref(null),
        h = e.ref({
          illDesc: '',
          treatedHospital: '',
          treatedSection: '',
          clinicTime: '',
          diagnosis: '',
          treatedFileUrls: '',
          orgPatientFilesMedicineList: [],
        }),
        f = (e) => {
          var i;
          h.value = {
            ...e,
            orgPatientFilesMedicineList:
              null == (i = e.orgPatientFilesMedicineList)
                ? void 0
                : i.map((e) => ({ ...e, ...e.originalParam, isMatching: !0 })),
          };
        },
        C = e.ref(!1),
        D = e.ref(),
        M = ({ selectedValue: i }) => {
          (h.value.clinicTime = e
            .dayjs(i.join('-'))
            .format('YYYY-MM-DD HH:mm:ss')),
            (C.value = !1);
        },
        w = [
          '咳嗽',
          '感冒发烧',
          '头晕头痛',
          '高血压',
          '糖尿病',
          '肠胃不适',
          '鼻塞鼻炎',
          '皮肤瘙痒',
          '妇科炎症',
          '骨关节不适',
        ],
        I = async () => {
          var i;
          if (null == (i = m.value) ? void 0 : i.keyID)
            try {
              const i = (await a()).split(','),
                o = i[i.length - 1];
              if (!e.isValidBarcode(o))
                return void e.index.showToast({
                  icon: 'none',
                  title: 'Error: 条码不正确请重新扫描',
                });
              F(o);
            } catch (o) {
              'string' == typeof o &&
                e.index.showToast({ title: o, icon: 'none' });
            }
          else e.index.showToast({ title: '请先添加就诊人', icon: 'none' });
        },
        F = async (i) => {
          var o, n, a, l, r, u, c, p, v, g, f, C;
          const D = null != (o = h.value.orgPatientFilesMedicineList) ? o : [];
          if ((null == D ? void 0 : D.length) >= 5)
            e.index.showToast({ title: '最多只能选购5种药品', icon: 'none' });
          else if (null == D ? void 0 : D.some((e) => e.barCode === i))
            null == (n = d.value) ||
              n.openModal({
                content: '该药品已存在，请勿重复添加',
                showCancel: !1,
              });
          else
            try {
              e.index.showLoading({ title: '查询中…', mask: !0 });
              const { data: o } = await e.requestMedicineByBarCode({
                barCode: i,
                orgID: null == (a = s.value) ? void 0 : a.orgID,
                orgCode: null == (l = s.value) ? void 0 : l.orgCode,
              });
              if ((e.index.hideLoading(), o)) {
                const {
                  prohibited: i,
                  restricted: n,
                  gynecological: a,
                  nhsaType: l,
                  drugCommonName: M,
                } = o;
                if (n)
                  return void (
                    null == (r = d.value) ||
                    r.openModal({
                      content: '该药品限制条件不适宜互联网复诊，不可添加',
                      showCancel: !1,
                    })
                  );
                if (a)
                  return void (
                    null == (u = d.value) ||
                    u.openModal({
                      content: '该药品为妇科用药，不可添加',
                      showCancel: !1,
                    })
                  );
                if (i)
                  return void (
                    null == (c = d.value) ||
                    c.openModal({
                      content: '该药品属于“网络禁售药品”不可添加',
                      showCancel: !1,
                    })
                  );
                if (l === e.DrugType.ClassC)
                  return void (
                    null == (p = d.value) ||
                    p.openModal({
                      content: '丙类药品不参与医保报销，无法添加',
                      showCancel: !1,
                    })
                  );
                if (null == D ? void 0 : D.some((e) => e.drugCommonName === M))
                  return void (
                    null == (v = d.value) ||
                    v.openModal({
                      content: '已添加该通用名相关药品，请勿重复添加',
                      showCancel: !1,
                    })
                  );
                if (t.isDrugLimit) {
                  const i = {
                      drugCommonName: M,
                      phone: null == (g = m.value) ? void 0 : g.phone,
                      patientID: null == (f = s.value) ? void 0 : f.keyID,
                    },
                    { data: o } = await e.requestCheckH5MedicineSwitch(i, !0);
                  if (!o.closecheckH5Medicine) {
                    const { success: o, message: n } =
                      await e.requestCheckH5Medicine(i, !1);
                    if (!o)
                      return void (
                        null == (C = d.value) ||
                        C.openModal({ content: n, showCancel: !1 })
                      );
                  }
                }
                const w = { ...o, itemCount: 1, isMatching: !0 };
                return void (h.value.orgPatientFilesMedicineList = [...D, w]);
              }
              const n = {
                barCode: i,
                itemCount: 0,
                isMatching: !1,
                isReselect: !0,
              };
              h.value.orgPatientFilesMedicineList = [...D, n];
            } catch (M) {
              e.index.hideLoading();
            }
        },
        y = ({ index: e }) => {
          h.value.orgPatientFilesMedicineList.splice(e, 1);
        },
        T = (i) => {
          const { operationType: o, drugInfo: n } = i;
          o === e.Operation.Increase &&
            h.value.orgPatientFilesMedicineList.forEach((i) => {
              i.itemCount >= 50
                ? e.index.showToast({
                    title: '单种药品最大数量为50',
                    icon: 'none',
                  })
                : i.keyID === n.keyID && i.itemCount++;
            }),
            o === e.Operation.Decrease &&
              h.value.orgPatientFilesMedicineList.forEach((i) => {
                i.keyID === n.keyID &&
                  (i.itemCount <= 1
                    ? e.index.showToast({ title: '不能再少了', icon: 'none' })
                    : i.itemCount--);
              });
        },
        x = () => {
          var i, o;
          (null == (i = m.value) ? void 0 : i.keyID)
            ? e.appNavigator.navigateTo(e.appNavigator.pagesMap['add-drug'], {
                query: {
                  isDrugLimit: t.isDrugLimit,
                  isScanToAdd: !1,
                  drugList: JSON.stringify(
                    null != (o = h.value.orgPatientFilesMedicineList) ? o : []
                  ),
                  patientInfo: JSON.stringify(m.value),
                },
              })
            : e.index.showToast({ title: '请先添加就诊人', icon: 'none' });
        },
        L = n;
      e.watch(
        () => h.value.orgPatientFilesMedicineList,
        () => {
          var e, i;
          const o =
            null ==
            (i =
              null == (e = h.value.orgPatientFilesMedicineList)
                ? void 0
                : e.filter((e) => e.isMatching))
              ? void 0
              : i.length;
          L('checkShowDrugConfirm', !!o);
        },
        { deep: !0 }
      );
      const P = () => {
          var i, o;
          const n = null != (i = h.value.orgPatientFilesMedicineList) ? i : [];
          if (
            !h.value.illDesc ||
            (null == (o = h.value.illDesc) ? void 0 : o.length) < 2
          )
            return (
              e.index.showToast({
                title: '病情描述不能少于2个字',
                icon: 'none',
              }),
              !1
            );
          if (!h.value.treatedFileUrls)
            return (
              e.index.showToast({ title: '请上传就诊材料', icon: 'none' }), !1
            );
          if (t.isFollowUpInfoRequired) {
            if (!h.value.treatedHospital)
              return (
                e.index.showToast({ title: '请输入就诊医院', icon: 'none' }), !1
              );
            if (!h.value.treatedSection)
              return (
                e.index.showToast({ title: '请输入就诊科室', icon: 'none' }), !1
              );
            if (!h.value.clinicTime)
              return (
                e.index.showToast({ title: '请选择就诊时间', icon: 'none' }), !1
              );
            if (!h.value.diagnosis)
              return (
                e.index.showToast({ title: '请输入诊断结果', icon: 'none' }), !1
              );
          }
          return (
            !(null == n ? void 0 : n.length) ||
            !n.some((e) => !e.isMatching) ||
            (e.index.showToast({ title: '请完善药品信息', icon: 'none' }), !1)
          );
        },
        U = async () => {
          var i, o, n, t, a, l;
          if (!P()) return;
          const r = {
              ...h.value,
              orgID: null == (i = s.value) ? void 0 : i.orgID,
              orgCode: null == (o = s.value) ? void 0 : o.orgCode,
              orgPersonUserID: null == (n = s.value) ? void 0 : n.keyID,
              orgPersonFamilyID: null == (t = m.value) ? void 0 : t.keyID,
              clinicTime: h.value.clinicTime
                ? h.value.clinicTime
                : e.DEFAULT_TIME,
              orgPatientFilesMedicineList:
                null == (a = h.value.orgPatientFilesMedicineList)
                  ? void 0
                  : a.map((e) => ({
                      ...e,
                      medicineAmount: e.itemCount,
                      originalParam: e,
                    })),
            },
            p = g.value
              ? e.requestUpdateOrgPatientFiles
              : e.requestSaveOrgPatientFiles;
          try {
            e.index.showLoading({ title: '保存中…', mask: !0 });
            const { data: i } = await e.requestGeneralBasicOCR({
              orgID: u,
              orgCode: c,
              certificateUrls: h.value.treatedFileUrls.split(','),
            });
            if (i.show)
              return (
                e.index.hideLoading(),
                void (
                  null == (l = d.value) ||
                  l.openModal({
                    content: '此凭证不可用于申请统筹处方',
                    showCancel: !1,
                  })
                )
              );
            await p(r),
              e.index.showToast({ title: '保存成功', icon: 'none', mask: !0 }),
              setTimeout(() => {
                e.index.hideToast(),
                  e.appNavigator.navigateBack(g.value ? 2 : 1);
              }, 1500);
          } catch (v) {
            e.index.hideLoading();
          }
        };
      return (
        o({
          pageOnLoad: (i) => {
            (g.value = JSON.parse(i.isEdit)),
              (m.value = JSON.parse(i.patientInfo)),
              g.value && i.healthInfo && f(JSON.parse(i.healthInfo)),
              e.index.$on('setDrugList', (e) => {
                h.value.orgPatientFilesMedicineList = e;
              });
          },
          getHealInfo: () => h.value,
          setHealInfo: f,
          validateHealthInfo: P,
        }),
        (i, o) => {
          var n, t, a, l, s, r, u;
          return e.e(
            { a: !i.isComponentUsage },
            i.isComponentUsage
              ? {}
              : {
                  b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710261027353700201240.png',
                },
            {
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710562797921040201240.png',
              d: e.o((e) => (h.value.illDesc = e)),
              e: e.p({
                'limit-show': !0,
                'max-length': '200',
                placeholder:
                  '请输入病情描述，如发生时间、主要症状、治疗过程、目前状况以及希望获得的帮助 (最少2个字)',
                'placeholder-style': 'color: #cccccc;',
                modelValue: h.value.illDesc,
              }),
              f: e.f(w, (i, o, n) => ({
                a: e.t(i),
                b: i,
                c: e.o(
                  (o) =>
                    ((i) => {
                      const o = h.value.illDesc ? `${h.value.illDesc},${i}` : i;
                      o.length <= 200
                        ? (h.value.illDesc = o)
                        : e.index.showToast({
                            title: '输入的文本不能超过200个字',
                            icon: 'none',
                          });
                    })(i),
                  i
                ),
              })),
              g: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711011944832930201240.png',
              h: e.o((e) => (h.value.treatedFileUrls = e)),
              i: e.p({ 'file-list': h.value.treatedFileUrls }),
              j: !i.isFollowUpInfoRequired,
            },
            i.isFollowUpInfoRequired
              ? {}
              : {
                  k: e.t(p.value ? '收起更多内容' : '展开输入更多'),
                  l: v.value,
                  m: e.o((e) => (p.value = !p.value)),
                },
            { n: i.isFollowUpInfoRequired || p.value },
            i.isFollowUpInfoRequired || p.value
              ? e.e(
                  { o: i.isFollowUpInfoRequired },
                  (i.isFollowUpInfoRequired, {}),
                  {
                    p: i.isFollowUpInfoRequired ? '18px' : '16px',
                    q: h.value.treatedHospital,
                    r: e.o((e) => (h.value.treatedHospital = e.detail.value)),
                    s: h.value.treatedSection,
                    t: e.o((e) => (h.value.treatedSection = e.detail.value)),
                    v:
                      (null == (n = h.value) ? void 0 : n.clinicTime) &&
                      h.value.clinicTime !== e.unref(e.DEFAULT_TIME),
                  },
                  (null == (t = h.value) ? void 0 : t.clinicTime) &&
                    h.value.clinicTime !== e.unref(e.DEFAULT_TIME)
                    ? {
                        w: e.t(
                          e
                            .unref(e.dayjs)(
                              null == (a = h.value) ? void 0 : a.clinicTime
                            )
                            .format('YYYY-MM-DD')
                        ),
                      }
                    : {},
                  {
                    x: e.o((e) => (C.value = !0)),
                    y: e.o(M),
                    z: e.o((e) => (C.value = !1)),
                    A: e.o((e) => (D.value = e)),
                    B: e.p({
                      formatter: e.unref(e.pickerDateFormatter),
                      modelValue: D.value,
                    }),
                    C: e.o((e) => (C.value = e)),
                    D: e.p({ position: 'bottom', visible: C.value }),
                    E: h.value.diagnosis,
                    F: e.o((e) => (h.value.diagnosis = e.detail.value)),
                  }
                )
              : {},
            {
              G: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711020588223670201233.png',
              H: e.o(x),
              I:
                null == (l = h.value.orgPatientFilesMedicineList)
                  ? void 0
                  : l.length,
            },
            (
              null == (s = h.value.orgPatientFilesMedicineList)
                ? void 0
                : s.length
            )
              ? {
                  J: e.f(h.value.orgPatientFilesMedicineList, (o, n, t) => ({
                    a: e.o(y, o.keyID),
                    b: e.o(T, o.keyID),
                    c: '344183d2-4-' + t,
                    d: e.p({
                      'drug-info': o,
                      'drug-list': h.value.orgPatientFilesMedicineList,
                      'drug-index': n,
                      'is-drug-limit': i.isDrugLimit,
                      'patient-info': m.value,
                    }),
                    e: o.keyID,
                  })),
                }
              : {},
            {
              K:
                null == (r = h.value.orgPatientFilesMedicineList)
                  ? void 0
                  : r.length,
            },
            (
              null == (u = h.value.orgPatientFilesMedicineList)
                ? void 0
                : u.length
            )
              ? { L: e.o(I) }
              : {
                  M: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071810460364693340201240.png',
                  N: e.o(I),
                },
            { O: !i.isComponentUsage },
            i.isComponentUsage ? {} : { P: e.o(U) },
            {
              Q: e.sr(d, '344183d2-5', { k: 'modalRef' }),
              R: i.isComponentUsage && '0',
            }
          );
        }
      );
    },
  }),
  a = e._export_sfc(t, [['__scopeId', 'data-v-344183d2']]);
wx.createComponent(a);
