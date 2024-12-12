'use strict';
const t = require('../../../../../../common/vendor.js');
Math || e();
const e = () => '../../components/Navbar/index.js',
  a = t.defineComponent({
    __name: 'index',
    setup(e, { expose: a }) {
      const n = t.useStudioInfoStore(),
        { studioInfo: o } = t.storeToRefs(n),
        i = t.ref(''),
        p = t.ref([]),
        u = async (e, a, n) =>
          n
            ? await (async (e, a) => {
                t.index.showLoading({ title: '加载中…', mask: !0 });
                try {
                  const { data: n } = await t.requestExpertDoctorAppointment({
                    doctorId: e,
                    orgId: a,
                  });
                  p.value = n.appointmentDates;
                } catch (n) {
                } finally {
                  t.index.hideLoading();
                }
              })(e, a)
            : await (async (e, a) => {
                t.index.showLoading({ title: '加载中…', mask: !0 });
                try {
                  const { data: n } = await t.requestGetHealthAppointment({
                    doctorAssistId: a,
                    orgId: e,
                  });
                  p.value = n.appointmentDates;
                } catch (n) {
                } finally {
                  t.index.hideLoading();
                }
              })(a, e),
        l = (t, e) => {
          var a;
          (s.value = p.value.findIndex((e) => e.appointmentDate === t)),
            (d.value =
              null == (a = p.value[s.value].appointmentTimeList)
                ? void 0
                : a.findIndex((t) => t.appointmentTime === e));
        },
        s = t.ref(0),
        d = t.ref(null),
        r = (t, e) => {
          'date' === t && ((s.value = e), (d.value = null)),
            'time' === t && ((d.value = e), m());
        },
        m = () => {
          var e, a;
          null !== d.value
            ? (t.index.$emit(t.RESERVATION_TIME_CONFIRM, {
                appointmentDate: p.value[s.value].appointmentDate,
                appointmentTime:
                  null == (a = p.value[s.value])
                    ? void 0
                    : a.appointmentTimeList[null != (e = d.value) ? e : 0]
                        .appointmentTime,
              }),
              t.appNavigator.navigateBack())
            : t.index.showToast({ title: '请选择时间', icon: 'none' });
        };
      return (
        a({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: async (t) => {
            var e, a;
            console.log('pageOnLoad', t);
            const { date: n, time: p, isExpert: s } = t;
            i.value = t.doctorId;
            const d =
              null !=
              (a = (null == t ? void 0 : t.orgId)
                ? t.orgId
                : null == (e = o.value)
                  ? void 0
                  : e.orgId)
                ? a
                : '';
            await u(i.value, d, JSON.parse(`${s}`)), l(n, p);
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (e, a) => {
          var n;
          return {
            a: t.sr('navbarRef', '772276da-0'),
            b: t.p({ title: '预约时间' }),
            c: t.f(p.value, (e, a, n) => {
              return {
                a: t.t(
                  ((o = e.appointmentDate),
                  t.dayjs(o).locale('zh-cn').format('ddd'))
                ),
                b: t.t(t.unref(t.dayjs)(e.appointmentDate).format('MM-DD')),
                c: a,
                d: a === s.value ? 1 : '',
                e:
                  e.appointmentStatus !== t.unref(t.AppointmentStatus).CAN
                    ? 1
                    : '',
                f: t.o(
                  (n) =>
                    e.appointmentStatus === t.unref(t.AppointmentStatus).CAN &&
                    r('date', a),
                  a
                ),
              };
              var o;
            }),
            d: t.f(
              null == (n = p.value[s.value]) ? void 0 : n.appointmentTimeList,
              (e, a, n) => ({
                a: t.t(e.appointmentTime.split('～').join('-')),
                b: t.t(t.unref(t.AppointmentStatusDict)[e.appointmentStatus]),
                c:
                  e.appointmentStatus === t.unref(t.AppointmentStatus).CAN
                    ? 1
                    : '',
                d: a,
                e: a === d.value ? 1 : '',
                f:
                  e.appointmentStatus !== t.unref(t.AppointmentStatus).CAN
                    ? 1
                    : '',
                g: t.o(
                  (n) =>
                    e.appointmentStatus === t.unref(t.AppointmentStatus).CAN &&
                    r('time', a),
                  a
                ),
              })
            ),
          };
        }
      );
    },
  }),
  n = t._export_sfc(a, [['__scopeId', 'data-v-772276da']]);
wx.createComponent(n);
