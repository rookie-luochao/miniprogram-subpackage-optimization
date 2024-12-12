'use strict';
const e = require('../../const/index.js');
exports.avoidRepeatedCall = function () {
  return function (t, n, a) {
    const i = a.value,
      l = new Set();
    return (
      (a.value = async function (...t) {
        var a, o;
        if (l.has(this))
          return (
            console.warn(
              `${e.NAME.PREFIX}previous ${n}() is ongoing, please avoid repeated calls`
            ),
            void (
              null ==
                (o =
                  null ==
                  (a = null == this ? void 0 : this.getTUICallEngineInstance())
                    ? void 0
                    : a.reportLog) ||
              o.call(a, {
                name: 'TUICallKit.avoidRepeatedCall.fail',
                data: { name: n },
                error: `previous ${n}() is ongoing`,
              })
            )
          );
        try {
          l.add(this);
          const e = await i.apply(this, t);
          return l.delete(this), e;
        } catch (s) {
          throw (l.delete(this), s);
        }
      }),
      a
    );
  };
};
