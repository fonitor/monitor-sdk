import util from '../util/index'
import wxQueue from '../queue/wx'
import * as config from '../config/wx'

const baseConfig = {
    baseUrl: '',
    autoReportApi: true, // 是否上报api 
    autoReportPage: true, // 是否上报页面信息
    autoReportPagePerformance: true, // 是否上报页面性能
}

/**
 * 初始化微信sdk
 * @param {*} wxMonitor 
 */
export function initMixin(wxMonitor) {
    /**
     * 初始化
     * @param {*} options 
     */
    wxMonitor._init = function (options) {
        const vm = this
        if (!options || !options.app) {
            util.warn('[cloudMonitor] not set app')
        }
        if (!options || !options.baseUrl) {
            util.warn('[cloudMonitor] not set baseUrl')
        }
        let _options = Object.assign(baseConfig, options)
        vm.$options = _options
        vm.queue = wxQueue.getInstance(_options.baseUrl)
        // 初始化
        vm.$addHook(_options)
    }
    /**
     * 微信代理
     * @param {*} options 
     */
    wxMonitor.$addHook = function (options) {
        // 代理跳转
        let WxRouteEvents = config.WxRouteEvents

        // 代理请求
        let WxHookMethods = config.WxHookMethods
        WxHookMethods.forEach(hook => {
            let originRequest = wx[hook];
            Object.defineProperty(wx, hook, {
                writable: true,
                enumerable: true,
                configurable: true,
                value: function () {
                    let args = [];
                    for (let _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    let options$1 = args[0];
                    let reqData;
                    if (hook === 'request') {
                        reqData = options$1.data;
                    }
                    var successHandler = function (res) {
                        console.log('测试成功')
                        if (typeof options$1.success === 'function') {
                            return options$1.success(res);
                        }
                    };
                    var failHandler = function (err) {
                        console.log('测试失败')
                        if (typeof options$1.fail === 'function') {
                            return options$1.fail(err);
                        }
                    };
                    let actOptions = util.__assign(util.__assign({}, options$1), { success: successHandler, fail: failHandler });
                    return originRequest.call(this, actOptions);
                }
            })
        })
    }
}