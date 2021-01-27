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
        vm.baseOptions = '' // 初始化上传参数
        vm.referrerPage = '' // 上一个页面
        vm.userId = '' // 用户唯一标识
        vm.initBaseOptions(_options)
        vm.$addHook(_options)
    }
    /**
     * 微信代理
     * @param {*} options 
     */
    wxMonitor.$addHook = function (options) {
        const vm = this
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
                    let startTime = new Date().getTime()
                    for (let _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    let options$1 = args[0];

                    let reqData;
                    if (hook === 'request') {
                        reqData = options$1.data;
                    }
                    var successHandler = function (res) {
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
                                vm.logSave('http_log', data)
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
                                vm.logSave('http_log', consumeData)
                            }
                        } catch (e) {
                            util.warn('[cloudMonitor] http error')
                        }
                        if (typeof options$1.success === 'function') {
                            return options$1.success(res);
                        }
                    };
                    var failHandler = function (err) {
                        try {
                            let data = {
                                simpleUrl: util.getPage(),
                                httpUrl: options$1.url || "",
                                httpUploadType: config.HTTP_ERROR,
                                responseText: JSON.stringify(err),
                                httpStatus: '0'
                            }
                            vm.logSave('http_log', data)
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
    /**
     * 上传日志
     * @param {*} type 
     * @param {*} data 
     */
    wxMonitor.logSave = function (type, data) {
        let useData,
            logData = JSON.parse(JSON.stringify(data)),
            vm = this
        if (!vm.baseOptions) {
            vm.initBaseOptions(vm.options)
            setTimeout(() => {
                logSave(type, data)
            }, 500)
            return
        }
        switch (type) {
            case 'page_pv':
                useData = Object.assign(logData, vm.baseOptions)
                useData.userId = vm.userId || "", // 用户标识
                    useData.uploadType = type
                useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
                vm.queue.pushToQueue(useData)
                break
            case 'js_error':
                useData = Object.assign(logData, vm.baseOptions)
                useData.userId = vm.userId || "", // 用户标识
                    useData.uploadType = type
                useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
                vm.queue.pushToQueue(useData)
                break
            case 'http_log':
                useData = Object.assign(logData, vm.baseOptions)
                useData.userId = vm.userId || "", // 用户标识
                    useData.uploadType = type
                useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
                vm.queue.pushToQueue(useData)
                break
            default:

        }
    }

    /**
     * 初始化上传参数
     * @param {*} option 
     */
    wxMonitor.initBaseOptions = function (option) {
        let vm = this
        // 初始化上传参数
        wx.getSystemInfo({
            success: (res) => {
                vm.baseOptions = {
                    app: option.app || "",
                    type: config.WX_TYPE, // 代表微信小程序
                    projectVersion: option.projectVersion || config.WX_PROJECT_VERSION, // 项目版本号
                    customerKey: util.generateUUID(), // 会话id
                    os: res.system.indexOf('iOS') === -1 ? 'Android' : 'IOS', // 系统信息
                    deviceName: res.model, // 手机型号
                    brand: res.brand, // 手机品牌
                    browserVersion: res.version, // 小程序版本号
                }
            }
        });
    }
    /**
     * 设置用户唯一标识
     * @param {*} userId 
     */
    wxMonitor.setUserId = function (userId) {
        this.userId = userId
    }
    /**
     * 包装js 错误信息
     * @param {*} option 
     */
    wxMonitor.hookApp = function (option) {
        let vm = this,
            oldHookApp = {
                onError: function (e) {
                    var n = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
                        r = option.onError;
                    try {
                        let data = {
                            simpleUrl: util.getPage(),
                            errorMessage: String(e)
                        }
                        vm.logSave('js_error', data)
                    } catch (err) {
                        util.warn("[cloudMonitor] error in hookApp:onError", err)
                    }
                    if ("function" == typeof r) {
                        return r.apply(this, n)
                    }
                }
            }
        return util.ext({}, option, oldHookApp)

    }
}