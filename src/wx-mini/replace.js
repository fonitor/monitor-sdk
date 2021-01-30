import * as config from '../config/wx'
import { subscribeEvent, triggerHandlers } from '../conmmon/subscribe'
import { replaceOld } from '../util/help'
import { HandleWxAppEvents } from './handleWxEvents'

/**
 * 添加函数
 * @param {*} handler 
 */
export function addReplaceHandler(handler) {
    subscribeEvent(handler)
}

export function replaceApp(wxMonitor) {
    if (!App) {
        return
    }
    HandleWxAppEvents.wxMonitor = wxMonitor

    const originApp = App
    App = function (appOptions) {
        const methods = config.APP_CONFIG
        methods.forEach((method) => {
            addReplaceHandler({
                callback: (data) => HandleWxAppEvents[method.replace('AppOn', 'on')](data),
                type: method
            })
            replaceOld(
                appOptions,
                method.replace('AppOn', 'on'),
                function (originMethod) {
                    return function (...args) {
                        triggerHandlers.apply(null, [method, ...args])
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