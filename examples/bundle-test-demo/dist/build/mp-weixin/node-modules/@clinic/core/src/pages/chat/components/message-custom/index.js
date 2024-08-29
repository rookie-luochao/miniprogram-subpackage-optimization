'use strict';
const e = require('../../../../../../../../common/vendor.js'),
  a = e.defineComponent({
    __name: 'index',
    props: { message: {} },
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
        v = () => {
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
        },
        r = () => {
          var a;
          e.appNavigator.redirectTo(e.appNavigator.pagesMap.chat, {
            query: {
              orderID: null == (a = l.value) ? void 0 : a.inquiryOrderID,
            },
          });
        };
      return (a, t) => {
        var o, i, n, p, d, s, m, c, g, N, y, f, I, x;
        return e.e(
          { a: 'image' === (null == (o = l.value) ? void 0 : o.type) },
          'image' === (null == (i = l.value) ? void 0 : i.type)
            ? { b: l.value.src, c: e.o((e) => u(l.value.src)) }
            : {},
          { d: 'patientInfo' === (null == (n = l.value) ? void 0 : n.type) },
          'patientInfo' === (null == (p = l.value) ? void 0 : p.type)
            ? e.e(
                { e: e.t(l.value.patientName), f: l.value.patientName },
                (l.value.patientName, {}),
                {
                  g: e.t(l.value.patientSex),
                  h: e.t(l.value.patientAge),
                  i: e.t(e.unref(e.formatValue)(l.value.illDesc)),
                  j: null == (d = l.value.treatedFileUrls) ? void 0 : d.length,
                },
                (null == (s = l.value.treatedFileUrls) ? void 0 : s.length)
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
          { l: 'reviewPass' === (null == (m = l.value) ? void 0 : m.type) },
          'reviewPass' === (null == (c = l.value) ? void 0 : c.type)
            ? e.e(
                { m: e.t(l.value.patientName), n: l.value.patientName },
                (l.value.patientName, {}),
                {
                  o: e.t(l.value.patientSex),
                  p: e.t(l.value.patientAge),
                  q: e.t(e.unref(e.formatValue)(l.value.diagnosis)),
                  r: e.o(v),
                }
              )
            : {},
          { s: 'transfer' === (null == (g = l.value) ? void 0 : g.type) },
          'transfer' === (null == (N = l.value) ? void 0 : N.type)
            ? e.e(
                {
                  t: l.value.photoUrl,
                  v: e.t(l.value.doctorName),
                  w: l.value.doctorName,
                },
                (l.value.doctorName, {}),
                {
                  x: e.t(l.value.titleName),
                  y: e.t(l.value.sectionName),
                  z: e.t(l.value.orgName),
                  A: e.o(r),
                }
              )
            : {},
          { B: 'goOn' === (null == (y = l.value) ? void 0 : y.type) },
          'goOn' === (null == (f = l.value) ? void 0 : f.type)
            ? e.e(
                {
                  C: l.value.photoUrl,
                  D: e.t(l.value.doctorName),
                  E: l.value.doctorName,
                },
                (l.value.doctorName, {}),
                {
                  F: e.t(l.value.titleName),
                  G: e.t(l.value.sectionName),
                  H: e.t(l.value.orgName),
                }
              )
            : {},
          { I: 'notSupport' === (null == (I = l.value) ? void 0 : I.type) },
          'notSupport' === (null == (x = l.value) ? void 0 : x.type)
            ? { J: e.t(l.value.text) }
            : {}
        );
      };
    },
  }),
  t = e._export_sfc(a, [['__scopeId', 'data-v-b43022e8']]);
wx.createComponent(t);
