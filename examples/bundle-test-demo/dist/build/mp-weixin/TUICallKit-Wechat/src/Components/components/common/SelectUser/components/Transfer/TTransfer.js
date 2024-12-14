'use strict';
const e = require('../../../../../../../../common/vendor.js');
require('../../../../../../TUICallService/index.js'),
  require('../../../../../../TUICallService/const/index.js'),
  require('../../../../../util/stringToPath.js');
const t = require('../../../../../hooks/useTranslate.js'),
  n = require('../../../../../../../../common/assets.js');
Math || r();
const r = () => '../Icon/TIcon.js',
  l = e.defineComponent({
    __name: 'TTransfer',
    props: {
      list: { type: Array, default: () => [] },
      selectedList: { type: Array, default: () => [] },
      isSearch: { type: Boolean, default: !0 },
      isRadio: { type: Boolean, default: !1 },
      isCustomItem: { type: Boolean, default: !1 },
      title: { type: String, default: '' },
      type: { type: String, default: '' },
      resultShow: { type: Boolean, default: !0 },
      total: { type: Number, default: 0 },
      isH5: { type: Boolean, default: !1 },
    },
    emits: ['search', 'submit', 'cancel', 'getMore'],
    setup(r, { emit: l }) {
      const s = r,
        u = l,
        a = e.ref(''),
        i = e.ref([]),
        f = e.ref(0),
        o = e.ref([]),
        c = e.ref(!0),
        d = e.ref(!1),
        h = e.ref(''),
        p = e.ref(''),
        g = t.useTranslate();
      e.watchEffect(() => {
        const {
          list: e,
          isCustomItem: t,
          isSearch: n,
          title: r,
          total: l,
          selectedList: u,
        } = s;
        if (t)
          for (let s = 0; s < e.length; s++)
            e[s].conversationID.indexOf('@TIM#SYSTEM') > -1 && e.splice(s, 1),
              (i.value = e);
        else i.value = e;
        (f.value = l || e.length),
          (o.value = u && u.length > 0 ? u : o.value),
          (c.value = n),
          (d.value = t),
          (h.value = r),
          (a.value = s.type);
      });
      const v = e.computed(() => i.value.filter((e) => !e.isDisabled)),
        m = (e) => {
          (p.value = e.target.value), u('search', e.target.value);
        },
        I = (e) => {
          if (e.isDisabled) return;
          let t = o.value;
          const n = t.indexOf(e);
          if (n > -1) return o.value.splice(n, 1);
          s.isRadio && (t = []), t.push(e), (o.value = t);
        },
        H = () => {
          o.value.length === v.value.length
            ? (o.value = [])
            : (o.value = [...v.value]);
        },
        b = () => {
          u('submit', o.value), (p.value = ''), (o.value = []);
        },
        x = () => {
          u('cancel'), (p.value = ''), (o.value = []);
        },
        D = () => {
          u('getMore');
        };
      return (t, l) =>
        e.e(
          { a: s.isH5 },
          s.isH5
            ? {
                b: e.p({
                  file: e.unref(n.backIcon),
                  width: '18px',
                  height: '18px',
                }),
                c: e.t(e.unref(h)),
                d: e.o(x),
              }
            : {},
          { e: !s.isH5 && e.unref(c) },
          !s.isH5 && e.unref(c)
            ? {
                f: e.unref(p),
                g: e.o(m),
                h: e.unref(g)('Please enter userID'),
                i: e.n(s.isH5 ? 'left-uniapp-input' : ''),
              }
            : {},
          { j: s.isH5 && e.unref(c) },
          s.isH5 && e.unref(c)
            ? {
                k: e.o(m),
                l: e.o(m),
                m: e.unref(g)('Please enter userID'),
                n: e.unref(p),
                o: e.n(s.isH5 ? 'left-uniapp-input' : ''),
              }
            : {},
          { p: e.unref(v).length > 1 && !r.isRadio },
          e.unref(v).length > 1 && !r.isRadio
            ? e.e(
                { q: e.unref(o).length === e.unref(v).length },
                e.unref(o).length === e.unref(v).length
                  ? {
                      r: e.p({
                        file: e.unref(n.selectedIcon),
                        width: '18px',
                        height: '18px',
                      }),
                    }
                  : {},
                { s: e.t(e.unref(g)('Select all')), t: e.o(H) }
              )
            : {},
          {
            v: e.f(e.unref(i), (t, r, l) =>
              e.e(
                { a: e.unref(o).indexOf(t) > -1 },
                e.unref(o).indexOf(t) > -1
                  ? {
                      b: e.n(t.isDisabled && 'disabled'),
                      c: 'e9c8294a-2-' + l,
                      d: e.p({
                        file: e.unref(n.selectedIcon),
                        width: '18px',
                        height: '18px',
                      }),
                    }
                  : { e: e.n(t.isDisabled && 'disabled') },
                e.unref(d)
                  ? { i: 'left-' + l, j: e.r('left', { data: t }, l) }
                  : e.e(
                      {
                        f:
                          t.avatar ||
                          'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png',
                        g: e.t(t.nick || t.userID),
                        h: t.isDisabled,
                      },
                      (t.isDisabled, {})
                    ),
                { k: t.userID, l: e.o((e) => I(t), t.userID) }
              )
            ),
            w: !e.unref(d),
            x: e.unref(f) > e.unref(i).length,
          },
          e.unref(f) > e.unref(i).length
            ? { y: e.t(e.unref(g)('View more')), z: e.o(D) }
            : {},
          { A: !s.isH5 },
          s.isH5 ? {} : { B: e.t(e.unref(h)) },
          { C: r.resultShow },
          r.resultShow
            ? e.e(
                { D: e.unref(o).length > 0 && !s.isH5 },
                e.unref(o).length > 0 && !s.isH5
                  ? {
                      E: e.t(e.unref(o).length),
                      F: e.t(e.unref(g)('people selected')),
                    }
                  : {},
                {
                  G: e.f(e.unref(o), (t, r, l) =>
                    e.e(
                      e.unref(d)
                        ? { d: 'right-' + l, e: e.r('right', { data: t }, l) }
                        : e.e(
                            {
                              a:
                                t.avatar ||
                                'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png',
                              b: !s.isH5,
                            },
                            s.isH5 ? {} : { c: e.t(t.nick || t.userID) }
                          ),
                      s.isH5
                        ? {}
                        : {
                            f: 'e9c8294a-3-' + l,
                            g: e.p({
                              file: e.unref(n.cancelIcon),
                              width: '18px',
                              height: '18px',
                            }),
                            h: e.o((e) => I(t), r),
                          },
                      { i: r }
                    )
                  ),
                  H: !e.unref(d),
                  I: !s.isH5,
                }
              )
            : {},
          { J: e.t(e.unref(g)('Cancel')), K: e.o(x), L: e.unref(o).length > 0 },
          e.unref(o).length > 0
            ? { M: e.t(e.unref(g)('Done')), N: e.o(b) }
            : { O: e.t(e.unref(g)('Done')), P: e.o(b) },
          { Q: e.n(s.isH5 ? 'transfer-h5' : '') }
        );
    },
  }),
  s = e._export_sfc(l, [['__scopeId', 'data-v-e9c8294a']]);
wx.createComponent(s);
