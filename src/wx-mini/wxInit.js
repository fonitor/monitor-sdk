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
        setupReplace(wxMonitor)
    }
}