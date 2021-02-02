import * as config from '../config/ali'
import util from '../util/index'
import { subscribeEvent, triggerHandlers } from '../conmmon/subscribe'
import { ELinstenerTypes } from './constant'
import { replaceOld, throttle } from '../util/help'
import { HandleAliAppEvents, HandleAliPageEvents } from './HandleAliEvents'

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
    if (!Page) {
        return
    }
    HandleAliPageEvents.aliMonitor = aliMonitor

    const originPage = Page
    Page = function (pageOptions) {
        let methods = config.PAGE_CPNFIG
        // pv uv 自动化
        methods.forEach(method => {
            addReplaceHandler({
                callback: (data) => HandleAliPageEvents[method.replace('PageOn', 'on')](data),
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
        /**
         * 记录用户行为
         * @param {*} e 
         */
        function gestureTrigger(e) {
            e.mitoProcessed = true // 给事件对象增加特殊的标记，避免被无限透传
            console.log('测试点击封装')
            console.log(e)
        }
        function isNotAction(method) {
            // 如果是method中处理过的方法，则不是处理用户手势行为的方法
            return methods.find((m) => m.replace('PageOn', 'on') === method)
        }
        const throttleGesturetrigger = throttle(gestureTrigger, 500)
        const linstenerTypes = [ELinstenerTypes.Touchmove, ELinstenerTypes.Tap]
        // 用户行为重写click
        Object.keys(pageOptions).forEach((m) => {
            if ('function' !== typeof pageOptions[m] || isNotAction(m)) {
                return
            }
            replaceOld(
                pageOptions,
                m,
                function (originMethod) {
                    return function (...args) {
                        const e = args[0]
                        if (e && e.type && e.currentTarget && !e.mitoProcessed) {
                            if (linstenerTypes.indexOf(e.type)) {
                                throttleGesturetrigger(e)
                            }
                        }
                        originMethod.apply(this, args)
                    }
                },
                true
            )
        })
        return originPage.call(this, pageOptions)
    }
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