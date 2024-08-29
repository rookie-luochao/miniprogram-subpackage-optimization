'use strict';
const e = require('../../../../../../common/vendor.js'),
  i = e.defineComponent({
    __name: 'index',
    props: {
      fileList: { default: '' },
      disabled: { type: Boolean, default: !1 },
      limit: { default: 9 },
      fileSize: { default: 20 },
    },
    emits: ['update:fileList'],
    setup(i, { emit: t }) {
      const a = i,
        l = t,
        o = e.ref([]);
      e.watch(
        () => a.fileList,
        (e) => {
          o.value = e ? e.split(',') : [];
        },
        { immediate: !0 }
      );
      const n = e.inject(e.globalDataSymbol),
        s = () => {
          null == n || n.updateGlobalData({ onShowFlag: !1 }),
            e.index.chooseImage({
              count: a.limit - o.value.length,
              sizeType: ['compressed'],
              sourceType: ['camera', 'album'],
              success: async (i) => {
                const t = i.tempFiles,
                  l = a.limit - o.value.length;
                if (t.length > l)
                  return void e.index.showToast({
                    title: `最多只能上传${a.limit}张图片`,
                    icon: 'none',
                  });
                const {
                  validFiles: n,
                  invalidFileCount: s,
                  oversizedFileCount: u,
                } = d(t);
                s > 0 &&
                  e.index.showToast({
                    title: '请上传图片格式文件',
                    icon: 'none',
                  }),
                  u > 0 &&
                    e.index.showToast({
                      title: `图片大小不能超过${a.fileSize}M `,
                      icon: 'none',
                    }),
                  n.length > 0 && (await c(n));
              },
            });
        },
        d = (e) => {
          const i = [];
          let t = 0,
            l = 0;
          return (
            e.forEach((e) => {
              const o = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(e.path),
                n = e.size <= 1024 * a.fileSize * 1024;
              o || t++, n || l++, o && n && i.push(e.path);
            }),
            { validFiles: i, invalidFileCount: t, oversizedFileCount: l }
          );
        },
        c = async (i) => {
          try {
            e.index.showLoading({ title: '上传中…', mask: !0 });
            const t = i.map((i) => e.requestUpload(i)),
              a = await Promise.all(t);
            (o.value = [...o.value, ...a]),
              l('update:fileList', o.value.join(',')),
              e.index.hideLoading();
          } catch (t) {
            e.index.showToast({ title: `上传失败: ${t}`, icon: 'none' });
          }
        };
      return (i, t) =>
        e.e(
          {
            a: e.f(o.value, (t, a, s) =>
              e.e(
                {
                  a: t,
                  b: e.o((i) => {
                    return (
                      (a = t),
                      null == n || n.updateGlobalData({ onShowFlag: !1 }),
                      void e.index.previewImage({ urls: [a], current: 0 })
                    );
                    var a;
                  }, t),
                },
                i.disabled
                  ? {}
                  : {
                      c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071715330740958020201240.png',
                      d: e.o((e) => {
                        return (
                          (i = t),
                          (o.value = o.value.filter((e) => e !== i)),
                          void l('update:fileList', o.value.join(','))
                        );
                        var i;
                      }, t),
                    },
                { e: t }
              )
            ),
            b: !i.disabled,
            c: !i.disabled && o.value.length < i.limit,
          },
          !i.disabled && o.value.length < i.limit
            ? {
                d: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24071715265553097510201233.png',
                e: e.o(s),
              }
            : {}
        );
    },
  }),
  t = e._export_sfc(i, [['__scopeId', 'data-v-fe9e89bb']]);
wx.createComponent(t);
