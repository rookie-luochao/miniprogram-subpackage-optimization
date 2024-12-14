'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('uni-load-more') + e.resolveComponent('nut-countdown'))();
}
Math ||
  (
    a +
    n +
    t +
    o +
    (() =>
      '../../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js') +
    (() =>
      '../../../node-modules/nutui-uniapp/components/countdown/countdown.js')
  )();
const a = () => '../../components/Navbar/index.js',
  t = () => './components/message-custom/index.js',
  n = () => './components/message-system/index.js',
  o = () => './components/message-text/index.js',
  i =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110515534601906850201240.png',
  s = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const n = e.ref(null),
        o = e.ref(null),
        s = e.ref({ h: 0, m: 0, s: 0 }),
        u = e.computed(() =>
          m.value.autoEndTime
            ? e.dayjs(m.value.autoEndTime).valueOf()
            : e.dayjs().add(1, 'day').valueOf()
        ),
        r = e.ref(!0),
        l = e.ref(''),
        d = e.ref(''),
        v = e.ref(null),
        c = e.ref('远程诊疗中心'),
        p = e.ref(''),
        g = e.ref(i),
        f = () => {
          g.value = i;
        },
        m = e.ref({}),
        y = async (a) => {
          const { data: t } = await e.requestInquiryOrderDetail({
            inquiryOrderId: a,
          });
          m.value = t;
          const n = t.inquiryStatus;
          [
            e.InquiryStatus.DealingDiagnosis,
            e.InquiryStatus.WaitDiagnosis,
          ].includes(n) || (w.value = !0);
        },
        I = (a) => (a.avatar ? a.avatar : e.getServiceUserInfo(m.value).avatar),
        T = e.getCurrentInstance(),
        h = (e) => {
          (M.value = e.height), S();
        },
        x = e.ref(),
        S = () => {
          var a;
          (null == (a = J.value) ? void 0 : a.length) > 0 &&
            ((x.value = 0),
            e.nextTick$1(() => {
              x.value = void 0;
            }));
        },
        w = e.ref(!1),
        M = e.ref(0),
        q = e.computed(() =>
          w.value
            ? { paddingBottom: '0px' }
            : M.value > 0
              ? { paddingBottom: `${M.value}px`, backgroundColor: '#ffffff' }
              : {
                  paddingBottom: `calc(${M.value}px + var(--safe-area-inset-bottom))`,
                  backgroundColor: '#ffffff',
                }
        ),
        D = () => {
          S();
        },
        b = () => {
          S();
        },
        U = () => {
          S();
        },
        C = () => {
          var e, a;
          const t = null == (e = R.value) ? void 0 : e.conversationID,
            n = null == (a = R.value) ? void 0 : a.type;
          return t ? t.replace(n, '') : '';
        },
        L = (a) => {
          const t = a.payload.data;
          if (!t) return;
          const n = JSON.parse(t).customType === e.TUIKitMessageCustomType.Hint;
          return a.type === e.TUIKitMessageType.Custom && n;
        },
        K = (a) => a.type === e.TUIKitMessageType.Custom,
        O = (a) => a.type === e.TUIKitMessageType.Text,
        { handleUploadImage: $ } = e.useUploadImage(),
        H = async (a) => {
          var t;
          const n = await $(a);
          if (!n) return;
          const o = null == (t = R.value) ? void 0 : t.type;
          if (!o) return;
          const i = C(),
            s = e.index.$TUIKit.createCustomMessage({
              to: i,
              conversationType: o,
              payload: {
                data: JSON.stringify({
                  customType: 'image',
                  childType: 'sendImage',
                  patientShow: 1,
                  doctorShow: 1,
                  data: { url: n },
                }),
                description: '发送图片',
                extension: 'ycf',
              },
            });
          await e.index.$TUIKit.sendMessage(s),
            (J.value = e.filterImMessage([...J.value, s])),
            S();
        },
        N = e.ref(''),
        E = async () => {
          var a;
          const t = N.value.trim();
          if (!t)
            return void e.index.showToast({
              title: '请输入聊天内容',
              icon: 'none',
            });
          const n = null == (a = R.value) ? void 0 : a.type;
          if (n)
            try {
              const a = C(),
                o = e.index.$TUIKit.createTextMessage({
                  to: a,
                  conversationType: n,
                  payload: { text: t },
                });
              await e.index.$TUIKit.sendMessage(o),
                (J.value = e.filterImMessage([...J.value, o])),
                (N.value = ''),
                S();
            } catch (o) {
              console.error('消息发送失败：', o),
                e.index.showToast({
                  title: '消息发送失败，请重试',
                  icon: 'none',
                });
            }
        },
        R = e.ref(null),
        j = async () => {
          if (e.index.$TUIKit.isReady())
            try {
              const { data: a } = await e.index.$TUIKit.getConversationProfile(
                e.ConversationType.GROUP + l.value
              );
              (R.value = a.conversation), await A();
            } catch (a) {
              console.log(a);
            }
        },
        k = e.ref(!1),
        _ = e.ref(e.LoadMoreStatus.More),
        P = async () => {
          if (_.value === e.LoadMoreStatus.More)
            try {
              (_.value = e.LoadMoreStatus.Loading),
                k.value ? await V() : await A();
            } catch (a) {
              console.log(a);
            }
        },
        B = e.ref(''),
        J = e.ref([]),
        A = async () => {
          var a, t, n;
          const { data: o } = await e.index.$TUIKit.getMessageList({
            conversationID: null == (a = R.value) ? void 0 : a.conversationID,
            nextReqMessageID: B.value,
          });
          (k.value = o.isCompleted),
            (B.value = o.nextReqMessageID),
            (_.value = e.LoadMoreStatus.More),
            (J.value = e.filterImMessage([...o.messageList, ...J.value])),
            console.log('messageList.value', J.value),
            o.isCompleted &&
              (null == (t = o.messageList) ? void 0 : t.length) &&
              ((G.value = `${o.messageList[0].sequence}_${o.messageList[0].random}_${o.messageList[0].time}`),
              (Z.value = o.messageList[0].time)),
            (null == (n = J.value) ? void 0 : n.length) || (await V());
        },
        G = e.ref(''),
        Z = e.ref(0),
        z = e.ref(!1),
        V = async () => {
          (_.value = e.LoadMoreStatus.Loading),
            setTimeout(() => {
              (z.value = !0), (_.value = e.LoadMoreStatus.NoMore);
            }, 300);
        },
        W = async (a) => {
          var t, n, o;
          const i = JSON.parse(JSON.stringify(a.data)),
            s = i.filter((e) => {
              var a;
              return (
                e.conversationID ===
                (null == (a = R.value) ? void 0 : a.conversationID)
              );
            });
          J.value = e.filterImMessage([...J.value, ...s]);
          const u = JSON.parse(
            null !=
              (o =
                null == (n = null == (t = i[0]) ? void 0 : t.payload)
                  ? void 0
                  : n.data)
              ? o
              : '{}'
          );
          console.log('data:接收消息 ', u),
            u.childType === e.InquiryHintMsgStatusEnum.DiagnosisAcceptSys &&
              (m.value.inquiryStatus = e.InquiryStatus.DealingDiagnosis),
            [
              e.InquiryHintMsgStatusEnum.DiagnosisEndSys,
              e.InquiryHintMsgStatusEnum.WithdrawalPatientHint,
              e.InquiryHintMsgStatusEnum.CancelPatientHint,
            ].includes(u.childType) && (w.value = !0),
            S();
        },
        F = () => {
          const { channelId: a } = m.value,
            {
              id: t,
              userStaffId: n,
              isDoctor: o,
            } = e.getServiceUserInfo(m.value);
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['doctor-detail'], {
            query: {
              doctorUserStaffId: n || t,
              type: o ? e.ExpertListType.Expert : e.ExpertListType.Health,
              orgId: a,
            },
          });
        },
        Q = () => {
          p.value !== e.appNavigator.pagesMap['pay-result']
            ? e.appNavigator.navigateBack()
            : e.appNavigator.switchTab(e.appNavigator.pagesMap.message);
        };
      return (
        t({
          pageOnShow: async () => {
            e.index.onKeyboardHeightChange && e.index.onKeyboardHeightChange(h),
              e.index.$TUIKit.setMessageRead({
                conversationID: e.ConversationType.GROUP + l.value,
              }),
              e.index.$TUIKit.on(e.TUIKitEventType.MessageReceived, W, T);
          },
          pageOnLoad: async (a) => {
            var t;
            (d.value = a.doctorAssistUserStaffId),
              (c.value = a.navigationBarTitle),
              (l.value = a.chatImId),
              (v.value = a.inquiryType),
              (p.value = null != (t = a.fromPage) ? t : '');
            const n = e.index.getStorageSync('avatarUrl');
            n && (g.value = n);
            try {
              if (
                ((r.value = !0),
                e.index.showLoading({ title: '加载中…', mask: !0 }),
                v.value !== e.InquiryType.Specialist)
              ) {
                if (!a.inquiryOrderId)
                  return e.index.showToast({
                    title: '缺少订单信息',
                    icon: 'none',
                  });
                await y(a.inquiryOrderId);
              }
              setTimeout(async () => {
                await j(), (r.value = !1), e.index.hideLoading();
              }, 500);
            } catch (o) {
              (r.value = !1), e.index.hideLoading();
            }
          },
          pageOnHide: () => {
            e.index.offKeyboardHeightChange &&
              e.index.offKeyboardHeightChange(h),
              (M.value = 0),
              e.index.$TUIKit.setMessageRead({
                conversationID: e.ConversationType.GROUP + l.value,
              });
          },
        }),
        (a, t) =>
          e.e(
            {
              a: e.sr('navbarRef', '49a4cb62-0'),
              b: e.p({ title: e.unref(e.formatValue)(c.value), back: Q }),
              c: e.f(J.value, (a, t, i) =>
                e.e(
                  { a: a.showTime },
                  a.showTime ? { b: e.t(a.timeString) } : {},
                  { c: L(a) },
                  L(a)
                    ? {
                        d: '49a4cb62-1-' + i,
                        e: e.p({ message: a, 'is-patient': 'out' === a.flow }),
                      }
                    : e.e(
                        { f: 'in' === a.flow },
                        'in' === a.flow ? { g: I(a) } : {},
                        { h: K(a) },
                        K(a)
                          ? {
                              i: e.sr(o, '49a4cb62-2-' + i, {
                                k: 'customMessageRef',
                                f: 1,
                              }),
                              j: '49a4cb62-2-' + i,
                              k: e.p({
                                message: a,
                                'im-group-id': l.value,
                                'doctor-assist-user-staff-id': d.value,
                                'is-patient': 'out' === a.flow,
                              }),
                            }
                          : {},
                        { l: O(a) },
                        O(a)
                          ? {
                              m: e.sr(n, '49a4cb62-3-' + i, {
                                k: 'textMessageRef',
                                f: 1,
                              }),
                              n: '49a4cb62-3-' + i,
                              o: e.p({
                                message: a,
                                'is-patient': 'out' === a.flow,
                              }),
                            }
                          : {},
                        { p: 'out' === a.flow },
                        'out' === a.flow ? { q: g.value, r: e.o(f, a.ID) } : {},
                        {
                          s: e.n(
                            'out' === a.flow
                              ? 'message-item-patient'
                              : 'message-item-doctor'
                          ),
                        }
                      ),
                  { t: 'id-' + a.ID, v: a.ID }
                )
              ),
              d: e.p({ 'icon-size': 18, status: _.value }),
              e: _.value ? '' : 'none',
              f: x.value,
              g: e.o(P),
              h: w.value && !r.value,
            },
            w.value && !r.value ? { i: e.o(F) } : {},
            { j: !w.value },
            w.value
              ? {}
              : e.e(
                  {
                    k: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102817375561647810201240.png',
                    l: e.o((e) => H('album')),
                    m: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102817373678215750201233.png',
                    n: e.o((e) => H('camera')),
                    o: v.value !== e.unref(e.InquiryType).Specialist,
                  },
                  v.value !== e.unref(e.InquiryType).Specialist
                    ? e.e(
                        {
                          p: e.t(
                            e.unref(e.InquiryStatusDesc)[m.value.inquiryStatus]
                          ),
                          q:
                            m.value.inquiryStatus ===
                            e.unref(e.InquiryStatus).DealingDiagnosis,
                        },
                        m.value.inquiryStatus ===
                          e.unref(e.InquiryStatus).DealingDiagnosis
                          ? {
                              r: e.t(e.unref(e.padZeroToTwoDigits)(s.value.h)),
                              s: e.t(e.unref(e.padZeroToTwoDigits)(s.value.m)),
                              t: e.t(e.unref(e.padZeroToTwoDigits)(s.value.s)),
                              v: e.o((e) => (s.value = e)),
                              w: e.p({
                                'end-time': u.value,
                                modelValue: s.value,
                              }),
                            }
                          : {}
                      )
                    : {},
                  {
                    x: e.o(U),
                    y: e.o(D),
                    z: e.o(b),
                    A: e.o(E),
                    B: N.value,
                    C: e.o((e) => (N.value = e.detail.value)),
                    D: e.o(E),
                  }
                ),
            { E: e.s(q.value) }
          )
      );
    },
  }),
  u = e._export_sfc(s, [['__scopeId', 'data-v-49a4cb62']]);
wx.createComponent(u);
