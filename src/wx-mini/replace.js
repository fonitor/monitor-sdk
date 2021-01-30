import * as config from '../config/wx'
import util from '../util/index'
import { subscribeEvent, triggerHandlers } from '../conmmon/subscribe'
import { replaceOld } from '../util/help'
import { HandleWxAppEvents, HandleWxPageEvents } from './handleWxEvents'

/**
 * 添加函数
 * @param {*} handler 
 * @param {*} handleType
 */
export function addReplaceHandler(handler, handleType) {
    subscribeEvent(handler, handleType)
}

export function replaceApp(wxMonitor) {
    if (!App) {
        return
    }
    HandleWxAppEvents.wxMonitor = wxMonitor

    const originApp = App
    App = function (appOptions) {
        let methods = config.APP_CONFIG
        methods.forEach((method) => {
            addReplaceHandler({
                callback: (data) => HandleWxAppEvents[method.replace('AppOn', 'on')](data),
                type: method
            }, 'app')
            replaceOld(
                appOptions,
                method.replace('AppOn', 'on'),
                function (originMethod) {
                    return function (...args) {
                        triggerHandlers.apply(null, [method, ...args, 'app'])
                        if (originMethod) {
                            originMethod.apply(this, args)
                        }
                    }
                },
                true
            )
        })
        return originApp(appOptions)
    }
}

/**
 * page
 * @param {*} wxMonitor 
 */
export function replacePage(wxMonitor) {
    if (!Page) {
        return
    }
    HandleWxPageEvents.wxMonitor = wxMonitor

    const originPage = Page
    Page = function(pageOptions) {
        let methods = config.PAGE_CPNFIG
        methods.forEach(method => {
            addReplaceHandler({
                callback: (data) => HandleWxPageEvents[method.replace('PageOn', 'on')](data),
                type: method
            }, 'page')
            replaceOld(
                pageOptions,
                method.replace('PageOn', 'on'),
                function (originMethod) {
                  return function (...args) {
                    triggerHandlers.apply(null, [method, ...args, 'page'])
                    if (originMethod) {
                      originMethod.apply(this, args)
                    }
                  }
                },
                true
              )
        })
        return originPage.call(this, pageOptions)
    }

}

/**
 * 路由跳转行为
 * @param {*} wxMonitor 
 */
export function replaceRoute(wxMonitor) {
    const vm = wxMonitor
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
                    // vm.referrerPage = toUrl
                } catch (e) {
                    util.warn('[cloudMonitor] url error')
                }
                return originMethod.call(this, options);
            }
        })
    })
}

/**
 * 代理请求
 * @param {*} wxMonitor 
 */
export function replaceNetwork(wxMonitor) {
    let vm = wxMonitor
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
                            if (!!url && url != `${vm.queue.baseUrl}${vm.queue.api}`) {
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
                            if (!!url && url != `${vm.queue.baseUrl}${vm.queue.api}`) {
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
                        if (!!url && url != `${vm.queue.baseUrl}${vm.queue.api}`) {
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

