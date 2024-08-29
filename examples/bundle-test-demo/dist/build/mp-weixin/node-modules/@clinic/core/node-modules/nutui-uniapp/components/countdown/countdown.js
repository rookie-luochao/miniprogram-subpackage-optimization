'use strict';
const e = require('../../../../../../../common/vendor.js'),
  t = `${e.PREFIX}-countdown`,
  n = e.defineComponent({
    name: t,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  o = e.defineComponent({
    ...n,
    props: e.countdownProps,
    emits: e.countdownEmits,
    setup(n, { expose: o, emit: i }) {
      const s = n,
        a = i;
      o({
        start: function () {
          r.counting ||
            s.autoStart ||
            ((r.counting = !0),
            (r.handleEndTime = Date.now() + Number(r.restTime)),
            d(),
            a('onRestart', r.restTime));
        },
        pause: l,
        reset: function () {
          s.autoStart || (l(), (r.restTime = s.time));
        },
      });
      const r = e.reactive({
          restTime: 0,
          timer: null,
          counting: !s.paused && s.autoStart,
          handleEndTime: Date.now(),
          diffTime: 0,
        }),
        m = e.computed(() => e.getMainClass(s, t));
      function c(t, n) {
        const o = t,
          i = { d: 0, h: 0, m: 0, s: 0, ms: 0 },
          a = 1e3,
          r = 6e4,
          m = 36e5,
          c = 24 * m;
        return (
          o > 0 &&
            ((i.d = o >= a ? Math.floor(o / c) : 0),
            (i.h = Math.floor((o % c) / m)),
            (i.m = Math.floor((o % m) / r)),
            (i.s = Math.floor((o % r) / a)),
            (i.ms = Math.floor(o % a))),
          'custom' === n
            ? i
            : (function (t) {
                let { d: n, h: o, m: i, s: a, ms: r } = t,
                  m = s.format;
                m.includes('DD')
                  ? (m = m.replace('DD', e.padZero(n)))
                  : (o += 24 * Number(n));
                m.includes('HH')
                  ? (m = m.replace('HH', e.padZero(o)))
                  : (i += 60 * Number(o));
                m.includes('mm')
                  ? (m = m.replace('mm', e.padZero(i)))
                  : (a += 60 * Number(i));
                m.includes('ss')
                  ? (m = m.replace('ss', e.padZero(a)))
                  : (r += 1e3 * Number(a));
                if (m.includes('S')) {
                  const t = e.padZero(r, 3).toString();
                  m.includes('SSS')
                    ? (m = m.replace('SSS', t))
                    : m.includes('SS')
                      ? (m = m.replace('SS', t.slice(0, 2)))
                      : m.includes('S') && (m = m.replace('S', t.slice(0, 1)));
                }
                return m;
              })({ ...i })
        );
      }
      function u() {
        (r.handleEndTime = s.endTime),
          (r.diffTime = Date.now() - e.getTimeStamp(s.startTime)),
          r.counting || (r.counting = !0),
          d();
      }
      function d() {
        function t() {
          const e = Date.now() - r.diffTime,
            t = Math.max(r.handleEndTime - e, 0);
          (r.restTime = t),
            t || ((r.counting = !1), l(), a('onEnd')),
            t > 0 && d();
        }
        e.isH5
          ? (r.timer = requestAnimationFrame(() => {
              r.counting && t();
            }))
          : (r.timer = e.raf(() => {
              r.counting && t();
            }));
      }
      function l() {
        e.isH5 ? cancelAnimationFrame(r.timer) : clearTimeout(r.timer),
          (r.counting = !1),
          a('onPaused', r.restTime);
      }
      const T = e.computed(() => c(r.restTime));
      return (
        e.onBeforeMount(() => {
          s.autoStart ? u() : (r.restTime = s.time);
        }),
        e.watch(
          () => r.restTime,
          (t) => {
            const n = c(t, 'custom');
            a(e.UPDATE_MODEL_EVENT, n), a(e.INPUT_EVENT, n);
          }
        ),
        e.watch(
          () => s.paused,
          (e, t) => {
            t
              ? (r.counting ||
                  ((r.counting = !0),
                  (r.handleEndTime = Date.now() + Number(r.restTime)),
                  d()),
                a('onRestart', r.restTime))
              : r.counting && l();
          }
        ),
        e.watch(
          () => s.endTime,
          () => {
            u();
          }
        ),
        e.watch(
          () => s.startTime,
          () => {
            u();
          }
        ),
        (t, n) =>
          e.e({ a: t.$slots.default }, t.$slots.default ? {} : { b: T.value }, {
            c: e.n(m.value),
            d: e.s(t.customStyle),
          })
      );
    },
  });
wx.createComponent(o);
