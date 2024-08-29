'use strict';
var t = Object.defineProperty,
  l = (l, e, i) => (
    ((l, e, i) => {
      e in l
        ? t(l, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (l[e] = i);
    })(l, 'symbol' != typeof e ? e + '' : e, i),
    i
  );
const e = require('../../../../common/vendor.js'),
  i = require('../const/index.js'),
  s = require('../utils/common-utils.js'),
  a = require('../../../../common/assets.js'),
  o = require('../const/call.js');
exports.BellContext = class {
  constructor() {
    l(this, '_bellContext', null),
      l(this, '_isMuteBell', !1),
      l(this, '_calleeBellFilePath', a.DEFAULT_CALLEE_BELL_FILEPATH),
      l(this, '_callRole', o.CallRole.UNKNOWN),
      l(this, '_callStatus', o.CallStatus.IDLE),
      l(this, '_handleAudioInterruptionBegin', async () => {
        await this.stop();
      }),
      l(this, '_handleAudioInterruptionEnd', async () => {
        this._callStatus !== o.CallStatus.CALLING
          ? await this.stop()
          : await this.play();
      }),
      (this._bellContext = e.wx$1.createInnerAudioContext()),
      this._addListenBellContextEvent(),
      (this._bellContext.loop = !0);
  }
  setBellSrc() {
    const t = e.wx$1.getFileSystemManager();
    try {
      let l = a.DEFAULT_CALLER_BELL_FILEPATH;
      this._callRole === o.CallRole.CALLEE &&
        (l = this._calleeBellFilePath || a.DEFAULT_CALLEE_BELL_FILEPATH),
        t.readFileSync(l, 'utf8', 0),
        (this._bellContext.src = l);
    } catch (l) {
      console.warn(`${i.NAME.PREFIX}Failed to setBellSrc, ${l}`);
    }
  }
  setBellProperties(t) {
    (this._callRole = t.callRole || this._callRole),
      (this._callStatus = t.callStatus || this._callStatus),
      (this._calleeBellFilePath =
        t.calleeBellFilePath || this._calleeBellFilePath),
      (this._isMuteBell = s.isUndefined(t.isMuteBell)
        ? this._isMuteBell
        : t.isMuteBell);
  }
  async play() {
    try {
      if (this._callStatus !== o.CallStatus.CALLING) return;
      this.setBellSrc(),
        this._callRole !== o.CallRole.CALLEE ||
          this._isMuteBell ||
          (await this._bellContext.play()),
        this._callRole === o.CallRole.CALLER &&
          (await this._bellContext.play());
    } catch (t) {
      console.warn(`${i.NAME.PREFIX}Failed to play audio file, ${t}`);
    }
  }
  async stop() {
    try {
      this._bellContext.stop();
    } catch (t) {
      console.warn(`${i.NAME.PREFIX}Failed to stop audio file, ${t}`);
    }
  }
  async setBellMute(t) {
    (this._callStatus !== o.CallStatus.CALLING &&
      this._callRole !== o.CallRole.CALLEE) ||
      (t ? await this.stop() : await this.play());
  }
  destroy() {
    try {
      (this._isMuteBell = !1),
        (this._calleeBellFilePath = ''),
        (this._callRole = o.CallRole.UNKNOWN),
        (this._callStatus = o.CallStatus.IDLE),
        null == this || this._removeListenBellContextEvent(),
        this._bellContext.destroy(),
        (this._bellContext = null);
    } catch (t) {
      console.warn(`${i.NAME.PREFIX}Failed to destroy, ${t}`);
    }
  }
  _addListenBellContextEvent() {
    e.wx$1.onAudioInterruptionBegin(this._handleAudioInterruptionBegin),
      e.wx$1.onAudioInterruptionEnd(this._handleAudioInterruptionEnd);
  }
  _removeListenBellContextEvent() {
    e.wx$1.offAudioInterruptionBegin(this._handleAudioInterruptionBegin),
      e.wx$1.offAudioInterruptionEnd(this._handleAudioInterruptionEnd);
  }
};
