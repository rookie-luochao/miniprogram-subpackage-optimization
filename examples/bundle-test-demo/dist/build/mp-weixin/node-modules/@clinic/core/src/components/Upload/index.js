'use strict';
const e = require('../../../../../../common/vendor.js'),
  i = e.defineComponent({
    __name: 'index',
    props: {
      fileList: { default: '' },
      disabled: { type: Boolean, default: !1 },
      limit: { default: 9 },
      fileSize: { default: 20 },
      background: { default: '#f3f3f3' },
      gap: { default: '12px' },
      columns: { default: 4 },
    },
    emits: ['update:fileList'],
    setup(i, { emit: t }) {
      const a = i,
        n = t,
        o = e.ref([]);
      e.watch(
        () => a.fileList,
        (e) => {
          o.value = e ? e.split(',') : [];
        },
        { immediate: !0 }
      );
      const l = () => {
          e.index.chooseImage({
            count: a.limit - o.value.length,
            sizeType: ['compressed'],
            sourceType: ['camera', 'album'],
            success: async (i) => {
              const t = i.tempFiles,
                n = a.limit - o.value.length;
              if (t.length > n)
                return void e.index.showToast({
                  title: `最多只能上传${a.limit}张图片`,
                  icon: 'none',
                });
              const {
                validFiles: l,
                invalidFileCount: d,
                oversizedFileCount: u,
              } = s(t);
              d > 0 &&
                e.index.showToast({
                  title: '请上传图片格式文件',
                  icon: 'none',
                }),
                u > 0 &&
                  e.index.showToast({
                    title: `图片大小不能超过${a.fileSize}M `,
                    icon: 'none',
                  }),
                l.length > 0 && (await c(l));
            },
            fail: async (i) => {
              if (i.errMsg.includes('chooseImage:fail'))
                return e.index.showToast({
                  title: '请选择图片文件',
                  icon: 'none',
                });
              e.index.showToast({ title: i.errMsg, icon: 'none' });
            },
          });
        },
        s = (e) => {
          const i = [];
          let t = 0,
            n = 0;
          return (
            e.forEach((e) => {
              var o;
              const l = null != (o = e.name) ? o : e.path,
                s = /\.(jpg|jpeg|png|gif|bmp|tiff|webp|svg|ico)$/i.test(l),
                c = e.size <= 1024 * a.fileSize * 1024;
              s || t++, c || n++, s && c && i.push(e.path);
            }),
            { validFiles: i, invalidFileCount: t, oversizedFileCount: n }
          );
        },
        c = async (i) => {
          try {
            e.index.showLoading({ title: '上传中…', mask: !0 });
            const t = i.map((i) => e.requestUpload(i)),
              a = await Promise.all(t);
            (o.value = [...o.value, ...a]),
              n('update:fileList', o.value.join(',')),
              e.index.hideLoading();
          } catch (t) {
            e.index.showToast({ title: `${t}`, icon: 'none' });
          }
        };
      return (i, t) =>
        e.e(
          {
            a: e.f(o.value, (t, a, l) =>
              e.e(
                {
                  a: t,
                  b: e.o((i) => {
                    return (
                      (a = t),
                      void e.index.previewImage({ urls: [a], current: 0 })
                    );
                    var a;
                  }, t),
                },
                i.disabled
                  ? {}
                  : {
                      c: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24103115305846393830201240.png',
                      d: e.o((e) => {
                        return (
                          (i = t),
                          (o.value = o.value.filter((e) => e !== i)),
                          void n('update:fileList', o.value.join(','))
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
                d: 'https://com-shuibei-peach-pharmacy.100cbc.com/rp/210304103256552626/24103114292788983450201240.png',
                e: i.background,
                f: e.o(l),
              }
            : {},
          { g: i.gap, h: `repeat(${i.columns}, 1fr)` }
        );
    },
  }),
  t = e._export_sfc(i, [['__scopeId', 'data-v-c429838f']]);
wx.createComponent(t);
