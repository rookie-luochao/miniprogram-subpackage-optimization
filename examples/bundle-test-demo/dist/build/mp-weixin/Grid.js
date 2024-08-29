'use strict';
const e = {
  length: { type: Number, default: 0 },
  unit: { type: String, values: ['%', 'vw'], default: '%' },
  enableFocus: { type: Boolean, default: !1 },
  layout: { type: Array },
  focus: { type: [String, Number] },
};
(exports.ChangeFocusEmits = ['change', 'toggle']),
  (exports.GridContextKey = 'GridContextKey'),
  (exports.GridProps = e);
