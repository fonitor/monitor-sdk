import util from '../util/index'

const baseConfig = {
    baseUrl: '',
    autoReportApi: true, // 是否上报api 
    autoReportPage: true, // 是否上报页面信息
    autoReportPagePerformance: true, // 是否上报页面性能
}

/**
 * 初始化微信sdk
 * @param {*} mpExtend 
 */
export function initMixin(mpExtend) {
    mpExtend.prototype._init = function (options) {
        if (!options || !options.app) {
            util.warn('[cloudMonitor] not set app')
        }
        if (!options || !options.baseUrl) {
            util.warn('[cloudMonitor] not set baseUrl')
        }
        let _options = Object.assign(baseConfig, options)
        const vm = this
        vm.$options = _options
        // 初始化
        vm.$addHook(_options)
    }
    mpExtend.prototype.$addHook = function(options) {

    }
}