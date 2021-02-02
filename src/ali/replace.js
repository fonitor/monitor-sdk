import * as config from '../config/ali'
import util from '../util/index'
import { subscribeEvent, triggerHandlers } from '../conmmon/subscribe'
import { replaceOld, throttle } from '../util/help'
import { HandleAliAppEvents } from './HandleAliEvents'

/**
 * 添加函数
 * @param {*} handler 
 * @param {*} handleType
 */
export function addReplaceHandler(handler, handleType) {
    subscribeEvent(handler, handleType)
}

/**
 * page
 * @param {*} aliMonitor 
 */
export function replacePage(aliMonitor) {

}

/**
 * app
 * @param {*} aliMonitor 
 */
export function replaceApp(aliMonitor) {
    if (!App) {
        return
    }
    HandleAliAppEvents.aliMonitor = aliMonitor
    const originApp = App
    App = function (appOptions) {
        let methods = config.APP_CONFIG
        methods.forEach((method) => {
            addReplaceHandler({
                callback: (data) => HandleAliAppEvents[method.replace('AppOn', 'on')](data),
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
 * request 封装
 * @param {*} aliMonitor 
 */
export function replaceNetwork(aliMonitor) {
    
}