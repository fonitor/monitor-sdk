function getCwarn() {
  let t = "object" == typeof console ? console.warn : noop;

  try {
    let e = {
      warn: t
    };
    e.warn.call(e);
  } catch (n) {
    return noop;
  }

  return t;
}
/**
 * encodeURIComponent 转换
 * @param {*} t 
 * @param {*} e 
 */


function encode(t, e) {
  try {
    t = e ? encodeURIComponent(t).replace(/\(/g, "%28").replace(/\)/g, "%29") : encodeURIComponent(t);
  } catch (n) {}

  return t;
}
/**
 * 字符串替换
 * @param {*} str 
 * @param {*} find 
 * @param {*} replace 
 */


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
/**
 * @param {*} t 
 */


function ext(t) {
  for (let e = 1, n = arguments.length; e < n; e++) {
    let r = arguments[e];

    for (let o in r) {
      Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
  }

  return t;
}

let warn = getCwarn;
var util = {
  ext,
  warn,
  encode,
  replaceAll
};

/**
 * 监控
 */

class Monitor {
  constructor(options = {}) {
    if (typeof options != 'object') {
      return util.warn("options is object: " + options);
    }

    this.baseUrl = options.baseUrl;
    this._conf = {};
  }
  /**
   * 监控执行
   */


  init() {}
  /**
   * 监控注册
   * @param {*} e 
   */


  hookApp(e) {
    let self = this,
        t = {
      onError: function (t) {
        let n = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
            r = e.onError;

        try {
          self.error(t);
        } catch (t) {
          util.warn("[cloudMonitor] error in hookApp:onError", t);
        }

        if ("function" == typeof r) {
          return r.apply(this, n);
        }
      }
    };
    return util.ext({}, e, t);
  }
  /**
   * 错误信息
   * @param {*} t 
   * @param {*} e 
   */


  error(t, e) {
    if (!t) {
      return util_1.warn("[cloudMonitor] invalid param e: " + t), this;
    }

    1 === arguments.length ? ("string" == typeof t && (t = {
      message: t
    }, e = {}), "object" == typeof t && (e = t = t.error || t)) : ("string" == typeof t && (t = {
      message: t
    }), "object" != typeof e && (e = {}));
  }

  getConfig(e) {
    return {}; // return e ? this._conf[e] : util.ext({}, this._conf)
  }

}

export default Monitor;
//# sourceMappingURL=index.js.map
