'use strict';
const e = require('../../../../../../common/vendor.js'),
  t = require('./props/Button.js'),
  o = require('./hooks/useConfig.js');
require('../../../../TUICallService/index.js'),
  require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const n = require('../../../hooks/useButtonPanelStatus.js');
require('../../../../TUICallService/utils/env.js'), Math || s();
const s = () => '../../base/Button/Button.js',
  r = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'ToggleButtonPanel',
    props: t.ButtonProps,
    setup(t) {
      const { status: s } = n.useButtonPanelStatus(),
        r = t,
        i = o.useBtnConfig('toggleButtonPanel', e.ref('basicConfig')),
        u = async () => {
          s.value = 'close' === s.value ? 'open' : 'close';
        };
      return (t, o) => ({
        a: e.o(u),
        b: e.p({
          iconSrc: e.unref(i).iconSrc,
          color: e.unref(i).color,
          iconSize: r.iconSize || e.unref(i).iconSize,
          width: r.width || e.unref(i).width,
          height: r.height || e.unref(i).height,
          shape: e.unref(i).shape,
        }),
      });
    },
  }),
  i = e._export_sfc(r, [['__scopeId', 'data-v-46013ba6']]);
wx.createComponent(i);
