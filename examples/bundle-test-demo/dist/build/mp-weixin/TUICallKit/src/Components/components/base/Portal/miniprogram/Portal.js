'use strict';
const e = require('../../../../../../../common/vendor.js').defineComponent({
  options: { virtualHost: !0 },
  __name: 'Portal',
  props: ['disabled'],
  setup: (e) => (o, t) => ({ a: !e.disabled }),
});
wx.createComponent(e);
