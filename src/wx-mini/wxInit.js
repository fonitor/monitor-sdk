import util from '../util/index'
import wxQueue from '../queue/wx'
import * as config from '../config/wx'
import { setupReplace } from './load'

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
        vm.baseOptions = '' // 初始化上传参数
        vm.referrerPage = '' // 上一个页面
        vm.userId = '' // 用户唯一标识
        vm.optionsInit(_options, config.WX_TYPE)
        // vm.$addHook(_options)
        setupReplace(wxMonitor)
    }
    /**
     * 微信代理
     * @param {*} options 
     */
    wxMonitor.$addHook = function (options) {
        const vm = this
        // 代理跳转
        let WxRouteEvents = config.WxRouteEvents
        WxRouteEvents.forEach(method => {
            let originMethod = wx[method];
            Object.defineProperty(wx, method, {
                writable: true,
                enumerable: true,
                configurable: true,
                value: function (options) {
                    var toUrl;
                    if (method === WxRouteEvents.NavigateBack) {
                        toUrl = util.getNavigateBackTargetUrl(options.delta);
                    } else {
                        toUrl = options.url;
                    }
                    try {
                        let data = {
                            simpleUrl: toUrl,
                            referrer: vm.referrerPage || "",
                        }
                        // vm.logSave('page_pv', data)
                        vm.referrerPage = toUrl
                    } catch (e) {
                        util.warn('[cloudMonitor] url error')
                    }
                    return originMethod.call(this, options);
                }
            })
        })
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
                    let startTime = new Date().getTime()
                    for (let _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    let options$1 = args[0];
                    let url = options$1.url || ""

                    let reqData;
                    if (hook === 'request') {
                        reqData = options$1.data;
                    }
                    let successHandler = function (res) {
                        try {
                            // 上报接口报警
                            if (!!res && res.statusCode && res.statusCode != 200) {
                                let data = {
                                    simpleUrl: util.getPage(),
                                    httpUrl: options$1.url || "",
                                    httpUploadType: config.HTTP_ERROR,
                                    responseText: JSON.stringify(res),
                                    httpStatus: res.statusCode
                                }
                                if (url && url.indexOf(vm.baseUrl) != -1) {
                                    vm.logSave('http_log', data)
                                }
                            } else {
                                let endTime = new Date().getTime()
                                let consumeData = {
                                    simpleUrl: util.getPage(),
                                    loadTime: endTime - startTime,
                                    httpUrl: options$1.url || "",
                                    httpUploadType: config.HTTP_SUCCESS,
                                    responseText: JSON.stringify(res),
                                    httpStatus: res.statusCode || 200
                                }
                                if (url && url.indexOf(vm.baseUrl) != -1) {
                                    vm.logSave('http_log', consumeData)
                                }
                            }
                        } catch (e) {
                            util.warn('[cloudMonitor] http error')
                        }
                        if (typeof options$1.success === 'function') {
                            return options$1.success(res);
                        }
                    };
                    let failHandler = function (err) {
                        try {
                            let data = {
                                simpleUrl: util.getPage(),
                                httpUrl: options$1.url || "",
                                httpUploadType: config.HTTP_ERROR,
                                responseText: JSON.stringify(err),
                                httpStatus: '0'
                            }
                            if (url && url.indexOf(vm.baseUrl) != -1) {
                                vm.logSave('http_log', data)
                            }
                        } catch (e) {
                            util.warn('[cloudMonitor] http error')
                        }
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