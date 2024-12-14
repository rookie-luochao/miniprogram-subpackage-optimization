'use strict';
const e = require('../../../../../../../../common/vendor.js');
Math || a();
const a = () => '../../../../components/Image/index.js',
  o =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110515560323679960201233.png',
  t =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110719375552046570201240.png',
  r = e.defineComponent({
    __name: 'index',
    props: {
      message: {},
      isPatient: { type: Boolean },
      imGroupId: {},
      doctorAssistUserStaffId: {},
    },
    setup(a) {
      const r = a,
        l = e.ref(void 0);
      e.watch(
        () => r.message,
        async () => {
          l.value = await e.parseCustom(r.message);
        },
        { deep: !0, immediate: !0 }
      );
      const d = e.computed(() => {
          const e = JSON.parse(r.message.payload.data),
            a = JSON.parse(e.data);
          return {
            orderCreateUser: a.orderCreateUser,
            orderCreateUserId: a.orderCreateUserId,
            orderCreateUserType: a.orderCreateUserType,
          };
        }),
        n = () => {
          var a, o;
          (null == (a = l.value) ? void 0 : a.channelId)
            ? e.appNavigator.navigateTo(e.appNavigator.pagesMap.vocational, {
                query: {
                  imGroupId: r.imGroupId,
                  doctorAssistUserStaffId: r.doctorAssistUserStaffId,
                  orgId: null == (o = l.value) ? void 0 : o.channelId,
                  ...l.value,
                },
              })
            : e.index.showToast({ title: '缺少机构信息', icon: 'none' });
        },
        u = [
          { id: 'template_one', color: '#FFF5E7', fontColor: '#CA8E33' },
          { id: 'template_two', color: '#E7F5FF', fontColor: '#5094D3' },
          { id: 'template_three', color: '#FFF0EC', fontColor: '#D5536A' },
        ],
        i = (e) => u.find((a) => a.id === e),
        s = () => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['doctor-detail'], {
            query: {},
          });
        },
        v = async () => {
          var a, o, t, d;
          const n = JSON.parse(JSON.parse(r.message.payload.data).data),
            { data: u } = await e.requestInquiryRecipeGoodsOrderInfo({
              rpId: null == (a = l.value) ? void 0 : a.id,
            });
          u.hasGoodsOrder
            ? e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['product-order-detail'],
                {
                  query: {
                    orderId:
                      null == (o = u.goodsOrderDetail)
                        ? void 0
                        : o.goodsOrderId,
                  },
                }
              )
            : e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['order-info-confirm'],
                {
                  query: {
                    orgId: null == (t = l.value) ? void 0 : t.channelId,
                    rpId: null == (d = l.value) ? void 0 : d.id,
                    goodsOrderType: e.GoodsOrderType.Inquiry,
                    orderCreateUser: n.doctorName,
                    orderCreateUserId: n.doctorId,
                    orderCreateUserType: 'DOCTOR',
                  },
                }
              );
        },
        p = () => {
          var a, o, t;
          (null == (a = l.value) ? void 0 : a.channelId)
            ? e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['product-recommend'],
                {
                  query: {
                    orgId: null == (o = l.value) ? void 0 : o.channelId,
                    goodsList: encodeURIComponent(
                      JSON.stringify(
                        null == (t = l.value) ? void 0 : t.goodsList
                      )
                    ),
                    ...d.value,
                  },
                }
              )
            : e.index.showToast({ title: '缺少机构信息', icon: 'none' });
        },
        g = () => {
          var a, o;
          (null == (a = l.value) ? void 0 : a.patientInfoId)
            ? e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['health-records'],
                {
                  query: {
                    patientInfoId:
                      null == (o = l.value) ? void 0 : o.patientInfoId,
                    groupImId: r.imGroupId,
                  },
                }
              )
            : e.index.showToast({ title: '缺少就诊人信息', icon: 'none' });
        },
        c = (a) => {
          e.index.previewImage({ urls: [a], current: 1 });
        };
      return (a, r) => {
        var d,
          u,
          m,
          I,
          y,
          f,
          T,
          C,
          N,
          h,
          U,
          M,
          K,
          O,
          b,
          S,
          x,
          R,
          q,
          w,
          F,
          G,
          A,
          D,
          _,
          P,
          J,
          V,
          E,
          L,
          j,
          H,
          k,
          B,
          z,
          Q;
        return e.e(
          {
            a:
              (null == (d = l.value) ? void 0 : d.type) ===
              e.unref(e.TUIKitMessageCustomType).Image,
          },
          (null == (u = l.value) ? void 0 : u.type) ===
            e.unref(e.TUIKitMessageCustomType).Image
            ? {
                b: null != (m = l.value.src) ? m : '',
                c: e.o((e) => c(l.value.src)),
              }
            : (null == (I = l.value) ? void 0 : I.type) ===
                e.unref(e.TUIKitMessageCardType).NotSupport
              ? { e: e.t(l.value.text) }
              : e.e(
                  {
                    f: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110513521880484330201233.png',
                    g:
                      (null == (y = l.value) ? void 0 : y.type) ===
                      e.unref(e.TUIKitMessageCardType).PatientCard,
                  },
                  (null == (f = l.value) ? void 0 : f.type) ===
                    e.unref(e.TUIKitMessageCardType).PatientCard
                    ? e.e(
                        { h: e.t(l.value.patientName), i: l.value.patientName },
                        (l.value.patientName, {}),
                        {
                          j: e.t(null == (T = l.value) ? void 0 : T.sex),
                          k: null == (C = l.value) ? void 0 : C.age,
                        },
                        (null == (N = l.value) ? void 0 : N.age)
                          ? {
                              l: e.t(
                                (null == (h = l.value) ? void 0 : h.age) + '岁'
                              ),
                            }
                          : {},
                        {
                          m: e.t(e.unref(e.formatValue)(l.value.illDesc)),
                          n:
                            null ==
                            (M = null == (U = l.value) ? void 0 : U.diseaseImg)
                              ? void 0
                              : M.length,
                        },
                        (
                          null ==
                          (O = null == (K = l.value) ? void 0 : K.diseaseImg)
                            ? void 0
                            : O.length
                        )
                          ? {
                              o: e.f(l.value.diseaseImg, (a, o, t) => ({
                                a: '5771fbdd-0-' + t,
                                b: e.p({ src: a, mode: 'aspectFill' }),
                                c: a,
                                d: e.o((e) => c(a), a),
                              })),
                            }
                          : {}
                      )
                    : {},
                  {
                    p:
                      (null == (b = l.value) ? void 0 : b.type) ===
                      e.unref(e.TUIKitMessageCardType).InviteDoctor,
                  },
                  (null == (S = l.value) ? void 0 : S.type) ===
                    e.unref(e.TUIKitMessageCardType).InviteDoctor
                    ? e.e(
                        {
                          q: null != (x = l.value.workPhotoUrl) ? x : o,
                          r: e.t(l.value.doctorName),
                          s: t,
                          t: e.t(l.value.titleName),
                          v: l.value.sectionName,
                        },
                        (l.value.sectionName, {}),
                        {
                          w: e.t(l.value.sectionName),
                          x: null == (R = l.value.tags) ? void 0 : R.length,
                        },
                        (null == (q = l.value.tags) ? void 0 : q.length)
                          ? {
                              y: e.f(l.value.tags, (a, o, t) => {
                                var r, l;
                                return {
                                  a: e.t(a.tagName),
                                  b:
                                    null == (r = i(a.colorTemplateId))
                                      ? void 0
                                      : r.fontColor,
                                  c: a,
                                  d:
                                    null == (l = i(a.colorTemplateId))
                                      ? void 0
                                      : l.color,
                                };
                              }),
                            }
                          : {},
                        {
                          z: e.t(e.unref(e.formatValue)(l.value.goodAt)),
                          A: e.o(n),
                        }
                      )
                    : {},
                  {
                    B:
                      (null == (w = l.value) ? void 0 : w.type) ===
                      e.unref(e.TUIKitMessageCardType).ReferralOrderCard,
                  },
                  (null == (F = l.value) ? void 0 : F.type) ===
                    e.unref(e.TUIKitMessageCardType).ReferralOrderCard
                    ? e.e(
                        {
                          C: o,
                          D: e.t(l.value.doctorName),
                          E: t,
                          F: e.t(l.value.titleName),
                          G: l.value.sectionName,
                        },
                        (l.value.sectionName, {}),
                        {
                          H: e.t(l.value.sectionName),
                          I: null == (G = l.value.tags) ? void 0 : G.length,
                        },
                        (null == (A = l.value.tags) ? void 0 : A.length)
                          ? {
                              J: e.f(l.value.tags, (a, o, t) => {
                                var r, l;
                                return {
                                  a: e.t(a.tagName),
                                  b:
                                    null == (r = i(a.colorTemplateId))
                                      ? void 0
                                      : r.fontColor,
                                  c: a,
                                  d:
                                    null == (l = i(a.colorTemplateId))
                                      ? void 0
                                      : l.color,
                                };
                              }),
                            }
                          : {},
                        {
                          K: e.t(e.unref(e.formatValue)(l.value.goodAt)),
                          L: e.o(s),
                        }
                      )
                    : {},
                  {
                    M:
                      (null == (D = l.value) ? void 0 : D.type) ===
                      e.unref(e.TUIKitMessageCardType).RecipeCard,
                  },
                  (null == (_ = l.value) ? void 0 : _.type) ===
                    e.unref(e.TUIKitMessageCardType).RecipeCard
                    ? e.e(
                        { N: e.t(l.value.patientName), O: l.value.patientName },
                        (l.value.patientName, {}),
                        {
                          P: e.t(null == (P = l.value) ? void 0 : P.patientSex),
                          Q: e.t(
                            (null == (J = l.value) ? void 0 : J.patientAge) +
                              '岁'
                          ),
                          R: e.t(
                            e.unref(e.formatValue)(l.value.primaryDiagnosis)
                          ),
                          S: e.o(v),
                        }
                      )
                    : {},
                  {
                    T:
                      (null == (V = l.value) ? void 0 : V.type) ===
                      e.unref(e.TUIKitMessageCardType).RecommendGoodsCard,
                  },
                  (null == (E = l.value) ? void 0 : E.type) ===
                    e.unref(e.TUIKitMessageCardType).RecommendGoodsCard
                    ? {
                        U: e.f(
                          null == (L = l.value.goodsList)
                            ? void 0
                            : L.slice(0, 2),
                          (a, o, t) => ({
                            a: a.goodsMainImg,
                            b: e.t(a.goodsName),
                            c: e.t(a.spec),
                            d: e.t(a.goodsCount),
                            e: e.t(e.unref(e.formatCurrency)(a.salePrice)),
                            f: a.goodsId,
                          })
                        ),
                        V: e.o(p),
                      }
                    : {},
                  {
                    W:
                      (null == (j = l.value) ? void 0 : j.type) ===
                      e.unref(e.TUIKitMessageCardType).HealthRecords,
                  },
                  (null == (H = l.value) ? void 0 : H.type) ===
                    e.unref(e.TUIKitMessageCardType).HealthRecords
                    ? { X: e.o(g) }
                    : {},
                  {
                    Y:
                      (null == (k = l.value) ? void 0 : k.type) ===
                      e.unref(e.TUIKitMessageCardType).SummaryConsultation,
                  },
                  (null == (B = l.value) ? void 0 : B.type) ===
                    e.unref(e.TUIKitMessageCardType).SummaryConsultation
                    ? { Z: e.t(e.unref(e.formatValue)(l.value.text)) }
                    : {}
                ),
          {
            d:
              (null == (z = l.value) ? void 0 : z.type) ===
              e.unref(e.TUIKitMessageCardType).NotSupport,
            aa: e.n(
              a.isPatient ? 'message-custom-patient' : 'message-custom-doctor'
            ),
            ab: e.n(
              (null == (Q = l.value) ? void 0 : Q.type) ===
                e.unref(e.TUIKitMessageCustomType).Image
                ? 'message-custom-image'
                : ''
            ),
          }
        );
      };
    },
  }),
  l = e._export_sfc(r, [['__scopeId', 'data-v-5771fbdd']]);
wx.createComponent(l);
