'use strict';
const e = require('../../../../../../../common/vendor.js');
Math || t();
const t = () => '../picker/picker.js',
  n = `${e.PREFIX}-date-picker`,
  a = e.defineComponent({
    name: n,
    options: { virtualHost: !0, addGlobalClass: !0, styleIsolation: 'shared' },
  }),
  r = e.defineComponent({
    ...a,
    props: e.datepickerProps,
    emits: e.datepickerEmits,
    setup(t, { emit: n }) {
      const a = t,
        r = n,
        u = {
          day: '日',
          year: '年',
          month: '月',
          hour: '时',
          minute: '分',
          seconds: '秒',
        },
        o = e.reactive({ currentDate: new Date(), selectedValue: [] });
      function c(t) {
        return null == t ? new Date() : e.isDate(t) ? t : new Date(t);
      }
      const s = e.computed(() => c(a.minDate)),
        l = e.computed(() => c(a.maxDate));
      function i(e) {
        return new Date(
          Math.min(Math.max(e.getTime(), s.value.getTime()), l.value.getTime())
        );
      }
      function m(e, t) {
        return 32 - new Date(e, t - 1, 32).getDate();
      }
      function d(e, t) {
        const n = 'min' === e ? s.value : l.value,
          a = n.getFullYear();
        let r = 1,
          u = 1,
          o = 0,
          c = 0;
        'max' === e &&
          ((r = 12),
          (u = m(t.getFullYear(), t.getMonth() + 1)),
          (o = 23),
          (c = 59));
        let i = c;
        return (
          t.getFullYear() === a &&
            ((r = n.getMonth() + 1),
            t.getMonth() + 1 === r &&
              ((u = n.getDate()),
              t.getDate() === u &&
                ((o = n.getHours()),
                t.getHours() === o &&
                  ((c = n.getMinutes()),
                  t.getMinutes() === c && (i = n.getSeconds()))))),
          {
            [`${e}Year`]: a,
            [`${e}Month`]: r,
            [`${e}Date`]: u,
            [`${e}Hour`]: o,
            [`${e}Minute`]: c,
            [`${e}Seconds`]: i,
          }
        );
      }
      const h = e.computed(() => {
          const {
              minYear: e,
              minDate: t,
              minMonth: n,
              minHour: a,
              minMinute: r,
              minSeconds: u,
            } = d('min', o.currentDate),
            {
              maxYear: c,
              maxDate: s,
              maxMonth: l,
              maxHour: i,
              maxMinute: m,
              maxSeconds: h,
            } = d('max', o.currentDate);
          return w([
            { type: 'year', range: [e, c] },
            { type: 'month', range: [n, l] },
            { type: 'day', range: [t, s] },
            { type: 'hour', range: [a, i] },
            { type: 'minute', range: [r, m] },
            { type: 'seconds', range: [u, h] },
          ]);
        }),
        p = e.computed(() =>
          h.value.map((e, t) => {
            return (function (e, t, n, r, u) {
              var c;
              const s = [];
              let l = 0;
              for (; e <= t; )
                s.push(g(r, e)),
                  (e += 'minute' === r ? a.minuteStep : 1) <= Number(n) &&
                    (l += 1);
              return (
                (o.selectedValue[u] = null == (c = s[l]) ? void 0 : c.value),
                a.filter ? a.filter(r, s) : s
              );
            })(
              e.range[0],
              e.range[1],
              'year' === (n = e.type)
                ? o.currentDate.getFullYear()
                : 'month' === n
                  ? o.currentDate.getMonth() + 1
                  : 'day' === n
                    ? o.currentDate.getDate()
                    : 'hour' === n
                      ? o.currentDate.getHours()
                      : 'minute' === n
                        ? o.currentDate.getMinutes()
                        : 'seconds' === n
                          ? o.currentDate.getSeconds()
                          : 0,
              e.type,
              t
            );
            var n;
          })
        );
      function D({ columnIndex: e, selectedValue: t, selectedOptions: n }) {
        const u = [...t];
        'month-day' === a.type &&
          u.length < 3 &&
          u.unshift(
            new Date(o.currentDate || s.value || l.value).getFullYear()
          ),
          'year-month' === a.type &&
            u.length < 3 &&
            u.push(new Date(o.currentDate || s.value || l.value).getDate());
        const c = Number(u[0]),
          d = Number(u[1]) - 1,
          h = Math.min(Number(u[2]), m(Number(u[0]), Number(u[1])));
        let p = null;
        if (
          'date' === a.type ||
          'month-day' === a.type ||
          'year-month' === a.type
        )
          p = new Date(c, d, h);
        else if ('datetime' === a.type)
          p = new Date(c, d, h, Number(u[3]), Number(u[4]));
        else if ('datehour' === a.type) p = new Date(c, d, h, Number(u[3]));
        else if ('hour-minute' === a.type || 'time' === a.type) {
          p = new Date(o.currentDate);
          const e = p.getFullYear(),
            t = p.getMonth(),
            n = p.getDate();
          p = new Date(e, t, n, Number(u[0]), Number(u[1]), Number(u[2] || 0));
        }
        (o.currentDate = i(p)),
          r('change', {
            date: p,
            columnIndex: e,
            selectedValue: t,
            selectedOptions: n,
          });
      }
      function g(t, n) {
        const { formatter: r, isShowChinese: o } = a,
          c = e.padZero(n, 2);
        let s;
        return (
          (s = r
            ? r(t, { text: c, value: c })
            : { text: `${c}${o ? u[t] : ''}`, value: c }),
          s
        );
      }
      function y({ selectedValue: e, selectedOptions: t }) {
        let n = null;
        switch (a.type) {
          case 'date':
          case 'datehour':
          case 'datetime':
          case 'year-month': {
            const [t = 0, a = 0, r = 0, u = 0, o = 0, c = 0] = e;
            n = new Date(
              Number(t),
              Number(a) - 1,
              Number(r),
              Number(u),
              Number(o),
              Number(c)
            );
            break;
          }
          case 'time':
          case 'hour-minute': {
            const [t = 0, a = 0, r = 0] = e;
            n = new Date(0, 0, 0, Number(t), Number(a), Number(r));
            break;
          }
          case 'month-day': {
            const [t = 0, a = 0] = e;
            n = new Date(0, Number(t) - 1, Number(a));
            break;
          }
        }
        return (
          null == n && (n = new Date()),
          { date: n, selectedValue: e, selectedOptions: t }
        );
      }
      function b(t) {
        r(e.CANCEL_EVENT, y(t));
      }
      function N(t) {
        r(e.CONFIRM_EVENT, y(t));
      }
      function w(e) {
        switch (a.type) {
          case 'date':
            return e.slice(0, 3);
          case 'datetime':
            return e.slice(0, 5);
          case 'time':
            return e.slice(3, 6);
          case 'year-month':
            return e.slice(0, 2);
          case 'month-day':
            return e.slice(1, 3);
          case 'datehour':
            return e.slice(0, 4);
          case 'hour-minute':
            return e.slice(3, 5);
        }
        return e;
      }
      function f(e) {
        return w(
          [
            e.getFullYear(),
            e.getMonth() + 1,
            e.getDate(),
            e.getHours(),
            e.getMinutes(),
            e.getSeconds(),
          ].map((e) => String(e))
        );
      }
      return (
        e.onBeforeMount(() => {
          o.currentDate = i(c(a.modelValue));
        }),
        e.watch(
          () => a.modelValue,
          (t) => {
            const n = i(c(t));
            e.isEqualValue(n, o.currentDate) ||
              ((o.currentDate = n), (o.selectedValue = f(n)));
          }
        ),
        e.watch(
          () => o.currentDate,
          (t) => {
            e.isEqualValue(t, c(a.modelValue)) ||
              (r(e.UPDATE_MODEL_EVENT, t),
              e.nextTick$1(() => {
                o.selectedValue = f(t);
              }));
          }
        ),
        (t, n) => ({
          a: e.o(D),
          b: e.o(N),
          c: e.o(b),
          d: e.o((e) => (o.selectedValue = e)),
          e: e.p({
            'show-toolbar': a.showToolbar,
            title: a.title,
            'ok-text': a.okText,
            'cancel-text': a.cancelText,
            columns: p.value,
            'three-dimensional': a.threeDimensional,
            'swipe-duration': a.swipeDuration,
            'visible-option-num': a.visibleOptionNum,
            'option-height': a.optionHeight,
            modelValue: o.selectedValue,
          }),
        })
      );
    },
  });
wx.createComponent(r);
