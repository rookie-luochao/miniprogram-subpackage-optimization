'use strict';
const e = require('../../../../../../../../common/vendor.js');
Math || a();
const a = () => '../OneTreeModal/index.js',
  t = e.defineComponent({
    __name: 'index',
    props: {
      subOrgInfo: { default: null },
      subOrgParams: {
        default: () => ({ orgCode: '', orgID: '', orgName: '' }),
      },
    },
    setup(a, { expose: t }) {
      const o = e.inject(e.globalDataSymbol),
        r = e.useAppConfigStore(),
        { ORG_ID: n } = r.CONFIG,
        u = e.useUserInfoStore(),
        { userInfo: l } = e.storeToRefs(u),
        i = e.useMedicalInsuranceAuthStore(),
        {
          medicalAuthStatus: s,
          medicalAuthType: d,
          prescriptionAuthInfo: p,
        } = e.storeToRefs(i),
        { medicalInfo: c, fetchMedicalInfo: v } = e.useMedicalInfo(),
        { scanCodeData: g, scanCodeAuth: f } = e.useScanCodeAuth(),
        m = a,
        I = e.ref(null),
        h = e.ref(null),
        y = e.ref(''),
        D = e.ref(!1),
        N = async () => {
          var a, t;
          const o = m.subOrgParams.orgCode,
            r = m.subOrgParams.orgID;
          if (o && r)
            try {
              e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: u } = await e.requestGetErpOpen({
                orgClientCode: o,
              });
              if (((D.value = u), !u)) return;
              const { data: i } = await e.requestSelectOrgPersonFamily({
                orgID: n,
                orgPersonUserID: null == (a = l.value) ? void 0 : a.keyID,
              });
              if (!(null == i ? void 0 : i.length)) return void (y.value = '');
              const s = i[0].keyID,
                d = i[0].familyName,
                { data: p } = await e.requestGetPatientQrCode({
                  orgID: n,
                  orgClientID: r,
                  patientAccountID: null == (t = l.value) ? void 0 : t.keyID,
                  patientID: s,
                });
              y.value = p;
              const c = async () => {
                var a;
                try {
                  const t = await e.requestGetErpInquiryOrder({ patientID: s });
                  if (t.data)
                    return void (
                      null == (a = h.value) ||
                      a.openModal({
                        orderDetail: { ...t.data, patientName: d },
                        subOrgInfo: { ...m.subOrgInfo, ...m.subOrgParams },
                      })
                    );
                  I.value = setTimeout(c, 3e3);
                } catch (t) {
                  I.value && clearTimeout(I.value);
                }
              };
              c();
            } finally {
              e.index.hideLoading();
            }
        },
        O = async () => {
          s.value !== e.AuthStatus.NO_AUTH
            ? (d.value === e.AuthType.MINI_PROGRAM &&
                e.wxPrescriptionTransferAuth(),
              d.value === e.AuthType.SCAN_CODE &&
                (await f(),
                g.value &&
                  e.appNavigator.navigateTo(
                    e.appNavigator.pagesMap['patient-detail'],
                    {
                      query: {
                        familyName: g.value.userName,
                        idNumber: g.value.idNo,
                      },
                    }
                  )))
            : e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['patient-detail']
              );
        },
        b = async () => {
          var a;
          if (p.value.authNo)
            try {
              await v(),
                (null == (a = c.value) ? void 0 : a.user_name) &&
                  c.value.user_card_no &&
                  (i.resetPrescriptionAuthInfo(),
                  e.appNavigator.navigateTo(
                    e.appNavigator.pagesMap['patient-detail'],
                    {
                      query: {
                        familyName: c.value.user_name,
                        idNumber: c.value.user_card_no,
                      },
                    }
                  ));
            } catch (t) {}
        },
        w = () => {
          null == o || o.updateGlobalData({ onShowFlag: !1 }),
            e.index.previewImage({ urls: [y.value], current: 0 });
        };
      return (
        t({
          isErpOpen: D,
          getOneTreeBusiness: N,
          pageOnShow: async () => {
            if (null == o ? void 0 : o.globalData.value.onShowFlag)
              return await N(), void b();
            null == o || o.updateGlobalData({ onShowFlag: !0 });
          },
          pageOnHide: () => {
            I.value &&
              (null == o ? void 0 : o.globalData.value.onShowFlag) &&
              clearTimeout(I.value);
          },
        }),
        (a, t) =>
          e.e(
            { a: D.value },
            D.value
              ? e.e(
                  { b: y.value },
                  y.value
                    ? { c: y.value, d: e.o(w) }
                    : {
                        e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071815445366666680201240.png',
                        f: e.o(O),
                      }
                )
              : {},
            { g: e.sr(h, '3c9483f4-0', { k: 'oneTreeModalRef' }) }
          )
      );
    },
  }),
  o = e._export_sfc(t, [['__scopeId', 'data-v-3c9483f4']]);
wx.createComponent(o);
