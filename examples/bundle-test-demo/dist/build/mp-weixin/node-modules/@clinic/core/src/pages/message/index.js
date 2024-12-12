'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (s + a)();
const a = () => '../../components/Empty/index.js',
  s = () => '../../components/Image/index.js',
  t = e.defineComponent({
    __name: 'index',
    setup(a, { expose: s }) {
      const { checkAuth: t, getToken: n } = e.useAuth(),
        i = e.useUserInfoStore(),
        { userInfo: o } = e.storeToRefs(i),
        { navBarTitleTop: r } = e.useNavSize(),
        u = (a) => e.getServiceUserInfo(a).name,
        l = (a) => e.getServiceUserInfo(a).avatar,
        p = e.ref(!0),
        c = e.ref(),
        g = e.ref(null),
        d = e.ref([]),
        m = async () => {
          var a, s, t;
          if (n())
            try {
              const { data: n } = await e.requestGetJoinedGroupList({
                  userId: null == (a = o.value) ? void 0 : a.loginId,
                }),
                i = [...n],
                r = (await e.index.$TUIKit.getConversationList()).data
                  .conversationList;
              console.log('conversationList', r);
              for (const a of i)
                for (const n of r)
                  if (
                    n.conversationID ===
                    e.ConversationType.GROUP + a.groupId
                  ) {
                    const i = n.lastMessage;
                    if (
                      ((a.lastMessageTimeOriginal = Number(i.lastTime)),
                      (a.unreadCount = n.unreadCount),
                      i.lastTime)
                    ) {
                      const s = e.dayjs(1e3 * i.lastTime),
                        t = e.dayjs();
                      s.isSame(t, 'day')
                        ? (a.lastMessageTime = s.format('HH:mm'))
                        : s.isSame(t, 'year')
                          ? (a.lastMessageTime = s.format('MM-DD'))
                          : (a.lastMessageTime = s.format('YYYY-MM-DD'));
                    }
                    if (i.type === e.TUIKitMessageType.Custom) {
                      const n = JSON.parse(
                        null != (t = null == (s = i.payload) ? void 0 : s.data)
                          ? t
                          : '{}'
                      );
                      (n.customType !== e.TUIKitMessageCustomType.Hint &&
                        n.customType !== e.TUIKitMessageCustomType.Sys) ||
                        ((a.isSystemMessage = !0),
                        (a.lastMessageText = n.data)),
                        n.customType === e.TUIKitMessageCustomType.Image &&
                          (a.lastMessageText = '[图片]'),
                        (null == n ? void 0 : n.inviteID) &&
                          (a.lastMessageText = '[视频通话]'),
                        n.childType &&
                          e.CardMessageText[n.childType] &&
                          (a.lastMessageText = e.CardMessageText[n.childType]),
                        0 === n.patientShow && (a.lastMessageText = ' ');
                    }
                    i.type === e.TUIKitMessageType.Text &&
                      (a.lastMessageText = i.payload.text.replace(
                        /[\r\n]/g,
                        ''
                      ));
                  }
              i.sort((e, a) => {
                var s, t;
                return (
                  (null != (s = a.lastMessageTimeOriginal) ? s : 0) -
                  (null != (t = e.lastMessageTimeOriginal) ? t : 0)
                );
              }),
                (d.value = i),
                (g.value = setTimeout(() => {
                  m();
                }, 2e3));
            } catch (i) {
              console.error(i), g.value && clearTimeout(g.value);
            } finally {
              e.index.hideLoading();
            }
        };
      return (
        s({
          pageOnShow: () => {
            var a;
            null == (a = c.value) || a.pageOnShow(),
              t() &&
                (p.value &&
                  (e.index.showLoading({ title: '加载中…', mask: !0 }),
                  (p.value = !1)),
                e.index.$TUIKit.isReady()
                  ? m()
                  : e.index.$TUIKit.on(e.TUIKitEventType.SDKReady, () => {
                      m();
                    }));
          },
          pageOnLoad: (e) => {
            console.log('pageOnload', e);
          },
          pageOnHide: () => {
            console.log('pageOnHide'), g.value && clearTimeout(g.value);
          },
        }),
        (a, s) =>
          e.e(
            {
              a: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110415433458680870201240.png',
              b: e.unref(r) + 'px',
              c: d.value.length,
            },
            d.value.length
              ? {
                  d: e.f(d.value, (a, s, t) => {
                    var n;
                    return e.e(
                      {
                        a: '78b8cb2d-0-' + t,
                        b: e.p({
                          src:
                            null != (n = l(a))
                              ? n
                              : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110713520686847090201233.png',
                          mode: 'aspectFill',
                        }),
                        c: e.t(e.unref(e.formatValue)(u(a))),
                        d: a.inquiryWay === e.unref(e.InquiryWay).Video,
                      },
                      a.inquiryWay === e.unref(e.InquiryWay).Video
                        ? {
                            e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110515581567578330201240.png',
                          }
                        : {},
                      {
                        f: e.unref(e.TagType)[a.inquiryType],
                        g: e.t(e.unref(e.InquiryTypeDesc)[a.inquiryType]),
                        h: e.n(e.unref(e.TagClass)[a.inquiryType]),
                        i: a.lastMessageTime,
                      },
                      a.lastMessageTime ? { j: e.t(a.lastMessageTime) } : {},
                      { k: a.isSystemMessage },
                      (a.isSystemMessage, {}),
                      { l: a.lastMessageText },
                      a.lastMessageText ? { m: e.t(a.lastMessageText) } : {},
                      { n: a.unreadCount && a.unreadCount > 0 },
                      a.unreadCount && a.unreadCount > 0
                        ? { o: e.t(a.unreadCount) }
                        : {},
                      { p: a.channelName },
                      a.channelName ? { q: e.t(a.channelName) } : {},
                      {
                        r: a.groupId,
                        s: e.o(
                          (s) =>
                            ((a) => {
                              var s;
                              g.value && clearTimeout(g.value),
                                e.appNavigator.navigateTo(
                                  e.appNavigator.pagesMap.chat,
                                  {
                                    query: {
                                      chatImId: a.groupId,
                                      doctorAssistUserStaffId:
                                        a.assistantUserId,
                                      inquiryType: a.inquiryType,
                                      navigationBarTitle:
                                        null != (s = u(a)) ? s : '',
                                      inquiryOrderId: a.inquiryOrderId,
                                    },
                                  }
                                );
                            })(a),
                          a.groupId
                        ),
                      }
                    );
                  }),
                }
              : {
                  e: e.p({
                    top: 118,
                    'empty-icon':
                      'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110417573223910230201240.png',
                    title: '暂无消息',
                    'sub-title': '请进行问诊/咨询服务 \n 后，消息在此显示',
                  }),
                }
          )
      );
    },
  }),
  n = e._export_sfc(t, [['__scopeId', 'data-v-78b8cb2d']]);
wx.createComponent(n);
