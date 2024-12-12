'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('nut-rate') + e.resolveComponent('nut-popup'))();
}
Math ||
  (
    o +
    (() => '../../../node-modules/nutui-uniapp/components/rate/rate.js') +
    a +
    (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js')
  )();
const a = () => '../../components/Empty/index.js',
  o = () => '../../components/Navbar/index.js',
  t =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24112516333649756170201233.png',
  r =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24112516360060243180201233.png',
  c =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110621203173009400201233.png',
  n = e.defineComponent({
    __name: 'index',
    setup(a, { expose: o }) {
      const n = e.useStudioInfoStore(),
        { studioInfo: i } = e.storeToRefs(n),
        l = e.computed(() =>
          s.value === e.ExpertListType.Expert
            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110611413821425060201233.png'
            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111109284691091050201233.png'
        ),
        p = e.ref([]),
        u = e.ref(!0),
        s = e.ref(e.ExpertListType.Expert),
        d = e.ref(),
        v = e.ref(''),
        m = async (a) => {
          try {
            e.index.showLoading({ title: '加载中...', mask: !0 });
            const { data: o } = await e.requestExpertInfoByUserStaffId({
              doctorUserStaffId: a,
              orgId: v.value,
            });
            (d.value = o), y(d.value.doctorId);
          } catch (o) {
            console.error(o);
          } finally {
            e.index.hideLoading();
          }
        },
        h = async (a) => {
          try {
            e.index.showLoading({ title: '加载中...', mask: !0 });
            const { data: o } = await e.requestHealthInfoByUserStaffId({
              doctorAssistUserStaffIdId: a,
              orgId: v.value,
            });
            (d.value = e.convertHealthDto(o)), y(d.value.doctorId);
          } catch (o) {
            console.error(o);
          } finally {
            e.index.hideLoading();
          }
        },
        y = async (a) => {
          const { data: o } = await e.requestDoctorEvaluation({ doctorId: a });
          p.value = o;
        },
        f = (e) =>
          [
            {
              url: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692824498/24102809222992558090201233.png',
              className: 'recommend',
            },
            {
              url: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692824497/24102809214202455120201233.png',
              className: 'fast',
            },
            {
              url: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110811432780363070201233.png',
              className: 'expert',
            },
          ][(e + 1) % 3],
        g = () => {
          var a;
          (null == (a = d.value) ? void 0 : a.qualificationCertificateUrl) &&
            e.index.previewImage({
              urls: d.value.qualificationCertificateUrl.split(','),
            });
        },
        b = e.ref('0px'),
        x = () => {
          const { statusBarHeight: a } = e.index.getSystemInfoSync();
          b.value = 20 == a ? '62%' : '68%';
        },
        I = e.ref(!1),
        E = () => {
          I.value = !0;
        },
        S = () => {
          I.value = !1;
        },
        T = (a, o) => {
          var t, r, c, n;
          e.appNavigator.navigateTo(e.appNavigator.pagesMap.reservation, {
            query: {
              inquiryWay: a,
              doctorId: null == (t = d.value) ? void 0 : t.doctorId,
              doctorUserStaffId:
                null == (r = d.value) ? void 0 : r.doctorUserStaffId,
              doctorOrgUserId:
                null == (c = d.value) ? void 0 : c.doctorOrgUserId,
              doctorName: null == (n = d.value) ? void 0 : n.doctorName,
              price: o,
              type: s.value,
              orgId: v.value,
            },
          });
        };
      return (
        o({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (a) => {
            var o, t, r;
            (s.value = a.type),
              (v.value =
                null !=
                (r =
                  null != (t = null == a ? void 0 : a.orgId)
                    ? t
                    : null == (o = i.value)
                      ? void 0
                      : o.orgId)
                  ? r
                  : ''),
              a.doctorUserStaffId
                ? s.value === e.ExpertListType.Expert
                  ? ((u.value = !0), m(a.doctorUserStaffId), x())
                  : ((u.value = !1), h(a.doctorUserStaffId))
                : e.index.showToast({ title: '暂无医生信息', icon: 'none' });
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, o) => {
          var n, i, v, m, h, y, x, q, N, O, U, A, w, C, D, L, P, V, j, H, W, _;
          return e.e(
            {
              a: e.sr('navbarRef', 'ce85ada8-0'),
              b: e.p({
                title: '医生详情',
                'show-title-on-scroll': !0,
                'border-bottom': !1,
              }),
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692824491/24102513504464416220201233.png',
              d: (null == (n = d.value) ? void 0 : n.doctorPhotoUrl)
                ? null == (i = d.value)
                  ? void 0
                  : i.doctorPhotoUrl
                : l.value,
              e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110511223523822340201233.png',
              f: e.t(null == (v = d.value) ? void 0 : v.doctorName),
              g: u.value,
            },
            u.value
              ? {
                  h: e.t(null == (m = d.value) ? void 0 : m.sectionName),
                  i: e.t(null == (h = d.value) ? void 0 : h.titleName),
                }
              : {},
            {
              j:
                (null == (y = d.value) ? void 0 : y.tags) &&
                (null == (x = d.value) ? void 0 : x.tags.length),
            },
            (null == (q = d.value) ? void 0 : q.tags) &&
              (null == (N = d.value) ? void 0 : N.tags.length)
              ? {
                  k: e.f(
                    null == (O = d.value) ? void 0 : O.tags,
                    (a, o, t) => ({
                      a: f(o).url,
                      b: e.t(a.tagName),
                      c: e.n(f(o).className),
                      d: a.colorTemplateId,
                    })
                  ),
                }
              : {},
            { l: null == (U = d.value) ? void 0 : U.goodAt },
            (null == (A = d.value) ? void 0 : A.goodAt)
              ? e.e(
                  {
                    m: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692824492/24102515003528477820201233.png',
                    n: e.t(null == (w = d.value) ? void 0 : w.goodAt),
                    o: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692824493/24102515012059032870201240.png',
                    p: u.value,
                  },
                  u.value
                    ? {
                        q: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110619521684553740201233.png',
                        r: e.o(E),
                      }
                    : {}
                )
              : {},
            {
              s:
                (null == (C = d.value)
                  ? void 0
                  : C.inquiryExpertTextServiceOpen) ===
                e.unref(e.TextServiceOpenType).OPEN,
            },
            (null == (D = d.value)
              ? void 0
              : D.inquiryExpertTextServiceOpen) ===
              e.unref(e.TextServiceOpenType).OPEN
              ? {
                  t: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692824494/24102515151132561200201240.png',
                  v: t,
                  w: e.t(e.unref(e.ExpertActionDesc)[s.value]),
                  x: t,
                  y: e.t(e.unref(e.ExpertActionDesc)[s.value]),
                  z: e.o((a) =>
                    T(
                      e.unref(e.InquiryWay).Text,
                      d.value.inquiryExpertTextPrice
                    )
                  ),
                }
              : {},
            {
              A:
                (null == (L = d.value)
                  ? void 0
                  : L.inquiryExpertTextAndVideoServiceOpen) ===
                e.unref(e.VideoServiceOpenType).OPEN,
            },
            (null == (P = d.value)
              ? void 0
              : P.inquiryExpertTextAndVideoServiceOpen) ===
              e.unref(e.VideoServiceOpenType).OPEN
              ? {
                  B: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/21030410325655262692824495/24102515154536813920201240.png',
                  C: r,
                  D: e.t(e.unref(e.ExpertActionDesc)[s.value]),
                  E: r,
                  F: e.t(e.unref(e.ExpertActionDesc)[s.value]),
                  G: e.o((a) =>
                    T(
                      e.unref(e.InquiryWay).Video,
                      d.value.inquiryExpertTextAndVideoPrice
                    )
                  ),
                }
              : {},
            { H: p.value.length },
            p.value.length
              ? {
                  I: e.t(
                    s.value == e.unref(e.ExpertListType).Expert
                      ? '患者'
                      : '咨询'
                  ),
                  J: e.f(p.value, (a, o, t) => ({
                    a: e.t(
                      a.anonymity == e.unref(e.AnonymousStatus).Anonymous
                        ? '匿名用户'
                        : a.patientName
                    ),
                    b: e.t(e.unref(e.InquiryWayDesc)[a.orderWay]),
                    c: 'ce85ada8-1-' + t,
                    d: e.p({
                      size: '11.58px',
                      'model-value': a.star,
                      'active-color': '#E37318',
                      'void-color': '#DCDCDC',
                      spacing: '4.21px',
                    }),
                    e: e.t(a.evaluationTime),
                    f: e.f(a.keywords, (a, o, t) => ({ a: e.t(a), b: a })),
                    g: e.t(a.content),
                    h: a.evaluationId,
                  })),
                  K: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110515534601906850201240.png',
                }
              : {
                  L: e.p({
                    'empty-icon':
                      'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110514011395926090201233.png',
                    top: 16,
                    title: '暂无评论',
                    'sub-title': '评论区空缺，快来评论吧',
                  }),
                },
            {
              M: e.o(S),
              N: c,
              O: e.t(null == (V = d.value) ? void 0 : V.goodAt),
              P: c,
              Q: e.t(null == (j = d.value) ? void 0 : j.briefDesc),
              R: c,
              S: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110621213658338970201240.png',
              T: e.t(null == (H = d.value) ? void 0 : H.hospitalName),
              U: c,
              V: null == (W = d.value) ? void 0 : W.qualificationCertificateUrl,
            },
            (null == (_ = d.value) ? void 0 : _.qualificationCertificateUrl)
              ? { W: e.o(g) }
              : {},
            {
              X: e.o(() => {}),
              Y: e.o((e) => (I.value = e)),
              Z: e.p({
                position: 'bottom',
                'custom-style': {
                  height: b.value,
                  backgroundColor: 'transparent',
                },
                round: !0,
                visible: I.value,
              }),
            }
          );
        }
      );
    },
  }),
  i = e._export_sfc(n, [['__scopeId', 'data-v-ce85ada8']]);
wx.createComponent(i);
