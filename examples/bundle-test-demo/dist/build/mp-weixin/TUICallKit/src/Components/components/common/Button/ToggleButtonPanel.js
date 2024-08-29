'use strict';
const e = require('../../../../../../common/vendor.js'),
  o = require('./props/Button.js'),
  t = require('./hooks/useConfig.js');
require('../../../../TUICallService/index.js'),
  require('../../../../TUICallService/const/index.js'),
  require('../../../util/stringToPath.js');
const n = require('../../../hooks/useButtonPanelStatus.js');
Math || s();
const s = () => '../../base/Button/Button.js',
  r = e.defineComponent({
    options: { virtualHost: !0 },
    __name: 'ToggleButtonPanel',
    props: o.ButtonProps,
    setup(o) {
      const { status: s } = n.useButtonPanelStatus(),
        r = o,
        i = t.useBtnConfig('toggleButtonPanel', e.ref('basicConfig')),
        u = async () => {
          s.value = 'close' === s.value ? 'open' : 'close';
        };
      return (o, t) => ({
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
  i = e._export_sfc(r, [['__scopeId', 'data-v-64074a9a']]);
wx.createComponent(i);
