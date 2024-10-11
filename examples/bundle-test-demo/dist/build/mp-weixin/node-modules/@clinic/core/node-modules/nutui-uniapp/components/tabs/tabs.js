'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || t();
const t = () => '../icon/icon.js',
  l = `${e.PREFIX}-tabs`,
  n = e.defineComponent({
    name: l,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  o = e.defineComponent({
    ...n,
    props: e.tabsProps,
    emits: e.tabsEmits,
    setup(t, { emit: n }) {
      const o = t,
        a = n,
        u = e.getCurrentInstance(),
        { getSelectorNodeInfo: i, getSelectorNodeInfos: r } =
          e.useSelectorQuery(u),
        s = e.getRandomId();
      e.ref(null);
      const { internalChildren: d } = e.useProvide(
          e.TAB_KEY,
          `${e.PREFIX}-tabs`
        )({
          activeKey: e.computed(() => o.modelValue || 0),
          autoHeight: e.computed(() => o.autoHeight),
          animatedTime: e.computed(() => o.animatedTime),
        }),
        c = e.ref([]);
      function v(t) {
        t.forEach((t, l) => {
          var n, o, a, u, i, r, s, d, p;
          let m = t.type;
          if (((m = m.name || m), 'nut-tab-pane' === m)) {
            const v = new e.Title();
            if (
              (null == (n = t.props) ? void 0 : n.title) ||
              (null == (o = t.props) ? void 0 : o['pane-key']) ||
              (null == (a = t.props) ? void 0 : a.paneKey)
            ) {
              const n = e.TypeOfFun(
                  null == (u = t.props) ? void 0 : u['pane-key']
                ),
                o =
                  'number' === n || 'string' === n
                    ? String(null == (i = t.props) ? void 0 : i['pane-key'])
                    : null,
                a = e.TypeOfFun(null == (r = t.props) ? void 0 : r.paneKey),
                c =
                  'number' === a || 'string' === a
                    ? String(null == (s = t.props) ? void 0 : s.paneKey)
                    : null;
              (v.title = null == (d = t.props) ? void 0 : d.title),
                (v.paneKey = o || c || String(l)),
                (v.disabled = null == (p = t.props) ? void 0 : p.disabled);
            }
            c.value.push(v);
          } else {
            if (' ' === t.children) return;
            v(t.children);
          }
        });
      }
      const p = e.ref(o.modelValue || 0);
      function m(e) {
        const t = c.value.findIndex((t) => t.paneKey === String(e));
        p.value = t;
      }
      const f = e.computed(() => o.titleScroll && 'horizontal' === o.direction),
        h = e.computed(() => o.titleScroll && 'vertical' === o.direction),
        g = e.ref([]),
        y = e.ref(0),
        b = e.ref(0),
        T = e.ref(!1),
        C = e.ref(),
        E = e.ref([]),
        S = e.ref(!1);
      function _() {
        o.titleScroll &&
          e.raf(() => {
            Promise.all([
              i(`#nut-tabs__titles_${s}`),
              r(`#nut-tabs__titles_${s} .nut-tabs__titles-item`),
            ]).then(([t, l]) => {
              var n, a, u, i;
              if (((C.value = t), (E.value = l), C.value))
                if ('vertical' === o.direction) {
                  l.reduce((e, t) => e + t.height, 0) >
                  (null == (n = C.value) ? void 0 : n.height)
                    ? (S.value = !0)
                    : (S.value = !1);
                } else {
                  l.reduce((e, t) => e + t.width, 0) >
                  (null == (a = C.value) ? void 0 : a.width)
                    ? (S.value = !0)
                    : (S.value = !1);
                }
              const r = E.value[p.value];
              let s = 0;
              if ('vertical' === o.direction) {
                s =
                  l.slice(0, p.value).reduce((e, t) => e + t.height, 0) -
                  ((null == (u = C.value) ? void 0 : u.height) - r.height) / 2;
              } else {
                s =
                  l.slice(0, p.value).reduce((e, t) => e + t.width, 0) -
                  ((null == (i = C.value) ? void 0 : i.width) -
                    (null == r ? void 0 : r.width)) /
                    2;
              }
              e.nextTick$1(() => {
                T.value = !0;
              }),
                (function (t, l) {
                  let n = 0;
                  const o = 'horizontal' === l ? y.value : b.value,
                    a = 1;
                  function u() {
                    'horizontal' === l
                      ? (y.value += (t - o) / a)
                      : (b.value += (t - o) / a),
                      ++n < a && e.raf(u);
                  }
                  u();
                })(s, o.direction);
            });
          });
      }
      function K(e = d.map((e) => e.vnode)) {
        (c.value = []),
          (e =
            null == e
              ? void 0
              : e.filter((e) => 'string' != typeof e.children)) &&
            e.length &&
            v(e),
          m(o.modelValue),
          setTimeout(() => {
            _();
          }, 500);
      }
      e.watch(
        () => d.map((e) => e.props),
        (e) => {
          K(d);
        },
        { deep: !0, immediate: !0 }
      ),
        e.watch(
          () => o.modelValue,
          (e) => {
            m(e), _();
          }
        ),
        e.onMounted(K),
        e.onActivated(K);
      const V = {
          isBegin: () => 0 === p.value,
          isEnd: () => p.value === c.value.length - 1,
          next: () => {
            p.value += 1;
            const e = c.value[p.value].disabled;
            V.isEnd() && e
              ? V.prev()
              : e && p.value < c.value.length - 1
                ? V.next()
                : V.updateValue(c.value[p.value]);
          },
          prev: () => {
            p.value -= 1;
            const e = c.value[p.value].disabled;
            V.isBegin() && e
              ? V.next()
              : e && p.value > 0
                ? V.prev()
                : V.updateValue(c.value[p.value]);
          },
          updateValue: (t) => {
            a(e.UPDATE_MODEL_EVENT, t.paneKey), a(e.CHANGE_EVENT, t);
          },
          tabChange: (t, l) => {
            a(e.CLICK_EVENT, t),
              t.disabled || p.value === l || ((p.value = l), V.updateValue(t));
          },
          setTabItemRef: (e, t) => {
            g.value[t] = e;
          },
        },
        { tabChange: I } = V,
        {
          touchState: $,
          touchMethods: w,
          tabsContentID: k,
          tabsContentRef: x,
        } = e.useTabContentTouch(o, V, u, e.useRect),
        z = e.computed(() => {
          let e = 100 * p.value;
          $.moving && (e += $.offset);
          let t = {
            transform:
              'horizontal' === o.direction
                ? `translate3d(-${e}%, 0, 0)`
                : `translate3d( 0,-${e}%, 0)`,
            transitionDuration: $.moving ? void 0 : `${o.animatedTime}ms`,
          };
          return 0 === o.animatedTime && (t = {}), t;
        }),
        M = e.computed(() => ({ background: o.background })),
        R = e.computed(() => ({
          color: 'smile' === o.type ? o.customColor : '',
          background: 'line' === o.type ? o.customColor : '',
        })),
        N = e.computed(() => {
          if (!o.titleGutter) return {};
          const t = e.pxCheck(o.titleGutter);
          return 'vertical' === o.direction
            ? { paddingTop: t, paddingBottom: t }
            : { paddingLeft: t, paddingRight: t };
        }),
        P = e.computed(() => e.getMainClass(o, l, { [o.direction]: !0 }));
      return (t, l) =>
        e.e(
          { a: t.$slots.titles },
          t.$slots.titles
            ? {}
            : e.e(
                {
                  b: e.f(c.value, (l, n, o) =>
                    e.e(
                      'line' === t.type ? { a: e.s(R.value) } : {},
                      'smile' === t.type
                        ? {
                            b: '0c383266-0-' + o,
                            c: e.p({
                              name: 'joy-smile',
                              'custom-color': t.customColor,
                            }),
                            d: e.s(R.value),
                          }
                        : {},
                      {
                        e: e.t(l.title),
                        f: l.paneKey,
                        g: l.paneKey === String(t.modelValue) ? 1 : '',
                        h: l.disabled ? 1 : '',
                        i: e.o((t) => e.unref(I)(l, n), l.paneKey),
                      }
                    )
                  ),
                  c: 'line' === t.type,
                  d: 'smile' === t.type,
                  e: t.ellipsis ? 1 : '',
                  f: e.s(N.value),
                  g: 'left' === t.align ? 1 : '',
                  h: S.value && t.titleScroll,
                },
                (S.value && t.titleScroll, {})
              ),
          {
            i: 'left' === t.align ? 1 : '',
            j: `nut-tabs__titles_${e.unref(s)}`,
            k: f.value,
            l: h.value,
            m: T.value,
            n: y.value,
            o: b.value,
            p: t.type,
            q: t.type ? 1 : '',
            r: t.titleScroll ? 1 : '',
            s: t.size,
            t: t.size ? 1 : '',
            v: e.s(M.value),
            w: e.unref(k),
            x: e.s(z.value),
            y: e.o(
              (...t) => e.unref(w).onTouchStart && e.unref(w).onTouchStart(...t)
            ),
            z: e.o(
              (...t) => e.unref(w).onTouchMove && e.unref(w).onTouchMove(...t)
            ),
            A: e.o(
              (...t) => e.unref(w).onTouchEnd && e.unref(w).onTouchEnd(...t)
            ),
            B: e.o(
              (...t) => e.unref(w).onTouchEnd && e.unref(w).onTouchEnd(...t)
            ),
            C: e.s(t.customStyle),
            D: e.n(P.value),
          }
        );
    },
  });
wx.createComponent(o);
