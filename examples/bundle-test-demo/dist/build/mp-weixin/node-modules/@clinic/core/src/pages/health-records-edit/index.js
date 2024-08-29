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
    i +
    (() =>
      '../../../node-modules/nutui-uniapp/components/datepicker/datepicker.js') +
    (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js') +
    o
  )();
const i = () => '../../components/Upload/index.js',
  o = () => './components/DrugItemScan/index.js',
  t = e.defineComponent({
    __name: 'index',
    props: {
      isComponentUsage: { type: Boolean, default: !1 },
      isDrugLimit: { type: Boolean, default: !1 },
      isFollowUpInfoRequired: { type: Boolean, default: !0 },
    },
    emits: ['checkShowDrugConfirm'],
    setup(i, { expose: o, emit: t }) {
      const n = i,
        a = e.inject(e.globalDataSymbol),
        l = e.useUserInfoStore(),
        { userInfo: s } = e.storeToRefs(l),
        u = e.ref(!1),
        r = e.computed(() =>
          u.value
            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711283553622860201240.png'
            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711293495065640201233.png'
        ),
        c = e.ref(!1),
        d = e.ref(null),
        p = e.ref({
          illDesc: '',
          treatedHospital: '',
          treatedSection: '',
          clinicTime: '',
          diagnosis: '',
          treatedFileUrls: '',
          orgPatientFilesMedicineList: [],
        }),
        v = (e) => {
          var i;
          p.value = {
            ...e,
            orgPatientFilesMedicineList:
              null == (i = e.orgPatientFilesMedicineList)
                ? void 0
                : i.map((e) => ({ ...e, isMatching: !0 })),
          };
        },
        m = e.ref(!1),
        g = e.ref(),
        h = ({ selectedValue: i }) => {
          (p.value.clinicTime = e
            .dayjs(i.join('-'))
            .format('YYYY-MM-DD HH:mm:ss')),
            (m.value = !1);
        },
        f = [
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
        D = async () => {
          null == a || a.updateGlobalData({ onShowFlag: !1 }),
            e.index.scanCode({
              success: (i) => {
                e.isValidBarcode(i.result)
                  ? F(i.result)
                  : e.index.showToast({
                      icon: 'none',
                      title: 'Error: 条码不正确请重新扫描',
                    });
              },
            });
        },
        F = async (i) => {
          var o, t, a, l;
          const u = p.value.orgPatientFilesMedicineList;
          if ((null == u ? void 0 : u.length) >= 5)
            e.index.showToast({ title: '最多只能选购5种药品', icon: 'none' });
          else if (null == u ? void 0 : u.some((e) => e.barCode === i))
            e.index.showToast({
              title: '该药品已存在，请勿重复添加',
              icon: 'none',
            });
          else
            try {
              e.index.showLoading({ title: '查询中…', mask: !0 });
              const { data: r } = await e.requestMedicineByBarCode({
                barCode: i,
                orgID: null == (o = s.value) ? void 0 : o.orgID,
                orgCode: null == (t = s.value) ? void 0 : t.orgCode,
              });
              if (r) {
                const {
                  prohibited: i,
                  nhsaType: o,
                  drugCommonName: t,
                  keyID: c,
                } = r;
                if (i)
                  return void e.index.showToast({
                    title: '该药品属于“网络禁售药品”不可添加',
                    icon: 'none',
                  });
                if (o === e.DrugType.ClassC)
                  return void e.index.showToast({
                    title: '丙类药品不参与医保报销，无法添加',
                    icon: 'none',
                  });
                if (u.some((e) => e.keyID === c))
                  return void e.index.showToast({
                    title: '该药品已存在，请勿重复添加',
                    icon: 'none',
                  });
                if (u.some((e) => e.drugCommonName === t))
                  return void e.index.showToast({
                    title: '已添加该通用名相关药品，请勿重复添加',
                    icon: 'none',
                  });
                if (n.isDrugLimit) {
                  const i = {
                      drugCommonName: t,
                      phone: null == (a = d.value) ? void 0 : a.phone,
                      patientID: null == (l = s.value) ? void 0 : l.keyID,
                    },
                    { data: o } = await e.requestCheckH5MedicineSwitch(i, !0);
                  o.closecheckH5Medicine ||
                    (await e.requestCheckH5Medicine(i, !0));
                }
                const v = { ...r, itemCount: 1, isMatching: !0 };
                return void (p.value.orgPatientFilesMedicineList = [...u, v]);
              }
              const c = {
                barCode: i,
                itemCount: 0,
                isMatching: !1,
                isReselect: !0,
              };
              p.value.orgPatientFilesMedicineList = [...u, c];
            } finally {
              e.index.hideLoading();
            }
        },
        I = ({ index: e }) => {
          p.value.orgPatientFilesMedicineList.splice(e, 1);
        },
        y = (i) => {
          const { operationType: o, drugInfo: t } = i;
          o === e.Operation.Increase &&
            p.value.orgPatientFilesMedicineList.forEach((i) => {
              i.itemCount >= 50
                ? e.index.showToast({
                    title: '单种药品最大数量为50',
                    icon: 'none',
                  })
                : i.keyID === t.keyID && i.itemCount++;
            }),
            o === e.Operation.Decrease &&
              p.value.orgPatientFilesMedicineList.forEach((i) => {
                i.keyID === t.keyID &&
                  (i.itemCount <= 1
                    ? e.index.showToast({ title: '不能再少了', icon: 'none' })
                    : i.itemCount--);
              });
        },
        M = () => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['add-drug'], {
            query: {
              isDrugLimit: n.isDrugLimit,
              isScanToAdd: !1,
              drugList: JSON.stringify(p.value.orgPatientFilesMedicineList),
              patientInfo: JSON.stringify(d.value),
            },
          });
        },
        L = t;
      e.watch(
        () => p.value.orgPatientFilesMedicineList,
        () => {
          var e, i;
          const o =
            null ==
            (i =
              null == (e = p.value.orgPatientFilesMedicineList)
                ? void 0
                : e.filter((e) => e.isMatching))
              ? void 0
              : i.length;
          L('checkShowDrugConfirm', !!o);
        },
        { deep: !0 }
      );
      const T = () => {
          var i;
          const o = p.value.orgPatientFilesMedicineList;
          return !p.value.illDesc ||
            (null == (i = p.value.illDesc) ? void 0 : i.length) < 2
            ? (e.index.showToast({
                title: '病情描述不能少于2个字',
                icon: 'none',
              }),
              !1)
            : p.value.treatedFileUrls
              ? !(
                  (null == o ? void 0 : o.length) &&
                  !o.some((e) => e.isMatching)
                ) ||
                (e.index.showToast({ title: '请完善药品信息', icon: 'none' }),
                !1)
              : (e.index.showToast({ title: '请上传就诊材料', icon: 'none' }),
                !1);
        },
        w = async () => {
          var i, o, t, n;
          if (!T()) return;
          const l = {
              ...p.value,
              orgID: null == (i = s.value) ? void 0 : i.orgID,
              orgCode: null == (o = s.value) ? void 0 : o.orgCode,
              orgPersonUserID: null == (t = s.value) ? void 0 : t.keyID,
              orgPersonFamilyID: null == (n = d.value) ? void 0 : n.keyID,
              clinicTime: p.value.clinicTime
                ? p.value.clinicTime
                : e.DEFAULT_TIME,
              orgPatientFilesMedicineList:
                p.value.orgPatientFilesMedicineList.map((e) => ({
                  ...e,
                  medicineAmount: e.itemCount,
                  originalParam: e,
                })),
            },
            u = c.value
              ? e.requestUpdateOrgPatientFiles
              : e.requestSaveOrgPatientFiles;
          try {
            e.index.showLoading({ title: '保存中…', mask: !0 }),
              await u(l),
              e.index.showToast({ title: '保存成功', icon: 'none', mask: !0 }),
              setTimeout(() => {
                e.index.hideToast(),
                  null == a || a.updateGlobalData({ onShowFlag: !0 }),
                  e.appNavigator.navigateBack(c.value ? 2 : 1);
              }, 1500);
          } catch (r) {
            e.index.hideLoading();
          }
        };
      return (
        o({
          pageOnLoad: (i) => {
            (c.value = JSON.parse(i.isEdit)),
              (d.value = JSON.parse(i.patientInfo)),
              c.value && i.healthInfo && v(JSON.parse(i.healthInfo)),
              e.index.$on('setDrugList', (e) => {
                p.value.orgPatientFilesMedicineList = e;
              });
          },
          getHealInfo: () => p.value,
          setHealInfo: v,
          validateHealthInfo: T,
        }),
        (i, o) => {
          var t, n, a, l, s, c, v;
          return e.e(
            { a: !i.isComponentUsage },
            i.isComponentUsage
              ? {}
              : {
                  b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710261027353700201240.png',
                },
            {
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710562797921040201240.png',
              d: e.o((e) => (p.value.illDesc = e)),
              e: e.p({
                'limit-show': !0,
                'max-length': '200',
                placeholder:
                  '请输入病情描述，如发生时间、主要症状、治疗过程、目前状况以及希望获得的帮助 (最少2个字)',
                'placeholder-style': 'color: #cccccc;',
                modelValue: p.value.illDesc,
              }),
              f: e.f(f, (i, o, t) => ({
                a: e.t(i),
                b: i,
                c: e.o(
                  (o) =>
                    ((i) => {
                      const o = p.value.illDesc ? `${p.value.illDesc},${i}` : i;
                      o.length <= 200
                        ? (p.value.illDesc = o)
                        : e.index.showToast({
                            title: '输入的文本不能超过200个字',
                            icon: 'none',
                          });
                    })(i),
                  i
                ),
              })),
              g: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711011944832930201240.png',
              h: e.o((e) => (p.value.treatedFileUrls = e)),
              i: e.p({ 'file-list': p.value.treatedFileUrls }),
              j: !i.isFollowUpInfoRequired,
            },
            i.isFollowUpInfoRequired
              ? {}
              : {
                  k: e.t(u.value ? '收起更多内容' : '展开输入更多'),
                  l: r.value,
                  m: e.o((e) => (u.value = !u.value)),
                },
            { n: i.isFollowUpInfoRequired || u.value },
            i.isFollowUpInfoRequired || u.value
              ? e.e(
                  { o: i.isFollowUpInfoRequired },
                  (i.isFollowUpInfoRequired, {}),
                  {
                    p: i.isFollowUpInfoRequired ? '10px' : '16px',
                    q: p.value.treatedHospital,
                    r: e.o((e) => (p.value.treatedHospital = e.detail.value)),
                    s: p.value.treatedSection,
                    t: e.o((e) => (p.value.treatedSection = e.detail.value)),
                    v:
                      (null == (t = p.value) ? void 0 : t.clinicTime) &&
                      p.value.clinicTime !== e.unref(e.DEFAULT_TIME),
                  },
                  (null == (n = p.value) ? void 0 : n.clinicTime) &&
                    p.value.clinicTime !== e.unref(e.DEFAULT_TIME)
                    ? {
                        w: e.t(
                          e
                            .unref(e.dayjs)(
                              null == (a = p.value) ? void 0 : a.clinicTime
                            )
                            .format('YYYY-MM-DD')
                        ),
                      }
                    : {},
                  {
                    x: e.o((e) => (m.value = !0)),
                    y: e.o(h),
                    z: e.o((e) => (m.value = !1)),
                    A: e.o((e) => (g.value = e)),
                    B: e.p({
                      formatter: e.unref(e.pickerDateFormatter),
                      modelValue: g.value,
                    }),
                    C: e.o((e) => (m.value = e)),
                    D: e.p({ position: 'bottom', visible: m.value }),
                    E: p.value.diagnosis,
                    F: e.o((e) => (p.value.diagnosis = e.detail.value)),
                  }
                )
              : {},
            {
              G: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071711020588223670201233.png',
              H: e.o(M),
              I:
                null == (l = p.value.orgPatientFilesMedicineList)
                  ? void 0
                  : l.length,
            },
            (
              null == (s = p.value.orgPatientFilesMedicineList)
                ? void 0
                : s.length
            )
              ? {
                  J: e.f(p.value.orgPatientFilesMedicineList, (o, t, n) => ({
                    a: e.o(I, o.keyID),
                    b: e.o(y, o.keyID),
                    c: '68f4ed21-4-' + n,
                    d: e.p({
                      'drug-info': o,
                      'drug-list': p.value.orgPatientFilesMedicineList,
                      'drug-index': t,
                      'is-drug-limit': i.isDrugLimit,
                      'patient-info': d.value,
                    }),
                    e: o.keyID,
                  })),
                }
              : {},
            {
              K:
                null == (c = p.value.orgPatientFilesMedicineList)
                  ? void 0
                  : c.length,
            },
            (
              null == (v = p.value.orgPatientFilesMedicineList)
                ? void 0
                : v.length
            )
              ? { L: e.o(D) }
              : {
                  M: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071810460364693340201240.png',
                  N: e.o(D),
                },
            { O: !i.isComponentUsage },
            i.isComponentUsage ? {} : { P: e.o(w) },
            { Q: i.isComponentUsage && '0' }
          );
        }
      );
    },
  }),
  n = e._export_sfc(t, [['__scopeId', 'data-v-68f4ed21']]);
wx.createComponent(n);
