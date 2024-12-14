'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (e.resolveComponent('nut-cascader') + e.resolveComponent('nut-switch'))();
}
Math ||
  (
    t +
    (() =>
      '../../../node-modules/nutui-uniapp/components/cascader/cascader.js') +
    (() => '../../../node-modules/nutui-uniapp/components/switch/switch.js') +
    a
  )();
const a = () => '../../components/Modal/index.js',
  t = () => '../../components/Navbar/index.js',
  o =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102515562443956060201240.png',
  l = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const l = /^1[3456789]\d{9}$/,
        i = (a) => e.index.showToast({ icon: 'none', title: a }),
        n = e.ref(!1),
        s = e.ref('收货地址详情'),
        d = e.ref(!1),
        r = e.ref(''),
        u = e.ref(['']),
        v = e.ref([]),
        c = async () => {
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: a } = await e.requestQueryCity();
            v.value = a;
          } finally {
            e.index.hideLoading();
          }
        },
        p = (e, a) => {
          const [t, o, l] = a;
          (r.value = t.text + o.text + l.text),
            (m.value.province = t.text),
            (m.value.provinceCode = t.value),
            (m.value.city = o.text),
            (m.value.cityCode = o.value),
            (m.value.area = l.text),
            (m.value.areaCode = l.value);
        },
        m = e.ref({ deliveryName: '', deliveryPhone: '' }),
        h = e.ref(null),
        y = () => {
          var a;
          null == (a = h.value) ||
            a.openModal({
              title: '确定删除收货地址？',
              content: '删除后不可恢复，请谨慎操作',
              confirmText: '删除',
              onConfirm: async () => {
                e.index.showLoading({ title: '删除中…', mask: !0 }),
                  await e.requestDeleteDeliveryAddress({
                    deliveryAddressId: m.value.deliveryAddressId,
                  }),
                  e.index.showToast({
                    title: '删除成功',
                    icon: 'none',
                    mask: !0,
                  }),
                  setTimeout(() => {
                    e.index.hideToast(), e.appNavigator.navigateBack();
                  }, 1500);
              },
            });
        },
        f = async () => {
          const {
            deliveryName: a,
            deliveryPhone: t,
            area: o,
            city: s,
            province: d,
            fullAddress: r,
          } = m.value;
          if (!a) return i('请输入收货人姓名');
          if (!t || !l.test(t)) return i('请输入正确的手机号');
          if (!o || !s || !d) return i('请选择地区');
          if (!r) return i('请输入街道、楼牌号等');
          const u = n.value
            ? e.requestEditDeliveryAddress
            : e.requestAddDeliveryAddress;
          try {
            e.index.showLoading({ title: '保存中…', mask: !0 }),
              await u(m.value),
              e.index.showToast({ title: '保存成功', icon: 'none', mask: !0 }),
              setTimeout(() => {
                e.index.hideToast(), e.appNavigator.navigateBack();
              }, 1500);
          } catch (v) {
            e.index.hideLoading();
          }
        };
      return (
        t({
          pageOnShow: () => {
            console.log('pageOnShow');
          },
          pageOnLoad: async (e) => {
            (s.value = e.navigationBarTitle),
              e.addressInfo &&
                ((n.value = !0),
                (m.value = JSON.parse(decodeURIComponent(e.addressInfo))),
                (r.value = `${m.value.province}${m.value.city}${m.value.area}`)),
              await c();
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, t) =>
          e.e(
            {
              a: e.sr('navbarRef', '0b3e5953-0'),
              b: e.p({ title: s.value }),
              c: o,
              d: o,
              e: n.value,
            },
            n.value
              ? {
                  f: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24110419244214565720201240.png',
                  g: e.o(y),
                }
              : {},
            {
              h: m.value.deliveryName,
              i: e.o(
                e.m((e) => (m.value.deliveryName = e.detail.value), {
                  trim: !0,
                })
              ),
              j: m.value.deliveryPhone,
              k: e.o(
                e.m((e) => (m.value.deliveryPhone = e.detail.value), {
                  trim: !0,
                })
              ),
              l: r.value,
            },
            r.value ? { m: e.t(r.value) } : {},
            {
              n: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102809300973943750201233.png',
              o: e.o((e) => (d.value = !0)),
              p: e.o(p),
              q: e.o((e) => (d.value = e)),
              r: e.o((e) => (u.value = e)),
              s: e.p({
                'title-ellipsis': !1,
                title: '地址选择',
                'text-key': 'label',
                'value-key': 'value',
                options: v.value,
                visible: d.value,
                modelValue: u.value,
              }),
              t: m.value.fullAddress,
              v: e.o(
                e.m((e) => (m.value.fullAddress = e.detail.value), { trim: !0 })
              ),
              w: e.o((e) => (m.value.defaultAddress = e)),
              x: e.p({
                'active-value': e.unref(e.IsDefaultAddress).Yes,
                'inactive-value': e.unref(e.IsDefaultAddress).No,
                modelValue: m.value.defaultAddress,
              }),
              y: e.o(f),
              z: e.sr(h, '0b3e5953-3', { k: 'modalRef' }),
            }
          )
      );
    },
  }),
  i = e._export_sfc(l, [['__scopeId', 'data-v-0b3e5953']]);
wx.createComponent(i);
