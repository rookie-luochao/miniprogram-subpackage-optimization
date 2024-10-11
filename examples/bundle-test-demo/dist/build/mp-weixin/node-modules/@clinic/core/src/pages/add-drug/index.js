'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math ||
  (
    o + (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js')
  )();
const o = () => './components/DrugItem/index.js',
  n =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24070915093918373960201240.png',
  a = e.defineComponent({
    __name: 'index',
    setup(o, { expose: a }) {
      const i = e.useAppConfigStore(),
        { ORG_ID: t, ORG_CODE: u } = i.CONFIG,
        s = e.useUserInfoStore(),
        { userInfo: l } = e.storeToRefs(s),
        r = e.ref(!1),
        c = e.ref(!1),
        d = e.ref(null),
        v = e.ref(''),
        p = e.ref(''),
        m = e.ref(''),
        h = e.ref(''),
        g = e.ref([]),
        f = async () => {
          const o = p.value.trim().split(' '),
            n = o[0] || '',
            a = o[1] || '',
            i = o[2] || '';
          if (!n && !m.value && !h.value) return;
          const s = {
            approvalNumber: m.value,
            nhsaCode: h.value,
            drugCommonName: n,
            drugManufacturerName: a,
            drugSpec: i,
            orgID: t,
            orgCode: u,
            classCodeList: ['WesternMedicine_V1', 'ChinesePatentMedicine_V1'],
            pageIndex: 1,
            pageSize: 10,
          };
          try {
            e.index.showLoading({ title: '搜索中...', mask: !0 });
            const { data: o } = await e.requestPageMedicine(s);
            if ((e.index.hideLoading(), !o.records.length))
              return void e.index.showToast({
                title: '没有找到药品',
                icon: 'none',
              });
            g.value = o.records
              .map((e) => {
                const o = x.value.find((o) => o.keyID === e.keyID);
                return {
                  ...e,
                  itemCount: (null == o ? void 0 : o.itemCount) || 0,
                };
              })
              .sort((e, o) => e.nhsaType - o.nhsaType);
          } catch (l) {
            e.index.hideLoading();
          }
        },
        C = () => {
          setTimeout(() => {
            (g.value = []), f();
          }, 200);
        },
        y = (e) => {
          'drugCommonName' == e && (p.value = ''),
            'approvalNumber' == e && (m.value = ''),
            'nhsaCode' == e && (h.value = ''),
            (g.value = []),
            f();
        },
        x = e.ref([]),
        I = e.ref([]);
      e.watch(x, () => {
        I.value = x.value.filter((e) => e.isMatching);
      });
      const D = (e) => {
          w(e, g.value);
        },
        k = (e) => {
          w(e, x.value);
        },
        w = async (o, n) => {
          var a, i;
          const { operationType: t, drugInfo: u } = o,
            {
              prohibited: s,
              restricted: r,
              gynecological: v,
              nhsaType: p,
              drugCommonName: m,
            } = u,
            h = n.find((e) => e.keyID === u.keyID),
            f = x.value.some((e) => e.keyID === u.keyID);
          if (h) {
            if (t === e.Operation.Increase) {
              if (x.value.length >= 5)
                return void e.index.showToast({
                  title: '最多只能选购5种药品',
                  icon: 'none',
                });
              if (r)
                return void e.index.showToast({
                  title: '该药品限制条件不适宜互联网复诊，不可添加',
                  icon: 'none',
                });
              if (v)
                return void e.index.showToast({
                  title: '该药品为妇科用药，不可添加',
                  icon: 'none',
                });
              if (s)
                return void e.index.showToast({
                  title: '该药品属于“网络禁售药品”不可添加',
                  icon: 'none',
                });
              if (p === e.DrugType.ClassC)
                return void e.index.showToast({
                  title: '丙类药品不参与医保报销，无法添加',
                  icon: 'none',
                });
              if (u.itemCount >= 50)
                return void e.index.showToast({
                  title: '单种药品最大数量为50',
                  icon: 'none',
                });
              if (
                0 === u.itemCount &&
                x.value.some((e) => e.drugCommonName === m)
              )
                return void e.index.showToast({
                  title: '已添加该通用名相关药品，请勿重复添加',
                  icon: 'none',
                });
              if (c.value && 0 === h.itemCount)
                try {
                  e.index.showLoading({ title: '添加中…', mask: !0 });
                  const o = {
                      drugCommonName: m,
                      phone: null == (a = d.value) ? void 0 : a.phone,
                      patientID: null == (i = l.value) ? void 0 : i.keyID,
                    },
                    { data: n } = await e.requestCheckH5MedicineSwitch(o, !0);
                  if (!n.closecheckH5Medicine) {
                    const { success: n } = await e.requestCheckH5Medicine(
                      o,
                      !0
                    );
                    if (!n) return;
                  }
                  e.index.hideLoading();
                } catch (C) {
                  console.log(C);
                }
              if (!f)
                return (
                  h.itemCount++,
                  void (x.value = [...x.value, { ...h, isMatching: !0 }])
                );
              (g.value = T(g.value, u.keyID, 1)),
                (x.value = T(x.value, u.keyID, 1));
            }
            t === e.Operation.Decrease &&
              h.itemCount > 0 &&
              ((x.value = T(x.value, u.keyID, -1)),
              (g.value = T(g.value, u.keyID, -1)),
              (x.value = x.value.filter((e) => 0 !== e.itemCount)),
              0 === x.value.length && (b.value = !1));
          }
        },
        T = (e, o, n) =>
          e.map((e) =>
            e.keyID === o
              ? { ...e, isMatching: !0, itemCount: e.itemCount + n }
              : e
          ),
        b = e.ref(!1),
        N = () => {
          I.value.length
            ? (b.value = !0)
            : e.index.showToast({ title: '请选择药品', icon: 'none' });
        },
        M = async ({ drugInfo: o }) => {
          var n, a, i, t;
          const {
            prohibited: u,
            restricted: s,
            gynecological: r,
            nhsaType: p,
            keyID: m,
            drugCommonName: h,
          } = o;
          if (s)
            return void e.index.showToast({
              title: '该药品限制条件不适宜互联网复诊，不可添加',
              icon: 'none',
            });
          if (r)
            return void e.index.showToast({
              title: '该药品为妇科用药，不可添加',
              icon: 'none',
            });
          if (u)
            return void e.index.showToast({
              title: '该药品属于“网络禁售药品”不可添加',
              icon: 'none',
            });
          if (p === e.DrugType.ClassC)
            return void e.index.showToast({
              title: '丙类药品不参与医保报销，无法添加',
              icon: 'none',
            });
          if (null == (n = x.value) ? void 0 : n.some((e) => e.keyID === m))
            return void e.index.showToast({
              title: '该药品已存在，请勿重复添加',
              icon: 'none',
            });
          if (
            null == (a = x.value)
              ? void 0
              : a.some((e) => e.drugCommonName === h)
          )
            return void e.index.showToast({
              title: '已添加该通用名相关药品，请勿重复添加',
              icon: 'none',
            });
          if (c.value)
            try {
              e.index.showLoading({ title: '添加中…', mask: !0 });
              const o = {
                  drugCommonName: h,
                  phone: null == (i = d.value) ? void 0 : i.phone,
                  patientID: null == (t = l.value) ? void 0 : t.keyID,
                },
                { data: n } = await e.requestCheckH5MedicineSwitch(o, !0);
              if (!n.closecheckH5Medicine) {
                const { success: n } = await e.requestCheckH5Medicine(o, !0);
                if (!n) return;
              }
              e.index.hideLoading();
            } catch (f) {
              console.log(f);
            }
          const g = x.value.map((e) =>
            e.barCode === v.value
              ? {
                  ...o,
                  itemCount: 1,
                  barCode: v.value,
                  isMatching: !0,
                  isReselect: !0,
                }
              : e
          );
          e.index.$emit('setDrugList', g), e.index.navigateBack();
        },
        L = () => {
          I.value.length
            ? (e.index.$emit('setDrugList', x.value), e.index.navigateBack())
            : e.index.showToast({ title: '请选择药品', icon: 'none' });
        };
      return (
        a({
          pageOnLoad: (e) => {
            (r.value = JSON.parse(e.isScanToAdd)),
              (c.value = JSON.parse(e.isDrugLimit)),
              (x.value = JSON.parse(e.drugList)),
              (d.value = JSON.parse(e.patientInfo)),
              (v.value = e.barCode);
          },
        }),
        (o, a) =>
          e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy-cs.100cbc.com/rp/21030410325655262692822001/24022716291397301660201253.png',
              b: e.o(C),
              c: p.value,
              d: e.o((e) => (p.value = e.detail.value)),
              e: p.value,
            },
            p.value ? { f: n } : {},
            {
              g: e.o((e) => y('drugCommonName')),
              h: e.o(C),
              i: m.value,
              j: e.o((e) => (m.value = e.detail.value)),
              k: m.value,
            },
            m.value ? { l: n } : {},
            {
              m: e.o((e) => y('approvalNumber')),
              n: e.o(C),
              o: h.value,
              p: e.o((e) => (h.value = e.detail.value)),
              q: h.value,
            },
            h.value ? { r: n } : {},
            { s: e.o((e) => y('nhsaCode')), t: g.value.length },
            g.value.length
              ? {
                  v: e.f(g.value, (o, n, a) => ({
                    a: e.o(D, o.keyID),
                    b: e.o(M, o.keyID),
                    c: '7972fac0-0-' + a,
                    d: e.p({ 'drug-info': o, 'is-scan-to-add': r.value }),
                    e: o.keyID,
                  })),
                }
              : {
                  w: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717393171685640201233.png',
                },
            { x: !r.value },
            r.value
              ? {}
              : {
                  y: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071716502525374580201233.png',
                  z: e.t(I.value.length),
                  A: e.o(N),
                  B: e.n(I.value.length ? '' : 'card-submit-disabled'),
                  C: e.o(L),
                },
            {
              D: e.f(I.value, (o, n, a) => ({
                a: e.o(k, o.keyID),
                b: '7972fac0-2-' + a + ',7972fac0-1',
                c: e.p({ 'drug-info': o, 'is-scan-to-add': r.value }),
                d: o.keyID,
              })),
              E: e.o((e) => (b.value = e)),
              F: e.p({
                round: !0,
                position: 'bottom',
                'pop-class': 'drug-cart-pop',
                visible: b.value,
              }),
              G: e.n(r.value ? '' : 'drug-safe-area-inset-bottom'),
            }
          )
      );
    },
  }),
  i = e._export_sfc(a, [['__scopeId', 'data-v-7972fac0']]);
wx.createComponent(i);
