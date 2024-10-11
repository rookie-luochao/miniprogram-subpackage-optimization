'use strict';
const e = require('../../../../../../common/vendor.js');
if (!Array) {
  (
    e.resolveComponent('nut-radio') +
    e.resolveComponent('nut-radio-group') +
    e.resolveComponent('nut-date-picker') +
    e.resolveComponent('nut-popup')
  )();
}
Math ||
  (
    (() => '../../../node-modules/nutui-uniapp/components/radio/radio.js') +
    (() =>
      '../../../node-modules/nutui-uniapp/components/radiogroup/radiogroup.js') +
    (() =>
      '../../../node-modules/nutui-uniapp/components/datepicker/datepicker.js') +
    (() => '../../../node-modules/nutui-uniapp/components/popup/popup.js') +
    o
  )();
const o = () => '../../components/Modal/index.js',
  a = e.defineComponent({
    __name: 'index',
    setup(o, { expose: a }) {
      const n = e.useUserInfoStore(),
        { userInfo: t } = e.storeToRefs(n),
        r = e.ref({
          birthDay: '',
          personID: '',
          personName: '',
          sex: 0,
          phone: '',
        }),
        s = async () => {
          var o, a;
          try {
            e.index.showLoading({ title: '加载中…', mask: !0 });
            const { data: n } = await e.requestGetOrgPersonUserByPersonID({
                orgID: null == (o = t.value) ? void 0 : o.orgID,
                personID: null == (a = t.value) ? void 0 : a.personID,
              }),
              { niceName: s, birthDay: p, personID: u, sex: l, phone: i } = n;
            r.value = {
              personName: s,
              birthDay: null != p ? p : e.dayjs().format('YYYY-MM-DD HH:mm:ss'),
              personID: u,
              sex: null != l ? l : e.Gender.male,
              phone: i,
            };
          } finally {
            e.index.hideLoading();
          }
        },
        p = e.ref(!1),
        u = () => {
          r.value.personName
            ? ((p.value = !1), c())
            : e.index.showToast({ icon: 'none', title: '请填写用户昵称' });
        },
        l = e.ref(!0),
        i = (e) => {
          l.value ? (l.value = !1) : ((r.value.sex = e), c());
        },
        d = e.ref(!1),
        m = e.ref(),
        v = ({ selectedValue: o }) => {
          (r.value.birthDay = e
            .dayjs(o.join('-'))
            .format('YYYY-MM-DD HH:mm:ss')),
            (d.value = !1),
            c();
        },
        c = async () => {
          await e.requestUpdatePersonUser(r.value),
            e.index.showToast({ title: '修改成功', icon: 'none', mask: !0 });
        },
        h = e.ref(null),
        f = () => {
          var o;
          null == (o = h.value) ||
            o.openModal({
              content: '是否确认退出登录？',
              onConfirm: () => {
                n.setUserInfo(null),
                  e.index.clearStorageSync(),
                  e.index.showToast({
                    title: '退出成功',
                    icon: 'none',
                    mask: !0,
                  }),
                  setTimeout(() => {
                    e.index.hideToast(),
                      e.appNavigator.navigateTo(e.appNavigator.pagesMap.login);
                  }, 1500);
              },
            });
        };
      return (
        a({
          pageOnShow: () => {
            s();
          },
        }),
        (o, a) =>
          e.e(
            {
              a: p.value,
              b: e.o(u),
              c: r.value.personName,
              d: e.o(
                e.m((e) => (r.value.personName = e.detail.value), { trim: !0 })
              ),
              e: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24070910231708776400201233.png',
              f: e.o((e) => (p.value = !0)),
              g: e.t(e.unref(e.encryptPhone)(r.value.phone)),
              h: e.p({ label: 1 }),
              i: e.p({ label: 2 }),
              j: e.o(i),
              k: e.o((e) => (r.value.sex = e)),
              l: e.p({ direction: 'horizontal', modelValue: r.value.sex }),
              m: r.value.birthDay,
            },
            r.value.birthDay
              ? {
                  n: e.t(
                    e.unref(e.dayjs)(r.value.birthDay).format('YYYY-MM-DD')
                  ),
                }
              : {},
            {
              o: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24070910445149098420201240.png',
              p: e.o((e) => (d.value = !0)),
              q: e.o(v),
              r: e.o((e) => (d.value = !1)),
              s: e.o((e) => (m.value = e)),
              t: e.p({
                formatter: e.unref(e.pickerDateFormatter),
                modelValue: m.value,
              }),
              v: e.o((e) => (d.value = e)),
              w: e.p({ position: 'bottom', visible: d.value }),
              x: e.o(f),
              y: e.sr(h, '40d1e5d3-5', { k: 'modalRef' }),
            }
          )
      );
    },
  }),
  n = e._export_sfc(a, [['__scopeId', 'data-v-40d1e5d3']]);
wx.createComponent(n);
