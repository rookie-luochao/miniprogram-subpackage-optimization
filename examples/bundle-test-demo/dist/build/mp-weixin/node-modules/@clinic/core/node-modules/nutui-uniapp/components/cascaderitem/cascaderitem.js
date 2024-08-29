'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || (t + a + l)();
const l = () => '../tabs/tabs.js',
  a = () => '../tabpane/tabpane.js',
  t = () => '../icon/icon.js',
  n = e.defineComponent({
    name: `${e.PREFIX}-cascader-item`,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  o = e.defineComponent({
    ...n,
    props: e.cascaderitemProps,
    emits: e.cascaderitemEmits,
    setup(l, { emit: a }) {
      const t = l,
        n = a,
        o = `${e.PREFIX}-calendar-item`,
        { translate: u } = e.useTranslate(o),
        d = e.computed(() => e.getMainClass(t, o, { 'nut-cascader': !0 })),
        s = e.computed(() => ({
          lazy: t.lazy,
          lazyLoad: t.lazyLoad,
          valueKey: t.valueKey,
          textKey: t.textKey,
          childrenKey: t.childrenKey,
          convertConfig: t.convertConfig,
        })),
        i = e.ref(0),
        c = e.ref(!1),
        v = e.ref(t.modelValue),
        r = e.ref(new e.Tree([], {})),
        h = e.ref([]),
        f = e.computed(() => s.value.lazy && Boolean(s.value.lazyLoad)),
        m = new Map();
      let p;
      async function y() {
        const e = v.value;
        if (void 0 === e || !r.value.nodes.length) return;
        if (0 === e.length)
          return (
            (i.value = 0),
            void (h.value = [{ nodes: r.value.nodes, selectedNode: null }])
          );
        let l = e;
        if (f.value && Array.isArray(e) && e.length) {
          l = [];
          const a = r.value.nodes.find((l) => l.value === e[0]);
          if (a) {
            (l = [a.value]), (c.value = !0);
            const t = await e.slice(1).reduce(async (e, a) => {
              var t;
              const n = await e;
              await g(n);
              const o =
                null == (t = null == n ? void 0 : n.children)
                  ? void 0
                  : t.find((e) => e.value === a);
              return o && l.push(a), Promise.resolve(o);
            }, Promise.resolve(a));
            await g(t), (c.value = !1);
          }
        }
        if (l.length && e === t.modelValue) {
          r.value.getPathNodesByValue(l).forEach((e, l) => {
            (i.value = l), N.handleNode(e, !0);
          });
        }
      }
      async function g(e) {
        if (!e) return;
        if (!s.value.lazyLoad) return void (e.leaf = !0);
        if (r.value.isLeaf(e, f.value) || r.value.hasChildren(e, f.value))
          return;
        e.loading = !0;
        const l = e.root ? null : e;
        let a = m.get(e);
        a ||
          ((a = new Promise((l) => {
            var a, t;
            null == (t = (a = s.value).lazyLoad) || t.call(a, e, l);
          })),
          m.set(e, a));
        const t = await a;
        Array.isArray(t) && t.length > 0
          ? r.value.updateChildren(t, l)
          : (e.leaf = !0),
          (e.loading = !1),
          m.delete(e);
      }
      function b(e) {
        return e.selectedNode ? e.selectedNode.text : u('select');
      }
      const N = {
        async handleNode(l, a) {
          const { disabled: t, loading: o } = l;
          if ((a || !t) && h.value[i.value])
            if (r.value.isLeaf(l, f.value)) {
              if (
                ((l.leaf = !0),
                (h.value[i.value].selectedNode = l),
                (h.value = h.value.slice(0, l.level + 1)),
                !a)
              ) {
                const l = h.value.map((e) => e.selectedNode);
                !(function (l) {
                  const a = l.map((e) => e.value);
                  (v.value = a),
                    n(e.CHANGE_EVENT, a, l),
                    n(e.UPDATE_MODEL_EVENT, a, l);
                })(l),
                  n('pathChange', l);
              }
            } else if (r.value.hasChildren(l, f.value)) {
              const e = l.level + 1;
              if (
                ((h.value[i.value].selectedNode = l),
                (h.value = h.value.slice(0, e)),
                h.value.push({ nodes: l.children || [], selectedNode: null }),
                (i.value = e),
                !a)
              ) {
                const e = h.value.map((e) => e.selectedNode);
                n('pathChange', e);
              }
            } else
              (p = l),
                o ||
                  (await g(l),
                  p === l &&
                    ((h.value[i.value].selectedNode = l), N.handleNode(l, a)));
        },
        handleTabClick(e) {
          (p = null), (i.value = Number(e.paneKey));
        },
        isSelected(e, l) {
          var a;
          return (
            (null == (a = null == e ? void 0 : e.selectedNode)
              ? void 0
              : a.value) === l.value
          );
        },
      };
      return (
        e.watch(
          [s, () => t.options],
          () => {
            !(async function () {
              m.clear(),
                (h.value = []),
                (i.value = 0),
                (c.value = !1),
                (p = null);
              let { options: l } = t;
              s.value.convertConfig &&
                (l = e.convertListToOptions(l, s.value.convertConfig)),
                (r.value = new e.Tree(l, {
                  value: s.value.valueKey,
                  text: s.value.textKey,
                  children: s.value.childrenKey,
                })),
                f.value &&
                  !r.value.nodes.length &&
                  (await g({ root: !0, loading: !0, text: '', value: '' })),
                (h.value = [{ nodes: r.value.nodes, selectedNode: null }]),
                y();
            })();
          },
          { deep: !0, immediate: !0 }
        ),
        e.watch(
          () => t.modelValue,
          (e) => {
            e !== v.value && ((v.value = e), y());
          }
        ),
        e.watch(
          () => t.visible,
          (e) => {
            e && Array.isArray(v.value) && v.value.length > 0 && y();
          }
        ),
        (l, a) =>
          e.e(
            { a: !c.value && h.value.length },
            !c.value && h.value.length
              ? {
                  b: e.f(h.value, (l, a, t) => ({
                    a: e.f(l.nodes, (a, n, o) =>
                      e.e(
                        { a: e.t(a.text), b: a.loading },
                        a.loading
                          ? {
                              c:
                                '7bdd245c-2-' +
                                t +
                                '-' +
                                o +
                                ',7bdd245c-1-' +
                                t,
                              d: e.p({
                                loading: !0,
                                'custom-class':
                                  'nut-cascader-item__icon-loading',
                                name: 'loading',
                              }),
                            }
                          : {
                              e:
                                '7bdd245c-3-' +
                                t +
                                '-' +
                                o +
                                ',7bdd245c-1-' +
                                t,
                              f: e.p({
                                'custom-class': 'nut-cascader-item__icon-check',
                                name: 'checklist',
                              }),
                            },
                        {
                          g: N.isSelected(l, a),
                          h: a.disabled || void 0,
                          i: N.isSelected(l, a) ? 1 : '',
                          j: a.disabled ? 1 : '',
                          k: e.o((e) => N.handleNode(a, !1), a.value),
                          l: a.value,
                        }
                      )
                    ),
                    b: a,
                    c: '7bdd245c-1-' + t + ',7bdd245c-0',
                    d: e.p({ title: b(l) }),
                  })),
                }
              : { c: e.p({ title: 'Loading...' }) },
            {
              d: e.o(N.handleTabClick),
              e: e.o((e) => (i.value = e)),
              f: e.p({
                'custom-class': d.value,
                'custom-style': l.customStyle,
                type: t.titleType,
                ellipsis: t.titleEllipsis,
                'title-gutter': t.titleGutter,
                size: t.titleSize,
                'title-scroll': !0,
                modelValue: i.value,
              }),
            }
          )
      );
    },
  });
wx.createComponent(o);
