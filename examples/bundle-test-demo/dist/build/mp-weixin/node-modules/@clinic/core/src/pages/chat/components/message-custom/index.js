'use strict';
const e = require('../../../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    props: {
      message: {},
      orderDetail: {},
      handleToTransfer: {},
      handleToRefund: {},
    },
    setup(a) {
      const t = a,
        l = e.ref(null);
      e.watch(
        () => t.message,
        () => {
          l.value = e.parseCustom(t.message);
        },
        { deep: !0, immediate: !0 }
      );
      const u = (a) => {
          e.index.previewImage({ urls: [a], current: 1 });
        },
        n = () => {
          var a, t;
          e.appNavigator.navigateTo(
            e.appNavigator.pagesMap['prescription-detail'],
            {
              query: {
                rpID: null == (a = l.value) ? void 0 : a.rpID,
                inquiryOrderID:
                  null == (t = l.value) ? void 0 : t.inquiryOrderID,
              },
            }
          );
        };
      return (a, t) => {
        var r, o, v, i, d, p, s, m, c, N, y, f, g, h, D, I, S, T, x, O;
        return e.e(
          { a: 'image' === (null == (r = l.value) ? void 0 : r.type) },
          'image' === (null == (o = l.value) ? void 0 : o.type)
            ? { b: l.value.src, c: e.o((e) => u(l.value.src)) }
            : {},
          { d: 'patientInfo' === (null == (v = l.value) ? void 0 : v.type) },
          'patientInfo' === (null == (i = l.value) ? void 0 : i.type)
            ? e.e(
                { e: e.t(l.value.patientName), f: l.value.patientName },
                (l.value.patientName, {}),
                {
                  g: e.t(l.value.patientSex),
                  h: e.t(l.value.patientAge),
                  i: e.t(e.unref(e.formatValue)(l.value.illDesc)),
                  j: null == (d = l.value.treatedFileUrls) ? void 0 : d.length,
                },
                (null == (p = l.value.treatedFileUrls) ? void 0 : p.length)
                  ? {
                      k: e.f(l.value.treatedFileUrls, (a, t, l) => ({
                        a: a,
                        b: a.certificateUrl,
                        c: e.o((e) => u(a.certificateUrl), a),
                      })),
                    }
                  : {}
              )
            : {},
          { l: 'reviewPass' === (null == (s = l.value) ? void 0 : s.type) },
          'reviewPass' === (null == (m = l.value) ? void 0 : m.type)
            ? e.e(
                { m: e.t(l.value.patientName), n: l.value.patientName },
                (l.value.patientName, {}),
                {
                  o: e.t(l.value.patientSex),
                  p: e.t(l.value.patientAge),
                  q: e.t(e.unref(e.formatValue)(l.value.diagnosis)),
                  r: e.o(n),
                }
              )
            : {},
          { s: 'transfer' === (null == (c = l.value) ? void 0 : c.type) },
          'transfer' === (null == (N = l.value) ? void 0 : N.type)
            ? e.e(
                {
                  t: e.t(
                    (null == (y = a.orderDetail) ? void 0 : y.payStatus) ===
                      e.unref(e.PaymentStatusEnum).NoNeed
                      ? '已为您转诊，请联系医生'
                      : '请点击下方按钮进行转诊'
                  ),
                  v: l.value.photoUrl,
                  w: e.t(l.value.doctorName),
                  x: l.value.doctorName,
                },
                (l.value.doctorName, {}),
                {
                  y: e.t(l.value.titleName),
                  z: e.t(l.value.sectionName),
                  A: e.t(l.value.orgName),
                  B: e.t(
                    (null == (f = a.orderDetail) ? void 0 : f.payStatus) ===
                      e.unref(e.PaymentStatusEnum).NoNeed
                      ? '联系医生'
                      : '去转诊'
                  ),
                  C: e.o((t) => {
                    var u;
                    return (null == (u = a.orderDetail)
                      ? void 0
                      : u.payStatus) === e.unref(e.PaymentStatusEnum).NoNeed
                      ? (() => {
                          var a;
                          e.appNavigator.redirectTo(
                            e.appNavigator.pagesMap.chat,
                            {
                              query: {
                                orderID:
                                  null == (a = l.value)
                                    ? void 0
                                    : a.inquiryOrderID,
                              },
                            }
                          );
                        })()
                      : a.handleToTransfer(l.value);
                  }),
                }
              )
            : {},
          { D: 'goOn' === (null == (g = l.value) ? void 0 : g.type) },
          'goOn' === (null == (h = l.value) ? void 0 : h.type)
            ? e.e(
                {
                  E: l.value.photoUrl,
                  F: e.t(l.value.doctorName),
                  G: l.value.doctorName,
                },
                (l.value.doctorName, {}),
                {
                  H: e.t(l.value.titleName),
                  I: e.t(l.value.sectionName),
                  J: e.t(l.value.orgName),
                }
              )
            : {},
          { K: 'refund' === (null == (D = l.value) ? void 0 : D.type) },
          'refund' === (null == (I = l.value) ? void 0 : I.type)
            ? { L: e.o((e) => a.handleToRefund(l.value)) }
            : {},
          { M: 'checkOutRefund' === (null == (S = l.value) ? void 0 : S.type) },
          'checkOutRefund' === (null == (T = l.value) ? void 0 : T.type)
            ? { N: e.o((e) => a.handleToRefund(l.value)) }
            : {},
          { O: 'notSupport' === (null == (x = l.value) ? void 0 : x.type) },
          'notSupport' === (null == (O = l.value) ? void 0 : O.type)
            ? { P: e.t(l.value.text) }
            : {}
        );
      };
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-59b54c47']]);
wx.createComponent(t);
