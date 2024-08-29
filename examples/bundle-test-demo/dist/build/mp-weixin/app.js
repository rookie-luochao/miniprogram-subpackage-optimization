'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const e = require('./common/vendor.js'),
  n = require('./utils/chat/TCSDK.js'),
  p = require('./config/index.js');
Math;
const o = e.defineComponent({
  __name: 'App',
  setup: (p) => (
    e.onLaunch(() => {
      e.handleAppLaunch(n.TCSDK);
    }),
    e.onShow((n) => {
      e.handleAppShow(n);
    }),
    e.onHide(() => {
      e.handleAppHide();
    }),
    () => {}
  ),
});
function t() {
  const n = e.createSSRApp(o);
  return (
    n.use(e.pinia), e.initAppConfig({ app: n, config: p.CONFIG }), { app: n }
  );
}
t().app.mount('#app'), (exports.createApp = t);
