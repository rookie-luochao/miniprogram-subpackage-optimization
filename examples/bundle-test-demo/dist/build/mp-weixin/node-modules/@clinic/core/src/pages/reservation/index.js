'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (a + t)();
const a = () => '../../components/Navbar/index.js',
  t = () => '../../components/PatientInfoForm/index.js',
  n = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const n = e.useStudioInfoStore(),
        { studioInfo: o } = e.storeToRefs(n),
        i = e.ref(e.ExpertListType.Expert),
        r = e.ref(''),
        p = e.computed(() => i.value === e.ExpertListType.Expert),
        u = e.ref(0),
        l = (e) => {
          (v.value.appointmentDate = e.appointmentDate),
            (v.value.appointmentTime = e.appointmentTime.split('～').join('-'));
        },
        d = async () => {
          var a, t;
          if (
            !(null == (a = o.value) ? void 0 : a.orgId) ||
            !(null == (t = o.value) ? void 0 : t.orgCode)
          )
            return;
          let n = [];
          if (p.value) {
            const {
              data: { appointmentDates: a },
            } = await e.requestExpertDoctorAppointment({
              doctorId: v.value.doctorId,
              orgId: v.value.orgId,
            });
            n = a;
          } else {
            const {
              data: { appointmentDates: a },
            } = await e.requestGetHealthAppointment({
              orgId: v.value.orgId,
              doctorAssistId: v.value.doctorId,
            });
            n = a;
          }
          for (const o of n)
            if (o.appointmentStatus == e.AppointmentStatus.CAN)
              for (const a of o.appointmentTimeList)
                if (a.appointmentStatus == e.AppointmentStatus.CAN)
                  return (
                    (v.value.appointmentDate = o.appointmentDate),
                    void (v.value.appointmentTime = a.appointmentTime
                      .split('～')
                      .join('-'))
                  );
          s();
        },
        s = () =>
          !!(
            v.value.inquiryWay != e.InquiryWay.Video ||
            (v.value.appointmentDate && v.value.appointmentTime)
          ) ||
          (e.index.showToast({ title: '当前医生暂无可预约时间', icon: 'none' }),
          !1),
        v = e.ref({
          orgId: '',
          doctorUserStaffId: '',
          doctorOrgUserId: '',
          doctorId: '',
          patientInfoId: '',
          illDesc: '',
          treatedFileUrls: '',
          reportFileUrls: '',
          appointmentDate: '',
          appointmentTime: '',
          inquiryWay: '',
        }),
        m = e.ref(null),
        c = () => {
          e.appNavigator.navigateTo(
            e.appNavigator.pagesMap['reservation-time'],
            {
              query: {
                doctorId: v.value.doctorId,
                date: v.value.appointmentDate,
                time: v.value.appointmentTime.split('-').join('～'),
                orgId: v.value.orgId,
                isExpert: p.value,
              },
            }
          );
        },
        y = e.ref(!1),
        I = async () => {
          var a, t, n, i, u;
          if (
            (y.value ||
              (e.index.showToast({
                title: '请阅读并同意《知情同意书》',
                icon: 'none',
              }),
              0)) &&
            s() &&
            (await (null == (a = m.value) ? void 0 : a.validate()))
          )
            try {
              e.index.showLoading({ title: '加载中...', mask: !0 });
              const a = {
                  ...v.value,
                  orgId:
                    null != (n = null == (t = o.value) ? void 0 : t.orgId)
                      ? n
                      : '',
                  appointmentTime: v.value.appointmentTime.replace('-', '～'),
                },
                { data: l } = p.value
                  ? await e.requestCreateExpertOrder(a)
                  : await e.requestCreateHealthOrder(f(a));
              if (l.inquiryId) {
                const a = await g(l.inquiryId),
                  t = a.payStatus !== e.InquiryPayStatus.NoPaid,
                  n = {
                    chatImId: a.groupImId,
                    inquiryType: p.value
                      ? e.InquiryType.Expert
                      : e.InquiryType.Health,
                    navigationBarTitle: null != (i = r.value) ? i : '',
                    inquiryOrderId: l.inquiryId,
                    totalPrice: a.amount,
                    paymentType: e.PaymentType.InquiryPay,
                    orderCreateTime: null != (u = a.addTime) ? u : '',
                    ...(t ? { orderId: a.id } : {}),
                  },
                  o = t
                    ? e.appNavigator.pagesMap['pay-detail']
                    : e.appNavigator.pagesMap.chat;
                e.appNavigator.navigateTo(o, { query: n });
              } else e.index.showToast({ title: '订单创建失败', icon: 'none' });
            } finally {
              e.index.hideLoading();
            }
        },
        g = async (a) => {
          const { data: t } = await e.requestInquiryOrderDetail({
            inquiryOrderId: a,
          });
          return t;
        },
        f = (e) => ({
          ...e,
          doctorAssistId: e.doctorId,
          doctorAssistOrgUserId: e.doctorOrgUserId,
          doctorAssistUserStaffId: e.doctorUserStaffId,
        }),
        T = () => {
          e.appNavigator.navigateTo(
            e.appNavigator.pagesMap['agreement-informed-consent']
          );
        };
      return (
        t({
          pageOnShow: async () => {
            var e;
            null == (e = m.value) || e.pageOnShow();
          },
          pageOnLoad: (a) => {
            var t, n, p;
            (i.value = a.type),
              (r.value = a.doctorName),
              (v.value = { ...v.value, ...a }),
              (u.value = a.price ? Number(a.price) : 0),
              (v.value.orgId =
                null !=
                (n = (null == a ? void 0 : a.orgId)
                  ? a.orgId
                  : null == (t = o.value)
                    ? void 0
                    : t.orgId)
                  ? n
                  : ''),
              a.inquiryWay !== e.InquiryWay.Text && d(),
              e.index.$on(e.RESERVATION_TIME_CONFIRM, l),
              null == (p = m.value) || p.pageOnLoad();
          },
          pageOnHide: () => {
            var e;
            null == (e = m.value) || e.pageOnHide();
          },
        }),
        (a, t) =>
          e.e(
            {
              a: e.sr('navbarRef', 'a7060cbc-0'),
              b: e.p({ title: '填写预约信息' }),
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110411050143438010201233.png',
              d: e.t(p.value ? '医生' : '咨询师'),
              e: e.sr(m, 'a7060cbc-1', { k: 'patientFormRef' }),
              f: e.o((e) => (v.value = e)),
              g: e.p({ modelValue: v.value }),
              h: v.value.inquiryWay !== e.unref(e.InquiryWay).Text,
            },
            v.value.inquiryWay !== e.unref(e.InquiryWay).Text
              ? e.e(
                  {
                    i: e.t(e.unref(e.InquiryWayDesc)[v.value.inquiryWay]),
                    j: e.t(e.unref(e.formatCurrency)(u.value)),
                    k: v.value.appointmentDate && v.value.appointmentTime,
                  },
                  v.value.appointmentDate && v.value.appointmentTime
                    ? {
                        l: e.t(
                          e
                            .unref(e.dayjs)(v.value.appointmentDate)
                            .format('MM月DD日')
                        ),
                        m: e.t(v.value.appointmentTime),
                      }
                    : {},
                  {
                    n: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110409501582721820201233.png',
                    o: e.o(c),
                  }
                )
              : {},
            {
              p: y.value
                ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110215004205362350201240.png'
                : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110215012423223020201233.png',
              q: e.o(T),
              r: e.o((e) => (y.value = !y.value)),
              s: e.t(e.unref(e.formatCurrency)(u.value)),
              t: u.value > 0,
            },
            (u.value, {}),
            { v: e.o(I) }
          )
      );
    },
  }),
  o = e._export_sfc(n, [['__scopeId', 'data-v-a7060cbc']]);
wx.createComponent(o);
