'use strict';
var t = Object.defineProperty,
  e = (e, i, r) => (
    ((e, i, r) => {
      i in e
        ? t(e, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (e[i] = r);
    })(e, 'symbol' != typeof i ? i + '' : i, r),
    r
  );
const i = require('../../common/vendor.js');
exports.ChatTim = class {
  constructor() {
    e(this, 'tim'),
      (this.tim = i.TIM.create({ SDKAppID: Number('1400642667') })),
      this.tim.setLogLevel(1),
      this.tim.registerPlugin({ 'tim-upload-plugin': i.TIMUploadPlugin }),
      this.extras();
  }
  extras() {
    (i.index.$TUIKit = this.tim),
      (i.index.$TUIKitTIM = i.TIM),
      (i.index.$TUIKitEvent = i.TIM.EVENT);
  }
};
