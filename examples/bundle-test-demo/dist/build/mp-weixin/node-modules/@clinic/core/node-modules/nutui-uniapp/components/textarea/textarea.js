'use strict';
const e = require('../../../../../../../common/vendor.js'),
  t = `${e.PREFIX}-textarea`,
  { translate: a } = e.useTranslate(t),
  o = e.defineComponent({
    name: t,
    inheritAttrs: !1,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  l = e.defineComponent({
    ...o,
    props: e.textareaProps,
    emits: e.textareaEmits,
    setup(o, { emit: l }) {
      const n = o,
        i = l,
        s = e.useFormDisabled(e.toRef(n, 'disabled'));
      const u = e.computed(() =>
          null == n.modelValue ? '' : String(n.modelValue)
        ),
        r = e.computed(() =>
          e.getMainClass(n, t, { [`${t}--disabled`]: s.value })
        ),
        c = e.computed(() => [
          n.textareaClass,
          { 'nut-textarea__ali': e.isMpAlipay },
        ]),
        d = e.computed(() => {
          const t = { textAlign: n.textAlign };
          if ('object' == typeof n.autosize) {
            const { minHeight: a, maxHeight: o } = n.autosize;
            null != a && (t.minHeight = e.pxCheck(a)),
              null != o && (t.maxHeight = e.pxCheck(o));
          }
          return [n.textareaStyle, t];
        }),
        m = e.computed(() => (null == n.maxLength ? -1 : Number(n.maxLength)));
      function p(t, a) {
        m.value > 0 && t.length > m.value && (t = t.slice(0, m.value)),
          i(e.UPDATE_MODEL_EVENT, t, a),
          i(e.CHANGE_EVENT, t, a);
      }
      function f(t) {
        p(t.detail.value, t),
          e.nextTick$1(() => {
            i(e.INPUT_EVENT, u.value, t);
          });
      }
      function h(t) {
        if (e.isH5) {
          t.target.composing || f(t);
        } else f(t);
      }
      function v(t) {
        s.value || n.readonly || i(e.FOCUS_EVENT, t);
      }
      function g(t) {
        s.value || n.readonly || (p(t.detail.value, t), i(e.BLUR_EVENT, t));
      }
      function E(t) {
        i(e.CONFIRM_EVENT, t);
      }
      function x(t) {
        if (e.isH5) {
          t.target.composing = !0;
        }
      }
      function y(t) {
        if (e.isH5) {
          const e = t.target;
          e.composing &&
            ((e.composing = !1), e.dispatchEvent(new Event('input')));
        }
      }
      return (t, o) =>
        e.e(
          { a: n.readonly },
          n.readonly
            ? {
                b: e.n(c.value),
                c: e.s(d.value),
                d: u.value,
                e: n.rows,
                f: n.placeholder || e.unref(a)('placeholder'),
                g: n.placeholderStyle,
                h: n.placeholderClass,
                i: !!n.autosize,
                j: n.disableDefaultPadding,
              }
            : {
                k: e.n(c.value),
                l: e.s(d.value),
                m: u.value,
                n: n.rows,
                o: e.unref(s) || n.readonly,
                p: m.value,
                q: n.placeholder || e.unref(a)('placeholder'),
                r: n.placeholderStyle,
                s: n.placeholderClass,
                t: n.autofocus,
                v: !!n.autosize,
                w: n.cursorSpacing,
                x: n.cursor,
                y: n.showConfirmBar,
                z: n.selectionStart,
                A: n.selectionEnd,
                B: n.adjustPosition,
                C: n.holdKeyboard,
                D: n.disableDefaultPadding,
                E: n.confirmType,
                F: n.confirmHold,
                G: n.adjustKeyboardTo,
                H: e.o(h),
                I: e.o(v),
                J: e.o(g),
                K: e.o(y),
                L: e.o(x),
                M: e.o(y),
                N: e.o(E),
              },
          { O: n.limitShow && m.value > 0 },
          n.limitShow && m.value > 0
            ? { P: e.t(u.value.length), Q: e.t(m.value) }
            : {},
          { R: e.n(r.value), S: e.s(n.customStyle) }
        );
    },
  });
wx.createComponent(l);
