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
  t = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const u = e.ref({ d: '00', h: '00', m: '00', s: '00' }),
        { medicalInfo: o, fetchMedicalInfo: r } = e.useMedicalInfo(),
        n = e.useMedicalInsuranceAuthStore(),
        {
          medicalAuthStatus: i,
          medicalAuthType: s,
          prescriptionAuthInfo: c,
        } = e.storeToRefs(n),
        { scanCodeData: l, scanCodeAuth: p } = e.useScanCodeAuth(),
        d = e.ref(null),
        v = e.ref({ rpID: '', inquiryOrderID: '' }),
        h = e.ref(!0),
        m = e.ref(!1),
        f = e.ref(!1),
        y = e.ref(0),
        g = e.ref(null),
        I = async (a) => {
          const { rpID: t, inquiryOrderID: u } = v.value;
          try {
            a &&
              ((h.value = !0),
              e.index.showLoading({ title: '加载中…', mask: !0 }));
            const { data: o } = await e.requestGetDetailXz({
              type: 'rp',
              rpID: t,
              inquiryOrderID: u,
            });
            (g.value = o.rp),
              o.rp.rpUploadStatus == e.PrescriptionStatusEnum.Revoke &&
                (f.value = !0),
              (y.value = e.dayjs(o.rp.expirationTime).valueOf());
            const r = e.calculateTimeDifference(
              e.dayjs(),
              e.dayjs(o.rp.expirationTime)
            );
            m.value = r.diffValue <= 0;
          } finally {
            a && ((h.value = !1), e.index.hideLoading());
          }
        },
        S = e.computed(() => {
          const { d: a, h: t, m: o, s: r } = u.value;
          return `${e.padZeroToTwoDigits(a)}天${e.padZeroToTwoDigits(t)}小时${e.padZeroToTwoDigits(o)}分${e.padZeroToTwoDigits(r)}秒`;
        }),
        D = e.computed(() => {
          var a;
          const t = null == (a = g.value) ? void 0 : a.rpUploadStatus;
          return `处方${e.PrescriptionStatusDesc[t]}` || '无法进行处方流转';
        }),
        w = e.computed(() => {
          var a;
          const t = null == (a = g.value) ? void 0 : a.rpUploadStatus;
          return {
            [e.PrescriptionStatusEnum.Processing]:
              'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710451661521470201233.png',
            [e.PrescriptionStatusEnum.Success]:
              'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710443751248550201240.png',
            [e.PrescriptionStatusEnum.Fail]:
              'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710455475979970201240.png',
          }[t];
        }),
        T = e.computed(() => {
          var a;
          return (
            !m.value &&
            (null == (a = g.value) ? void 0 : a.rpUploadStatus) ===
              e.PrescriptionStatusEnum.Fail
          );
        }),
        A = async () => {
          i.value !== e.AuthStatus.NO_AUTH
            ? (s.value === e.AuthType.MINI_PROGRAM &&
                e.wxPrescriptionTransferAuth(),
              s.value === e.AuthType.SCAN_CODE && (await p(), P('test', '')))
            : P('test', '');
        },
        P = async (a, t) => {
          var u;
          if (g.value)
            try {
              e.index.showLoading({ title: '处方流转中…', mask: !0 });
              const {
                keyID: o,
                orgID: r,
                orgCode: n,
                inquiryOrderID: i,
              } = g.value;
              await e.requestRecipePush({
                orgID: r,
                orgCode: n,
                inquiryOrderID: i,
                rpID: o,
                authno: a,
                cityId: t,
                ecToken: null == (u = l.value) ? void 0 : u.ecToken,
              }),
                b();
            } catch (o) {
              e.index.hideLoading();
            }
        },
        b = async () => {
          if (!g.value) return;
          const { keyID: a } = g.value,
            t = async () => {
              var u;
              try {
                const { data: o } = await e.requestGetRpUpdateStatusAndUpdate({
                    rpId: a,
                  }),
                  { pushStatus: r, pushResult: n } = o;
                r === e.PrescriptionStatus.Success ||
                r === e.PrescriptionStatus.Failed
                  ? (e.index.hideLoading(),
                    I(!1),
                    r === e.PrescriptionStatus.Failed &&
                      (null == (u = d.value) ||
                        u.openModal({
                          title: n || '处方流转失败',
                          showCancel: !1,
                        })))
                  : (await e.sleep(2e3), await t());
              } catch (o) {
                console.log(o);
              }
            };
          t();
        };
      return (
        t({
          pageOnLoad: (e) => {
            (v.value = e), I(!0);
          },
          pageOnShow: async () => {
            var e, a;
            if (c.value.authNo)
              try {
                await r(),
                  (null == (e = o.value) ? void 0 : e.auth_no) &&
                    (n.resetPrescriptionAuthInfo(),
                    P(
                      null == (a = o.value) ? void 0 : a.auth_no,
                      o.value.city_id
                    ));
              } catch (t) {}
          },
        }),
        (a, t) => {
          var o, r, n;
          return e.e(
            { a: !h.value },
            h.value
              ? {
                  q: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717531384828430201233.png',
                }
              : e.e(
                  { b: f.value },
                  f.value
                    ? {
                        c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071710462412404360201233.png',
                        d: e.t(null == (o = g.value) ? void 0 : o.undoRea),
                      }
                    : m.value
                      ? { f: e.t(D.value) }
                      : {
                          g: w.value,
                          h: e.t(D.value),
                          i: e.t(S.value),
                          j: e.o((e) => (u.value = e)),
                          k: e.p({ 'end-time': y.value, modelValue: u.value }),
                          l: e.n(
                            (null == (r = g.value)
                              ? void 0
                              : r.rpUploadStatus) ===
                              e.unref(e.PrescriptionStatusEnum).Fail
                              ? 'prescription-error'
                              : 'prescription-progress'
                          ),
                        },
                  {
                    e: m.value,
                    m: null == (n = g.value) ? void 0 : n.rpImgFileUrl,
                    n: e.n(T.value ? 'prescription-content-fail' : ''),
                    o: T.value,
                  },
                  T.value ? { p: e.o(A) } : {}
                ),
            { r: e.sr(d, '0feab302-1', { k: 'modalRef' }) }
          );
        }
      );
    },
  }),
  u = e._export_sfc(t, [['__scopeId', 'data-v-0feab302']]);
wx.createComponent(u);
