'use strict';
const e = require('../../../../common/vendor.js');
require('../../TUICallService/index.js');
const l = require('./useFloatWindowContext.js'),
  t = require('../../TUICallService/CallService/index.js');
exports.useGroupCallLayout = function (u, a) {
  const { isFloatWindow: o } = e.toRefs(l.useFloatWindowContext()),
    n = e.ref();
  return (
    e.watch(
      [u, a, o],
      () => {
        if (o.value) {
          const e = [];
          for (let l = 0; l < a.value; l++)
            e[l] = { i: l, x: 0, y: 0, w: 12, h: 12 };
          return void (n.value = e);
        }
        const e = Object.keys(Array.from({ length: a.value })),
          l = a.value <= 4 ? 6 : 4,
          i = ((e, l) => {
            const u = [{ i: 0, x: 0, y: 0, w: l, h: l }];
            for (let t = 1; t < e; t++) {
              const e = u[t - 1].x + l === 12;
              u[t] = {
                i: t,
                x: u[t - 1].x + l === 12 ? 0 : u[t - 1].x + l,
                y: u[t - 1].y + (e ? l : 0),
                w: l,
                h: l,
              };
            }
            return (
              3 === e && (u[e - 1].x += 3),
              e > 3 &&
                t.TUIGlobal.isPC &&
                e % 3 == 2 &&
                ((u[e - 1].x += 2), (u[e - 2].x += 2)),
              u
            );
          })(a.value, l);
        let v, r;
        if (((n.value = i), null !== u.value)) {
          if (e.length < 5) {
            const l = e.concat();
            l.splice(u.value, 1), l.unshift(u.value);
          } else (r = u.value % 3), (v = Math.floor(u.value / 3));
          if (e.length < 5) {
            const e = i.findIndex((e) => e.i === u.value);
            if (-1 !== e) {
              const l = i[0];
              (i[0] = i[e]), (i[e] = l);
              for (let e = 0; e < i.length; e++) {
                const l = i[e];
                0 === e
                  ? ((l.w += 6), (l.h += 6), (l.x = 0), (l.y = 0))
                  : ((l.x = 4 * (e - 1)), (l.y = 12), (l.w = 4), (l.h = 4));
              }
            }
          } else {
            let e;
            0 === r
              ? (i[u.value + 1] && (i[u.value + 1].x += 4),
                i[u.value + 2] && (i[u.value + 2].y += 4),
                (e = { i: u.value, x: 0, y: 4 * v, w: 8, h: 8 }))
              : 2 === r
                ? ((e = { i: u.value, x: 4, y: 4 * v, w: 8, h: 8 }),
                  (i[u.value - 1].x = 0),
                  (i[u.value - 1].y += 4))
                : 1 === r &&
                  ((e = { i: u.value, x: 4, y: 4 * v, w: 8, h: 8 }),
                  i[u.value + 1] &&
                    ((i[u.value + 1].x = 0), (i[u.value + 1].y += 4)));
            const l = 3 - r;
            for (let t = u.value + l; t < i.length; t++) {
              i[t].y += 4;
            }
            i[u.value] = e;
          }
          n.value = i;
        }
      },
      { immediate: !0 }
    ),
    n
  );
};
