'use strict';
const e = require('../../../../../../../../common/vendor.js'),
  r = e.defineComponent({
    __name: 'index',
    props: {
      drugInfo: {},
      drugList: {},
      drugIndex: {},
      isDrugLimit: { type: Boolean },
      patientInfo: {},
    },
    emits: ['deleteDrug', 'changeDrugNum'],
    setup(r, { emit: o }) {
      const n = r,
        t = e.ref(!1),
        u = e.computed(() =>
          t.value
            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071717282396231130201233.png'
            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071717280659920250201240.png'
        ),
        a = e.computed(() => {
          const r = n.drugInfo.nhsaType;
          return e.DrugTypeDesc[r];
        }),
        g = () => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['add-drug'], {
            query: {
              isScanToAdd: !0,
              isDrugLimit: n.isDrugLimit,
              barCode: n.drugInfo.barCode,
              drugList: JSON.stringify(n.drugList),
              patientInfo: JSON.stringify(n.patientInfo),
            },
          });
        },
        i = o,
        d = () => {
          i('deleteDrug', { index: n.drugIndex });
        },
        p = (e) => {
          i('changeDrugNum', { operationType: e, drugInfo: n.drugInfo });
        };
      return (r, o) =>
        e.e(
          { a: e.t(r.drugInfo.barCode || '暂无'), b: r.drugInfo.isMatching },
          r.drugInfo.isMatching
            ? e.e(
                { c: r.drugInfo.supplyItemGoodsName },
                r.drugInfo.supplyItemGoodsName
                  ? { d: e.t(r.drugInfo.supplyItemGoodsName) }
                  : {},
                { e: e.t(r.drugInfo.goodsName), f: a.value },
                a.value
                  ? {
                      g: e.t(a.value),
                      h: e.n(`drug-type type${r.drugInfo.nhsaType}`),
                    }
                  : {},
                {
                  i: e.t(r.drugInfo.drugSpecification),
                  j: e.t(r.drugInfo.nhsaCode),
                  k: e.t(r.drugInfo.formType),
                  l: e.t(r.drugInfo.drugManufacturerName),
                  m: e.t(r.drugInfo.approvalNumber),
                  n: r.drugInfo.remarkYb,
                },
                r.drugInfo.remarkYb
                  ? e.e(
                      {
                        o: e.t(`医保用药限制：${r.drugInfo.remarkYb}`),
                        p: e.n(t.value ? '' : 'limit-text-ellipsis'),
                        q: r.drugInfo.remarkYb.length > 13,
                      },
                      r.drugInfo.remarkYb.length > 13
                        ? {
                            r: e.t(t.value ? '收起' : '更多详情'),
                            s: u.value,
                            t: e.o((e) => (t.value = !t.value)),
                          }
                        : {}
                    )
                  : {},
                { v: r.drugInfo.drugHighPrices },
                r.drugInfo.drugHighPrices
                  ? {
                      w: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24070918093197062860201240.png',
                    }
                  : {}
              )
            : {},
          { x: e.o(d), y: r.drugInfo.isMatching && r.drugInfo.isReselect },
          r.drugInfo.isMatching && r.drugInfo.isReselect ? { z: e.o(g) } : {},
          { A: !r.drugInfo.isMatching },
          r.drugInfo.isMatching ? {} : { B: e.o(g) },
          { C: r.drugInfo.isMatching },
          r.drugInfo.isMatching
            ? {
                D: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071717445448078750201240.png',
                E: e.o((r) => p(e.unref(e.Operation).Decrease)),
                F: e.t(r.drugInfo.itemCount),
                G: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071717451478718610201240.png',
                H: e.o((r) => p(e.unref(e.Operation).Increase)),
              }
            : {}
        );
    },
  }),
  o = e._export_sfc(r, [['__scopeId', 'data-v-3ddbb9a4']]);
wx.createComponent(o);
