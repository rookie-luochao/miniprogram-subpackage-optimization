'use strict';
const e = require('../../../../../../common/vendor.js');
Math || t();
const t = () => '../../components/Navbar/index.js',
  o = e.defineComponent({
    __name: 'index',
    setup(t, { expose: o }) {
      const s = e.ref([
          {
            Remark: '',
            AcceptTime: '',
            Action: '',
            ActionText: '收货地址',
            Location: '',
            AcceptStation: '',
            status: 'extra',
          },
        ]),
        a = () => {
          e.index.setClipboardData({ data: c.value.logisticsNumber });
        },
        c = e.ref({ logisticsNumber: '', logisticsCompany: '' });
      return (
        o({
          pageOnShow: async () => {
            console.log('pageOnShow');
          },
          pageOnLoad: (t) => {
            (c.value.logisticsCompany = t.logisticsCompany),
              (c.value.logisticsNumber = t.logisticsNumber),
              (s.value[0].AcceptStation = t.address),
              t.goodsOrderId &&
                (async (t) => {
                  const { data: o } = await e.requestGetLogisticsInfo({
                    goodsOrderId: t,
                  });
                  o.Traces && o.Traces.length > 0
                    ? (s.value = s.value.concat(
                        o.Traces.map((t, s) => {
                          var a, c;
                          return {
                            ...t,
                            ActionText:
                              e.LogisticsStatusDesc[
                                null !=
                                (c =
                                  null == (a = t.Action)
                                    ? void 0
                                    : a.slice(0, 1))
                                  ? c
                                  : 0
                              ],
                            disabled: s !== o.Traces.length - 1,
                          };
                        }).reverse()
                      ))
                    : s.value.push({ ActionText: '暂无物流信息' });
                })(t.goodsOrderId);
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (t, o) => ({
          a: e.p({ title: '物流轨迹' }),
          b: e.t(c.value.logisticsCompany),
          c: e.t(c.value.logisticsNumber),
          d: e.o(a),
          e: e.f(s.value, (t, o, s) => ({
            a: e.t(t.ActionText),
            b: e.t(t.AcceptTime),
            c: e.t(t.AcceptStation),
            d: o,
            e: 'extra' === t.status ? 1 : '',
            f: t.disabled ? 1 : '',
          })),
        })
      );
    },
  }),
  s = e._export_sfc(o, [['__scopeId', 'data-v-e9915c9e']]);
wx.createComponent(s);
