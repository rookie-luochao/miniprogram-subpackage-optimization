'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('nut-picker') + e.resolveComponent('nut-popup'))();
}
Math ||
  (
    t +
    l +
    a +
    (() => '../../../node-modules/nutui-uniapp/components/picker/picker.js') +
    (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js') +
    i +
    n
  )();
const a = () => '../../components/DatePicker/index.js',
  n = () => '../../components/Modal/index.js',
  t = () => '../../components/Navbar/index.js',
  l = () => '../../components/Radio/index.js',
  i = () => '../../components/Textarea/index.js',
  o =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102515562443956060201240.png',
  r = e.defineComponent({
    __name: 'index',
    setup(a, { expose: n }) {
      const t = e.ref(!1),
        l = /^1[3456789]\d{9}$/,
        i =
          /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
        r = (a) => e.index.showToast({ icon: 'none', title: a }),
        u = e.ref('就诊人信息'),
        s = e.ref({
          isRealName: '',
          patientInfoId: '',
          patientName: '',
          idCardNo: '',
          gender: e.Gender.man,
          birth: '',
          relation: '',
          phone: '',
          weight: '',
          guardianName: '',
          guardianIdCardNo: '',
          historyOfSickness: e.Presence.None,
          sicknessDetail: '',
          historyOfFamilyGenetic: e.Presence.None,
          familyGeneticDetail: '',
          historyOfAllergy: e.Presence.None,
          allergyDetail: '',
          liver: e.HealthStatus.Normal,
          renal: e.HealthStatus.Normal,
          pregnancy: e.HealthStatus.Normal,
          age: null,
          month: null,
        }),
        v = (a, n) => {
          const t = s.value[n] ? `${s.value[n]},${a}` : a;
          t.length <= 200
            ? (s.value[n] = t)
            : e.index.showToast({
                title: '输入的文本不能超过200个字',
                icon: 'none',
              });
        },
        d = e.ref(!1),
        c = e.ref([]),
        p = ({ selectedValue: e }) => {
          (s.value.relation = e[0]), (d.value = !1);
        },
        f = e.ref(!1);
      e.watch(
        () => s.value.idCardNo,
        () => {
          const a = s.value.idCardNo;
          if (18 === a.length)
            if (i.test(a)) {
              s.value.gender =
                parseInt(a[16], 10) % 2 == 1 ? e.Gender.man : e.Gender.woman;
              const n = `${a.substring(6, 10)}-${a.substring(10, 12)}-${a.substring(12, 14)}`;
              (s.value.birth = e.dayjs(n).format('YYYY-MM-DD HH:mm:ss')),
                (f.value = !0);
            } else
              (s.value.birth = ''),
                (s.value.gender = ''),
                (f.value = !1),
                r('请输入正确的患者身份证号');
          else f.value = !1;
        }
      ),
        e.watch(
          () => s.value.weight,
          () => {
            const { weight: e, age: a } = s.value,
              n = Number(e);
            if ((!a && 0 !== a) || a > 14) return;
            if ('number' != typeof n || isNaN(n)) return r('请输入正确的数字');
            return n !== Math.round(100 * n) / 100
              ? r('请保留两位小数')
              : n <= 0
                ? r('体重请大于0')
                : n > 999
                  ? r('体重请小于999')
                  : void 0;
          }
        ),
        e.watch(
          () => s.value.birth,
          () => {
            const { age: a, month: n } = e.calculateAge(s.value.birth);
            (s.value.age = a), (s.value.month = n);
          }
        );
      const m = async () => {
          const {
            patientName: a,
            idCardNo: n,
            gender: o,
            birth: u,
            relation: v,
            phone: d,
            weight: c,
            guardianName: p,
            guardianIdCardNo: f,
            historyOfSickness: m,
            sicknessDetail: h,
            historyOfFamilyGenetic: g,
            familyGeneticDetail: y,
            historyOfAllergy: N,
            allergyDetail: O,
            age: b,
            month: k,
          } = s.value;
          if (!a) return r('请输入患者姓名');
          if (!n) return r('请输入患者身份证号');
          if (!i.test(n) || 18 !== n.length)
            return r('请输入正确的患者身份证号');
          if (!o) return r('请选择性别');
          if (!u) return r('请选择出生日期');
          if (!v) return r('请选择与本人关系');
          if (!l.test(d)) return r('请输入正确的手机号');
          if ((b && b < 14) || (0 === b && k)) {
            if (!c && '0' !== c) return r('请输入体重');
            const e = Number(c);
            if (isNaN(e)) return r('请输入正确的数字');
            if (e !== Math.round(100 * e) / 100) return r('请保留两位小数');
            if (e <= 0) return r('体重请大于0');
            if (e > 999) return r('体重请小于999');
          }
          if ((b && b < 6) || (0 === b && k)) {
            if (!p) return r('请输入监护人姓名');
            if (!f) return r('请输入监护人身份证号码');
            if (!i.test(f) || 18 !== f.length)
              return r('请输入正确的监护人身份证号');
          }
          if (m === e.Presence.Has && !h) return r('请输入过往史详情');
          if (g === e.Presence.Has && !y) return r('请输入家族史详情');
          if (N === e.Presence.Has && !O) return r('请输入过敏史详情');
          const w = t.value
            ? e.requestEditPatientInfo
            : e.requestAddPatientInfo;
          try {
            e.index.showLoading({ title: '保存中…', mask: !0 }),
              await w(s.value),
              e.index.showToast({ title: '保存成功', icon: 'none', mask: !0 }),
              e.index.$emit(e.REFRESH_PATIENT_LIST),
              setTimeout(() => {
                e.index.hideToast(), e.appNavigator.navigateBack();
              }, 1500);
          } catch (x) {
            e.index.hideLoading();
          }
        },
        h = e.ref(null),
        g = () => {
          var a, n;
          null == (n = h.value) ||
            n.openModal({
              content: `是否删除就诊人【${null == (a = s.value) ? void 0 : a.patientName}】?`,
              confirmText: '删除',
              onConfirm: async () => {
                e.index.showLoading({ title: '删除中…', mask: !0 }),
                  await e.requestDelPatientInfo({
                    patientInfoId: s.value.patientInfoId,
                  }),
                  e.index.showToast({
                    title: '删除成功',
                    icon: 'none',
                    mask: !0,
                  }),
                  setTimeout(() => {
                    e.index.hideToast(), e.appNavigator.navigateBack();
                  }, 1500);
              },
            });
        };
      return (
        n({
          pageOnShow: () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (e) => {
            (u.value = e.navigationBarTitle),
              e.patientInfo &&
                ((t.value = !0),
                (s.value = JSON.parse(decodeURIComponent(e.patientInfo))));
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, n) =>
          e.e(
            {
              a: e.sr('navbarRef', '8b8fa718-0'),
              b: e.p({ title: u.value }),
              c: o,
              d: o,
              e: t.value,
            },
            t.value
              ? {
                  f: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110419244214565720201240.png',
                  g: e.o(g),
                }
              : {},
            {
              h: s.value.isRealName === e.unref(e.RealStatus).Real ? 1 : '',
              i: s.value.isRealName === e.unref(e.RealStatus).Real,
              j: s.value.patientName,
              k: e.o(
                e.m((e) => (s.value.patientName = e.detail.value), { trim: !0 })
              ),
              l: s.value.isRealName === e.unref(e.RealStatus).Real ? 1 : '',
              m: s.value.isRealName === e.unref(e.RealStatus).Real,
              n: s.value.idCardNo,
              o: e.o(
                e.m((e) => (s.value.idCardNo = e.detail.value), { trim: !0 })
              ),
              p: e.o((e) => (s.value.gender = e)),
              q: e.p({
                disabled: f.value,
                options: e.unref(e.genderOptions),
                value: s.value.gender,
              }),
              r: e.o((e) => (s.value.birth = e)),
              s: e.p({
                disabled: f.value,
                title: '出生日期',
                placeholder: '请选择出生日期',
                date: s.value.birth,
              }),
              t: s.value.relation,
            },
            s.value.relation ? { v: e.t(s.value.relation) } : {},
            {
              w: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102809300973943750201233.png',
              x: e.o((e) => (d.value = !0)),
              y: e.o(p),
              z: e.o((e) => (d.value = !1)),
              A: e.o((e) => (c.value = e)),
              B: e.p({
                title: '与本人关系',
                columns: e.unref(e.relationList),
                modelValue: c.value,
              }),
              C: e.o((e) => (d.value = e)),
              D: e.p({ position: 'bottom', round: !0, visible: d.value }),
              E: s.value.phone,
              F: e.o(
                e.m((e) => (s.value.phone = e.detail.value), { trim: !0 })
              ),
              G: null !== s.value.age && s.value.age < 14,
            },
            null !== s.value.age && s.value.age < 14
              ? {
                  H: s.value.weight,
                  I: e.o(
                    e.m((e) => (s.value.weight = e.detail.value), { trim: !0 })
                  ),
                }
              : {},
            { J: null !== s.value.age && s.value.age < 6 },
            null !== s.value.age && s.value.age < 6
              ? {
                  K: s.value.guardianName,
                  L: e.o(
                    e.m((e) => (s.value.guardianName = e.detail.value), {
                      trim: !0,
                    })
                  ),
                  M: s.value.guardianIdCardNo,
                  N: e.o(
                    e.m((e) => (s.value.guardianIdCardNo = e.detail.value), {
                      trim: !0,
                    })
                  ),
                }
              : {},
            {
              O: o,
              P: o,
              Q: e.o((e) => (s.value.historyOfSickness = e)),
              R: e.p({
                options: e.unref(e.presenceOptions),
                value: s.value.historyOfSickness,
              }),
              S: s.value.historyOfSickness === e.unref(e.Presence).Has,
            },
            s.value.historyOfSickness === e.unref(e.Presence).Has
              ? {
                  T: e.f(e.unref(e.medicalHistoryOptions), (a, n, t) => ({
                    a: e.t(a),
                    b: a,
                    c: e.o((e) => v(a, 'sicknessDetail'), a),
                  })),
                  U: e.o((e) => (s.value.sicknessDetail = e)),
                  V: e.p({
                    height: 70,
                    placeholder: '请输入过往史详情',
                    modelValue: s.value.sicknessDetail,
                  }),
                }
              : {},
            {
              W: e.o((e) => (s.value.historyOfAllergy = e)),
              X: e.p({
                options: e.unref(e.presenceOptions),
                value: s.value.historyOfAllergy,
              }),
              Y: s.value.historyOfAllergy === e.unref(e.Presence).Has,
            },
            s.value.historyOfAllergy === e.unref(e.Presence).Has
              ? {
                  Z: e.f(e.unref(e.allergyOptions), (a, n, t) => ({
                    a: e.t(a),
                    b: a,
                    c: e.o((e) => v(a, 'allergyDetail'), a),
                  })),
                  aa: e.o((e) => (s.value.allergyDetail = e)),
                  ab: e.p({
                    height: 70,
                    placeholder: '请输入过敏史详情',
                    modelValue: s.value.allergyDetail,
                  }),
                }
              : {},
            {
              ac: e.o((e) => (s.value.historyOfFamilyGenetic = e)),
              ad: e.p({
                options: e.unref(e.presenceOptions),
                value: s.value.historyOfFamilyGenetic,
              }),
              ae: s.value.historyOfFamilyGenetic === e.unref(e.Presence).Has,
            },
            s.value.historyOfFamilyGenetic === e.unref(e.Presence).Has
              ? {
                  af: e.f(e.unref(e.familyHistoryOptions), (a, n, t) => ({
                    a: e.t(a),
                    b: a,
                    c: e.o((e) => v(a, 'familyGeneticDetail'), a),
                  })),
                  ag: e.o((e) => (s.value.familyGeneticDetail = e)),
                  ah: e.p({
                    height: 70,
                    placeholder: '请输入家族史详情',
                    modelValue: s.value.familyGeneticDetail,
                  }),
                }
              : {},
            {
              ai: e.o((e) => (s.value.liver = e)),
              aj: e.p({
                options: e.unref(e.healthStatusOptions),
                value: s.value.liver,
              }),
              ak: e.o((e) => (s.value.renal = e)),
              al: e.p({
                options: e.unref(e.healthStatusOptions),
                value: s.value.renal,
              }),
              am: s.value.gender === e.unref(e.Gender).woman,
            },
            s.value.gender === e.unref(e.Gender).woman
              ? {
                  an: e.o((e) => (s.value.pregnancy = e)),
                  ao: e.p({
                    options: e.unref(e.pregnancyOptions),
                    value: s.value.pregnancy,
                  }),
                }
              : {},
            { ap: e.o(m), aq: e.sr(h, '8b8fa718-14', { k: 'modalRef' }) }
          )
      );
    },
  }),
  u = e._export_sfc(r, [['__scopeId', 'data-v-8b8fa718']]);
wx.createComponent(u);
