import util from './util/index'

export default class Monitor {
    constructor(options = {}) {
        if (typeof options != 'object') {
            return util.warn("options is object: " + options)
        }
        this.baseUrl = options.baseUrl
    }

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
                        self.error(t)
                    } catch (t) {
                        util.warn("[cloudMonitor] error in hookApp:onError", t)
                    }
                    if ("function" == typeof r) {
                        return r.apply(this, n)
                    }
                }
            }

        return util.ext({}, e, t)
    }

    /**
     * 错误信息
     * @param {*} t 
     * @param {*} e 
     */
    error(t, e) {
        if (!t) {
            return util_1.warn("[cloudMonitor] invalid param e: " + t), this
        }
        1 === arguments.length ? ("string" == typeof t && (t = {
            message: t
        }, e = {}), "object" == typeof t && (e = t = t.error || t)) : ("string" == typeof t && (t = {
            message: t
        }), "object" != typeof e && (e = {}));
        let r = t.name || "CustomError",
            n = util.encode(t.message),
            i = util.encode(util.replaceAll(t.stack || "", "http.*\\d*:\\d*", "unknow"));

        e = e || {};

        
    }
}