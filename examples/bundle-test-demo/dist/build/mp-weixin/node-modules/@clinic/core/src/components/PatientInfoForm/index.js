'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (l + n + a + t + i)();
const a = () => '../DatePicker/index.js',
  t = () => '../Modal/index.js',
  l = () => '../Textarea/index.js',
  n = () => '../Upload/index.js',
  i = () => './components/DiagnosisPopup/index.js',
  o = e.defineComponent({
    __name: 'index',
    props: { modelValue: {} },
    emits: ['update:modelValue'],
    setup(a, { expose: t, emit: l }) {
      const n = a,
        i = l,
        o = {
          patientInfoId: {
            message: '请选择就诊人',
            validate: () => !!d.value.patientInfoId,
          },
          illDesc: {
            message: '请描述您的症状,最少10个字',
            validate: () => {
              var e;
              return (null != (e = d.value.illDesc) ? e : '').length >= 10;
            },
          },
          treatedFileUrls: {
            message: '请上传复诊凭证',
            validate: () => {
              var e;
              return (
                (null != (e = d.value.treatedFileUrls) ? e : []).length > 0
              );
            },
          },
          treatedHospital: {
            message: '请输入首诊机构',
            validate: () => !!d.value.treatedHospital,
          },
          treatedDate: {
            message: '请选择首诊时间',
            validate: () => !!d.value.treatedDate,
          },
          treatedDiagnosis: {
            message: '请输入首诊临床诊断',
            validate: () => !!d.value.treatedDiagnosis,
          },
          orgId: { message: '缺少机构信息', validate: () => !!d.value.orgId },
        },
        d = e.computed({
          get: () => n.modelValue,
          set(e) {
            i('update:modelValue', { ...n.modelValue, ...e });
          },
        }),
        u = e.ref(!1),
        s = e.computed(() =>
          u.value
            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24103110552863320190201240.png'
            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24103110533501794250201240.png'
        ),
        r = e.ref(!0),
        p = (a) => {
          const { age: t, month: l } = e.calculateAge(a);
          return e.formatPatientAge(t, l);
        },
        v = e.ref([]),
        c = e.computed(() => (u.value ? v.value : v.value.slice(0, 3))),
        m = async () => {
          var a;
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: t } = await e.requestPatientList();
            v.value = t;
            const l = n.modelValue.patientInfoId;
            (!l || (l && !v.value.find((e) => e.patientInfoId === l))) &&
              i('update:modelValue', {
                ...n.modelValue,
                patientInfoId:
                  null == (a = v.value[0]) ? void 0 : a.patientInfoId,
              }),
              v.value.length > 3 &&
                v.value.findIndex((e) => e.patientInfoId === l) > 2 &&
                (u.value = !0),
              v.value.length ||
                i('update:modelValue', { ...n.modelValue, patientInfoId: '' });
          } finally {
            e.index.hideLoading();
          }
        },
        g = e.ref(null),
        I = () => {
          var a;
          if (!n.modelValue.patientInfoId)
            return void e.index.showToast({
              title: '请选择就诊人',
              icon: 'none',
            });
          const t = v.value.find(
            (e) => e.patientInfoId === n.modelValue.patientInfoId
          );
          null == (a = g.value) ||
            a.openModal({
              content: `是否删除就诊人【${null == t ? void 0 : t.patientName}】?`,
              onConfirm: async () => {
                try {
                  e.index.showLoading({ title: '删除中…', mask: !0 }),
                    await e.requestDelPatientInfo({
                      patientInfoId: n.modelValue.patientInfoId,
                    }),
                    e.index.showToast({
                      title: '删除成功',
                      icon: 'none',
                      mask: !0,
                    }),
                    await m();
                } catch (a) {
                  e.index.hideLoading();
                }
              },
            });
        },
        h = (e) => {
          i('update:modelValue', { ...n.modelValue, treatedDiagnosis: e });
        },
        f = () => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['patient-detail'], {
            query: { navigationBarTitle: '添加就诊人' },
          });
        },
        x = e.ref(null),
        D = () => {
          var e;
          null == (e = x.value) || e.openPopup();
        };
      return (
        t({
          validate: async () => {
            for (const [, a] of Object.entries(o))
              if (a.validate && !a.validate())
                return (
                  e.index.showToast({ title: a.message, icon: 'none' }), !1
                );
            return await (async () => {
              var a, t, l;
              try {
                e.index.showLoading({ title: '识别中…', mask: !0 });
                const { data: n } = await e.requestOcrCheckTreatedFile({
                  orgId: null != (a = d.value.orgId) ? a : '',
                  treatedFileUrls:
                    null != (t = d.value.treatedFileUrls) ? t : '',
                });
                return (
                  !!n.passed ||
                  (null == (l = g.value) ||
                    l.openModal({
                      content: '复诊凭证异常，请重新上传',
                      showCancel: !1,
                      showConfirm: !0,
                    }),
                  !1)
                );
              } catch (n) {
                return e.index.hideLoading(), !1;
              } finally {
                e.index.hideLoading();
              }
            })();
          },
          pageOnLoad: () => {
            e.index.$on(e.REFRESH_PATIENT_LIST, () => {
              r.value = !0;
            });
          },
          pageOnShow: async () => {
            r.value ? await m() : (r.value = !0);
          },
          pageOnHide: () => {
            r.value = !1;
          },
        }),
        (a, t) =>
          e.e(
            { a: v.value.length > 0 },
            v.value.length > 0 ? { b: e.o(I) } : {},
            {
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24103110491128625600201233.png',
              d: e.o(f),
              e: v.value.length,
            },
            v.value.length
              ? e.e(
                  {
                    f: e.f(c.value, (a, t, l) =>
                      e.e(
                        { a: a.patientInfoId === d.value.patientInfoId },
                        a.patientInfoId === d.value.patientInfoId
                          ? {
                              b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24103110514200963190201233.png',
                            }
                          : {},
                        {
                          c: e.t(a.patientName),
                          d: e.t(e.unref(e.GenderDesc)[a.gender]),
                          e: e.t(p(a.birth)),
                          f: a.patientInfoId,
                          g: e.n(
                            a.patientInfoId === d.value.patientInfoId &&
                              'patient-active'
                          ),
                          h: e.o((e) => {
                            return (
                              (t = a.patientInfoId),
                              void i('update:modelValue', {
                                ...n.modelValue,
                                patientInfoId: t,
                              })
                            );
                            var t;
                          }, a.patientInfoId),
                        }
                      )
                    ),
                    g: v.value.length > 3,
                  },
                  v.value.length > 3
                    ? {
                        h: e.t(u.value ? '收起更多患者' : '展开更多患者'),
                        i: s.value,
                        j: e.o((e) => (u.value = !u.value)),
                      }
                    : {}
                )
              : {
                  k: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110515435305155760201233.png',
                  l: e.o(f),
                },
            {
              m: e.o((e) => (d.value.illDesc = e)),
              n: e.p({
                placeholder:
                  '请详细描述您的症状、疾病、用药史及想要获取的帮助（最少10个字）',
                modelValue: d.value.illDesc,
              }),
              o: e.o((e) => (d.value.treatedFileUrls = e)),
              p: e.p({ 'file-list': d.value.treatedFileUrls }),
              q: e.o((e) => (d.value.reportFileUrls = e)),
              r: e.p({ 'file-list': d.value.reportFileUrls }),
              s: d.value.treatedHospital,
              t: e.o((e) => (d.value.treatedHospital = e.detail.value)),
              v: e.o((e) => (d.value.treatedDate = e)),
              w: e.p({
                title: '首诊日期',
                placeholder: '请选择首诊日期',
                date: d.value.treatedDate,
              }),
              x: d.value.treatedDiagnosis,
            },
            d.value.treatedDiagnosis
              ? { y: e.t(d.value.treatedDiagnosis) }
              : {},
            {
              z: e.o(D),
              A: e.sr(g, '5e92470a-4', { k: 'modalRef' }),
              B: e.sr(x, '5e92470a-5', { k: 'diagnosisPopupRef' }),
              C: e.o(h),
            }
          )
      );
    },
  }),
  d = e._export_sfc(o, [['__scopeId', 'data-v-5e92470a']]);
wx.createComponent(d);
