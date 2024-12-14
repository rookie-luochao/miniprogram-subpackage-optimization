'use strict';
const t = require('../../../../../../common/vendor.js');
if (!Array) {
  t.resolveComponent('nut-rate')();
}
Math ||
  (
    e +
    (() => '../../../node-modules/nutui-uniapp/components/rate/rate.js') +
    l +
    a
  )();
const e = () => '../../components/Navbar/index.js',
  a = () => './components/Detail/index.js',
  l = () => './components/Form/index.js',
  i = t.defineComponent({
    __name: 'index',
    setup(e, { expose: a }) {
      const l = t.ref(!1),
        i = t.ref({
          1: {
            title: '非常不满意',
            class: 'dissatisfy',
            tags: [
              { title: '回复太慢', active: !1 },
              { title: '答非所问', active: !1 },
              { title: '缺少解释', active: !1 },
              { title: '态度很差', active: !1 },
              { title: '没有帮助', active: !1 },
              { title: '医生辱骂', active: !1 },
            ],
          },
          2: {
            title: '不满意',
            class: 'dissatisfy',
            tags: [
              { title: '回复太慢', active: !1 },
              { title: '答非所问', active: !1 },
              { title: '缺少解释', active: !1 },
              { title: '态度不好', active: !1 },
              { title: '没有帮助', active: !1 },
              { title: '没有耐心', active: !1 },
            ],
          },
          3: {
            title: '一般',
            class: 'normal',
            tags: [
              { title: '不是很有帮助', active: !1 },
              { title: '希望问诊更详细', active: !1 },
              { title: '希望回复更快', active: !1 },
              { title: '希望讲解更详细', active: !1 },
              { title: '希望更耐心', active: !1 },
              { title: '希望解答更生动', active: !1 },
            ],
          },
          4: {
            title: '比较满意',
            class: 'satisfaction',
            tags: [
              { title: '问诊较详细', active: !1 },
              { title: '态度比较好', active: !1 },
              { title: '讲解较清晰', active: !1 },
              { title: '建议有帮助', active: !1 },
              { title: '解答较生动', active: !1 },
              { title: '回复及时', active: !1 },
            ],
          },
          5: {
            title: '非常满意',
            class: 'satisfaction',
            tags: [
              { title: '回复非常及时', active: !1 },
              { title: '讲解非常清晰', active: !1 },
              { title: '给了我希望', active: !1 },
              { title: '有经验很专业', active: !1 },
              { title: '建议很有帮助', active: !1 },
              { title: '态度好有耐心', active: !1 },
            ],
          },
        }),
        o = t.ref({
          star: 5,
          keywords: [],
          anonymity: t.AnonymousStatus.Anonymous,
          content: '',
          picUrl: [],
        }),
        n = (t) => {
          t || (o.value.star = 1),
            Object.keys(i.value).forEach((t) => {
              i.value[parseInt(t)].tags.forEach((t) => {
                t.active = !1;
              });
            });
        },
        s = t.ref(0),
        v = (t) => {
          s.value = t;
        },
        c = async (e) => {
          var a, n;
          const s = i.value[null != (a = o.value.star) ? a : 5].tags
            .filter((t) => t.active)
            .map((t) => t.title);
          if (!s.length)
            return void t.index.showToast({
              title: '请选择至少一个评价标签',
              icon: 'none',
            });
          const v = { ...o.value, ...e, keywords: s };
          v.picUrl = null == (n = v.picUrl) ? void 0 : n.filter((t) => !!t);
          const { data: c } = await t.requestEvaluationOrder(v);
          if (c) {
            t.index.showToast({ title: '评价成功', icon: 'none' }),
              t.index.$emit(t.REFRESH_INQUIRY_ORDER_LIST);
            const { data: e } = await t.requestEvaluationInfo({
              evaluationId: v.evaluationId,
            });
            (o.value = e), (l.value = !1);
          } else t.index.showToast({ title: '评价失败', icon: 'none' });
        },
        u = t.computed(() =>
          l.value
            ? { title: '您好！', subTitle: '请您为本次的服务体验评分！' }
            : { title: '感谢您的评价', subTitle: '祝您身体健康，生活愉快！' }
        );
      return (
        a({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: async (e) => {
            var a;
            const { query: n } = e,
              {
                evaluationId: s,
                editMode: v,
                doctorWorkPhotoUrl: c,
              } = JSON.parse(n);
            if (
              ((l.value = v),
              (o.value.evaluationId = s),
              (o.value.doctorWorkPhotoUrl = c),
              !l.value)
            ) {
              const { data: e } = await t.requestEvaluationInfo({
                evaluationId: s,
              });
              (o.value = e),
                i.value[null != (a = o.value.star) ? a : 5].tags.forEach(
                  (t) => {
                    var e;
                    t.active = (
                      null != (e = o.value.keywords) ? e : []
                    ).includes(t.title);
                  }
                );
            }
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (e, a) => {
          var r, d, p, f, g, m;
          return t.e(
            {
              a: t.p({ title: '评价中心' }),
              b: t.t(u.value.title),
              c: t.t(u.value.subTitle),
              d: o.value.doctorWorkPhotoUrl,
              e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111213550141695200201233.png',
              f: t.t(
                null == (d = i.value[null != (r = o.value.star) ? r : 5])
                  ? void 0
                  : d.title
              ),
              g: t.n(
                `stars-text ${null == (f = i.value[null != (p = o.value.star) ? p : 5]) ? void 0 : f.class}`
              ),
              h: t.o(n),
              i: t.o((t) => (o.value.star = t)),
              j: t.p({
                size: '24px',
                'active-color': '#FFBE3F',
                'void-color': '#DCDCDC',
                spacing: '8px',
                readonly: !l.value,
                modelValue: o.value.star,
              }),
              k: t.f(
                null == (m = i.value[null != (g = o.value.star) ? g : 5])
                  ? void 0
                  : m.tags,
                (e, a, n) => ({
                  a: t.t(e.title),
                  b: e.title,
                  c: e.active ? 1 : '',
                  d: t.o(
                    (e) =>
                      ((e) => {
                        var a, n, s, v;
                        if (l.value) {
                          if (
                            !i.value[null != (a = o.value.star) ? a : 5].tags[e]
                              .active &&
                            i.value[
                              null != (n = o.value.star) ? n : 5
                            ].tags.filter((t) => t.active).length >= 3
                          )
                            return void t.index.showToast({
                              title: '最多选择3个标签',
                              icon: 'none',
                            });
                          i.value[null != (s = o.value.star) ? s : 5].tags[
                            e
                          ].active =
                            !i.value[null != (v = o.value.star) ? v : 5].tags[e]
                              .active;
                        }
                      })(a),
                    e.title
                  ),
                })
              ),
              l: -s.value + 'rpx',
              m: l.value,
            },
            l.value
              ? { n: t.o(c), o: t.o(v), p: t.p({ form: o.value }) }
              : { q: t.p({ detail: o.value }) }
          );
        }
      );
    },
  }),
  o = t._export_sfc(i, [['__scopeId', 'data-v-8773edf0']]);
wx.createComponent(o);
