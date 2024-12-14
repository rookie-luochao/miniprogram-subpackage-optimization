'use strict';
const e = require('../../../../../../common/vendor.js');
Math || (t + a)();
const a = () => '../../components/Empty/index.js',
  t = () => '../../components/Navbar/index.js',
  s =
    'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24102515562443956060201240.png',
  d = e.defineComponent({
    __name: 'index',
    setup(a, { expose: t }) {
      const d = e.ref(!1),
        n = e.ref(''),
        i = e.ref([]),
        o = async () => {
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: a } = await e.requestGetDeliveryAddressList();
            i.value = a;
          } finally {
            e.index.hideLoading();
          }
        },
        r = () => {
          i.value.length >= 20
            ? e.index.showToast({
                title: '您的收货地址数量已满，建议清理不常用收货地址',
                icon: 'none',
              })
            : e.appNavigator.navigateTo(
                e.appNavigator.pagesMap['address-detail'],
                { query: { navigationBarTitle: '添加收货地址' } }
              );
        },
        p = (a) => {
          e.appNavigator.navigateTo(e.appNavigator.pagesMap['address-detail'], {
            query: {
              navigationBarTitle: '编辑收货地址',
              addressInfo: encodeURIComponent(JSON.stringify(a)),
            },
          });
        };
      return (
        t({
          pageOnShow: () => {
            console.log('pageOnShow'), o();
          },
          pageOnLoad: (e) => {
            (d.value = JSON.parse(e.isSelect || 'false')),
              (n.value = e.deliveryAddressId || '');
          },
          pageOnHide: () => {
            console.log('pageOnHide');
          },
        }),
        (a, t) =>
          e.e(
            {
              a: e.sr('navbarRef', 'eaf4c128-0'),
              b: e.p({ title: '收货地址管理' }),
              c: i.value.length,
            },
            i.value.length
              ? {
                  d: s,
                  e: s,
                  f: e.t(i.value.length),
                  g: e.t(20),
                  h: e.f(i.value, (a, t, s) =>
                    e.e(
                      {
                        a: a.defaultAddress === e.unref(e.IsDefaultAddress).Yes,
                      },
                      (a.defaultAddress, e.unref(e.IsDefaultAddress).Yes, {}),
                      {
                        b: e.t(a.deliveryName),
                        c: e.t(a.deliveryPhone),
                        d: e.t(
                          `${a.province}${a.city}${a.area}${a.fullAddress}`
                        ),
                        e: e.o((e) => p(a), a.deliveryAddressId),
                        f: a.deliveryAddressId,
                        g: a.deliveryAddressId === n.value ? 1 : '',
                        h: e.o(
                          (t) =>
                            ((a) => {
                              if (d.value)
                                return (
                                  e.index.$emit(e.SET_ADDRESS, a),
                                  void e.index.navigateBack()
                                );
                              p(a);
                            })(a),
                          a.deliveryAddressId
                        ),
                      }
                    )
                  ),
                  i: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24103115533451712730201233.png',
                }
              : {
                  j: e.p({
                    top: 118,
                    'empty-icon':
                      'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24111220065744577210201240.png',
                    title: '暂无收货地址',
                    'sub-title': '请先添加收货地址，后续在此管理',
                  }),
                },
            { k: e.o(r) }
          )
      );
    },
  }),
  n = e._export_sfc(d, [['__scopeId', 'data-v-eaf4c128']]);
wx.createComponent(n);
