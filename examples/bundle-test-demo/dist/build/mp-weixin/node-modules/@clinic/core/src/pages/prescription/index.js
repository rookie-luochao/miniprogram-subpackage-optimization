'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = e.defineComponent({
    __name: 'index',
    setup(t, { expose: a }) {
      const r = e.useUserInfoStore(),
        { userInfo: n } = e.storeToRefs(r),
        i = e.ref([]),
        s = async () => {
          var t;
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: a } = await e.requestGetRp({
              userImId: null == (t = n.value) ? void 0 : t.keyID,
              serviceCode: e.SERVICE_CODE,
            });
            i.value = a;
          } finally {
            e.index.hideLoading();
          }
        },
        o = (t) => {
          const a = t.rpUploadStatus;
          if (e.dayjs(t.expirationTime).valueOf() <= e.dayjs().valueOf())
            return [];
          const r = [];
          return (
            [
              e.PrescriptionStatusEnum.ToProcess,
              e.PrescriptionStatusEnum.Success,
              e.PrescriptionStatusEnum.Processing,
            ].includes(a) && r.push('status-primary'),
            a === e.PrescriptionStatusEnum.Fail && r.push('status-fail'),
            r
          );
        },
        u = (t) => {
          if (e.dayjs(t.expirationTime).valueOf() <= e.dayjs().valueOf())
            return '已失效';
          const a = t.rpUploadStatus;
          return e.PrescriptionStatusDesc[a] || '--';
        };
      return (
        a({
          pageOnShow: () => {
            s();
          },
        }),
        (t, a) =>
          e.e(
            { a: i.value.length },
            i.value.length
              ? {
                  b: e.f(i.value, (t, a, r) => ({
                    a: e.t(t.clientOrgName),
                    b: e.t(u(t)),
                    c: e.n(o(t)),
                    d: e.t(t.patientName),
                    e: e.t(e.unref(e.GenderDesc)[t.patientSex]),
                    f: e.t(
                      e.unref(e.formatPatientAge)(t.patientAge, t.patientMonth)
                    ),
                    g: e.t(t.primaryDiagnosis),
                    h: e.t(t.inquiryOrderTime),
                    i: t.keyID,
                    j: e.o(
                      (a) =>
                        ((t) => {
                          e.appNavigator.navigateTo(
                            e.appNavigator.pagesMap['prescription-detail'],
                            {
                              query: {
                                rpID: t.keyID,
                                inquiryOrderID: t.inquiryOrderID,
                              },
                            }
                          );
                        })(t),
                      t.keyID
                    ),
                  })),
                }
              : {
                  c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24082717531384828430201233.png',
                }
          )
      );
    },
  }),
  a = e._export_sfc(t, [['__scopeId', 'data-v-d13c9a2b']]);
wx.createComponent(a);
