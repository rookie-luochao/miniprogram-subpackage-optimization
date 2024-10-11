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
        s = e.computed(() => e.getMainClass(t, o, { 'nut-cascader': !0 })),
        i = e.computed(() => ({
          lazy: t.lazy,
          lazyLoad: t.lazyLoad,
          valueKey: t.valueKey,
          textKey: t.textKey,
          childrenKey: t.childrenKey,
          convertConfig: t.convertConfig,
        })),
        d = e.ref(0),
        c = e.ref(!1),
        v = e.ref(t.modelValue),
        r = e.ref(new e.Tree([], {})),
        f = e.ref([]),
        h = e.computed(() => i.value.lazy && Boolean(i.value.lazyLoad)),
        m = new Map();
      let p;
      async function y() {
        const e = v.value;
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
            (d.value = l), C.handleNode(e, !0);
          });
        }
      }
      async function g(e) {
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
      function N(e) {
        return e.selectedNode ? e.selectedNode.text : u('select');
      }
      const C = {
        async handleNode(l, a) {
          const { disabled: t, loading: o } = l;
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
                  (v.value = a),
                    n(e.CHANGE_EVENT, a, l),
                    n(e.UPDATE_MODEL_EVENT, a, l);
                })(l),
                  n('pathChange', l);
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
                n('pathChange', e);
              }
            } else
              (p = l),
                o ||
                  (await g(l),
                  p === l &&
                    ((f.value[d.value].selectedNode = l), C.handleNode(l, a)));
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
      return (
        e.watch(
          [i, () => t.options],
          () => {
            !(async function () {
              m.clear(),
                (f.value = []),
                (d.value = 0),
                (c.value = !1),
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
                  (await g({ root: !0, loading: !0, text: '', value: '' })),
                (f.value = [{ nodes: r.value.nodes, selectedNode: null }]),
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
            { a: !c.value && f.value.length },
            !c.value && f.value.length
              ? {
                  b: e.f(f.value, (l, a, t) => ({
                    a: e.f(l.nodes, (a, n, o) =>
                      e.e(
                        { a: e.t(a.text), b: a.loading },
                        a.loading
                          ? {
                              c:
                                '61f858ad-2-' +
                                t +
                                '-' +
                                o +
                                ',61f858ad-1-' +
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
                                '61f858ad-3-' +
                                t +
                                '-' +
                                o +
                                ',61f858ad-1-' +
                                t,
                              f: e.p({
                                'custom-class': 'nut-cascader-item__icon-check',
                                name: 'checklist',
                              }),
                            },
                        {
                          g: C.isSelected(l, a),
                          h: a.disabled || void 0,
                          i: C.isSelected(l, a) ? 1 : '',
                          j: a.disabled ? 1 : '',
                          k: e.o((e) => C.handleNode(a, !1), a.value),
                          l: a.value,
                        }
                      )
                    ),
                    b: a,
                    c: '61f858ad-1-' + t + ',61f858ad-0',
                    d: e.p({ title: N(l) }),
                  })),
                }
              : { c: e.p({ title: 'Loading...' }) },
            {
              d: e.o(C.handleTabClick),
              e: e.o((e) => (d.value = e)),
              f: e.p({
                'custom-class': s.value,
                'custom-style': l.customStyle,
                type: t.titleType,
                ellipsis: t.titleEllipsis,
                'title-gutter': t.titleGutter,
                size: t.titleSize,
                'title-scroll': !0,
                modelValue: d.value,
              }),
            }
          )
      );
    },
  });
wx.createComponent(o);
