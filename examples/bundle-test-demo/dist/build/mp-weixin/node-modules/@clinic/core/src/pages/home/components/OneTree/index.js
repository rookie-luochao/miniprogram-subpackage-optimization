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
      const u = e.inject(e.globalDataSymbol),
        o = e.useAppConfigStore(),
        { ORG_ID: r } = o.CONFIG,
        n = e.useUserInfoStore(),
        { userInfo: l } = e.storeToRefs(n),
        i = e.useMedicalInsuranceAuthStore(),
        {
          medicalAuthStatus: s,
          medicalAuthType: d,
          userAuthInfo: v,
        } = e.storeToRefs(i),
        { medicalInfo: p, fetchMedicalUserInfo: c } = e.useMedicalInfo(),
        { scanCodeData: g, scanCodeAuth: m } = e.useScanCodeAuth(),
        f = a,
        I = e.ref(null),
        h = e.ref(null),
        y = e.ref(null),
        A = e.ref(''),
        D = e.ref(!1),
        N = async () => {
          var a, t;
          const u = f.subOrgParams.orgCode,
            o = f.subOrgParams.orgID;
          if (u && o)
            try {
              e.index.showLoading({ title: '加载中…', mask: !0 });
              const { data: n } = await e.requestGetErpOpen({
                orgClientCode: u,
              });
              if (((D.value = n), !n)) return;
              const { data: i } = await e.requestSelectOrgPersonFamily({
                orgID: r,
                orgPersonUserID: null == (a = l.value) ? void 0 : a.keyID,
              });
              if (!(null == i ? void 0 : i.length)) return void (A.value = '');
              const s = i[0].keyID,
                d = i[0].familyName,
                { data: v } = await e.requestGetPatientQrCode({
                  orgID: r,
                  orgClientID: o,
                  patientAccountID: null == (t = l.value) ? void 0 : t.keyID,
                  patientID: s,
                });
              A.value = v;
              const p = async () => {
                var a;
                try {
                  const t = await e.requestGetErpInquiryOrder({ patientID: s });
                  if (t.data)
                    return void (
                      null == (a = y.value) ||
                      a.openModal({
                        orderDetail: { ...t.data, patientName: d },
                        subOrgInfo: { ...f.subOrgInfo, ...f.subOrgParams },
                      })
                    );
                  h.value = setTimeout(p, 3e3);
                } catch (t) {
                  h.value && clearTimeout(h.value);
                }
              };
              p();
            } finally {
              e.index.hideLoading();
            }
        },
        O = async () => {
          s.value === e.AuthStatus.NO_AUTH &&
            e.appNavigator.navigateTo(
              e.appNavigator.pagesMap['patient-detail']
            ),
            s.value === e.AuthStatus.NEED_AUTH &&
              ((I.value = e.AutoJumpEnum.AddPatient),
              d.value === e.AuthType.MINI_PROGRAM && e.wxUserInfoAuth(),
              d.value === e.AuthType.SCAN_CODE &&
                (await m(),
                g.value &&
                  e.appNavigator.navigateTo(
                    e.appNavigator.pagesMap['patient-detail'],
                    {
                      query: {
                        familyName: g.value.userName,
                        idNumber: g.value.idNo,
                      },
                    }
                  )));
        },
        b = async () => {
          var a;
          if (I.value === e.AutoJumpEnum.AddPatient) {
            if (!v.value.authNo) return;
            try {
              await c(),
                (null == (a = p.value) ? void 0 : a.user_name) &&
                  p.value.user_card_no &&
                  ((I.value = null),
                  e.appNavigator.navigateTo(
                    e.appNavigator.pagesMap['patient-detail'],
                    {
                      query: {
                        familyName: p.value.user_name,
                        idNumber: p.value.user_card_no,
                      },
                    }
                  ));
            } catch (t) {}
          }
        },
        _ = () => {
          e.index.previewImage({ urls: [A.value], current: 0 });
        };
      return (
        t({
          isErpOpen: D,
          getOneTreeBusiness: N,
          pageOnShow: async () => {
            (null == u ? void 0 : u.globalData.value.onShowFlag)
              ? (await N(), D.value && !A.value && b())
              : null == u || u.updateGlobalData({ onShowFlag: !0 });
          },
          pageOnHide: () => {
            (null == u ? void 0 : u.globalData.value.onShowFlag) &&
              h.value &&
              clearTimeout(h.value);
          },
        }),
        (a, t) =>
          e.e(
            { a: D.value },
            D.value
              ? e.e(
                  { b: A.value },
                  A.value
                    ? { c: A.value, d: e.o(_) }
                    : {
                        e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071815445366666680201240.png',
                        f: e.o(O),
                      }
                )
              : {},
            { g: e.sr(y, '20b414e9-0', { k: 'oneTreeModalRef' }) }
          )
      );
    },
  }),
  u = e._export_sfc(t, [['__scopeId', 'data-v-20b414e9']]);
wx.createComponent(u);
