'use strict';
const r = require('../common-utils.js'),
  e = require('../../const/index.js').NAME.PREFIX + 'API';
function t(e, t, n) {
  try {
    if (
      (t[0].SDKAppID || (e = r.modifyObjectKey(e, 'SDKAppID', 'sdkAppID')),
      r.isArray(e))
    )
      for (let r = 0; r < e.length; r++)
        i.call(this, { ...e[r], value: t[r], name: n });
    else
      for (const r in e)
        e.hasOwnProperty(r) &&
          i.call(this, { ...e[r], value: t[0][r], name: n, key: r });
  } catch (o) {
    throw (console.error(o), o);
  }
}
function i({
  required: t,
  rules: i,
  range: n,
  value: o,
  allowEmpty: s,
  name: l,
  key: u,
}) {
  if (r.isUndefined(o)) {
    if (t) throw new Error(`${e}<${l}>: ${u} is required.`);
    return;
  }
  let a = '';
  if (!i.some((e) => e === r.getType(o))) {
    for (let r = 0; r < i.length; r++) {
      let e = i[r];
      (e = e.replace(e[0], e[0].toUpperCase())), (a += `${e}/`);
    }
    throw (
      ((a = a.substring(0, a.length - 1)),
      new Error(`${e}<${l}>: ${u} must be ${a}, current ${u} is ${typeof o}.`))
    );
  }
  if (!1 === s) {
    if (r.isString(o) && '' === o.trim())
      throw new Error(`${e}<${l}>: ${u} is blank.`);
  }
  if (r.isArray(n) && n && -1 === n.indexOf(o))
    throw new Error(
      `${e}<${l}>: ${u} error, only be ${n}, current ${u} is ${o}.`
    );
  if (r.isString(n) && -1 !== n.indexOf('~')) {
    const t = n.split('~');
    if (o < +t[0] || o > +t[1] || (r.isNumber(o) && Number.isNaN(o)))
      throw new Error(
        `${e}<${l}>: ${u} error, only be ${n}, current ${u} is ${o}.`
      );
  }
}
exports.paramValidate = function (r) {
  return function (e, i, n) {
    let o = n.value;
    return (
      (n.value = function (...e) {
        return t.call(this, r, e, i), o.apply(this, e);
      }),
      n
    );
  };
};
