'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || (l + a + t)();
const l = () => '../icon/icon.js',
  a = () => '../tabpane/tabpane.js',
  t = () => '../tabs/tabs.js',
  n = `${e.PREFIX}-cascader-item`,
  { translate: o } = e.useTranslate(n),
  u = e.defineComponent({
    name: n,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  s = e.defineComponent({
    ...u,
    props: e.cascaderitemProps,
    emits: e.cascaderitemEmits,
    setup(l, { emit: a }) {
      const t = l,
        u = a,
        s = e.computed(() => e.getMainClass(t, n)),
        i = e.computed(() => ({
          lazy: t.lazy,
          lazyLoad: t.lazyLoad,
          valueKey: t.valueKey,
          textKey: t.textKey,
          childrenKey: t.childrenKey,
          convertConfig: t.convertConfig,
        })),
        d = e.ref(0),
        v = e.ref(!1),
        c = e.ref(t.modelValue),
        r = e.ref(new e.Tree([], {})),
        f = e.ref([]),
        h = e.computed(() => i.value.lazy && Boolean(i.value.lazyLoad)),
        m = new Map();
      let p;
      const y = {
        async handleNode(l, a) {
          const { disabled: t, loading: n } = l;
          if ((a || !t) && f.value[d.value])
            if (r.value.isLeaf(l, h.value)) {
              if (
                ((l.leaf = !0),
                (f.value[d.value].selectedNode = l),
                (f.value = f.value.slice(0, l.level + 1)),
                !a)
              ) {
                const l = f.value.map((e) => e.selectedNode);
                !(function (l) {
                  const a = l.map((e) => e.value);
                  (c.value = a),
                    u(e.UPDATE_MODEL_EVENT, a),
                    u(e.CHANGE_EVENT, a, l);
                })(l),
                  u('pathChange', l);
              }
            } else if (r.value.hasChildren(l, h.value)) {
              const e = l.level + 1;
              if (
                ((f.value[d.value].selectedNode = l),
                (f.value = f.value.slice(0, e)),
                f.value.push({ nodes: l.children || [], selectedNode: null }),
                (d.value = e),
                !a)
              ) {
                const e = f.value.map((e) => e.selectedNode);
                u('pathChange', e);
              }
            } else
              (p = l),
                n ||
                  (await N(l),
                  p === l &&
                    ((f.value[d.value].selectedNode = l), y.handleNode(l, a)));
        },
        handleTabClick(e) {
          (p = null), (d.value = Number(e.paneKey));
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
      async function g() {
        const e = c.value;
        if (void 0 === e || !r.value.nodes.length) return;
        if (0 === e.length)
          return (
            (d.value = 0),
            void (f.value = [{ nodes: r.value.nodes, selectedNode: null }])
          );
        let l = e;
        if (h.value && Array.isArray(e) && e.length) {
          l = [];
          const a = r.value.nodes.find((l) => l.value === e[0]);
          if (a) {
            (l = [a.value]), (v.value = !0);
            const t = await e.slice(1).reduce(async (e, a) => {
              var t;
              const n = await e;
              await N(n);
              const o =
                null == (t = null == n ? void 0 : n.children)
                  ? void 0
                  : t.find((e) => e.value === a);
              return o && l.push(a), Promise.resolve(o);
            }, Promise.resolve(a));
            await N(t), (v.value = !1);
          }
        }
        if (l.length && e === t.modelValue) {
          r.value.getPathNodesByValue(l).forEach((e, l) => {
            (d.value = l), y.handleNode(e, !0);
          });
        }
      }
      async function N(e) {
        if (!e) return;
        if (!i.value.lazyLoad) return void (e.leaf = !0);
        if (r.value.isLeaf(e, h.value) || r.value.hasChildren(e, h.value))
          return;
        e.loading = !0;
        const l = e.root ? null : e;
        let a = m.get(e);
        a ||
          ((a = new Promise((l) => {
            var a, t;
            null == (t = (a = i.value).lazyLoad) || t.call(a, e, l);
          })),
          m.set(e, a));
        const t = await a;
        Array.isArray(t) && t.length > 0
          ? r.value.updateChildren(t, l)
          : (e.leaf = !0),
          (e.loading = !1),
          m.delete(e);
      }
      function C(e) {
        return e.selectedNode ? e.selectedNode.text : o('select');
      }
      return (
        e.watch(
          () => [i.value, t.options],
          () => {
            !(async function () {
              m.clear(),
                (f.value = []),
                (d.value = 0),
                (v.value = !1),
                (p = null);
              let { options: l } = t;
              i.value.convertConfig &&
                (l = e.convertListToOptions(l, i.value.convertConfig)),
                (r.value = new e.Tree(l, {
                  value: i.value.valueKey,
                  text: i.value.textKey,
                  children: i.value.childrenKey,
                })),
                h.value &&
                  !r.value.nodes.length &&
                  (await N({ root: !0, loading: !0, text: '', value: '' })),
                (f.value = [{ nodes: r.value.nodes, selectedNode: null }]),
                g();
            })();
          },
          { deep: !0, immediate: !0 }
        ),
        e.watch(
          () => t.modelValue,
          (e) => {
            e !== c.value && ((c.value = e), g());
          }
        ),
        e.watch(
          () => t.visible,
          (e) => {
            e && Array.isArray(c.value) && c.value.length > 0 && g();
          }
        ),
        (l, a) =>
          e.e(
            { a: !v.value && f.value.length },
            !v.value && f.value.length
              ? {
                  b: e.f(f.value, (l, a, t) => ({
                    a: e.f(l.nodes, (a, n, o) =>
                      e.e(
                        { a: e.t(a.text), b: a.loading },
                        a.loading
                          ? {
                              c:
                                '399646af-2-' +
                                t +
                                '-' +
                                o +
                                ',399646af-1-' +
                                t,
                              d: e.p({
                                'custom-class':
                                  'nut-cascader-item__icon-loading',
                                loading: !0,
                                name: 'loading',
                              }),
                            }
                          : {
                              e:
                                '399646af-3-' +
                                t +
                                '-' +
                                o +
                                ',399646af-1-' +
                                t,
                              f: e.p({
                                'custom-class': 'nut-cascader-item__icon-check',
                                name: 'checklist',
                              }),
                            },
                        {
                          g: y.isSelected(l, a) ? 1 : '',
                          h: a.disabled ? 1 : '',
                          i: y.isSelected(l, a),
                          j: a.disabled || void 0,
                          k: e.o((e) => y.handleNode(a, !1), a.value),
                          l: a.value,
                        }
                      )
                    ),
                    b: a,
                    c: '399646af-1-' + t + ',399646af-0',
                    d: e.p({ title: C(l) }),
                  })),
                }
              : { c: e.p({ title: 'Loading...' }) },
            {
              d: e.o(y.handleTabClick),
              e: e.o((e) => (d.value = e)),
              f: e.p({
                'custom-class': s.value,
                'custom-style': t.customStyle,
                type: t.titleType,
                size: t.titleSize,
                'title-gutter': t.titleGutter,
                ellipsis: t.titleEllipsis,
                'title-scroll': !0,
                modelValue: d.value,
              }),
            }
          )
      );
    },
  });
wx.createComponent(s);
