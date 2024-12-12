'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (a + t)();
const a = () => '../../components/Navbar/index.js',
  t = () => '../../components/PatientInfoForm/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const o = e.ref({
          orgId: '',
          imGroupId: '',
          doctorAssistUserStaffId: '',
          patientInfoId: '',
          doctorId: '',
          doctorUserStaffId: '',
          doctorOrgUserId: '',
          doctorName: '',
          sectionName: '',
          titleName: '',
          illDesc: '',
          treatedFileUrls: '',
          reportFileUrls: '',
          treatedHospital: '',
          treatedDate: '',
          treatedDiagnosis: '',
        }),
        n = e.ref(null),
        i = async () => {
          var a;
          if (await (null == (a = n.value) ? void 0 : a.validate()))
            try {
              e.index.showLoading({ title: '邀请中…', mask: !0 }),
                await e.requestSpecialistStart(o.value),
                e.index.navigateBack();
            } finally {
              e.index.hideLoading();
            }
        };
      return (
        t({
          pageOnShow: async () => {
            var e;
            console.log('pageOnShow', o.value),
              await (null == (e = n.value) ? void 0 : e.pageOnShow());
          },
          pageOnLoad: (e) => {
            var a;
            (o.value = { ...o.value, ...e }),
              null == (a = n.value) || a.pageOnLoad();
          },
          pageOnHide: () => {
            var e;
            null == (e = n.value) || e.pageOnHide();
          },
        }),
        (a, t) =>
          e.e(
            {
              a: e.sr('navbarRef', '0f0fee89-0'),
              b: e.p({ title: '专科问诊' }),
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24103110455568968420201240.png',
              d: e.t(o.value.doctorName),
              e: e.t(o.value.titleName),
              f: o.value.titleName,
            },
            (o.value.titleName, {}),
            {
              g: e.t(o.value.sectionName),
              h: e.sr(n, '0f0fee89-1', { k: 'patientFormRef' }),
              i: e.o((e) => (o.value = e)),
              j: e.p({ modelValue: o.value }),
              k: e.o(i),
            }
          )
      );
    },
  }),
  n = e._export_sfc(o, [['__scopeId', 'data-v-0f0fee89']]);
wx.createComponent(n);
