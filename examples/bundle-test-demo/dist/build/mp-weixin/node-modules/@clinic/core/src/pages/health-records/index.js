'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (n + i + u + t)();
const n = () => '../../components/Navbar/index.js',
  i = () => '../../components/Picker/index.js',
  u = () => './components/Range/index.js',
  t = () => './components/SelectTag/index.js',
  a = e.defineComponent({
    __name: 'index',
    setup(n, { expose: i }) {
      const u = async (n, i) => {
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: u } = await e.requestGetPatientHealthRecords({
              patientInfoId: n,
            });
            (t.value = u), (t.value.patientInfoId = n), (t.value.groupImId = i);
          } finally {
            e.index.hideLoading();
          }
        },
        t = e.ref({
          groupImId: '',
          patientInfoId: '',
          exerciseFrequency: '',
          exerciseDuration: 0.5,
          smokingFrequency: '',
          smokingPreference: '',
          cigaretteFrequency: 1,
          electronicCigaretteFrequency: 0.5,
          smokingYear: 1,
          drinkingFrequency: '',
          drinkingPreference: '',
          beerConsumption: 50,
          baijiuConsumption: 50,
          redWineConsumption: 50,
          otherConsumption: 50,
          tastePreference: '',
          grainIntake: 5,
          fruitsIntake: 5,
          meatIntake: 5,
          snackIntake: 5,
          pickleIntake: 5,
        }),
        a = async () => {
          const {
            exerciseFrequency: n,
            smokingFrequency: i,
            smokingPreference: u,
            drinkingPreference: a,
            drinkingFrequency: r,
            tastePreference: l,
          } = t.value;
          if (!n)
            return e.index.showToast({ title: '请选择是否运动', icon: 'none' });
          if (!i)
            return e.index.showToast({ title: '请选择是否吸烟', icon: 'none' });
          if (i && !['从不', '已戒'].includes(i) && !u)
            return e.index.showToast({ title: '请选择吸烟类型', icon: 'none' });
          if (!r)
            return e.index.showToast({ title: '请选择是否饮酒', icon: 'none' });
          if (r && !['从不', '已戒'].includes(r) && !a)
            return e.index.showToast({ title: '请选择偏好酒类', icon: 'none' });
          if (!l)
            return e.index.showToast({ title: '请选择口味偏好', icon: 'none' });
          try {
            e.index.showLoading({ title: '提交中…', mask: !0 }),
              await e.requestAddPatientHealthRecords({ ...t.value }),
              e.index.showToast({ title: '提交成功', icon: 'none', mask: !0 }),
              setTimeout(() => {
                e.index.hideToast(), e.appNavigator.navigateBack();
              }, 1500);
          } catch (o) {
            e.index.hideLoading();
          }
        };
      return (
        i({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: async (n) => {
            n.patientInfoId && n.groupImId
              ? await u(n.patientInfoId, n.groupImId)
              : e.index.showToast({ title: '就诊人信息不存在', icon: 'none' });
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (n, i) => {
          var u, r, l, o, c, s, v, d, m, g, p, k;
          return e.e(
            {
              a: e.sr('navbarRef', '8cf00e4c-0'),
              b: e.p({ title: '健康档案' }),
              c: e.o((e) => (t.value.exerciseFrequency = e)),
              d: e.p({
                title: '是否运动',
                columns: e.unref(e.exerciseFrequencyColumn),
                value: t.value.exerciseFrequency,
              }),
              e:
                t.value.exerciseFrequency &&
                !['不运动'].includes(t.value.exerciseFrequency),
            },
            t.value.exerciseFrequency &&
              !['不运动'].includes(t.value.exerciseFrequency)
              ? {
                  f: e.o((e) => (t.value.exerciseDuration = e)),
                  g: e.p({
                    title: '运动时长',
                    unit: 'h',
                    step: '0.5',
                    min: '0.5',
                    max: '10',
                    value: t.value.exerciseDuration,
                  }),
                }
              : {},
            {
              h: e.o((e) => (t.value.smokingFrequency = e)),
              i: e.p({
                title: '是否吸烟',
                columns: e.unref(e.smokingFrequencyColumn),
                value: t.value.smokingFrequency,
              }),
              j:
                t.value.smokingFrequency &&
                !['从不', '已戒'].includes(t.value.smokingFrequency),
            },
            t.value.smokingFrequency &&
              !['从不', '已戒'].includes(t.value.smokingFrequency)
              ? e.e(
                  {
                    k: e.o((e) => (t.value.smokingPreference = e)),
                    l: e.p({
                      title: '吸烟类型',
                      columns: e.unref(e.smokingPreferenceColumn),
                      value: t.value.smokingPreference,
                    }),
                    m:
                      null == (u = t.value.smokingPreference)
                        ? void 0
                        : u.includes('纸烟'),
                  },
                  (
                    null == (r = t.value.smokingPreference)
                      ? void 0
                      : r.includes('纸烟')
                  )
                    ? {
                        n: e.o((e) => (t.value.cigaretteFrequency = e)),
                        o: e.p({
                          title: '纸烟频次',
                          unit: '根/天',
                          step: '1',
                          min: '1',
                          max: '100',
                          value: t.value.cigaretteFrequency,
                        }),
                      }
                    : {},
                  {
                    p:
                      null == (l = t.value.smokingPreference)
                        ? void 0
                        : l.includes('电子烟'),
                  },
                  (
                    null == (o = t.value.smokingPreference)
                      ? void 0
                      : o.includes('电子烟')
                  )
                    ? {
                        q: e.o(
                          (e) => (t.value.electronicCigaretteFrequency = e)
                        ),
                        r: e.p({
                          title: '电子烟频次',
                          unit: '烟弹/周',
                          step: '0.5',
                          min: '0.5',
                          max: '10',
                          value: t.value.electronicCigaretteFrequency,
                        }),
                      }
                    : {},
                  {
                    s: e.o((e) => (t.value.smokingYear = e)),
                    t: e.p({
                      title: '吸烟年限',
                      unit: '年',
                      step: '1',
                      min: '1',
                      max: '100',
                      value: t.value.smokingYear,
                    }),
                  }
                )
              : {},
            {
              v: e.o((e) => (t.value.drinkingFrequency = e)),
              w: e.p({
                title: '是否饮酒',
                columns: e.unref(e.drinkingFrequencyColumn),
                value: t.value.drinkingFrequency,
              }),
              x:
                t.value.drinkingFrequency &&
                !['从不', '已戒'].includes(t.value.drinkingFrequency),
            },
            t.value.drinkingFrequency &&
              !['从不', '已戒'].includes(t.value.drinkingFrequency)
              ? e.e(
                  {
                    y: e.o((e) => (t.value.drinkingPreference = e)),
                    z: e.p({
                      title: '偏好酒类',
                      columns: e.unref(e.drinkingPreferenceColumn),
                      value: t.value.drinkingPreference,
                    }),
                    A:
                      null == (c = t.value.drinkingPreference)
                        ? void 0
                        : c.includes('啤酒'),
                  },
                  (
                    null == (s = t.value.drinkingPreference)
                      ? void 0
                      : s.includes('啤酒')
                  )
                    ? {
                        B: e.o((e) => (t.value.beerConsumption = e)),
                        C: e.p({
                          title: '啤酒',
                          unit: 'ml/次',
                          step: '50',
                          min: '50',
                          max: '2000',
                          value: t.value.beerConsumption,
                        }),
                      }
                    : {},
                  {
                    D:
                      null == (v = t.value.drinkingPreference)
                        ? void 0
                        : v.includes('白酒'),
                  },
                  (
                    null == (d = t.value.drinkingPreference)
                      ? void 0
                      : d.includes('白酒')
                  )
                    ? {
                        E: e.o((e) => (t.value.baijiuConsumption = e)),
                        F: e.p({
                          title: '白酒',
                          unit: 'ml/次',
                          step: '50',
                          min: '50',
                          max: '2000',
                          value: t.value.baijiuConsumption,
                        }),
                      }
                    : {},
                  {
                    G:
                      null == (m = t.value.drinkingPreference)
                        ? void 0
                        : m.includes('红酒'),
                  },
                  (
                    null == (g = t.value.drinkingPreference)
                      ? void 0
                      : g.includes('红酒')
                  )
                    ? {
                        H: e.o((e) => (t.value.redWineConsumption = e)),
                        I: e.p({
                          title: '红酒',
                          unit: 'ml/次',
                          step: '50',
                          min: '50',
                          max: '2000',
                          value: t.value.redWineConsumption,
                        }),
                      }
                    : {},
                  {
                    J:
                      null == (p = t.value.drinkingPreference)
                        ? void 0
                        : p.includes('其他'),
                  },
                  (
                    null == (k = t.value.drinkingPreference)
                      ? void 0
                      : k.includes('其他')
                  )
                    ? {
                        K: e.o((e) => (t.value.otherConsumption = e)),
                        L: e.p({
                          title: '其他',
                          unit: 'ml/次',
                          step: '50',
                          min: '50',
                          max: '2000',
                          value: t.value.otherConsumption,
                        }),
                      }
                    : {}
                )
              : {},
            {
              M: e.o((e) => (t.value.tastePreference = e)),
              N: e.p({
                title: '口味偏好',
                columns: e.unref(e.tastePreferenceColumn),
                value: t.value.tastePreference,
              }),
              O: t.value.tastePreference,
            },
            t.value.tastePreference
              ? {
                  P: e.o((e) => (t.value.grainIntake = e)),
                  Q: e.p({
                    title: '谷物摄入量',
                    unit: 'g/天',
                    step: '5',
                    min: '5',
                    max: '2000',
                    value: t.value.grainIntake,
                  }),
                  R: e.o((e) => (t.value.fruitsIntake = e)),
                  S: e.p({
                    title: '蔬果摄入量',
                    unit: 'g/天',
                    step: '5',
                    min: '5',
                    max: '2000',
                    value: t.value.fruitsIntake,
                  }),
                  T: e.o((e) => (t.value.meatIntake = e)),
                  U: e.p({
                    title: '肉类摄入量',
                    unit: 'g/天',
                    step: '5',
                    min: '5',
                    max: '2000',
                    value: t.value.meatIntake,
                  }),
                  V: e.o((e) => (t.value.snackIntake = e)),
                  W: e.p({
                    title: '零食摄入量',
                    unit: 'g/天',
                    step: '5',
                    min: '5',
                    max: '2000',
                    value: t.value.snackIntake,
                  }),
                  X: e.o((e) => (t.value.pickleIntake = e)),
                  Y: e.p({
                    title: '腌制品摄入量',
                    unit: 'g/天',
                    step: '5',
                    min: '5',
                    max: '2000',
                    value: t.value.pickleIntake,
                  }),
                }
              : {},
            { Z: e.o(a) }
          );
        }
      );
    },
  }),
  r = e._export_sfc(a, [['__scopeId', 'data-v-8cf00e4c']]);
wx.createComponent(r);
