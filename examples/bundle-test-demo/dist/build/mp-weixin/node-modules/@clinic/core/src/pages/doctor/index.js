'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (r + t)();
const t = () => '../../components/Empty/index.js',
  r = () => '../../components/Navbar/index.js',
  a = e.defineComponent({
    __name: 'index',
    setup(t, { expose: r }) {
      const a = e.ref(''),
        o = e.useStudioInfoStore(),
        { studioInfo: i } = e.storeToRefs(o),
        p = e.ref(''),
        n = () => {
          u();
        },
        c = e.ref([]),
        u = async () => {
          s.value === e.ExpertListType.Expert
            ? await (async () => {
                var t, r;
                if (
                  (null == (t = i.value) ? void 0 : t.orgId) &&
                  (null == (r = i.value) ? void 0 : r.orgCode)
                )
                  try {
                    e.index.showLoading({ title: '加载中…', mask: !0 });
                    const { data: t } = await e.requestInquiryExpertList({
                      orgId: i.value.orgId,
                      searchKey: p.value,
                    });
                    c.value = t;
                  } finally {
                    e.index.hideLoading();
                  }
              })()
            : await (async () => {
                var t, r;
                if (
                  !(null == (t = i.value) ? void 0 : t.orgId) ||
                  !(null == (r = i.value) ? void 0 : r.orgCode)
                )
                  return;
                const { data: a } = await e.requestHealthList({
                  orgId: i.value.orgId,
                  searchKey: p.value,
                });
                c.value = a.map(e.convertHealthDto);
              })();
        },
        d = (t) =>
          t.inquiryExpertTextServiceOpen === e.TextServiceOpenType.OPEN &&
          t.inquiryExpertTextAndVideoServiceOpen ===
            e.VideoServiceOpenType.OPEN,
        s = e.ref(e.ExpertListType.Expert),
        l = e.computed(() =>
          s.value === e.ExpertListType.Expert
            ? 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110611413821425060201233.png'
            : 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111109284691091050201233.png'
        ),
        v = e.computed(() =>
          s.value === e.ExpertListType.Expert
            ? '输入科室、医生搜索'
            : '输入咨询师搜索'
        ),
        y = (t, r, a) => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap.reservation, {
            query: {
              inquiryWay: r,
              doctorId: t.doctorId,
              doctorName: t.doctorName,
              doctorUserStaffId: t.doctorUserStaffId,
              doctorOrgUserId: t.doctorOrgUserId,
              price: a,
              type: s.value,
            },
          });
        };
      return (
        r({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: async (e) => {
            (a.value = e.navigationBarTitle), (s.value = e.type), await u();
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (t, r) =>
          e.e(
            {
              a: e.sr('navbarRef', '03bdee8f-0'),
              b: e.p({ title: a.value }),
              c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24121016011712521970201240.png',
              d: v.value,
              e: p.value,
              f: e.o((e) => (p.value = e.detail.value)),
              g: e.o(n),
              h: c.value.length,
            },
            c.value.length
              ? {
                  i: e.f(c.value, (t, r, a) =>
                    e.e(
                      {
                        a: t.doctorPhotoUrl ? t.doctorPhotoUrl : l.value,
                        b: e.t(t.doctorName),
                      },
                      s.value === e.unref(e.ExpertListType).Expert
                        ? { c: e.t(t.titleName), d: e.t(t.sectionName) }
                        : {},
                      { e: t.tags && t.tags.length },
                      t.tags && t.tags.length
                        ? {
                            f: e.f(t.tags, (t, r, a) => ({
                              a: e.t(t.tagName),
                              b: t.colorTemplateId,
                              c: t.tagColor,
                              d: t.fontColor,
                            })),
                          }
                        : {},
                      {
                        g: e.t(e.unref(e.formatValue)(t.goodAt)),
                        h:
                          t.inquiryExpertTextServiceOpen ===
                          e.unref(e.TextServiceOpenType).OPEN,
                      },
                      t.inquiryExpertTextServiceOpen ===
                        e.unref(e.TextServiceOpenType).OPEN
                        ? {
                            i: e.t(
                              e.unref(e.formatCurrency)(
                                t.inquiryExpertTextPrice
                              )
                            ),
                            j: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110116525505163050201240.png',
                            k: e.t(e.unref(e.ExpertActionDesc)[s.value]),
                            l: e.o(
                              (r) =>
                                y(
                                  t,
                                  e.unref(e.InquiryWay).Text,
                                  t.inquiryExpertTextPrice
                                ),
                              r
                            ),
                          }
                        : {},
                      { m: d(t) },
                      (d(t), {}),
                      {
                        n:
                          t.inquiryExpertTextAndVideoServiceOpen ===
                          e.unref(e.VideoServiceOpenType).OPEN,
                      },
                      t.inquiryExpertTextAndVideoServiceOpen ===
                        e.unref(e.VideoServiceOpenType).OPEN
                        ? {
                            o: e.t(
                              e.unref(e.formatCurrency)(
                                t.inquiryExpertTextAndVideoPrice
                              )
                            ),
                            p: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110116542869633810201233.png',
                            q: e.t(e.unref(e.ExpertActionDesc)[s.value]),
                            r: e.o(
                              (r) =>
                                y(
                                  t,
                                  e.unref(e.InquiryWay).Video,
                                  t.inquiryExpertTextAndVideoPrice
                                ),
                              r
                            ),
                          }
                        : {},
                      {
                        s: r,
                        t: e.o(
                          (r) =>
                            ((t) => {
                              e.appNavigator.navigateTo(
                                e.appNavigator.pagesMap['doctor-detail'],
                                {
                                  query: {
                                    doctorId: t.doctorId,
                                    doctorUserStaffId: t.doctorUserStaffId,
                                    type: s.value,
                                  },
                                }
                              );
                            })(t),
                          r
                        ),
                      }
                    )
                  ),
                  j: s.value === e.unref(e.ExpertListType).Expert,
                }
              : {
                  k: e.p({
                    'empty-icon':
                      'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110418004983214900201233.png',
                    title: `暂无${e.unref(e.ExpertListTypeDesc)[s.value]}`,
                    'sub-title': `当前机构暂无${e.unref(e.ExpertListTypeDesc)[s.value]}`,
                  }),
                }
          )
      );
    },
  }),
  o = e._export_sfc(a, [['__scopeId', 'data-v-03bdee8f']]);
wx.createComponent(o);
