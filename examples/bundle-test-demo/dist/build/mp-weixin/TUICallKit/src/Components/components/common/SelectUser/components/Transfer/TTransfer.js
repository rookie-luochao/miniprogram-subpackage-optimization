'use strict';
const e = require('../../../../../../../../common/vendor.js');
require('../../../../../../TUICallService/index.js');
const t = require('../../../../../../../../common/assets.js'),
  n = require('../../../../../../TUICallService/locales/index.js');
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
      const a = r,
        u = l,
        s = e.ref(''),
        i = e.ref([]),
        f = e.ref(0),
        o = e.ref([]),
        c = e.ref(!0),
        d = e.ref(!1),
        p = e.ref(''),
        h = e.ref('');
      e.watchEffect(() => {
        const {
          list: e,
          isCustomItem: t,
          isSearch: n,
          title: r,
          total: l,
          selectedList: u,
        } = a;
        if (t)
          for (let a = 0; a < e.length; a++)
            e[a].conversationID.indexOf('@TIM#SYSTEM') > -1 && e.splice(a, 1),
              (i.value = e);
        else i.value = e;
        (f.value = l || e.length),
          (o.value = u && u.length > 0 ? u : o.value),
          (c.value = n),
          (d.value = t),
          (p.value = r),
          (s.value = a.type);
      });
      const g = e.computed(() => i.value.filter((e) => !e.isDisabled)),
        v = (e) => {
          (h.value = e.target.value), u('search', e.target.value);
        },
        m = (e) => {
          if (e.isDisabled) return;
          let t = o.value;
          const n = t.indexOf(e);
          if (n > -1) return o.value.splice(n, 1);
          a.isRadio && (t = []), t.push(e), (o.value = t);
        },
        I = () => {
          o.value.length === g.value.length
            ? (o.value = [])
            : (o.value = [...g.value]);
        },
        b = () => {
          u('submit', o.value), (h.value = '');
        },
        H = () => {
          u('cancel'), (h.value = '');
        },
        x = () => {
          u('getMore');
        };
      return (l, u) =>
        e.e(
          { a: a.isH5 },
          a.isH5
            ? {
                b: e.p({
                  file: e.unref(t.backIcon),
                  width: '18px',
                  height: '18px',
                }),
                c: e.t(e.unref(p)),
                d: e.o(H),
              }
            : {},
          { e: !a.isH5 && e.unref(c) },
          !a.isH5 && e.unref(c)
            ? {
                f: e.unref(h),
                g: e.o(v),
                h: e.unref(n.t)('Please enter userID'),
                i: e.n(a.isH5 ? 'left-uniapp-input' : ''),
              }
            : {},
          { j: a.isH5 && e.unref(c) },
          a.isH5 && e.unref(c)
            ? {
                k: e.o(v),
                l: e.o(v),
                m: e.unref(n.t)('Please enter userID'),
                n: e.unref(h),
                o: e.n(a.isH5 ? 'left-uniapp-input' : ''),
              }
            : {},
          { p: e.unref(g).length > 1 && !r.isRadio },
          e.unref(g).length > 1 && !r.isRadio
            ? e.e(
                { q: e.unref(o).length === e.unref(g).length },
                e.unref(o).length === e.unref(g).length
                  ? {
                      r: e.p({
                        file: e.unref(t.selectedIcon),
                        width: '18px',
                        height: '18px',
                      }),
                    }
                  : {},
                { s: e.t(e.unref(n.t)('Select all')), t: e.o(I) }
              )
            : {},
          {
            v: e.f(e.unref(i), (n, r, l) =>
              e.e(
                { a: e.unref(o).indexOf(n) > -1 },
                e.unref(o).indexOf(n) > -1
                  ? {
                      b: e.n(n.isDisabled && 'disabled'),
                      c: 'a1c6ab40-2-' + l,
                      d: e.p({
                        file: e.unref(t.selectedIcon),
                        width: '18px',
                        height: '18px',
                      }),
                    }
                  : { e: e.n(n.isDisabled && 'disabled') },
                e.unref(d)
                  ? { i: 'left-' + l, j: e.r$1('left', { data: n }, l) }
                  : e.e(
                      {
                        f:
                          n.avatar ||
                          'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png',
                        g: e.t(n.nick || n.userID),
                        h: n.isDisabled,
                      },
                      (n.isDisabled, {})
                    ),
                { k: n.userID, l: e.o((e) => m(n), n.userID) }
              )
            ),
            w: !e.unref(d),
            x: e.unref(f) > e.unref(i).length,
          },
          e.unref(f) > e.unref(i).length
            ? { y: e.t(e.unref(n.t)('View more')), z: e.o(x) }
            : {},
          { A: !a.isH5 },
          a.isH5 ? {} : { B: e.t(e.unref(p)) },
          { C: r.resultShow },
          r.resultShow
            ? e.e(
                { D: e.unref(o).length > 0 && !a.isH5 },
                e.unref(o).length > 0 && !a.isH5
                  ? {
                      E: e.t(e.unref(o).length),
                      F: e.t(e.unref(n.t)('people selected')),
                    }
                  : {},
                {
                  G: e.f(e.unref(o), (n, r, l) =>
                    e.e(
                      e.unref(d)
                        ? { d: 'right-' + l, e: e.r$1('right', { data: n }, l) }
                        : e.e(
                            {
                              a:
                                n.avatar ||
                                'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png',
                              b: !a.isH5,
                            },
                            a.isH5 ? {} : { c: e.t(n.nick || n.userID) }
                          ),
                      a.isH5
                        ? {}
                        : {
                            f: 'a1c6ab40-3-' + l,
                            g: e.p({
                              file: e.unref(t.cancelIcon),
                              width: '18px',
                              height: '18px',
                            }),
                            h: e.o((e) => m(n), r),
                          },
                      { i: r }
                    )
                  ),
                  H: !e.unref(d),
                  I: !a.isH5,
                }
              )
            : {},
          {
            J: e.t(e.unref(n.t)('Cancel')),
            K: e.o(H),
            L: e.unref(o).length > 0,
          },
          e.unref(o).length > 0
            ? { M: e.t(e.unref(n.t)('Done')), N: e.o(b) }
            : { O: e.t(e.unref(n.t)('Done')), P: e.o(b) },
          { Q: e.n(a.isH5 ? 'transfer-h5' : '') }
        );
    },
  }),
  a = e._export_sfc(l, [['__scopeId', 'data-v-a1c6ab40']]);
wx.createComponent(a);
