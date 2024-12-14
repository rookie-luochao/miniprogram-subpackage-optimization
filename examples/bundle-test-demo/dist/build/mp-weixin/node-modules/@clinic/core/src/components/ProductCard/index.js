'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (t + o)();
const o = () => '../Card/index.js',
  t = () => '../Image/index.js',
  n =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111315061936102970201240.png',
  a = e.defineComponent({
    __name: 'index',
    props: {
      order: {},
      afterSales: { type: Boolean },
      showFooter: { type: Boolean },
      onCancel: { type: Function },
      onDelete: { type: Function },
      onPay: { type: Function },
      onConfirm: { type: Function },
    },
    setup(o) {
      const t = o,
        a = e.computed(() => {
          var e, o;
          return null !=
            (o = null == (e = t.order.goodsList) ? void 0 : e.length)
            ? o
            : 0;
        }),
        l = e.computed(() => {
          var e;
          return null == (e = t.order.goodsList) ? void 0 : e[0];
        }),
        s = {
          [e.OrderStatus.WaitPay]: { title: '待支付', buttons: ['去支付'] },
          [e.OrderStatus.Cancel]: {
            title: '交易取消',
            className: 'cancel',
            buttons: ['删除订单'],
          },
          [e.OrderStatus.Finish]: { title: '交易成功', buttons: ['删除订单'] },
          [e.OrderStatus.WaitDeliver]: { title: '待发货' },
          [e.OrderStatus.Delivered]: { title: '待收货', buttons: ['确定收货'] },
        },
        r = e.computed(() => s[t.order.orderStatus]);
      return (o, s) => {
        var u, d, i, c, p, v, h, m, y, f;
        return e.e(
          {
            a: e.t(o.order.orderSource),
            b: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111315034809590850201233.png',
            c: e.t(a.value),
            d: !t.afterSales,
          },
          t.afterSales
            ? { g: e.t(o.order.payTime) }
            : { e: e.t(r.value.title), f: e.n(r.value.className) },
          { h: a.value > 1 },
          a.value > 1
            ? {
                i: e.f(o.order.goodsList, (o, t, a) =>
                  e.e(
                    {
                      a: 'b71df9ce-1-' + a + ',b71df9ce-0',
                      b: e.p({ src: o.goodsMainImg, mode: 'scaleToFill' }),
                      c:
                        o.nhsaType &&
                        o.nhsaType !== e.unref(e.GoodsNHSAType).NonMedical,
                    },
                    o.nhsaType &&
                      o.nhsaType !== e.unref(e.GoodsNHSAType).NonMedical
                      ? { d: n }
                      : {},
                    { e: o.id }
                  )
                ),
              }
            : e.e(
                {
                  j: null == (u = l.value) ? void 0 : u.goodsMainImg,
                  k:
                    (null == (d = l.value) ? void 0 : d.nhsaType) &&
                    (null == (i = l.value) ? void 0 : i.nhsaType) !==
                      e.unref(e.GoodsNHSAType).NonMedical,
                },
                (null == (c = l.value) ? void 0 : c.nhsaType) &&
                  (null == (p = l.value) ? void 0 : p.nhsaType) !==
                    e.unref(e.GoodsNHSAType).NonMedical
                  ? { l: n }
                  : {},
                {
                  m: e.t(null == (v = l.value) ? void 0 : v.goodsName),
                  n: e.t(null == (h = l.value) ? void 0 : h.spec),
                  o: e.t(null == (m = l.value) ? void 0 : m.quantity),
                }
              ),
          { p: o.order.shippingFee && !t.afterSales },
          o.order.shippingFee && !t.afterSales
            ? { q: e.t(o.order.shippingFee) }
            : {},
          { r: !t.afterSales && !o.order.shippingFee },
          (t.afterSales || o.order.shippingFee, {}),
          {
            s: e.t(t.afterSales ? '售后金额:' : '合计:'),
            t: e.t(o.order.totalAmount),
            v:
              (null == (y = r.value.buttons) ? void 0 : y.length) &&
              !t.afterSales,
          },
          (null == (f = r.value.buttons) ? void 0 : f.length) && !t.afterSales
            ? e.e(
                { w: r.value.buttons.includes('取消订单') },
                r.value.buttons.includes('取消订单')
                  ? { x: e.o((...e) => t.onCancel && t.onCancel(...e)) }
                  : {},
                { y: r.value.buttons.includes('去支付') },
                r.value.buttons.includes('去支付')
                  ? { z: e.o((...e) => t.onPay && t.onPay(...e)) }
                  : {},
                { A: r.value.buttons.includes('删除订单') },
                r.value.buttons.includes('删除订单')
                  ? { B: e.o((...e) => t.onDelete && t.onDelete(...e)) }
                  : {},
                { C: r.value.buttons.includes('确定收货') },
                r.value.buttons.includes('确定收货')
                  ? { D: e.o((...e) => t.onConfirm && t.onConfirm(...e)) }
                  : {}
              )
            : {},
          { E: e.p({ footer: t.showFooter }) }
        );
      };
    },
  }),
  l = e._export_sfc(a, [['__scopeId', 'data-v-b71df9ce']]);
wx.createComponent(l);
