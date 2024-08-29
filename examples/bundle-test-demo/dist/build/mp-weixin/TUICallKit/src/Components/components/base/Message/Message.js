'use strict';
const e = require('../../../../../../common/vendor.js'),
  s = require('../util/classNames.js');
require('../util/checkEnv.js');
const o = require('../constants/index.js'),
  t = require('../../../../../../common/assets.js'),
  u = [o.NAME.SUCCESS, o.NAME.INFO, o.NAME.WARNING, o.NAME.ERROR],
  a = {
    isShow: { type: Boolean, default: !1 },
    message: { type: String, default: '' },
    type: { type: String, values: u, default: o.NAME.INFO },
    duration: { type: Number, default: 3e3 },
    offset: { type: Number, default: 16 },
    showClose: { type: Boolean, default: !1 },
    showIcon: { type: Boolean, default: !0 },
    customClass: { type: String },
    customStyle: { type: Object },
  };
Math || l();
const l = () => '../Icon/Icon.js',
  n = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'Message',
    props: a,
    emits: { onClose: null },
    setup(u, { expose: l, emit: n }) {
      const r = u,
        c = n,
        {
          messageContent: i,
          messageType: f,
          messageOffset: m,
          isShowCloseIcon: d,
          visible: p,
          show: v,
          close: g,
        } = (function (s, o) {
          const t = e.ref(
              (null == s ? void 0 : s.message) || a.message.default
            ),
            u = e.ref((null == s ? void 0 : s.duration) || a.duration.default),
            l = e.ref((null == s ? void 0 : s.type) || a.type.default),
            n = e.ref((null == s ? void 0 : s.offset) || a.offset.default),
            r = e.ref(
              (null == s ? void 0 : s.showClose) || a.showClose.default
            ),
            c = e.ref(!1);
          let i = -1;
          const f = (e) => {
              i > -1 && (clearTimeout(i), (i = -1)),
                (c.value = !0),
                d(e || {}),
                u.value &&
                  (i = setTimeout(() => {
                    m();
                  }, u.value));
            },
            m = () => {
              (c.value = !1), i > -1 && (clearTimeout(i), (i = -1));
            },
            d = (e) => {
              const {
                message: o = t.value,
                type: a = l.value,
                offset: c = n.value,
                duration: i = u.value,
                showClose: f = r.value,
              } = e;
              (u.value =
                0 === (null == s ? void 0 : s.duration)
                  ? null == s
                    ? void 0
                    : s.duration
                  : i),
                (t.value = o),
                (l.value = a),
                (n.value = c),
                (r.value = f);
            };
          return (
            e.watch(
              () => (null == s ? void 0 : s.isShow),
              (e) => {
                e && f();
              },
              { immediate: !0 }
            ),
            e.watch(c, (e) => {
              e || o('onClose');
            }),
            {
              messageContent: t,
              messageDuration: u,
              messageType: l,
              messageOffset: n,
              isShowCloseIcon: r,
              visible: c,
              show: f,
              close: m,
            }
          );
        })(r, c),
        h = e.computed(() =>
          s.classNames([
            `${o.PREFIX}-message`,
            `${o.PREFIX}-message--${f.value}`,
            r.customClass,
          ])
        ),
        S = e.computed(() => s.classNames([`${o.PREFIX}-message_icon`])),
        w = e.computed(() => s.classNames([`${o.PREFIX}-message_close`])),
        y = e.computed(() => `${m.value}px`),
        C = e.computed(() => ({ top: y.value, ...r.customStyle })),
        N = {
          info: t.InfoSrc,
          waring: t.WaringSrc,
          success: t.SuccessSrc,
          error: t.ErrorSrc,
        };
      return (
        l({ show: v, close: g }),
        (s, o) =>
          e.e(
            { a: e.unref(p) },
            e.unref(p)
              ? {
                  b: e.p({ src: N[e.unref(f)] }),
                  c: e.n(e.unref(S)),
                  d: s.showIcon,
                  e: e.t(e.unref(i)),
                  f: e.p({ src: e.unref(t.CloseSrc) }),
                  g: e.unref(d),
                  h: e.n(e.unref(w)),
                  i: e.o((...s) => e.unref(g) && e.unref(g)(...s)),
                  j: e.n(e.unref(h)),
                  k: e.s(e.unref(C)),
                }
              : {}
          )
      );
    },
  });
wx.createComponent(n);
