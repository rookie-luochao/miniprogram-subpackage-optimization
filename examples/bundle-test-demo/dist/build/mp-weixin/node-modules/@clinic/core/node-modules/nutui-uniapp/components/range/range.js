'use strict';
const e = require('../../../../../../../common/vendor.js'),
  t = `${e.PREFIX}-range`,
  a = e.defineComponent({
    name: t,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  u = e.defineComponent({
    ...a,
    props: e.rangeProps,
    emits: e.rangeEmits,
    setup(a, { emit: u }) {
      const n = a,
        o = u,
        l = e.useSlots(),
        r = e.getCurrentInstance(),
        i = e.useFormDisabled(e.toRef(n, 'disabled')),
        c = e.useTouch(),
        v = e.computed(() => `root-${e.getRandomId()}`),
        s = e.ref({ width: 0, height: 0 }),
        d = e.ref(0);
      let m, g;
      const h = e.ref(''),
        f = e.computed(() => Number(n.min)),
        p = e.computed(() => Number(n.max)),
        b = e.computed(() => Number(n.step)),
        w = e.computed(() =>
          Object.keys(n.marks)
            .map((e) => Number.parseFloat(e))
            .sort((e, t) => e - t)
            .filter((e) => e >= f.value && e <= p.value)
        ),
        C = e.computed(() => p.value - f.value),
        V = e.computed(() => {
          const e = t;
          return {
            [e]: !0,
            [`${e}-disabled`]: i.value,
            [`${e}-vertical`]: n.vertical,
            [`${e}-show-number`]: !n.hiddenRange,
          };
        }),
        E = e.computed(() => {
          const e = 'nut-range-container';
          return { [e]: !0, [`${e}-vertical`]: n.vertical };
        }),
        y = e.computed(() => ({ background: n.inactiveColor })),
        R = e.computed(() => ({ borderColor: n.buttonColor })),
        k = (e) => n.range && Array.isArray(e);
      function T() {
        const { modelValue: e } = n;
        return k(e)
          ? (100 * (e[1] - e[0])) / C.value + '%'
          : (100 * (e - f.value)) / C.value + '%';
      }
      function $() {
        const { modelValue: e } = n;
        return k(e) ? (100 * (e[0] - f.value)) / C.value + '%' : '0%';
      }
      const N = e.computed(() => {
        const e = {
          background: n.activeColor,
          transition: h.value ? 'none' : void 0,
        };
        return (
          n.vertical
            ? ((e.top = $()), (e.height = T()))
            : ((e.left = $()), (e.width = T())),
          e
        );
      });
      function x(e) {
        const t = 'nut-range-mark',
          { modelValue: a } = n;
        let u, o;
        if (k(a)) {
          const [e, t] = a;
          (u = e), (o = t);
        } else (u = f.value), (o = a);
        const l = e <= o && e >= u;
        return { [`${t}-text`]: !0, [`${t}-text-active`]: l };
      }
      function A(e) {
        const t = {};
        return (
          n.vertical
            ? (t.top = ((e - f.value) / C.value) * 100 + '%')
            : (t.left = ((e - f.value) / C.value) * 100 + '%'),
          t
        );
      }
      function D(e) {
        const t = {},
          { modelValue: a } = n;
        let u, o;
        if (k(a)) {
          const [e, t] = a;
          (u = e), (o = t);
        } else (u = f.value), (o = p.value);
        const l = e <= o && e >= u;
        return (t.background = l ? n.activeColor : n.inactiveColor), t;
      }
      function M(e) {
        const t = Math.max(f.value, Math.min(e, p.value));
        return Math.round(t / b.value) * b.value;
      }
      function P(e) {
        return (function (e) {
          return e[0] > e[1] ? e.slice(0).reverse() : e;
        })(e).map((e) => M(e));
      }
      function j(t, a) {
        (t = k(t) ? P(t) : M(t)),
          e.isEqualValue(t, n.modelValue) || o(e.UPDATE_MODEL_EVENT, t),
          a && !e.isEqualValue(t, m) && o(e.CHANGE_EVENT, t);
      }
      async function q(t) {
        if (i.value) return;
        const { modelValue: a } = n,
          u = await e.useRect(v.value, r);
        (s.value.width = u.width), (s.value.height = u.height);
        const o = t.touches[0].clientX,
          l = t.touches[0].clientY;
        let c, d;
        n.vertical
          ? ((c = l - u.top), (d = u.height))
          : ((c = o - u.left), (d = u.width));
        const m = f.value + (c / d) * C.value;
        if (k(a)) {
          const [e, t] = a;
          j(m <= (e + t) / 2 ? [m, t] : [e, m], !0);
        } else j(m, !0);
      }
      function F(t) {
        i.value ||
          (c.start(t),
          (g = n.modelValue),
          (m = k(g) ? P(g) : M(g)),
          (h.value = 'start'),
          e.preventDefault(t));
      }
      async function I(t) {
        if (i.value) return;
        let a, u;
        e.preventDefault(t),
          'start' === h.value && o('dragStart'),
          c.move(t),
          (h.value = 'dragging'),
          n.vertical
            ? ((a = c.deltaY.value), (u = s.value.height))
            : ((a = c.deltaX.value), (u = s.value.width));
        const l = (a / u) * C.value;
        k(m) ? (g[d.value] = m[d.value] + l) : (g = m + l), j(g);
      }
      function G(t) {
        i.value ||
          ('dragging' === h.value && (j(g, !0), o('dragEnd')),
          (h.value = ''),
          e.preventDefault(t));
      }
      function H(e) {
        return Array.isArray(n.modelValue) && 'number' == typeof e
          ? n.modelValue[e]
          : Number(n.modelValue);
      }
      return (
        e.onMounted(() => {
          e.nextTick$1(() => {
            e.useRect(v.value, r).then(
              (e) => {
                (s.value.width = e.width), (s.value.height = e.height);
              },
              () => {}
            );
          });
        }),
        (t, a) =>
          e.e(
            { a: !n.hiddenRange },
            n.hiddenRange ? {} : { b: e.t(f.value) },
            { c: w.value.length > 0 },
            w.value.length > 0
              ? {
                  d: e.f(w.value, (t, a, u) => ({
                    a: e.t(t),
                    b: e.s(D(t)),
                    c: t,
                    d: e.n(x(t)),
                    e: e.s(A(t)),
                  })),
                }
              : {},
            { e: n.range },
            n.range
              ? {
                  f: e.f([0, 1], (t, a, u) =>
                    e.e(
                      e.unref(l).button
                        ? {}
                        : e.e(
                            { a: !n.hiddenTag },
                            n.hiddenTag ? {} : { b: e.t(H(t)) },
                            { c: e.s(R.value) }
                          ),
                      {
                        d: t,
                        e: e.n(
                          0 === t
                            ? 'nut-range-button-wrapper-left'
                            : 'nut-range-button-wrapper-right'
                        ),
                        f: H(t),
                        g: e.o((e) => {
                          (d.value = t), F(e);
                        }, t),
                        h: e.o(I, t),
                        i: e.o(G, t),
                        j: e.o(G, t),
                        k: e.o((e) => e.stopPropagation(), t),
                      }
                    )
                  ),
                  g: e.unref(l).button,
                  h: e.unref(i) ? -1 : 0,
                  i: f.value,
                  j: p.value,
                }
              : e.e(
                  { k: e.unref(l).button },
                  e.unref(l).button
                    ? {}
                    : e.e(
                        { l: !n.hiddenTag },
                        n.hiddenTag ? {} : { m: e.t(H()) },
                        { n: e.s(R.value) }
                      ),
                  {
                    o: e.unref(i) ? -1 : 0,
                    p: H(),
                    q: f.value,
                    r: p.value,
                    s: e.o(F),
                    t: e.o(I),
                    v: e.o(G),
                    w: e.o(G),
                    x: e.o((e) => e.stopPropagation()),
                  }
                ),
            {
              y: e.s(N.value),
              z: v.value,
              A: e.n(V.value),
              B: e.s(y.value),
              C: e.o(q),
              D: !n.hiddenRange,
            },
            n.hiddenRange ? {} : { E: e.t(p.value) },
            { F: e.n(E.value), G: e.n(n.customClass), H: e.s(n.customStyle) }
          )
      );
    },
  });
wx.createComponent(u);
