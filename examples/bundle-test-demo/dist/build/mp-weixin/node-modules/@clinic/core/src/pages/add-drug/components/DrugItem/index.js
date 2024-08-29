'use strict';
const e = require('../../../../../../../../common/vendor.js'),
  o = e.defineComponent({
    __name: 'index',
    props: {
      drugInfo: {},
      isScanToAdd: { type: Boolean, default: !1 },
      isShowOperate: { type: Boolean, default: !0 },
      isShowDrugCount: { type: Boolean, default: !1 },
    },
    emits: ['changeDrugNum', 'manualDrugMatch'],
    setup(o, { emit: r }) {
      const u = o,
        n = e.ref(!1),
        t = e.computed(() =>
          n.value
            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071717282396231130201233.png'
            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071717280659920250201240.png'
        ),
        a = e.computed(() => {
          const o = u.drugInfo.nhsaType;
          return e.DrugTypeDesc[o];
        }),
        p = r,
        d = (e) => {
          p('changeDrugNum', { operationType: e, drugInfo: u.drugInfo });
        };
      return (o, r) => {
        var g;
        return e.e(
          { a: o.drugInfo.supplyItemGoodsName },
          o.drugInfo.supplyItemGoodsName
            ? { b: e.t(o.drugInfo.supplyItemGoodsName) }
            : {},
          { c: e.t(o.drugInfo.goodsName), d: a.value },
          a.value
            ? {
                e: e.t(a.value),
                f: e.n(`drug-type type${o.drugInfo.nhsaType}`),
              }
            : {},
          { g: o.isShowDrugCount },
          o.isShowDrugCount
            ? {
                h: e.t(
                  `${o.drugInfo.itemCount}${null != (g = o.drugInfo.packageUnit) ? g : ''}`
                ),
              }
            : {},
          {
            i: e.t(o.drugInfo.drugSpecification),
            j: o.isShowDrugCount && '35px',
            k: e.t(o.drugInfo.nhsaCode),
            l: e.t(o.drugInfo.formType),
            m: e.t(o.drugInfo.drugManufacturerName),
            n: e.t(o.drugInfo.approvalNumber),
            o: e.t(o.drugInfo.barCode || '暂无'),
            p: o.drugInfo.remarkYb,
          },
          o.drugInfo.remarkYb
            ? e.e(
                {
                  q: e.t(`医保用药限制：${o.drugInfo.remarkYb}`),
                  r: e.n(n.value ? '' : 'limit-text-ellipsis'),
                  s: o.drugInfo.remarkYb.length > 13,
                },
                o.drugInfo.remarkYb.length > 13
                  ? {
                      t: e.t(n.value ? '收起' : '更多详情'),
                      v: t.value,
                      w: e.o((e) => (n.value = !n.value)),
                    }
                  : {}
              )
            : {},
          { x: o.drugInfo.drugHighPrices },
          o.drugInfo.drugHighPrices
            ? {
                y: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24070918093197062860201240.png',
              }
            : {},
          { z: o.isShowOperate },
          o.isShowOperate
            ? e.e(
                { A: o.isScanToAdd },
                o.isScanToAdd
                  ? {
                      B: e.o((e) => {
                        p('manualDrugMatch', { drugInfo: u.drugInfo });
                      }),
                    }
                  : e.e(
                      { C: o.drugInfo.itemCount > 0 },
                      o.drugInfo.itemCount > 0
                        ? {
                            D: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071717445448078750201240.png',
                            E: e.o((o) => d(e.unref(e.Operation).Decrease)),
                          }
                        : {},
                      { F: o.drugInfo.itemCount > 0 },
                      o.drugInfo.itemCount > 0
                        ? { G: e.t(o.drugInfo.itemCount) }
                        : {},
                      {
                        H: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071717451478718610201240.png',
                        I: e.o((o) => d(e.unref(e.Operation).Increase)),
                      }
                    )
              )
            : {}
        );
      };
    },
  }),
  r = e._export_sfc(o, [['__scopeId', 'data-v-fa8e01b5']]);
wx.createComponent(r);
