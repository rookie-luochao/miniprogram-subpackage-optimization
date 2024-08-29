'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (a + t + n)();
const t = () => './components/message-custom/index.js',
  a = () => './components/message-system/index.js',
  n = () => './components/message-text/index.js',
  i = e.defineComponent({
    __name: 'index',
    props: { isShowMedicalDocuments: { type: Boolean } },
    setup(t, { expose: a }) {
      const n = e.getCurrentInstance(),
        i = e.ref(!1),
        u = e.ref(''),
        s = () => {
          var e;
          (null == (e = A.value) ? void 0 : e.length) > 0 &&
            ((u.value = 'chat-item-end-dom'),
            setTimeout(() => (u.value = ''), 50));
        },
        o = e.ref(0),
        l = e.computed(() =>
          i.value
            ? { paddingBottom: '0px' }
            : o.value > 0
              ? { paddingBottom: `${o.value}px`, backgroundColor: '#ffffff' }
              : {
                  paddingBottom: `calc(${o.value}px + env(safe-area-inset-bottom))`,
                  backgroundColor: '#ffffff',
                }
        ),
        r = (e) => {
          (o.value = e.height), setTimeout(() => s(), 0);
        },
        c = () => {
          setTimeout(() => s(), 0);
        },
        v = () => {
          setTimeout(() => s(), 100);
        },
        d = () => {
          $.value || setTimeout(() => s(), 0);
        },
        m = () => {
          var t, a;
          if (1 === (null == (t = I.value) ? void 0 : t.referral))
            return '已转诊';
          const n = null == (a = I.value) ? void 0 : a.inquiryStatus;
          return e.InquiryStatusDesc[n];
        },
        p = (e) => {
          const t = e.payload.data;
          if (!t) return;
          const a = 'hint' === JSON.parse(t).customType;
          return 'TIMCustomElem' === e.type && a;
        },
        g = (e) => 'TIMCustomElem' === e.type,
        y = (e) => 'TIMTextElem' === e.type,
        I = e.ref(null),
        f = e.ref(null),
        h = () => {
          var e, t;
          const a = null == (e = T.value) ? void 0 : e.conversationID,
            n = null == (t = T.value) ? void 0 : t.type;
          return a ? a.replace(n, '') : '';
        },
        { handleUploadImage: S } = e.useUploadImage(),
        q = async (t) => {
          var a;
          const n = await S(t);
          if (!n) return;
          const i = null == (a = T.value) ? void 0 : a.type;
          if (!i) return;
          const u = h(),
            o = e.index.$TUIKit.createCustomMessage({
              to: u,
              conversationType: i,
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
          await e.index.$TUIKit.sendMessage(o),
            (A.value = e.filterImMessage([...A.value, o])),
            setTimeout(() => s(), 0);
        },
        E = e.ref(''),
        D = async () => {
          var t;
          const a = E.value.trim();
          if (!a)
            return void e.index.showToast({
              title: '请输入聊天内容',
              icon: 'none',
            });
          const n = null == (t = T.value) ? void 0 : t.type;
          if (n)
            try {
              const t = h(),
                i = e.index.$TUIKit.createTextMessage({
                  to: t,
                  conversationType: n,
                  payload: { text: a },
                });
              await e.index.$TUIKit.sendMessage(i),
                (A.value = e.filterImMessage([...A.value, i])),
                (E.value = ''),
                setTimeout(() => s(), 0);
            } catch (i) {
              console.error('消息发送失败：', i),
                e.index.showToast({
                  title: '消息发送失败，请重试',
                  icon: 'none',
                });
            }
        },
        T = e.ref(null),
        M = e.ref(!1),
        x = e.ref(!0),
        w = async () => {
          try {
            (M.value = !0), C.value ? await H() : await U();
          } catch (e) {
            console.log(e);
          }
        },
        $ = e.ref(!0),
        C = e.ref(!1),
        b = e.ref(''),
        A = e.ref([]),
        U = async () => {
          var t, a, n;
          const { data: i } = await e.index.$TUIKit.getMessageList({
            conversationID: null == (t = T.value) ? void 0 : t.conversationID,
            nextReqMessageID: b.value,
          });
          M.value = !1;
          let o = '';
          const l = e.filterImMessage(i.messageList);
          (null == l ? void 0 : l.length) && (o = `id-${l[l.length - 1].ID}`),
            (C.value = i.isCompleted),
            (b.value = i.nextReqMessageID),
            (A.value = e.filterImMessage([...i.messageList, ...A.value])),
            i.isCompleted &&
              (null == (a = i.messageList) ? void 0 : a.length) &&
              ((O.value = `${i.messageList[0].sequence}_${i.messageList[0].random}_${i.messageList[0].time}`),
              (F.value = i.messageList[0].time)),
            (null == (n = A.value) ? void 0 : n.length)
              ? $.value
                ? (($.value = !1), setTimeout(() => s(), 100))
                : o && (u.value = o)
              : await H();
        },
        O = e.ref(''),
        F = e.ref(0),
        K = e.ref(!1),
        H = async () => {
          var t, a;
          try {
            const { data: n } = await e.requestGetRecordsForChat({
              toAccountID: null == (t = I.value) ? void 0 : t.doctorImID,
              accountID: null == (a = I.value) ? void 0 : a.patientImID,
              msgKey: O.value,
              msgTime: F.value,
            });
            M.value = !1;
            let i = n.messageList,
              o = '';
            if (null == i ? void 0 : i.length) {
              i =
                null == i
                  ? void 0
                  : i.map((e) => {
                      var t;
                      return e.from ===
                        (null == (t = I.value) ? void 0 : t.doctorImID)
                        ? { ...e, ID: e.id, flow: 'in' }
                        : { ...e, ID: e.id, flow: 'out' };
                    });
              const t = e.filterImMessage(i);
              (null == t ? void 0 : t.length) &&
                (o = `id-${t[t.length - 1].ID}`),
                (A.value = e.filterImMessage([...i, ...A.value])),
                (O.value = `${i[0].sequence}_${i[0].random}_${i[0].time}`),
                (F.value = i[0].time);
            }
            (K.value = n.completed),
              n.completed &&
                e.nextTick$1(() => {
                  x.value = !1;
                }),
              $.value
                ? (($.value = !1), setTimeout(() => s(), 100))
                : o && (u.value = o);
          } catch (n) {
            console.log(n);
          }
        },
        L = async (t) => {
          var a, n, i;
          const u = JSON.parse(JSON.stringify(t.data)),
            o = u.filter((e) => {
              var t;
              return (
                e.conversationID ===
                (null == (t = T.value) ? void 0 : t.conversationID)
              );
            });
          A.value = e.filterImMessage([...A.value, ...o]);
          const l = JSON.parse(
            null !=
              (i =
                null == (n = null == (a = u[0]) ? void 0 : a.payload)
                  ? void 0
                  : n.data)
              ? i
              : '{}'
          );
          if ((console.log('data:接收消息 ', l), 'transfer' === l.childType)) {
            const { inquiryOrderID: t } = l.data;
            return void setTimeout(() => {
              e.appNavigator.redirectTo(e.appNavigator.pagesMap.chat, {
                query: { orderID: t },
              });
            }, 2e3);
          }
          const r = {
            [e.InquiryMsgStatusEnum.Finish]: e.InquiryStatusEnum.EndFinish,
            [e.InquiryMsgStatusEnum.CancelInquiryHint]:
              e.InquiryStatusEnum.EndFinish,
            [e.InquiryMsgStatusEnum.FinishHint]: e.InquiryStatusEnum.EndFinish,
            [e.InquiryMsgStatusEnum.ProficientRefundInquiry]:
              e.InquiryStatusEnum.EndFinish,
            [e.InquiryMsgStatusEnum.AcceptOverTimeHint]:
              e.InquiryStatusEnum.EndFinish,
            [e.InquiryMsgStatusEnum.AutoFinishHint]:
              e.InquiryStatusEnum.EndFinish,
            [e.InquiryMsgStatusEnum.AcceptInquiryOrderHint]:
              e.InquiryStatusEnum.DealingAccept,
            [e.InquiryMsgStatusEnum.RpOrderStart]:
              e.InquiryStatusEnum.DealingAccept,
          };
          I.value && r[l.childType] && (I.value.inquiryStatus = r[l.childType]);
          new Set([
            e.InquiryMsgStatusEnum.Finish,
            e.InquiryMsgStatusEnum.CancelInquiryHint,
            e.InquiryMsgStatusEnum.FinishHint,
            e.InquiryMsgStatusEnum.ProficientRefundInquiry,
            e.InquiryMsgStatusEnum.AcceptOverTimeHint,
            e.InquiryMsgStatusEnum.AutoFinishHint,
          ]).has(l.childType) && (K.value = !0),
            setTimeout(() => {
              s();
            }, 0);
        },
        N = e.ref(''),
        _ = e.ref(!0);
      return (
        a({
          pageOnLoad: async (t) => {
            N.value = t.orderID;
            try {
              (_.value = !0),
                e.index.showLoading({ title: '加载中…', mask: !0 }),
                await (async () => {
                  const { data: t } = await e.requestGetInquiryOrderDetail({
                    inquiryOrderID: N.value,
                  });
                  I.value = t;
                  const a = t.inquiryStatus;
                  [
                    e.InquiryStatusEnum.DealingAccept,
                    e.InquiryStatusEnum.DealingWaitAccept,
                  ].includes(a) || (i.value = !0);
                })(),
                await (async () => {
                  var t;
                  const { data: a } = await e.requestGetDoctorInfoDetail({
                    orgStaffID:
                      null == (t = I.value) ? void 0 : t.doctorStaffID,
                  });
                  f.value = a;
                })(),
                await (async () => {
                  var t;
                  if (e.index.$TUIKit.isReady())
                    try {
                      const a = await e.index.$TUIKit.getConversationProfile(
                        'C2C' + (null == (t = I.value) ? void 0 : t.doctorImID)
                      );
                      (T.value = a.data.conversation), await U();
                    } catch (a) {
                      console.log(a);
                    }
                })();
            } finally {
              (_.value = !1), e.index.hideLoading();
            }
          },
          pageOnShow: () => {
            e.index.onKeyboardHeightChange(r),
              e.index.$TUIKit.on(e.index.$TUIKitEvent.MESSAGE_RECEIVED, L, n);
          },
          pageOnHide: () => {
            e.index.offKeyboardHeightChange(r),
              e.index.$TUIKit.off(e.index.$TUIKitEvent.MESSAGE_RECEIVED, L);
          },
        }),
        (t, a) => {
          var n, s, o, r, h, S, T, $, C, b, U, O;
          return e.e(
            { a: null == (n = f.value) ? void 0 : n.photoUrl },
            (null == (s = f.value) ? void 0 : s.photoUrl)
              ? { b: null == (o = f.value) ? void 0 : o.photoUrl }
              : {},
            {
              c: e.t(
                e.unref(e.formatValue)(
                  null == (r = f.value) ? void 0 : r.doctorName
                )
              ),
              d: null == (h = f.value) ? void 0 : h.doctorName,
            },
            (null == (S = f.value) || S.doctorName, {}),
            {
              e: e.t(null == (T = f.value) ? void 0 : T.sectionName),
              f: e.t(null == ($ = f.value) ? void 0 : $.titleName),
              g: !_.value,
            },
            _.value
              ? {}
              : e.e(
                  {
                    h:
                      (null == (C = I.value) ? void 0 : C.inquiryStatus) ===
                      e.unref(e.InquiryStatusEnum).DealingWaitAccept,
                  },
                  (null == (b = I.value) ? void 0 : b.inquiryStatus) ===
                    e.unref(e.InquiryStatusEnum).DealingWaitAccept
                    ? {
                        i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24080511392455944240201233.png',
                        j: e.t(m()),
                      }
                    : (null == (U = I.value) ? void 0 : U.inquiryStatus) ===
                        e.unref(e.InquiryStatusEnum).DealingAccept
                      ? { l: e.t(m()) }
                      : { m: e.t(m()) },
                  {
                    k:
                      (null == (O = I.value) ? void 0 : O.inquiryStatus) ===
                      e.unref(e.InquiryStatusEnum).DealingAccept,
                  }
                ),
            {
              n: e.f(A.value, (t, a, n) =>
                e.e(
                  { a: p(t) },
                  p(t)
                    ? {
                        b: '1185174b-0-' + n,
                        c: e.p({ message: t, 'is-patient': 'out' === t.flow }),
                      }
                    : e.e(
                        { d: g(t) },
                        g(t)
                          ? { e: '1185174b-1-' + n, f: e.p({ message: t }) }
                          : {},
                        { g: y(t) },
                        y(t)
                          ? {
                              h: '1185174b-2-' + n,
                              i: e.p({
                                message: t,
                                'is-patient': 'out' === t.flow,
                              }),
                            }
                          : {},
                        {
                          j: e.n(
                            'out' === t.flow
                              ? 'message-item-patient'
                              : 'message-item-doctor'
                          ),
                        }
                      ),
                  { k: 'id-' + t.ID, l: t.ID }
                )
              ),
              o: i.value && !_.value,
            },
            (i.value && _.value, {}),
            { p: M.value, q: x.value, r: u.value, s: e.o(w), t: !i.value },
            i.value
              ? {}
              : e.e(
                  {
                    v: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24080514105505561090201240.png',
                    w: e.o((e) => q('album')),
                    x: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24080514115898678620201233.png',
                    y: e.o((e) => q('camera')),
                    z: t.isShowMedicalDocuments,
                  },
                  t.isShowMedicalDocuments
                    ? {
                        A: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24080514114234420950201240.png',
                      }
                    : {},
                  {
                    B: e.o(d),
                    C: e.o(c),
                    D: e.o(v),
                    E: e.o(D),
                    F: E.value,
                    G: e.o((e) => (E.value = e.detail.value)),
                    H: e.o(D),
                  }
                ),
            { I: e.s(l.value) }
          );
        }
      );
    },
  }),
  u = e._export_sfc(i, [['__scopeId', 'data-v-1185174b']]);
wx.createComponent(u);
