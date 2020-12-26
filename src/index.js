import util from './util/index'
import wxQueue from './queue/wx'

const queue = null

/**
 * 监控
 */
export default class Monitor {
    constructor() {
        this._conf = {
            baseUrl: '',
            autoReportApi: true,
            autoReportPage: true
        }
    }

    /**
     * 初始化参数
     * @param {*} options 
     */
    async setConfig(options) {

        // 消息队列初始化
        queue = new wxQueue(this._conf.baseUrl)
    }

    /**
     * 监控执行
     * @param {*} options 
     */
    async init(options) {
        if (!options || !options.pid) {
            util.warn("[cloudMonitor] not set pid");
            return
        }
        let self = this
        try {
            await this.setConfig()
            this.addHook()
        } catch (err) {
            util.warn("[cloudMonitor] set config error");
        }
        // 是否需要落pv数据
        if (this && this._conf && this._conf.autoReportPage) {
            this.onReady(() => {
                this._log('pv')
            })
        }
        
    }

    /**
     * @param {*} fun 
     */
    onReady(fun) {
        if (typeof fun != 'function') {
            util.warn('[cloudMonitor] not function')
            return
        }
        this._conf.uid ? fun() : setTimeout(() => {
            this.onReady(fun)
        }, 100)
    }

    /**
     * 执行log 存储
     * @param {*} type 
     */
    _log(type) {

    }

    /**
     * 代理
     */
    addHook() {

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
        let name = t.name || 'CustomError'
        let useData = {
            begin: Date.now(),
            cate: name,
            msg: t.message,
            file: e.filename || "",
            line: e.lineno || "",
            col: e.colno || "",
        }

    }

    getConfig(e) {
        return {}
        // return e ? this._conf[e] : util.ext({}, this._conf)
    }
}