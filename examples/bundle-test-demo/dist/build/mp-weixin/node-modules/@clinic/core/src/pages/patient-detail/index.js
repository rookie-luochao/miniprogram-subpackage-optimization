'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (
    e.resolveComponent('nut-radio') +
    e.resolveComponent('nut-radio-group') +
    e.resolveComponent('nut-date-picker') +
    e.resolveComponent('nut-popup') +
    e.resolveComponent('nut-picker') +
    e.resolveComponent('nut-cascader')
  )();
}
Math ||
  (
    (() => '../../../node-modules/nutui-uniapp/components/radio/radio.js') +
    (() =>
      '../../../node-modules/nutui-uniapp/components/radiogroup/radiogroup.js') +
    (() =>
      '../../../node-modules/nutui-uniapp/components/datepicker/datepicker.js') +
    (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js') +
    (() => '../../../node-modules/nutui-uniapp/components/picker/picker.js') +
    (() => '../../../node-modules/nutui-uniapp/components/cascader/cascader.js')
  )();
const a =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24070910445149098420201240.png',
  l = e.defineComponent({
    __name: 'index',
    setup(l, { expose: u }) {
      const o = e.useUserInfoStore(),
        { userInfo: t } = e.storeToRefs(o),
        n = /^1[3456789]\d{9}$/,
        i =
          /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
        r = (a) => e.index.showToast({ icon: 'none', title: a }),
        v = e.ref({
          keyID: '',
          familyName: '',
          idNumber: '',
          sex: null,
          weight: 0,
          birthDay: '',
          age: null,
          month: null,
          phone: '',
          relationCode: '',
          relationName: '',
          province: '',
          provinceCode: '',
          city: '',
          cityCode: '',
          area: '',
          areaCode: '',
          illness: !1,
          illnessDesc: '',
          allergy: !1,
          allergyDesc: '',
          inherit: !1,
          inheritDesc: '',
          liver: !1,
          liverDesc: '',
          kidney: !1,
          kidneyDesc: '',
          pregnancy: !1,
          pregnancyDecs: '否',
          orgPersonHealths: [],
        }),
        s = e.ref(!1),
        d = e.ref(!1),
        c = async (a, l) => {
          var u, o, t, n, i, r;
          const { data: s } = await e.requestGetOrgPersonFamilyInfo({
            orgID: l,
            keyID: a,
          });
          s.isInsuranceUser === e.IsMedicalAuthPatient.YES && (d.value = !0);
          const c = (e) => s.orgPersonHealths.find((a) => a.docItemCode === e),
            p = c('ILLNESS'),
            m = c('ALLERGY'),
            y = c('INHERIT'),
            h = c('LIVER'),
            g = c('KIDNEY'),
            f = c('PREGNANCY');
          (v.value = {
            ...s,
            age: null,
            month: null,
            illness: '有' === (null == p ? void 0 : p.docItemValue),
            illnessDesc:
              null != (u = null == p ? void 0 : p.docItemDesc) ? u : '',
            allergy: '有' === (null == m ? void 0 : m.docItemValue),
            allergyDesc:
              null != (o = null == m ? void 0 : m.docItemDesc) ? o : '',
            inherit: '有' === (null == y ? void 0 : y.docItemValue),
            inheritDesc:
              null != (t = null == y ? void 0 : y.docItemDesc) ? t : '',
            liver: '异常' === (null == h ? void 0 : h.docItemValue),
            liverDesc:
              null != (n = null == h ? void 0 : h.docItemDesc) ? n : '',
            kidney: '异常' === (null == g ? void 0 : g.docItemValue),
            kidneyDesc:
              null != (i = null == g ? void 0 : g.docItemDesc) ? i : '',
            pregnancy: '否' !== (null == f ? void 0 : f.docItemValue),
            pregnancyDecs:
              null != (r = null == f ? void 0 : f.docItemDesc) ? r : '',
          }),
            (V.value = `${s.province}${s.city}${s.area}`);
        };
      e.watch(
        () => v.value.weight,
        () => {
          const e = v.value.age;
          if ((!e && 'number' != typeof e) || e > 14) return;
          const a = Number(v.value.weight);
          if ('number' != typeof a || isNaN(a)) return r('请输入正确的数字');
          return a !== Math.round(100 * a) / 100
            ? r('请保留两位小数')
            : a <= 0
              ? r('体重请大于0')
              : a > 999
                ? r('体重请小于999')
                : void 0;
        }
      );
      const p = e.ref(!0);
      e.watch(
        () => v.value.idNumber,
        () => {
          const e = v.value.idNumber;
          if (18 === e.length)
            if (i.test(e)) {
              v.value.sex = parseInt(e[16], 10) % 2 == 1 ? 1 : 2;
              const a = `${e.substring(6, 10)}-${e.substring(10, 12)}-${e.substring(12, 14)}`;
              (v.value.birthDay = a), (p.value = !1);
            } else
              (v.value.birthDay = ''),
                (v.value.sex = null),
                (p.value = !0),
                r('请输入合法的身份证号');
          else p.value = !0;
        }
      ),
        e.watch(
          () => v.value.birthDay,
          () => {
            const { age: a, month: l } = e.calculateAge(v.value.birthDay);
            (v.value.age = a), (v.value.month = l);
          }
        );
      const m = e.ref(!1),
        y = e.ref(),
        h = ({ selectedValue: a }) => {
          (v.value.birthDay = e.dayjs(a.join('-')).format('YYYY-MM-DD')),
            (m.value = !1);
        },
        g = () => {
          p.value && (m.value = !0);
        },
        f = e.ref([]),
        D = async () => {
          const { data: a } = await e.requestQuerySysDictByCode({
            groupCode: 'PERSON_RELATION',
            systemCode: 'INQUIRY',
          });
          f.value = a.map((e) => ({ text: e.dictName, value: e.dictCode }));
        },
        b = e.ref(!1),
        I = e.ref([]),
        N = ({ selectedValue: e }) => {
          var a, l, u, o;
          (v.value.relationName =
            null !=
            (l =
              null == (a = f.value.find((a) => a.value === e[0]))
                ? void 0
                : a.text)
              ? l
              : ''),
            (v.value.relationCode =
              null !=
              (o =
                null == (u = f.value.find((a) => a.value === e[0]))
                  ? void 0
                  : u.value)
                ? o
                : ''),
            (b.value = !1);
        },
        C = () => {
          d.value || (b.value = !0);
        },
        x = e.ref([]),
        k = async () => {
          const { data: a } = await e.requestGetCity();
          x.value = a;
        },
        w = e.ref(!1),
        V = e.ref(''),
        E = e.ref(['']),
        L = (e, a) => {
          const [l, u, o] = a;
          (V.value = l.text + u.text + o.text),
            (v.value.province = l.text),
            (v.value.provinceCode = l.value),
            (v.value.city = u.text),
            (v.value.cityCode = u.value),
            (v.value.area = o.text),
            (v.value.areaCode = o.value);
        },
        P = e.ref([
          { text: '否', value: 0 },
          { text: '备孕', value: 1 },
          { text: '妊娠', value: 2 },
          { text: '哺乳', value: 3 },
        ]),
        S = e.ref(!1),
        R = e.ref([]),
        Y = ({ selectedValue: e }) => {
          var a, l;
          (v.value.pregnancy = !0),
            (v.value.pregnancyDecs =
              null !=
              (l =
                null == (a = P.value.find((a) => a.value === e[0]))
                  ? void 0
                  : a.text)
                ? l
                : ''),
            (S.value = !1);
        },
        A = async () => {
          var a, l, u;
          const {
            keyID: o,
            familyName: c,
            idNumber: p,
            sex: m,
            birthDay: y,
            age: h,
            month: g,
            weight: f,
            phone: D,
            relationName: b,
            relationCode: I,
            province: N,
            provinceCode: C,
            city: x,
            cityCode: k,
            area: w,
            areaCode: V,
            illness: E,
            illnessDesc: L,
            allergy: P,
            allergyDesc: S,
            inherit: R,
            inheritDesc: Y,
            liver: A,
            kidney: j,
            pregnancy: G,
            pregnancyDecs: M,
            orgPersonHealths: O,
          } = v.value;
          if (!c) return r('请填写患者姓名');
          if (!p) return r('请填写身份证号');
          if (!i.test(p) || 18 !== p.length)
            return r('请填写正确的18位身份证号码');
          if (!n.test(D)) return r('请填写正确的手机号');
          if (!I) return r('请选择与本人关系');
          if (!m) return r('请选择性别');
          if (!y) return r('请选择出生日期');
          if ((h && h < 14) || (0 === h && g)) {
            if (!f && 0 !== f) return r('请输入体重');
            const e = Number(f);
            if (isNaN(e)) return r('请输入正确的数字');
            if (e !== Math.round(100 * e) / 100) return r('请保留两位小数');
            if (e <= 0) return r('体重请大于0');
            if (e > 999) return r('体重请小于999');
          }
          if (E && !L) return r('请输入既往病史描述');
          if (P && !S) return r('请输入过敏史描述');
          if (R && !Y) return r('请输入家族遗传史描述');
          if (R && !Y) return r('请输入家族遗传史描述');
          const T = {
              orgID: null == (a = t.value) ? void 0 : a.orgID,
              orgCode: null == (l = t.value) ? void 0 : l.orgCode,
              orgPersonUserID: null == (u = t.value) ? void 0 : u.keyID,
            },
            _ = (e) => {
              var a, l;
              return null !=
                (l =
                  null == (a = O.find((a) => a.docItemCode === e))
                    ? void 0
                    : a.keyID)
                ? l
                : '';
            },
            z = (e, a, l, u) => {
              const o = 'LIVER' === e || 'KIDNEY' === e,
                t = 'PREGNANCY' === e;
              let n = '无';
              return (
                o && (n = u ? '异常' : '正常'),
                t && (n = '否' !== l ? '有' : '无'),
                o || t || (n = u ? '有' : '无'),
                {
                  ...T,
                  keyID: s.value ? _(e) : '',
                  belongType: 'Self' === I ? 0 : 1,
                  docGroupCode: 'D_PERSON_DOCS_SICKNESS',
                  docGroupName: '疾病史',
                  docItemCode: e,
                  docItemName: a,
                  docItemDesc: t ? M : u ? l : '',
                  docItemValue: n,
                }
              );
            },
            H = [
              z('ILLNESS', '既往病史', L, E),
              z('ALLERGY', '过敏史', S, P),
              z('INHERIT', '家族遗传史', Y, R),
              z('LIVER', '肝功能异常', '', A),
              z('KIDNEY', '肾功能异常', '', j),
              z('PREGNANCY', '妊娠哺乳', M, G),
            ],
            $ = d.value
              ? e.IsMedicalAuthPatient.YES
              : e.IsMedicalAuthPatient.NO,
            q = {
              orgPersonFamily: {
                ...T,
                keyID: o,
                familyName: c,
                idNumber: p,
                phone: D,
                relationCode: I,
                relationName: b,
                weight: f,
                sex: m,
                birthDay: y,
                province: N,
                provinceCode: C,
                city: x,
                cityCode: k,
                area: w,
                areaCode: V,
                isInsuranceUser: $,
              },
              orgPersonHealth: H,
            };
          try {
            e.index.showLoading({ title: '保存中…', mask: !0 }),
              await e.requestAddOrgPersonFamily(q),
              e.index.showToast({ title: '保存成功', icon: 'none', mask: !0 }),
              setTimeout(() => {
                e.index.hideToast(), e.appNavigator.navigateBack();
              }, 1500);
          } catch (F) {
            e.index.hideLoading();
          }
        };
      return (
        u({
          pageOnLoad: async ({
            keyID: a,
            orgID: l,
            familyName: u,
            idNumber: o,
          }) => {
            try {
              e.index.showLoading({ title: '加载中…', mask: !0 }),
                await k(),
                await D(),
                a && l && ((s.value = !0), await c(a, l)),
                u &&
                  o &&
                  ((d.value = !0),
                  (v.value.familyName = u),
                  (v.value.idNumber = o),
                  (v.value.relationCode = 'Self'),
                  (v.value.relationName = '本人'));
            } finally {
              e.index.hideLoading();
            }
          },
        }),
        (l, u) =>
          e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692822001/24031109591683122810201240.png',
              b: e.n(d.value ? 'input-disabled' : ''),
              c: d.value,
              d: v.value.familyName,
              e: e.o((e) => (v.value.familyName = e.detail.value)),
              f: e.n(d.value ? 'input-disabled' : ''),
              g: d.value,
              h: v.value.idNumber,
              i: e.o((e) => (v.value.idNumber = e.detail.value)),
              j: e.p({ label: 1, disabled: !p.value }),
              k: e.p({ label: 2, disabled: !p.value }),
              l: e.o((e) => (v.value.sex = e)),
              m: e.p({ direction: 'horizontal', modelValue: v.value.sex }),
              n: v.value.birthDay,
            },
            v.value.birthDay
              ? {
                  o: e.t(v.value.birthDay),
                  p: e.n(p.value ? '' : 'value-disabled'),
                }
              : {},
            {
              q: a,
              r: e.o(g),
              s: e.o(h),
              t: e.o((e) => (m.value = !1)),
              v: e.o((e) => (y.value = e)),
              w: e.p({
                'min-date': e.unref(e.dayjs)('1900-01-01'),
                'max-date': e.unref(e.dayjs)(),
                formatter: e.unref(e.pickerDateFormatter),
                modelValue: y.value,
              }),
              x: e.o((e) => (m.value = e)),
              y: e.p({ position: 'bottom', visible: m.value }),
              z: null !== v.value.age && v.value.age < 14,
            },
            null !== v.value.age && v.value.age < 14
              ? {
                  A: v.value.weight,
                  B: e.o((e) => (v.value.weight = e.detail.value)),
                }
              : {},
            {
              C: v.value.phone,
              D: e.o((e) => (v.value.phone = e.detail.value)),
              E: v.value.relationName,
            },
            v.value.relationName
              ? {
                  F: e.t(v.value.relationName),
                  G: e.n(d.value ? 'value-disabled' : ''),
                }
              : {},
            {
              H: a,
              I: e.o(C),
              J: e.o(N),
              K: e.o((e) => (b.value = !1)),
              L: e.o((e) => (I.value = e)),
              M: e.p({ columns: f.value, modelValue: I.value }),
              N: e.o((e) => (b.value = e)),
              O: e.p({ position: 'bottom', visible: b.value }),
              P: V.value,
            },
            V.value ? { Q: e.t(V.value) } : {},
            {
              R: a,
              S: e.o((e) => (w.value = !0)),
              T: e.o(L),
              U: e.o((e) => (w.value = e)),
              V: e.o((e) => (E.value = e)),
              W: e.p({
                'title-ellipsis': !1,
                title: '地址选择',
                'text-key': 'label',
                'value-key': 'value',
                options: x.value,
                visible: w.value,
                modelValue: E.value,
              }),
              X: e.p({ label: !1 }),
              Y: e.p({ label: !0 }),
              Z: e.o((e) => (v.value.illness = e)),
              aa: e.p({ direction: 'horizontal', modelValue: v.value.illness }),
              ab: v.value.illness,
            },
            v.value.illness
              ? {
                  ac: v.value.illnessDesc,
                  ad: e.o(
                    e.m((e) => (v.value.illnessDesc = e.detail.value), {
                      trim: !0,
                    })
                  ),
                }
              : {},
            {
              ae: e.n(v.value.illness ? 'card-detail' : ''),
              af: e.p({ label: !1 }),
              ag: e.p({ label: !0 }),
              ah: e.o((e) => (v.value.allergy = e)),
              ai: e.p({ direction: 'horizontal', modelValue: v.value.allergy }),
              aj: v.value.allergy,
            },
            v.value.allergy
              ? {
                  ak: v.value.allergyDesc,
                  al: e.o(
                    e.m((e) => (v.value.allergyDesc = e.detail.value), {
                      trim: !0,
                    })
                  ),
                }
              : {},
            {
              am: e.n(v.value.allergy ? 'card-detail' : ''),
              an: e.p({ label: !1 }),
              ao: e.p({ label: !0 }),
              ap: e.o((e) => (v.value.inherit = e)),
              aq: e.p({ direction: 'horizontal', modelValue: v.value.inherit }),
              ar: v.value.inherit,
            },
            v.value.inherit
              ? {
                  as: v.value.inheritDesc,
                  at: e.o(
                    e.m((e) => (v.value.inheritDesc = e.detail.value), {
                      trim: !0,
                    })
                  ),
                }
              : {},
            {
              av: e.n(v.value.inherit ? 'card-detail' : ''),
              aw: e.p({ label: !1 }),
              ax: e.p({ label: !0 }),
              ay: e.o((e) => (v.value.liver = e)),
              az: e.p({ direction: 'horizontal', modelValue: v.value.liver }),
              aA: e.p({ label: !1 }),
              aB: e.p({ label: !0 }),
              aC: e.o((e) => (v.value.kidney = e)),
              aD: e.p({ direction: 'horizontal', modelValue: v.value.kidney }),
              aE: 2 === v.value.sex,
            },
            2 === v.value.sex
              ? e.e(
                  { aF: v.value.pregnancyDecs },
                  v.value.pregnancyDecs
                    ? { aG: e.t(v.value.pregnancyDecs) }
                    : {},
                  {
                    aH: a,
                    aI: e.o((e) => (S.value = !0)),
                    aJ: e.o(Y),
                    aK: e.o((e) => (S.value = !1)),
                    aL: e.o((e) => (R.value = e)),
                    aM: e.p({ columns: P.value, modelValue: R.value }),
                    aN: e.o((e) => (S.value = e)),
                    aO: e.p({ position: 'bottom', visible: S.value }),
                  }
                )
              : {},
            { aP: e.o(A) }
          )
      );
    },
  }),
  u = e._export_sfc(l, [['__scopeId', 'data-v-521b5d23']]);
wx.createComponent(u);
