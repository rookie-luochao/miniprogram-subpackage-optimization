'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-popup')();
}
Math ||
  (
    a + (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js')
  )();
const a = () => './components/DrugItem/index.js',
  o =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24070915093918373960201240.png',
  n = e.defineComponent({
    __name: 'index',
    setup(a, { expose: n }) {
      const t = e.useAppConfigStore(),
        { ORG_ID: i, ORG_CODE: u } = t.CONFIG,
        s = e.useUserInfoStore(),
        { userInfo: l } = e.storeToRefs(s),
        r = e.ref(!1),
        d = e.ref(!1),
        c = e.ref(null),
        v = e.ref(''),
        p = e.ref(''),
        m = e.ref(''),
        h = e.ref(''),
        g = e.ref([]),
        f = async () => {
          const a = p.value.trim().split(' '),
            o = a[0] || '',
            n = a[1] || '',
            t = a[2] || '';
          if (!o && !m.value && !h.value) return;
          const s = {
            approvalNumber: m.value,
            nhsaCode: h.value,
            drugCommonName: o,
            drugManufacturerName: n,
            drugSpec: t,
            orgID: i,
            orgCode: u,
            classCodeList: ['WesternMedicine_V1', 'ChinesePatentMedicine_V1'],
            pageIndex: 1,
            pageSize: 10,
          };
          try {
            e.index.showLoading({ title: '搜索中...', mask: !0 });
            const { data: a } = await e.requestPageMedicine(s);
            if ((e.index.hideLoading(), !a.records.length))
              return void e.index.showToast({
                title: '没有找到药品',
                icon: 'none',
              });
            g.value = a.records.map((e) => {
              const a = I.value.find((a) => a.keyID === e.keyID);
              return {
                ...e,
                itemCount: (null == a ? void 0 : a.itemCount) || 0,
              };
            });
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
        I = e.ref([]),
        D = e.ref([]);
      e.watch(I, () => {
        D.value = I.value.filter((e) => e.isMatching);
      });
      const k = (e) => {
          b(e, g.value);
        },
        x = (e) => {
          b(e, I.value);
        },
        b = async (a, o) => {
          var n, t;
          const { operationType: i, drugInfo: u } = a,
            { prohibited: s, nhsaType: r, drugCommonName: v } = u,
            p = o.find((e) => e.keyID === u.keyID),
            m = I.value.some((e) => e.keyID === u.keyID);
          if (p) {
            if (i === e.Operation.Increase) {
              if (I.value.length >= 5)
                return void e.index.showToast({
                  title: '最多只能选购5种药品',
                  icon: 'none',
                });
              if (s)
                return void e.index.showToast({
                  title: '该药品属于“网络禁售药品”不可添加',
                  icon: 'none',
                });
              if (r === e.DrugType.ClassC)
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
                I.value.some((e) => e.drugCommonName === v)
              )
                return void e.index.showToast({
                  title: '已添加该通用名相关药品，请勿重复添加',
                  icon: 'none',
                });
              if (d.value && 0 === p.itemCount)
                try {
                  e.index.showLoading({ title: '添加中…', mask: !0 });
                  const a = {
                      drugCommonName: v,
                      phone: null == (n = c.value) ? void 0 : n.phone,
                      patientID: null == (t = l.value) ? void 0 : t.keyID,
                    },
                    { data: o } = await e.requestCheckH5MedicineSwitch(a, !0);
                  o.closecheckH5Medicine ||
                    (await e.requestCheckH5Medicine(a, !0)),
                    e.index.hideLoading();
                } catch (h) {
                  const { success: e } = h;
                  if (!e) return;
                }
              if (!m)
                return (
                  p.itemCount++,
                  void (I.value = [...I.value, { ...p, isMatching: !0 }])
                );
              (g.value = w(g.value, u.keyID, 1)),
                (I.value = w(I.value, u.keyID, 1));
            }
            i === e.Operation.Decrease &&
              p.itemCount > 0 &&
              ((I.value = w(I.value, u.keyID, -1)),
              (g.value = w(g.value, u.keyID, -1)),
              (I.value = I.value.filter((e) => 0 !== e.itemCount)),
              0 === I.value.length && (T.value = !1));
          }
        },
        w = (e, a, o) =>
          e.map((e) =>
            e.keyID === a
              ? { ...e, isMatching: !0, itemCount: e.itemCount + o }
              : e
          ),
        T = e.ref(!1),
        N = () => {
          D.value.length
            ? (T.value = !0)
            : e.index.showToast({ title: '请选择药品', icon: 'none' });
        },
        M = async ({ drugInfo: a }) => {
          var o, n;
          const { prohibited: t, nhsaType: i, keyID: u, drugCommonName: s } = a;
          if (t)
            return void e.index.showToast({
              title: '该药品属于“网络禁售药品”不可添加',
              icon: 'none',
            });
          if (i === e.DrugType.ClassC)
            return void e.index.showToast({
              title: '丙类药品不参与医保报销，无法添加',
              icon: 'none',
            });
          if (I.value.some((e) => e.keyID === u))
            return void e.index.showToast({
              title: '该药品已存在，请勿重复添加',
              icon: 'none',
            });
          if (I.value.some((e) => e.drugCommonName === s))
            return void e.index.showToast({
              title: '已添加该通用名相关药品，请勿重复添加',
              icon: 'none',
            });
          if (d.value)
            try {
              e.index.showLoading({ title: '添加中…', mask: !0 });
              const a = {
                  drugCommonName: s,
                  phone: null == (o = c.value) ? void 0 : o.phone,
                  patientID: null == (n = l.value) ? void 0 : n.keyID,
                },
                { data: t } = await e.requestCheckH5MedicineSwitch(a, !0);
              t.closecheckH5Medicine || (await e.requestCheckH5Medicine(a, !0)),
                e.index.hideLoading();
            } catch (p) {
              const { success: e } = p;
              if (!e) return;
            }
          const r = I.value.map((e) =>
            e.barCode === v.value
              ? {
                  ...a,
                  itemCount: 1,
                  barCode: v.value,
                  isMatching: !0,
                  isReselect: !0,
                }
              : e
          );
          e.index.$emit('setDrugList', r), e.index.navigateBack();
        },
        L = () => {
          D.value.length
            ? (e.index.$emit('setDrugList', I.value), e.index.navigateBack())
            : e.index.showToast({ title: '请选择药品', icon: 'none' });
        };
      return (
        n({
          pageOnLoad: (e) => {
            (r.value = JSON.parse(e.isScanToAdd)),
              (d.value = JSON.parse(e.isDrugLimit)),
              (I.value = JSON.parse(e.drugList)),
              (c.value = JSON.parse(e.patientInfo)),
              (v.value = e.barCode);
          },
        }),
        (a, n) =>
          e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy-cs.100cbc.com/rp/21030410325655262692822001/24022716291397301660201253.png',
              b: e.o(C),
              c: p.value,
              d: e.o((e) => (p.value = e.detail.value)),
              e: p.value,
            },
            p.value ? { f: o } : {},
            {
              g: e.o((e) => y('drugCommonName')),
              h: e.o(C),
              i: m.value,
              j: e.o((e) => (m.value = e.detail.value)),
              k: m.value,
            },
            m.value ? { l: o } : {},
            {
              m: e.o((e) => y('approvalNumber')),
              n: e.o(C),
              o: h.value,
              p: e.o((e) => (h.value = e.detail.value)),
              q: h.value,
            },
            h.value ? { r: o } : {},
            { s: e.o((e) => y('nhsaCode')), t: g.value.length },
            g.value.length
              ? {
                  v: e.f(g.value, (a, o, n) => ({
                    a: e.o(k, a.keyID),
                    b: e.o(M, a.keyID),
                    c: 'b4739949-0-' + n,
                    d: e.p({ 'drug-info': a, 'is-scan-to-add': r.value }),
                    e: a.keyID,
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
                  z: e.t(D.value.length),
                  A: e.o(N),
                  B: e.n(D.value.length ? '' : 'card-submit-disabled'),
                  C: e.o(L),
                },
            {
              D: e.f(D.value, (a, o, n) => ({
                a: e.o(x, a.keyID),
                b: 'b4739949-2-' + n + ',b4739949-1',
                c: e.p({ 'drug-info': a, 'is-scan-to-add': r.value }),
                d: a.keyID,
              })),
              E: e.o((e) => (T.value = e)),
              F: e.p({
                round: !0,
                position: 'bottom',
                'pop-class': 'drug-cart-pop',
                visible: T.value,
              }),
              G: e.n(r.value ? '' : 'drug-safe-area-inset-bottom'),
            }
          )
      );
    },
  }),
  t = e._export_sfc(n, [['__scopeId', 'data-v-b4739949']]);
wx.createComponent(t);
