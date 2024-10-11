'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  e.resolveComponent('uni-load-more')();
}
Math ||
  (
    t +
    a +
    n +
    (() =>
      '../../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js')
  )();
const a = () => './components/message-custom/index.js',
  t = () => './components/message-system/index.js',
  n = () => './components/message-text/index.js',
  u = e.defineComponent({
    __name: 'index',
    props: {
      isPrescriptionAuth: { type: Boolean, default: !0 },
      isShowMedicalDocuments: { type: Boolean, default: !1 },
    },
    setup(a, { expose: t }) {
      const n = a,
        {
          handleToTransfer: u,
          handleToRefund: i,
          handleAutoJump: o,
        } = e.useOrderAction(n.isPrescriptionAuth),
        l = e.ref(null),
        s = e.ref(null),
        r = e.ref(''),
        c = e.ref(!0),
        d = e.ref(null),
        v = e.getCurrentInstance(),
        m = (e) => {
          (f.value = e.height), y();
        },
        p = e.ref(),
        y = () => {
          var a;
          (null == (a = j.value) ? void 0 : a.length) > 0 &&
            ((p.value = 0),
            e.nextTick$1(() => {
              p.value = void 0;
            }));
        },
        g = e.ref(!1),
        f = e.ref(0),
        I = e.computed(() =>
          g.value
            ? { paddingBottom: '0px' }
            : f.value > 0
              ? { paddingBottom: `${f.value}px`, backgroundColor: '#ffffff' }
              : {
                  paddingBottom: `calc(${f.value}px + env(safe-area-inset-bottom))`,
                  backgroundColor: '#ffffff',
                }
        ),
        h = () => {
          y();
        },
        S = () => {
          y();
        },
        q = () => {
          y();
        },
        E = e.computed(() => {
          var a, t, n;
          const u = null == (a = x.value) ? void 0 : a.payStatus,
            i = null == (t = x.value) ? void 0 : t.inquiryStatus;
          if (1 === (null == (n = x.value) ? void 0 : n.referral))
            return '已转诊';
          if (u === e.PaymentStatusEnum.WaitPay) return '待支付';
          const o = [
            e.PaymentStatusEnum.PaySuccess,
            e.PaymentStatusEnum.NoNeed,
          ];
          return i === e.InquiryStatusEnum.DealingWaitAccept && o.includes(u)
            ? '待接诊'
            : e.InquiryStatusDesc[i] || '--';
        }),
        D = (e) => {
          const a = e.payload.data;
          if (!a) return;
          const t = 'hint' === JSON.parse(a).customType;
          return 'TIMCustomElem' === e.type && t;
        },
        M = (e) => 'TIMCustomElem' === e.type,
        T = (e) => 'TIMTextElem' === e.type,
        x = e.ref(null),
        w = async () => {
          const { data: a } = await e.requestGetInquiryOrderDetail({
            inquiryOrderID: r.value,
          });
          x.value = a;
          const t = a.inquiryStatus;
          [
            e.InquiryStatusEnum.DealingAccept,
            e.InquiryStatusEnum.DealingWaitAccept,
          ].includes(t) || (g.value = !0);
        },
        C = e.ref(null),
        b = async () => {
          var a;
          const { data: t } = await e.requestGetDoctorInfoDetail({
            orgStaffID: null == (a = x.value) ? void 0 : a.doctorStaffID,
          });
          C.value = t;
        },
        A = e.ref(0),
        O = async () => {
          var a, t;
          if (
            (null == (a = x.value) ? void 0 : a.inquiryStatus) ===
            e.InquiryStatusEnum.DealingWaitAccept
          ) {
            const { data: a } = await e.requestGetHlpDoctorOrderSize({
              doctorID: null == (t = x.value) ? void 0 : t.doctorImID,
              inquiryOrderID: r.value,
            });
            (0 === A.value || a < A.value) && (A.value = a),
              (d.value = setTimeout(() => O(), 5e3));
          }
        },
        L = () => {
          var e, a;
          const t = null == (e = U.value) ? void 0 : e.conversationID,
            n = null == (a = U.value) ? void 0 : a.type;
          return t ? t.replace(n, '') : '';
        },
        { handleUploadImage: $ } = e.useUploadImage(),
        N = async (a) => {
          var t;
          const n = await $(a);
          if (!n) return;
          const u = null == (t = U.value) ? void 0 : t.type;
          if (!u) return;
          const i = L(),
            o = e.index.$TUIKit.createCustomMessage({
              to: i,
              conversationType: u,
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
            (j.value = e.filterImMessage([...j.value, o])),
            y();
        },
        H = e.ref(''),
        K = async () => {
          var a;
          const t = H.value.trim();
          if (!t)
            return void e.index.showToast({
              title: '请输入聊天内容',
              icon: 'none',
            });
          const n = null == (a = U.value) ? void 0 : a.type;
          if (n)
            try {
              const a = L(),
                u = e.index.$TUIKit.createTextMessage({
                  to: a,
                  conversationType: n,
                  payload: { text: t },
                });
              await e.index.$TUIKit.sendMessage(u),
                (j.value = e.filterImMessage([...j.value, u])),
                (H.value = ''),
                y();
            } catch (u) {
              console.error('消息发送失败：', u),
                e.index.showToast({
                  title: '消息发送失败，请重试',
                  icon: 'none',
                });
            }
        },
        U = e.ref(null),
        R = async () => {
          var a;
          if (e.index.$TUIKit.isReady())
            try {
              const t = await e.index.$TUIKit.getConversationProfile(
                'C2C' + (null == (a = x.value) ? void 0 : a.doctorImID)
              );
              (U.value = t.data.conversation), await J();
            } catch (t) {
              console.log(t);
            }
        },
        P = e.ref(!1),
        _ = e.ref(e.LoadMoreStatus.More),
        F = async () => {
          if (_.value === e.LoadMoreStatus.More)
            try {
              (_.value = e.LoadMoreStatus.Loading),
                P.value ? await z() : await J();
            } catch (a) {
              console.log(a);
            }
        },
        k = e.ref(''),
        j = e.ref([]),
        J = async () => {
          var a, t, n;
          const { data: u } = await e.index.$TUIKit.getMessageList({
            conversationID: null == (a = U.value) ? void 0 : a.conversationID,
            nextReqMessageID: k.value,
          });
          (P.value = u.isCompleted),
            (k.value = u.nextReqMessageID),
            (_.value = e.LoadMoreStatus.More),
            (j.value = e.filterImMessage([...u.messageList, ...j.value])),
            u.isCompleted &&
              (null == (t = u.messageList) ? void 0 : t.length) &&
              ((B.value = `${u.messageList[0].sequence}_${u.messageList[0].random}_${u.messageList[0].time}`),
              (G.value = u.messageList[0].time)),
            (null == (n = j.value) ? void 0 : n.length) || (await z());
        },
        B = e.ref(''),
        G = e.ref(0),
        W = e.ref(!1),
        z = async () => {
          var a, t;
          try {
            const { data: n } = await e.requestGetRecordsForChat({
              toAccountID: null == (a = x.value) ? void 0 : a.doctorImID,
              accountID: null == (t = x.value) ? void 0 : t.patientImID,
              msgKey: B.value,
              msgTime: G.value,
            });
            _.value = e.LoadMoreStatus.More;
            let u = n.messageList;
            (null == u ? void 0 : u.length) &&
              ((u =
                null == u
                  ? void 0
                  : u.map((e) => {
                      var a;
                      return e.from ===
                        (null == (a = x.value) ? void 0 : a.doctorImID)
                        ? { ...e, ID: e.id, flow: 'in' }
                        : { ...e, ID: e.id, flow: 'out' };
                    })),
              (j.value = e.filterImMessage([...u, ...j.value])),
              (B.value = `${u[0].sequence}_${u[0].random}_${u[0].time}`),
              (G.value = u[0].time)),
              (W.value = n.completed),
              n.completed && (_.value = e.LoadMoreStatus.NoMore);
          } catch (n) {
            console.log(n);
          }
        },
        V = async (a) => {
          var t, n, u, i;
          const o = JSON.parse(JSON.stringify(a.data)),
            l = o.filter((e) => {
              var a;
              return (
                e.conversationID ===
                (null == (a = U.value) ? void 0 : a.conversationID)
              );
            });
          j.value = e.filterImMessage([...j.value, ...l]);
          const s = JSON.parse(
            null !=
              (u =
                null == (n = null == (t = o[0]) ? void 0 : t.payload)
                  ? void 0
                  : n.data)
              ? u
              : '{}'
          );
          if (
            (console.log('data:接收消息 ', s),
            'transfer' === s.childType &&
              (null == (i = x.value) ? void 0 : i.payStatus) ===
                e.PaymentStatusEnum.NoNeed)
          ) {
            const { inquiryOrderID: a } = s.data;
            return void setTimeout(() => {
              e.appNavigator.redirectTo(e.appNavigator.pagesMap.chat, {
                query: { orderID: a },
              });
            }, 2e3);
          }
          const r = {
            [e.InquiryMsgStatusEnum.Finish]: e.InquiryStatusEnum.EndFinish,
            [e.InquiryMsgStatusEnum.CancelInquiryHint]:
              e.InquiryStatusEnum.EndDoctorCancel,
            [e.InquiryMsgStatusEnum.FinishHint]:
              e.InquiryStatusEnum.EndOverTimeCancel,
            [e.InquiryMsgStatusEnum.ProficientRefundInquiry]:
              e.InquiryStatusEnum.EndDoctorRefund,
            [e.InquiryMsgStatusEnum.AcceptOverTimeHint]:
              e.InquiryStatusEnum.EndOverTimeCancel,
            [e.InquiryMsgStatusEnum.AutoFinishHint]:
              e.InquiryStatusEnum.EndFinish,
            [e.InquiryMsgStatusEnum.AcceptInquiryOrderHint]:
              e.InquiryStatusEnum.DealingAccept,
            [e.InquiryMsgStatusEnum.RpOrderStart]:
              e.InquiryStatusEnum.DealingAccept,
          };
          x.value && r[s.childType] && (x.value.inquiryStatus = r[s.childType]);
          new Set([
            e.InquiryMsgStatusEnum.Finish,
            e.InquiryMsgStatusEnum.CancelInquiryHint,
            e.InquiryMsgStatusEnum.FinishHint,
            e.InquiryMsgStatusEnum.ProficientRefundInquiry,
            e.InquiryMsgStatusEnum.AcceptOverTimeHint,
            e.InquiryMsgStatusEnum.AutoFinishHint,
          ]).has(s.childType) && (g.value = !0),
            y();
        };
      return (
        t({
          pageOnLoad: async (a) => {
            r.value = a.orderID;
            try {
              (c.value = !0),
                e.index.showLoading({ title: '加载中…', mask: !0 }),
                await w(),
                await b(),
                await O(),
                await R();
            } finally {
              (c.value = !1), e.index.hideLoading();
            }
          },
          pageOnShow: async () => {
            e.index.onKeyboardHeightChange && e.index.onKeyboardHeightChange(m),
              e.index.$TUIKit.on(e.index.$TUIKitEvent.MESSAGE_RECEIVED, V, v),
              o();
          },
          pageOnHide: () => {
            e.index.offKeyboardHeightChange &&
              e.index.offKeyboardHeightChange(m),
              (f.value = 0),
              d.value && clearTimeout(d.value);
          },
        }),
        (a, t) => {
          var n, o, r, d, v, m, y, f, w, b, O, L;
          return e.e(
            { a: null == (n = C.value) ? void 0 : n.photoUrl },
            (null == (o = C.value) ? void 0 : o.photoUrl)
              ? { b: null == (r = C.value) ? void 0 : r.photoUrl }
              : {},
            {
              c: e.t(
                e.unref(e.formatValue)(
                  null == (d = C.value) ? void 0 : d.doctorName
                )
              ),
              d: null == (v = C.value) ? void 0 : v.doctorName,
            },
            (null == (m = C.value) || m.doctorName, {}),
            {
              e: e.t(null == (y = C.value) ? void 0 : y.sectionName),
              f: e.t(null == (f = C.value) ? void 0 : f.titleName),
              g: !c.value,
            },
            c.value
              ? {}
              : e.e(
                  {
                    h:
                      (null == (w = x.value) ? void 0 : w.inquiryStatus) ===
                      e.unref(e.InquiryStatusEnum).DealingWaitAccept,
                  },
                  (null == (b = x.value) ? void 0 : b.inquiryStatus) ===
                    e.unref(e.InquiryStatusEnum).DealingWaitAccept
                    ? {
                        i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24080511392455944240201233.png',
                        j: e.t(E.value),
                        k: e.t(A.value),
                      }
                    : (null == (O = x.value) ? void 0 : O.inquiryStatus) ===
                        e.unref(e.InquiryStatusEnum).DealingAccept
                      ? { m: e.t(E.value) }
                      : { n: e.t(E.value) },
                  {
                    l:
                      (null == (L = x.value) ? void 0 : L.inquiryStatus) ===
                      e.unref(e.InquiryStatusEnum).DealingAccept,
                  }
                ),
            {
              o: e.f(j.value, (a, t, n) =>
                e.e(
                  { a: a.showTime },
                  a.showTime ? { b: e.t(a.timeString) } : {},
                  { c: D(a) },
                  D(a)
                    ? {
                        d: '080cd11b-0-' + n,
                        e: e.p({ message: a, 'is-patient': 'out' === a.flow }),
                      }
                    : e.e(
                        { f: M(a) },
                        M(a)
                          ? {
                              g: e.sr(s, '080cd11b-1-' + n, {
                                k: 'customMessageRef',
                                f: 1,
                              }),
                              h: '080cd11b-1-' + n,
                              i: e.p({
                                message: a,
                                'order-detail': x.value,
                                'handle-to-transfer': e.unref(u),
                                'handle-to-refund': e.unref(i),
                              }),
                            }
                          : {},
                        { j: T(a) },
                        T(a)
                          ? {
                              k: e.sr(l, '080cd11b-2-' + n, {
                                k: 'textMessageRef',
                                f: 1,
                              }),
                              l: '080cd11b-2-' + n,
                              m: e.p({
                                message: a,
                                'is-patient': 'out' === a.flow,
                              }),
                            }
                          : {},
                        {
                          n: e.n(
                            'out' === a.flow
                              ? 'message-item-patient'
                              : 'message-item-doctor'
                          ),
                        }
                      ),
                  { o: 'id-' + a.ID, p: a.ID }
                )
              ),
              p: g.value && !c.value,
            },
            (g.value && c.value, {}),
            {
              q: e.p({ 'icon-size': 18, status: _.value }),
              r: _.value ? '' : 'none',
              s: p.value,
              t: e.o(F),
              v: !g.value,
            },
            g.value
              ? {}
              : e.e(
                  {
                    w: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24080514105505561090201240.png',
                    x: e.o((e) => N('album')),
                    y: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24080514115898678620201233.png',
                    z: e.o((e) => N('camera')),
                    A: a.isShowMedicalDocuments,
                  },
                  a.isShowMedicalDocuments
                    ? {
                        B: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24080514114234420950201240.png',
                      }
                    : {},
                  {
                    C: e.o(q),
                    D: e.o(h),
                    E: e.o(S),
                    F: e.o(K),
                    G: H.value,
                    H: e.o((e) => (H.value = e.detail.value)),
                    I: e.o(K),
                  }
                ),
            { J: e.s(I.value) }
          );
        }
      );
    },
  }),
  i = e._export_sfc(u, [['__scopeId', 'data-v-080cd11b']]);
wx.createComponent(i);
