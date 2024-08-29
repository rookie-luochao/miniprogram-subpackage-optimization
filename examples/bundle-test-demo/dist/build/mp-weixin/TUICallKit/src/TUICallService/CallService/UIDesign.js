'use strict';
var e = Object.defineProperty,
  t = (t, i, a) => (
    ((t, i, a) => {
      i in t
        ? e(t, i, { enumerable: !0, configurable: !0, writable: !0, value: a })
        : (t[i] = a);
    })(t, 'symbol' != typeof i ? i + '' : i, a),
    a
  );
const i = require('../const/index.js'),
  a = require('../utils/index.js'),
  o = require('../utils/is-empty.js'),
  n = require('../const/call.js'),
  r = '_local_user_id',
  u = class e {
    constructor() {
      t(this, '_viewConfig', { viewBackground: { local: {}, remote: {} } }),
        t(this, '_isSetViewBackgroundConfig', { remote: !1, local: !1 }),
        t(this, '_tuiCallEngine', null),
        t(this, '_tuiStore', null);
    }
    static getInstance() {
      return e.instance || (e.instance = new e()), e.instance;
    }
    _updateViewBackground() {
      var e, t, a;
      const o =
          null == (e = this._tuiStore)
            ? void 0
            : e.getData(n.StoreName.CALL, i.NAME.CUSTOM_UI_CONFIG),
        { userId: r } =
          null == (t = this._tuiStore)
            ? void 0
            : t.getData(n.StoreName.CALL, i.NAME.LOCAL_USER_INFO);
      Object.keys(this._viewConfig.viewBackground.remote).includes(r) &&
        delete this._viewConfig.viewBackground.remote[r],
        null == (a = this._tuiStore) ||
          a.update(n.StoreName.CALL, i.NAME.CUSTOM_UI_CONFIG, {
            ...o,
            viewBackground: {
              ...this._viewConfig.viewBackground.remote,
              ...this._viewConfig.viewBackground.local,
            },
          });
    }
    setEngineInstance(e) {
      this._tuiCallEngine = e;
    }
    setTUIStore(e) {
      this._tuiStore = e;
    }
    updateViewBackgroundUserId(e) {
      var t, a;
      if ('local' === e) {
        const { userId: e } =
          null == (t = this._tuiStore)
            ? void 0
            : t.getData(n.StoreName.CALL, i.NAME.LOCAL_USER_INFO);
        if (
          (Object.keys(this._viewConfig.viewBackground.remote).includes(e) &&
            (delete this._viewConfig.viewBackground.remote[e],
            this._updateViewBackground()),
          !this._isSetViewBackgroundConfig.local)
        )
          return;
        const a = this._viewConfig.viewBackground.local,
          o = a[e] || a[r];
        (a[e] = a[r]),
          (this._viewConfig.viewBackground.local = { [e]: o }),
          this._updateViewBackground();
      } else {
        let e = this._viewConfig.viewBackground.remote;
        if (
          this._isSetViewBackgroundConfig.remote &&
          Object.keys(e).includes('*')
        ) {
          (null == (a = this._tuiStore)
            ? void 0
            : a.getData(n.StoreName.CALL, i.NAME.REMOTE_USER_INFO_LIST)
          )
            .map((e) => e.userId)
            .forEach((t) => {
              Object.keys(e).includes(t) || (e[t] = e['*']);
            }),
            (this._viewConfig.viewBackground.remote = e),
            this._updateViewBackground();
        }
      }
    }
    hideFeatureButton(e) {
      var t, a, o, r, u;
      null == (a = null == (t = this._tuiCallEngine) ? void 0 : t.reportLog) ||
        a.call(t, {
          name: 'TUICallKit.hideFeatureButton.start',
          data: { buttonName: e },
        });
      const l =
        null == (o = this._tuiStore)
          ? void 0
          : o.getData(n.StoreName.CALL, i.NAME.CUSTOM_UI_CONFIG);
      null == (u = this._tuiStore) ||
        u.update(n.StoreName.CALL, i.NAME.CUSTOM_UI_CONFIG, {
          ...l,
          button: {
            ...l.button,
            [e]: {
              ...((null == (r = l.button) ? void 0 : r[e]) || {}),
              show: !1,
            },
          },
        });
    }
    setLocalViewBackgroundImage(e) {
      var t, a, u;
      null == (a = null == (t = this._tuiCallEngine) ? void 0 : t.reportLog) ||
        a.call(t, {
          name: 'TUICallKit.setLocalViewBackgroundImage.start',
          data: { url: e },
        }),
        (this._isSetViewBackgroundConfig.local = !0);
      let { userId: l } =
        null == (u = this._tuiStore)
          ? void 0
          : u.getData(n.StoreName.CALL, i.NAME.LOCAL_USER_INFO);
      o.isEmpty(l) && (l = r),
        (this._viewConfig.viewBackground.local = { [l]: e }),
        this._updateViewBackground();
    }
    setRemoteViewBackgroundImage(e, t) {
      var i, a;
      null == (a = null == (i = this._tuiCallEngine) ? void 0 : i.reportLog) ||
        a.call(i, {
          name: 'TUICallKit.setRemoteViewBackgroundImage.start',
          data: { userId: e, url: t },
        }),
        (this._isSetViewBackgroundConfig.remote = !0),
        '*' === e && (this._viewConfig.viewBackground.remote = {}),
        (this._viewConfig.viewBackground.remote[e] = t),
        this._updateViewBackground();
    }
    setLayoutMode(e) {
      var t, a;
      null == (a = null == (t = this._tuiCallEngine) ? void 0 : t.reportLog) ||
        a.call(t, {
          name: 'TUICallKit.setLayoutMode.start',
          data: { layoutMode: e },
        });
      const o = this._tuiStore.getData(
        n.StoreName.CALL,
        i.NAME.CUSTOM_UI_CONFIG
      );
      this._tuiStore.update(n.StoreName.CALL, i.NAME.CUSTOM_UI_CONFIG, {
        ...o,
        layoutMode: e,
      });
    }
    setCameraDefaultState(e) {
      var t, o;
      null == (o = null == (t = this._tuiCallEngine) ? void 0 : t.reportLog) ||
        o.call(t, {
          name: 'TUICallKit.setCameraDefaultState.start',
          data: { isOpen: e },
        });
      const r = a.deepClone(
        this._tuiStore.getData(n.StoreName.CALL, i.NAME.CUSTOM_UI_CONFIG)
      );
      Object.keys(r.button).includes(n.FeatureButton.Camera) ||
        (r.button[n.FeatureButton.Camera] = {}),
        (r.button[n.FeatureButton.Camera].state = e
          ? n.ButtonState.Open
          : n.ButtonState.Close),
        this._tuiStore.update(n.StoreName.CALL, i.NAME.CUSTOM_UI_CONFIG, r);
    }
  };
t(u, 'instance');
let l = u;
exports.UIDesign = l;
