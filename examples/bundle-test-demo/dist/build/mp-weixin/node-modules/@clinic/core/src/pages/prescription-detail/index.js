'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-countdown')();
}
Math ||
  (
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js') +
    a
  )();
const a = () => '../../components/Modal/index.js',
  t =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710451661521470201233.png',
  u = e.defineComponent({
    __name: 'index',
    setup(a, { expose: u }) {
      const r = e.ref({ d: '00', h: '00', m: '00', s: '00' }),
        { medicalInfo: o, fetchMedicalPrescription: n } = e.useMedicalInfo(),
        i = e.useMedicalInsuranceAuthStore(),
        {
          medicalAuthStatus: l,
          medicalAuthType: s,
          prescriptionAuthInfo: c,
        } = e.storeToRefs(i),
        { scanCodeData: p, scanCodeAuth: d } = e.useScanCodeAuth(),
        v = e.ref(null),
        m = e.ref({ rpID: '', inquiryOrderID: '' }),
        h = e.ref(null),
        y = e.ref(!0),
        f = e.ref(!1),
        S = e.ref(!1),
        g = e.ref(0),
        D = e.ref(null),
        I = async (a) => {
          const { rpID: t, inquiryOrderID: u } = m.value;
          try {
            a &&
              ((y.value = !0),
              e.index.showLoading({ title: '加载中…', mask: !0 }));
            const { data: r } = await e.requestGetDetailXz({
              type: 'rp',
              rpID: t,
              inquiryOrderID: u,
            });
            (D.value = r.rp),
              r.rp.rpUploadStatus == e.PrescriptionStatusEnum.Revoke &&
                (S.value = !0),
              (g.value = e.dayjs(r.rp.expirationTime).valueOf());
            const o = e.calculateTimeDifference(
              e.dayjs(),
              e.dayjs(r.rp.expirationTime)
            );
            f.value = o.diffValue <= 0;
          } finally {
            a && ((y.value = !1), e.index.hideLoading());
          }
        },
        w = e.computed(() => {
          const { d: a, h: t, m: u, s: o } = r.value;
          return `${e.padZeroToTwoDigits(a)}天${e.padZeroToTwoDigits(t)}小时${e.padZeroToTwoDigits(u)}分${e.padZeroToTwoDigits(o)}秒`;
        }),
        T = e.computed(() => {
          var a;
          const t = null == (a = D.value) ? void 0 : a.rpUploadStatus;
          return `处方${e.PrescriptionStatusDesc[t]}` || '无法进行处方流转';
        }),
        A = e.computed(() => {
          var a;
          const u = null == (a = D.value) ? void 0 : a.rpUploadStatus;
          return {
            [e.PrescriptionStatusEnum.ToProcess]: t,
            [e.PrescriptionStatusEnum.Processing]: t,
            [e.PrescriptionStatusEnum.Success]:
              'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710443751248550201240.png',
            [e.PrescriptionStatusEnum.Fail]:
              'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710455475979970201240.png',
          }[u];
        }),
        P = e.computed(() => {
          var a;
          return (
            !f.value &&
            (null == (a = D.value) ? void 0 : a.rpUploadStatus) ===
              e.PrescriptionStatusEnum.Fail
          );
        }),
        x = async () => {
          l.value === e.AuthStatus.NO_AUTH && _(),
            l.value === e.AuthStatus.NEED_AUTH &&
              ((h.value = e.AutoJumpEnum.Prescription),
              s.value === e.AuthType.MINI_PROGRAM && e.wxPrescriptionAuth(),
              s.value === e.AuthType.SCAN_CODE && (await d(), _()));
        },
        _ = async () => {
          var a, t, u, r, n;
          if (D.value)
            try {
              e.index.showLoading({ title: '处方流转中…', mask: !0 });
              const {
                  keyID: i,
                  orgID: l,
                  orgCode: s,
                  inquiryOrderID: c,
                } = D.value,
                d =
                  null != (t = null == (a = o.value) ? void 0 : a.auth_no)
                    ? t
                    : '',
                v =
                  null != (r = null == (u = o.value) ? void 0 : u.city_id)
                    ? r
                    : '',
                m = null == (n = p.value) ? void 0 : n.ecToken;
              await e.requestRecipePush({
                orgID: l,
                orgCode: s,
                inquiryOrderID: c,
                rpID: i,
                authno: d,
                cityId: v,
                ecToken: m,
              }),
                await E();
            } catch (i) {
              e.index.hideLoading();
            }
        },
        E = async () => {
          if (!D.value) return;
          const { keyID: a } = D.value,
            t = async () => {
              var u;
              try {
                const { data: r } = await e.requestGetRpUpdateStatusAndUpdate({
                    rpId: a,
                  }),
                  { pushStatus: o, pushResult: n } = r;
                o === e.PrescriptionStatus.Success ||
                o === e.PrescriptionStatus.Failed
                  ? (e.index.hideLoading(),
                    I(!1),
                    o === e.PrescriptionStatus.Failed &&
                      (null == (u = v.value) ||
                        u.openModal({
                          title: n || '处方流转失败',
                          showCancel: !1,
                        })))
                  : (await e.sleep(2e3), await t());
              } catch (r) {
                console.log(r);
              }
            };
          t();
        };
      return (
        u({
          pageOnLoad: (e) => {
            (m.value = e), I(!0);
          },
          pageOnShow: async () => {
            var a;
            if (h.value === e.AutoJumpEnum.Prescription) {
              if (!c.value.authNo) return;
              try {
                await n(),
                  (null == (a = o.value) ? void 0 : a.auth_no) &&
                    ((h.value = null), _());
              } catch (t) {}
            }
          },
        }),
        (a, t) => {
          var u, o, n;
          return e.e(
            { a: !y.value },
            y.value
              ? {
                  q: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717531384828430201233.png',
                }
              : e.e(
                  { b: S.value },
                  S.value
                    ? {
                        c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710462412404360201233.png',
                        d: e.t(null == (u = D.value) ? void 0 : u.undoRea),
                      }
                    : f.value
                      ? { f: e.t(T.value) }
                      : {
                          g: A.value,
                          h: e.t(T.value),
                          i: e.t(w.value),
                          j: e.o((e) => (r.value = e)),
                          k: e.p({ 'end-time': g.value, modelValue: r.value }),
                          l: e.n(
                            (null == (o = D.value)
                              ? void 0
                              : o.rpUploadStatus) ===
                              e.unref(e.PrescriptionStatusEnum).Fail
                              ? 'prescription-error'
                              : 'prescription-progress'
                          ),
                        },
                  {
                    e: f.value,
                    m: null == (n = D.value) ? void 0 : n.rpImgFileUrl,
                    n: e.n(P.value ? 'prescription-content-fail' : ''),
                    o: P.value,
                  },
                  P.value ? { p: e.o(x) } : {}
                ),
            { r: e.sr(v, 'c02e8a00-1', { k: 'modalRef' }) }
          );
        }
      );
    },
  }),
  r = e._export_sfc(u, [['__scopeId', 'data-v-c02e8a00']]);
wx.createComponent(r);
