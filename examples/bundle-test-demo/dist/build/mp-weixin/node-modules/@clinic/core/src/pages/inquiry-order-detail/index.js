'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('nut-countdown')();
}
Math ||
  (
    u +
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js') +
    a
  )();
const a = () => '../../components/Modal/index.js',
  u = () => '../../components/Navbar/index.js',
  n = e.defineComponent({
    __name: 'index',
    setup(a, { expose: u }) {
      e.dayjs.locale(e.zhCn);
      const n = e.ref(null),
        t = () => {
          var a;
          null == (a = n.value) ||
            a.openModal({
              content: '是否取消订单?',
              confirmText: '确定',
              onConfirm: async () => {
                await e.OrderActions.cancelOrder(f.value),
                  await c(),
                  e.index.$emit(e.REFRESH_INQUIRY_ORDER_LIST);
              },
            });
        },
        l = () => {
          e.OrderActions.toPay(f.value);
        },
        i = async () => {
          await e.OrderActions.deleteOrder(f.value),
            e.index.$emit(e.REFRESH_INQUIRY_ORDER_LIST),
            e.appNavigator.navigateBack();
        },
        r = () => {
          e.OrderActions.contactDoctor(f.value);
        },
        o = () => {
          e.index.$on(e.REFRESH_INQUIRY_ORDER_LIST, async () => {
            await c(), e.index.$off(e.REFRESH_INQUIRY_ORDER_LIST);
          }),
            e.OrderActions.evaluateDoctor(f.value);
        },
        s = () => {
          e.OrderActions.viewEvaluation(f.value);
        },
        d = e.ref(!1),
        v = e.ref(''),
        f = e.ref({}),
        c = async () => {
          try {
            e.index.showLoading({ title: '加载中...', mask: !0 });
            const { data: a } = await e.requestInquiryOrderDetail({
              inquiryOrderId: v.value,
            });
            (f.value = a),
              (O.value = e.calcInquiryOrderStatus(a)),
              (d.value = !0);
          } catch (a) {
            console.error(a);
          } finally {
            e.index.hideLoading();
          }
        },
        T = e.ref({ m: '', s: '' }),
        m = e.computed(() => {
          var a;
          return e
            .dayjs(null == (a = f.value) ? void 0 : a.addTime)
            .add(15, 'minutes')
            .valueOf();
        }),
        E = () => {
          c();
        },
        O = e.ref(e.DetailStatus.WAIT_PAY),
        p = e.computed(() => e.DetailStatusFields[O.value]),
        D = e.computed(() => e.DetailStatusDesc$1[O.value]);
      return (
        u({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (e) => {
            console.log('pageOnload', e), (v.value = e.inquiryOrderId), c();
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, u) => {
          var v, c, I, y, _, A, R, V, h, C;
          return e.e(
            {
              a: e.sr('navbarRef', '9eaca889-0'),
              b: e.p({ title: '订单详情' }),
              c: d.value,
            },
            d.value
              ? e.e(
                  {
                    d: e.t(D.value.title),
                    e: O.value == e.unref(e.DetailStatus).WAIT_PAY,
                  },
                  O.value == e.unref(e.DetailStatus).WAIT_PAY
                    ? {
                        f: e.t(e.unref(e.padZeroToTwoDigits)(T.value.m)),
                        g: e.t(e.unref(e.padZeroToTwoDigits)(T.value.s)),
                        h: e.o(E),
                        i: e.o((e) => (T.value = e)),
                        j: e.p({ 'end-time': m.value, modelValue: T.value }),
                      }
                    : {},
                  {
                    k: e.t(D.value.desc),
                    l: D.value.buttons.includes(
                      e.unref(e.Buttons).CANCEL_ORDER
                    ),
                  },
                  D.value.buttons.includes(e.unref(e.Buttons).CANCEL_ORDER)
                    ? { m: e.o(t) }
                    : {},
                  { n: D.value.buttons.includes(e.unref(e.Buttons).TO_PAY) },
                  D.value.buttons.includes(e.unref(e.Buttons).TO_PAY)
                    ? { o: e.o(l) }
                    : {},
                  {
                    p: D.value.buttons.includes(
                      e.unref(e.Buttons).CONTACT_DOCTOR
                    ),
                  },
                  D.value.buttons.includes(e.unref(e.Buttons).CONTACT_DOCTOR)
                    ? { q: e.o(r) }
                    : {},
                  {
                    r: D.value.buttons.includes(
                      e.unref(e.Buttons).DELETE_ORDER
                    ),
                  },
                  D.value.buttons.includes(e.unref(e.Buttons).DELETE_ORDER)
                    ? { s: e.o(i) }
                    : {},
                  {
                    t: D.value.buttons.includes(
                      e.unref(e.Buttons).INQUIRY_RECORD
                    ),
                  },
                  D.value.buttons.includes(e.unref(e.Buttons).INQUIRY_RECORD)
                    ? { v: e.o(r) }
                    : {},
                  {
                    w: D.value.buttons.includes(
                      e.unref(e.Buttons).EVALUATE_DOCTOR
                    ),
                  },
                  D.value.buttons.includes(e.unref(e.Buttons).EVALUATE_DOCTOR)
                    ? { x: e.o(o) }
                    : {},
                  {
                    y: D.value.buttons.includes(
                      e.unref(e.Buttons).VIEW_EVALUATION
                    ),
                  },
                  D.value.buttons.includes(e.unref(e.Buttons).VIEW_EVALUATION)
                    ? { z: e.o(s) }
                    : {},
                  {
                    A: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110117211138978410201233.png',
                    B: e.t(e.unref(e.InquiryTypeDesc)[f.value.inquiryType]),
                    C: e.t(e.unref(e.InquiryWayDesc)[f.value.inquiryWay]),
                    D:
                      f.value.inquiryWay == e.unref(e.InquiryWay).Video &&
                      f.value.appointmentTime,
                  },
                  f.value.inquiryWay == e.unref(e.InquiryWay).Video &&
                    f.value.appointmentTime
                    ? {
                        E: e.t(
                          e
                            .unref(e.dayjs)(f.value.appointmentTime)
                            .format('MM月DD日')
                        ),
                        F: e.t(
                          e
                            .unref(e.dayjs)(f.value.appointmentTime)
                            .format('dddd')
                        ),
                        G: e.t(
                          null == (v = f.value.appointmentTimePeriod)
                            ? void 0
                            : v.replace('～', '-')
                        ),
                      }
                    : {},
                  { H: p.value.has(e.unref(e.DetailFields).CONSULTANT) },
                  p.value.has(e.unref(e.DetailFields).CONSULTANT)
                    ? e.e(
                        {
                          I: e.t(e.getServiceUserInfo(f.value).name),
                          J:
                            f.value.inquiryType ==
                            e.unref(e.InquiryType).Expert,
                        },
                        f.value.inquiryType == e.unref(e.InquiryType).Expert
                          ? {
                              K: e.t(
                                e.unref(e.formatValue)(f.value.doctorTitle)
                              ),
                              L: e.t(
                                e.unref(e.formatValue)(
                                  f.value.doctorSectionName
                                )
                              ),
                            }
                          : {}
                      )
                    : {},
                  {
                    M: e.t(
                      e.unref(e.formatValue)(
                        null == (c = f.value.inquiryPatientVO)
                          ? void 0
                          : c.patientName
                      )
                    ),
                    N: e.t(
                      e.unref(e.GenderDesc)[
                        null == (I = f.value.inquiryPatientVO) ? void 0 : I.sex
                      ]
                    ),
                    O: e.t(
                      e.unref(e.formatValue)(
                        null == (y = f.value.inquiryPatientVO) ? void 0 : y.age
                      )
                    ),
                    P: e.t(
                      (
                        null == (_ = f.value.inquiryPatientVO)
                          ? void 0
                          : _.preVisitingHospital
                      )
                        ? '线下医院就诊过'
                        : '--'
                    ),
                    Q: p.value.has(e.unref(e.DetailFields).DIAGNOSED_DISEASE),
                  },
                  p.value.has(e.unref(e.DetailFields).DIAGNOSED_DISEASE)
                    ? {
                        R: e.t(
                          e.unref(e.formatValue)(
                            null == (A = f.value.inquiryPatientVO)
                              ? void 0
                              : A.preDiagnosis
                          )
                        ),
                      }
                    : {},
                  {
                    S: e.t(
                      e.unref(e.formatValue)(
                        null == (R = f.value.inquiryPatientVO)
                          ? void 0
                          : R.illDesc
                      )
                    ),
                    T: p.value.has(e.unref(e.DetailFields).ILLNESS_PHOTO),
                  },
                  p.value.has(e.unref(e.DetailFields).ILLNESS_PHOTO)
                    ? e.e(
                        {
                          U:
                            null == (V = f.value.inquiryPatientVO)
                              ? void 0
                              : V.diseaseImg,
                        },
                        (
                          null == (h = f.value.inquiryPatientVO)
                            ? void 0
                            : h.diseaseImg
                        )
                          ? {
                              V: e.o((a) => {
                                var u, n;
                                return (
                                  (n =
                                    null == (u = f.value.inquiryPatientVO)
                                      ? void 0
                                      : u.diseaseImg),
                                  void e.index.previewImage({
                                    urls: n.split(',').filter(Boolean),
                                  })
                                );
                              }),
                            }
                          : {}
                      )
                    : {},
                  {
                    W: e.t(
                      e.unref(e.formatValue)(
                        null == (C = f.value.inquiryPatientVO)
                          ? void 0
                          : C.inquiryOrderId
                      )
                    ),
                    X: e.t(e.unref(e.formatValue)(f.value.addTime)),
                    Y: e.t(e.unref(e.formatCurrency)(f.value.amount)),
                    Z:
                      p.value.has(e.unref(e.DetailFields).PAY_TIME) &&
                      f.value.payTime,
                  },
                  p.value.has(e.unref(e.DetailFields).PAY_TIME) &&
                    f.value.payTime
                    ? { aa: e.t(e.unref(e.formatValue)(f.value.payTime)) }
                    : {},
                  { ab: p.value.has(e.unref(e.DetailFields).ACCEPT_TIME) },
                  p.value.has(e.unref(e.DetailFields).ACCEPT_TIME)
                    ? { ac: e.t(e.unref(e.formatValue)(f.value.acceptTime)) }
                    : {},
                  { ad: p.value.has(e.unref(e.DetailFields).WITHDRAWAL_TIME) },
                  p.value.has(e.unref(e.DetailFields).WITHDRAWAL_TIME)
                    ? {
                        ae: e.t(e.unref(e.formatValue)(f.value.withdrawalTime)),
                      }
                    : {},
                  { af: p.value.has(e.unref(e.DetailFields).END_TIME) },
                  p.value.has(e.unref(e.DetailFields).END_TIME)
                    ? { ag: e.t(e.unref(e.formatValue)(f.value.endTime)) }
                    : {},
                  { ah: p.value.has(e.unref(e.DetailFields).EVALUATE_TIME) },
                  p.value.has(e.unref(e.DetailFields).EVALUATE_TIME)
                    ? {
                        ai: e.t(e.unref(e.formatValue)(f.value.evaluationTime)),
                      }
                    : {},
                  {
                    aj: p.value.has(e.unref(e.DetailFields).CANCELLATION_TIME),
                  },
                  p.value.has(e.unref(e.DetailFields).CANCELLATION_TIME)
                    ? {
                        ak: e.t(
                          e.unref(e.formatValue)(f.value.cancellationTime)
                        ),
                      }
                    : {}
                )
              : {},
            { al: e.sr(n, '9eaca889-2', { k: 'modalRef' }) }
          );
        }
      );
    },
  }),
  t = e._export_sfc(n, [['__scopeId', 'data-v-9eaca889']]);
wx.createComponent(t);
