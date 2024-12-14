'use strict';
const e = require('../../../../../../../../common/vendor.js'),
  t =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111215234480478670201240.png',
  c = e.defineComponent({
    __name: 'index',
    props: { detail: {} },
    setup(c) {
      const n = c;
      return (c, a) => ({
        a: t,
        b: t,
        c: e.t(c.detail.evaluationTime),
        d: e.t(c.detail.content),
        e: e.f(c.detail.picUrl, (t, c, a) => ({
          a: t,
          b: t,
          c: e.o(
            (t) =>
              ((t) => {
                var c;
                e.index.previewImage({
                  urls: null != (c = n.detail.picUrl) ? c : [],
                  current: t,
                });
              })(c),
            t
          ),
        })),
      });
    },
  }),
  n = e._export_sfc(c, [['__scopeId', 'data-v-845409dc']]);
wx.createComponent(n);
